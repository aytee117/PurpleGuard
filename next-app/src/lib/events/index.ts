// Events registry — auto-discovers published Teams webinars live from
// Microsoft Graph (listPublishedWebinars) so a newly published event shows
// up on /events without a code change. `manualOverrides` below is the only
// hand-maintained part: optional cosmetic extras (takeaways, speaker
// fallback, a shorter dek) that Graph's webinar object doesn't carry, keyed
// by the webinar's own Graph id — never required, an event with no override
// entry still displays fine using Graph's own title and description alone.
//
// Deliberately no per-event hero photo: confirmed against the actual Graph
// schema (virtualEventWebinar, virtualEventSettings,
// virtualEventWebinarRegistrationConfiguration) that no banner/cover image
// is exposed via the API at all, so there's no way to auto-pull the real
// Teams registration-page image. Rather than make hero photos a recurring
// manual per-event chore (upload a file, add an override, redeploy — for
// every single event, forever), every event uses the brand-gradient
// placeholder (EventHeroImage) as its real, permanent design. Revisit only
// if Microsoft ever exposes this via the API.
//
// Cache/refresh note: this now depends on a live external call, fronted by
// Next's ISR (`revalidate` on the hub/detail pages) rather than a per-request
// fetch — a newly published webinar shows up within that window, not
// instantly. Lower the revalidate value on those pages if that lag matters.
//
// Graph's startDateTime/endDateTime are a local wall-clock time plus a
// *Windows* time zone name (not an IANA name, not a UTC offset). The raw
// local time + zone name is shown as-is (timeLabel below). For the
// upcoming/past comparison, WINDOWS_TZ_OFFSET_MINUTES converts to a real UTC
// instant for the zones this org actually uses — an unmapped zone still
// falls back to treating the wall-clock time as UTC, which was the original
// blanket behavior and caused an already-ended event (real zone UTC+2/3/4)
// to keep showing as upcoming/registrable for hours after it ended.

import { listPublishedWebinars, type DiscoveredWebinar } from "@/lib/graph/webinar";
import { sanitizeEventDescriptionHtml } from "@/lib/sanitize-html";

export interface EventSpeaker {
  name: string;
  title: string;
  photo?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  dek?: string;
  status: "upcoming" | "past" | "cancelled";
  startsAt: string;
  timeLabel: string;
  graphWebinarId: string;
  // Plain-paragraph description (used for manual overrides and plain-text
  // Graph descriptions). When Teams' rich-text editor was used, Graph
  // returns HTML instead — that comes through as `descriptionHtml` (already
  // sanitized) and takes priority over this when both are present.
  description: string[];
  descriptionHtml?: string;
  takeaways?: string[];
  speaker?: EventSpeaker;
}

interface ManualOverride {
  dek?: string;
  takeaways?: string[];
  speaker?: EventSpeaker;
}

// Optional, keyed by the webinar's Graph id (copy it from the discovered
// event once it exists — e.g. from Graph Explorer's
// GET /solutions/virtualEvents/webinars response). Example:
//
// "88b245ac-b0b2-f1aa-e34a-c81c27abdac2@f9448ec4-804b-46af-b810-62085248da33": {
//   takeaways: ["...", "..."],
// },
const manualOverrides: Record<string, ManualOverride> = {};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Windows time zone name -> fixed UTC offset in minutes, for the zones this
// organization actually runs events in. None of these observe DST currently
// (Egypt suspended it), so a fixed offset is safe. An unmapped zone falls
// back to treating the wall-clock time as UTC (the previous blanket
// behavior) — still an approximation, but now only for a zone that's never
// actually been used.
const WINDOWS_TZ_OFFSET_MINUTES: Record<string, number> = {
  "Arabian Standard Time": 4 * 60, // UAE, Oman — UTC+4
  "Arab Standard Time": 3 * 60, // Saudi Arabia, Kuwait, Qatar, Bahrain — UTC+3
  "Egypt Standard Time": 2 * 60, // Egypt — UTC+2
};

