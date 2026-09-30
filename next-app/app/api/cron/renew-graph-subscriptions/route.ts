import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { renewSubscription } from "@/lib/graph/webinar";

// Vercel Cron target (see vercel.json) — renews Graph subscriptions before
// they expire so the two-way sync in app/api/graph/webhooks/event-registrations
// doesn't silently go stale. See the events plan §6.
//
// Graph subscriptions are created with a conservative ~48h expiry
// (createRegistrationSubscription in src/lib/graph/webinar.ts) — this route
// should run at least daily and extend anything expiring within the next
// renewal window.

const RENEWAL_WINDOW_MS = 24 * 60 * 60 * 1000; // renew anything expiring within 24h
const NEW_EXPIRY_MS = 48 * 60 * 60 * 1000; // extend by another 48h
const TEAM_NOTIFICATION_EMAIL = "hello@purpleguard.io";
const FROM_ADDRESS = "PurpleGuard <hello@notification.purpleguard.io>";

interface SubscriptionRow {
  event_slug: string;
  subscription_id: string;
  expires_at: string;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const cutoff = new Date(Date.now() + RENEWAL_WINDOW_MS).toISOString();

  const { data: expiring, error: selectError } = await supabase
    .from("event_graph_subscriptions")
    .select("event_slug, subscription_id, expires_at")
    .lt("expires_at", cutoff)
    .returns<SubscriptionRow[]>();

  if (selectError) {
    console.error("Failed to list expiring subscriptions:", selectError);
    return NextResponse.json({ error: "Failed to list subscriptions" }, { status: 502 });
  }

  const failures: string[] = [];
  let renewed = 0;

  for (const sub of expiring ?? []) {
    const newExpiresAt = new Date(Date.now() + NEW_EXPIRY_MS).toISOString();
    const result = await renewSubscription(sub.subscription_id, newExpiresAt);

    if (!result.ok) {
      failures.push(`${sub.event_slug} (${sub.subscription_id}): ${result.message}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from("event_graph_subscriptions")
      .update({ expires_at: newExpiresAt, updated_at: new Date().toISOString() })
      .eq("event_slug", sub.event_slug);
    if (updateError) {
      failures.push(`${sub.event_slug}: renewed on Graph but failed to update Supabase — ${updateError.message}`);
      continue;
    }
    renewed++;
  }

  // A silent renewal failure quietly turns two-way sync into one-way for
  // that event, potentially for weeks before anyone notices — never let
  // that happen without an alert (same discipline as Resend/Supabase
  // failures elsewhere in this app).
  if (failures.length > 0) {
    console.error("Graph subscription renewal failures:", failures);
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: TEAM_NOTIFICATION_EMAIL,
        subject: `[Alert] ${failures.length} Graph subscription renewal failure(s)`,
        html: `<p>The following event webhook subscriptions failed to renew:</p><ul>${failures
          .map((f) => `<li>${f}</li>`)
          .join("")}</ul><p>Two-way Teams sync for these events has likely gone stale.</p>`,
      });
    } catch (err) {
      console.error("Failed to send renewal-failure alert email:", err);
    }
  }

  return NextResponse.json({ renewed, failed: failures.length });
}
