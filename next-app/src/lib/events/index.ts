// Events registry — one file for all events (unlike src/lib/reports/ or
// src/lib/campaigns/, which are one file per item), since event content
// here is structural metadata rather than long-form bespoke copy. See
// "Events Hub + Automated Microsoft Teams Webinar Registration" plan.

export interface EventSpeaker {
  name: string;
  title: string;
  photo?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  dek?: string;
  // Manual override — lets an event be force-cancelled regardless of date,
  // or force-kept "upcoming" is NOT possible once startsAt has passed (see
  // isUpcoming below, which always applies the live date check too).
  status: "upcoming" | "past" | "cancelled";
  startsAt: string; // ISO 8601 with UTC offset, e.g. "2026-11-10T09:00:00+04:00"
  endsAt?: string;
  timeLabel: string; // display string, e.g. "09:00 Dubai · 08:00 Cairo"
  languageLabel: string;
  // The Microsoft Graph virtualEventWebinar id, captured by hand after the
  // organizer publishes the webinar in Teams — see project deliverables.md
  // and the events plan's manual setup checklist (§7.F). Format is the
  // composite Graph id, e.g. "{meetingId}@{organizerId}".
  graphWebinarId: string;
  description: string[]; // paragraphs
  takeaways?: string[];
  speaker?: EventSpeaker;
  heroImage?: string;
}

// No events published yet — add real entries here once a webinar is created
// and published in Teams and its graphWebinarId is captured. Example shape:
//
// {
//   slug: "example-webinar",
//   title: "Example Webinar Title",
//   status: "upcoming",
//   startsAt: "2026-12-01T09:00:00+04:00",
//   timeLabel: "09:00 Dubai · 08:00 Cairo",
//   languageLabel: "Delivered in English",
//   graphWebinarId: "REPLACE_WITH_REAL_GRAPH_WEBINAR_ID",
//   description: ["..."],
// },
const events: EventItem[] = [];

export function getAllEvents(): EventItem[] {
  return events;
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function isUpcoming(event: EventItem): boolean {
  if (event.status === "cancelled") return false;
  if (event.status === "past") return false;
  return new Date(event.startsAt).getTime() >= Date.now();
}

export function getUpcomingEvents(): EventItem[] {
  return events
    .filter(isUpcoming)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export function getPastEvents(): EventItem[] {
  return events
    .filter((e) => !isUpcoming(e) && e.status !== "cancelled")
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
}
