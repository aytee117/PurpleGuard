// "Add to calendar" links + an ICS attachment for the registration
// confirmation email. Built from an event's own startsAt/endsAt (real UTC
// instants, see src/lib/events/index.ts) plus the registrant's personal
// Teams join link — no external calendar API involved, these are just
// pre-filled compose URLs (Google/Outlook) and a generated .ics file.

export interface CalendarEventInput {
  uid: string;
  title: string;
  startsAt: string; // ISO 8601 UTC instant
  endsAt: string; // ISO 8601 UTC instant
  description: string;
  joinWebUrl: string;
}

function toGoogleUtc(iso: string): string {
  return iso.replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarUrl(input: CalendarEventInput): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${toGoogleUtc(input.startsAt)}/${toGoogleUtc(input.endsAt)}`,
    details: `${input.description}\n\nJoin: ${input.joinWebUrl}`,
    location: input.joinWebUrl,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarUrl(input: CalendarEventInput): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: input.title,
    startdt: input.startsAt,
    enddt: input.endsAt,
    body: `${input.description}\n\nJoin: ${input.joinWebUrl}`,
    location: input.joinWebUrl,
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// RFC 5545 requires CRLF line endings and folding lines longer than 75
// octets — most clients tolerate a bit of slack, but join URLs are long
// enough (Graph's Teams meetup-join links routinely exceed 300 chars) that
// skipping this risks a client truncating or mis-parsing the field.
function foldIcsLine(line: string): string {
  const CHUNK = 74; // leave room for the leading space on continuation lines
  if (line.length <= CHUNK) return line;
  let result = line.slice(0, CHUNK);
  let rest = line.slice(CHUNK);
  while (rest.length > 0) {
    result += "\r\n " + rest.slice(0, CHUNK - 1);
    rest = rest.slice(CHUNK - 1);
  }
  return result;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function toIcsUtc(iso: string): string {
  return iso.replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildIcsContent(input: CalendarEventInput): string {
  const now = toIcsUtc(new Date().toISOString());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PurpleGuard//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.uid}@events.purpleguard.io`,
    `DTSTAMP:${now}`,
    `DTSTART:${toIcsUtc(input.startsAt)}`,
    `DTEND:${toIcsUtc(input.endsAt)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${escapeIcsText(`${input.description}\n\nJoin: ${input.joinWebUrl}`)}`,
    `LOCATION:${escapeIcsText(input.joinWebUrl)}`,
    `URL:${input.joinWebUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldIcsLine).join("\r\n") + "\r\n";
}
