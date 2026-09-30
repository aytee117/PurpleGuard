// One-off, run once per new event after its webinar is published in Teams
// (events are now auto-discovered from Graph — src/lib/events/index.ts, no
// manual registry entry needed) — creates the Graph change-notification
// subscription that powers two-way sync (see the events plan §6). A missed
// run just degrades that one event to one-way sync; it doesn't break
// registration itself.
//
// Usage:
//   npx tsx scripts/create-event-subscription.ts <event-slug>
//   (find the slug by checking /events after the webinar is published — it's
//   derived from the webinar's title)

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import crypto from "node:crypto";
import { getSupabaseAdmin } from "../src/lib/supabase";
import { getEventBySlug } from "../src/lib/events";
import { createRegistrationSubscription } from "../src/lib/graph/webinar";

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npx tsx scripts/create-event-subscription.ts <event-slug>");
    process.exit(1);
  }

  const event = await getEventBySlug(slug);
  if (!event) {
    console.error(`No published webinar found with slug "${slug}" (events are auto-discovered from Graph — run npm run dev/build and check /events to see the current slug list).`);
    process.exit(1);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.purpleguard.io";
  const notificationUrl = `${siteUrl}/api/graph/webhooks/event-registrations`;
  const clientState = crypto.randomBytes(32).toString("hex");

  const result = await createRegistrationSubscription(event.graphWebinarId, notificationUrl, clientState);
  if ("ok" in result && result.ok === false) {
    console.error(`Failed to create Graph subscription (${result.status}): ${result.message}`);
    process.exit(1);
  }
  const { subscriptionId, expiresAt } = result as { subscriptionId: string; expiresAt: string };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("event_graph_subscriptions").upsert(
    {
      event_slug: slug,
      graph_webinar_id: event.graphWebinarId,
      subscription_id: subscriptionId,
      client_state: clientState,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "event_slug" }
  );

  if (error) {
    console.error(`Subscription created on Graph (${subscriptionId}) but failed to save to Supabase: ${error.message}`);
    process.exit(1);
  }

  console.log(`Subscription ${subscriptionId} created for "${slug}", expires ${expiresAt}.`);
  console.log("Remember: the renewal cron (app/api/cron/renew-graph-subscriptions) keeps this alive going forward.");
}

main();