// The real UTC instant, used for the upcoming/past comparison and sorting —
// unlike formatTimeLabel below, this must not just echo the wall-clock
// numbers back. Naively treating local time as UTC made an already-ended
// event (in UTC+2/3/4) look hours away from starting, keeping it visible
// and registrable well past when it actually ended.
function toUtcInstant(localDateTime: string, windowsTimeZone: string | null): string {
  const offsetMinutes = windowsTimeZone ? WINDOWS_TZ_OFFSET_MINUTES[windowsTimeZone] : undefined;
  if (offsetMinutes === undefined) return `${localDateTime}Z`;
  return new Date(new Date(`${localDateTime}Z`).getTime() - offsetMinutes * 60_000).toISOString();
}

// Deliberately keeps the naive "treat local time as UTC" trick: on a
// UTC-default server runtime (Vercel's Node functions), formatting that
// naive instant with no explicit timeZone option just echoes back the
// original wall-clock numbers — which is exactly what should be displayed
// next to the zone name. Do not "fix" this using toUtcInstant above; that
// would shift the displayed time into the server's zone instead of showing
// the event's own local time.
function formatTimeLabel(webinar: DiscoveredWebinar): string {
  if (!webinar.startDateTime) return "";
  const time = new Date(`${webinar.startDateTime}Z`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return webinar.startTimeZone ? `${time} (${webinar.startTimeZone})` : time;
}

function toEventItem(webinar: DiscoveredWebinar, slug: string): EventItem {
  const override = manualOverrides[webinar.id];
  const startsAt = webinar.startDateTime
    ? toUtcInstant(webinar.startDateTime, webinar.startTimeZone)
    : new Date(0).toISOString();

  return {
    slug,
    title: webinar.displayName,
    dek: override?.dek,
    status: webinar.status === "canceled" ? "cancelled" : "upcoming", // narrowed to upcoming/past below
    startsAt,
    timeLabel: formatTimeLabel(webinar),
    graphWebinarId: webinar.id,
    description: webinar.description && !webinar.descriptionIsHtml ? [webinar.description] : [],
    descriptionHtml:
      webinar.description && webinar.descriptionIsHtml
        ? sanitizeEventDescriptionHtml(webinar.description)
        : undefined,
    takeaways: override?.takeaways,
    speaker: override?.speaker,
  };
}

async function discoverEvents(): Promise<EventItem[]> {
  let webinars: DiscoveredWebinar[] = [];
  try {
    webinars = await listPublishedWebinars();
  } catch (err) {
    // Graph not configured yet, or the call failed — degrade to an empty
    // list rather than breaking the hub/detail pages. Logged server-side
    // so a real misconfiguration is still visible in Vercel's Runtime Logs.
    console.error("listPublishedWebinars failed, showing no auto-discovered events:", err);
    return [];
  }

  const usedSlugs = new Set<string>();
  return webinars.map((webinar) => {
    let slug = slugify(webinar.displayName) || webinar.id.slice(0, 8);
    if (usedSlugs.has(slug)) slug = `${slug}-${webinar.id.slice(0, 6)}`;
    usedSlugs.add(slug);
    return toEventItem(webinar, slug);
  });
}

export async function getAllEvents(): Promise<EventItem[]> {
  return discoverEvents();
}

export async function getEventBySlug(slug: string): Promise<EventItem | undefined> {
  const events = await discoverEvents();
  return events.find((e) => e.slug === slug);
}

export function isUpcoming(event: EventItem): boolean {
  if (event.status === "cancelled") return false;
  return new Date(event.startsAt).getTime() >= Date.now();
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const events = await discoverEvents();
  return events.filter(isUpcoming).sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export async function getPastEvents(): Promise<EventItem[]> {
  const events = await discoverEvents();
  return events
    .filter((e) => !isUpcoming(e) && e.status !== "cancelled")
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
}
