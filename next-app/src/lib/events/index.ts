// Events registry — auto-discovers published Teams webinars live from
// Microsoft Graph (listPublishedWebinars) so a newly published event shows
// up on /events without a code change. `manualOverrides` below is the only
// hand-maintained part: optional cosmetic extras (takeaways, hero photo,
// speaker fallback, a shorter dek) that Graph's webinar object doesn't
// carry, keyed by the webinar's own Graph id — never required, an event
// with no override entry still displays fine using Graph's own title and
// description alone.
//
// Cache/refresh note: this now depends on a live external call, fronted by
// Next's ISR (`revalidate` on the hub/detail pages) rather than a per-request
// fetch — a newly published webinar shows up within that window, not
// instantly. Lower the revalidate value on those pages if that lag matters.
//
// Known approximation, not hidden: Graph's startDateTime/endDateTime are a
// local wall-clock time plus a *Windows* time zone name (not an IANA name
// and not a UTC offset) — there's no lightweight way to convert that to an
// exact instant without a Windows→IANA mapping table this repo doesn't have.
// The raw local time + zone name is shown as-is (timeLabel below), and
// isUpcoming/sort treat the wall-clock time as UTC for comparison purposes,
// which can be off by the zone's real offset right at the boundary between
// "upcoming" and "past". Acceptable for now; revisit if that boundary error
// ever actually matters for a real event.

import { listPublishedWebinars, type DiscoveredWebinar } from "@/lib/graph/webinar";

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
  description: string[];
  takeaways?: string[];
  speaker?: EventSpeaker;
  heroImage?: string;
}

interface ManualOverride {
  dek?: string;
  takeaways?: string[];
  speaker?: EventSpeaker;
  heroImage?: string;
}

// Optional, keyed by the webinar's Graph id (copy it from the discovered
// event once it exists — e.g. from Graph Explorer's
// GET /solutions/virtualEvents/webinars response). Example:
//
// "88b245ac-b0b2-f1aa-e34a-c81c27abdac2@f9448ec4-804b-46af-b810-62085248da33": {
//   takeaways: ["...", "..."],
//   heroImage: "/events/<slug>/hero.jpg",
// },
const manualOverrides: Record<string, ManualOverride> = {};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
  const startsAt = webinar.startDateTime ? `${webinar.startDateTime}Z` : new Date(0).toISOString();

  return {
    slug,
    title: webinar.displayName,
    dek: override?.dek,
    status: webinar.status === "canceled" ? "cancelled" : "upcoming", // narrowed to upcoming/past below
    startsAt,
    timeLabel: formatTimeLabel(webinar),
    graphWebinarId: webinar.id,
    description: webinar.description ? [webinar.description] : [],
    takeaways: override?.takeaways,
    speaker: override?.speaker,
    heroImage: override?.heroImage,
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
