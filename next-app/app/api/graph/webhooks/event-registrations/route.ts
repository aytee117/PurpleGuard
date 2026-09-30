import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getRegistrationById } from "@/lib/graph/webinar";

// Receives Microsoft Graph change notifications for virtualEventRegistration
// resources (subscribed per-webinar via scripts/create-event-subscription.ts)
// and writes the current Teams-side status back into event_registrations.
// This is the two-way half of the sync — see the events plan §6.
//
// Untested assumption, flagged explicitly: the exact shape of `resource` in
// a notification for an item under a collection-scoped subscription hasn't
// been exercised against a live tenant. parseResourcePath below handles both
// a plain-path style (".../webinars/{id}/registrations/{regId}") and an
// OData quoted-key style ("webinars('{id}')/registrations('{regId}')") —
// verify against a real notification and adjust if neither matches.

const ALLOWED_TEAMS_STATUSES = new Set(["registered", "waitlisted", "rejected", "cancelled"]);

interface GraphNotification {
  subscriptionId: string;
  clientState?: string;
  changeType: "updated" | "deleted" | string;
  resource: string;
}

function parseResourcePath(resource: string): { webinarId: string; registrationId: string } | null {
  const match = resource.match(/webinars\(?'?([^'/)]+)'?\)?\/registrations\(?'?([^'/)]+)'?\)?/i);
  if (!match) return null;
  return { webinarId: match[1], registrationId: match[2] };
}

export async function POST(req: NextRequest) {
  // Validation handshake: Graph POSTs with ?validationToken=... when a
  // subscription is created and expects it echoed back verbatim as plain
  // text within 10 seconds, unauthenticated. Handle this before anything else.
  const validationToken = req.nextUrl.searchParams.get("validationToken");
  if (validationToken !== null) {
    return new NextResponse(validationToken, { status: 200, headers: { "Content-Type": "text/plain" } });
  }

  let body: { value?: GraphNotification[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const notifications = body.value ?? [];
  if (notifications.length === 0) {
    return new NextResponse(null, { status: 202 });
  }

  const supabase = getSupabaseAdmin();

  // Respond 202 quickly regardless of per-item outcome — Graph expects a
  // fast ack and will retry/eventually disable a subscription that
  // consistently times out or errors.
  await Promise.allSettled(
    notifications.map(async (notification) => {
      const { data: subscriptionRow } = await supabase
        .from("event_graph_subscriptions")
        .select("client_state")
        .eq("subscription_id", notification.subscriptionId)
        .maybeSingle<{ client_state: string }>();

      // clientState is the actual authenticity check — Graph webhooks carry
      // no request-signing beyond this shared secret.
      if (!subscriptionRow || subscriptionRow.client_state !== notification.clientState) {
        console.error("Rejected Graph notification: unknown subscription or clientState mismatch", notification.subscriptionId);
        return;
      }

      const parsed = parseResourcePath(notification.resource);
      if (!parsed) {
        console.error("Could not parse Graph notification resource:", notification.resource);
        return;
      }

      const nowIso = new Date().toISOString();

      if (notification.changeType === "deleted") {
        const { error } = await supabase
          .from("event_registrations")
          .update({ teams_status: "cancelled", teams_status_updated_at: nowIso })
          .eq("graph_registration_id", parsed.registrationId);
        if (error) console.error("Failed to write teams_status=cancelled:", error);
        return;
      }

      try {
        // Deliberately re-fetch current truth rather than trusting
        // resourceData — rich resource-data delivery needs encryption
        // certs this build doesn't set up.
        const registration = await getRegistrationById(parsed.webinarId, parsed.registrationId);
        if (!registration) return;

        const status = registration.status.toLowerCase();
        if (!ALLOWED_TEAMS_STATUSES.has(status)) {
          console.error("Unexpected Teams registration status, not writing:", registration.status);
          return;
        }

        const { error } = await supabase
          .from("event_registrations")
          .update({ teams_status: status, teams_status_updated_at: nowIso })
          .eq("graph_registration_id", parsed.registrationId);
        if (error) console.error("Failed to write teams_status:", error);
      } catch (err) {
        console.error("Failed to re-fetch registration after notification:", err);
      }
    })
  );

  return new NextResponse(null, { status: 202 });
}
