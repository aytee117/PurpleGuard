// Registrant-facing confirmation email template for webinar registrations —
// kept separate from any other Resend email in this repo (e.g. the report
// download-request emails) since it has its own fixed copy + calendar
// attachments. Variables (event name, date, time, join link) are
// interpolated directly into the template at send time rather than via a
// dashboard-based template engine, consistent with how every other
// Resend-sending route in this repo builds its HTML in code.

import type { EventItem } from "@/lib/events";
import { buildGoogleCalendarUrl, buildIcsContent, buildOutlookCalendarUrl } from "@/lib/events/calendar";

export interface RegistrationEmailContent {
  subject: string;
  html: string;
  text: string;
  icsFilename: string;
  icsContentBase64: string;
}

export function buildRegistrationConfirmationEmail(event: EventItem, joinWebUrl: string): RegistrationEmailContent {
  const calendarInput = {
    uid: event.slug,
    title: event.title,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    description: `You're registered for ${event.title}.`,
    joinWebUrl,
  };

  const googleUrl = buildGoogleCalendarUrl(calendarInput);
  const outlookUrl = buildOutlookCalendarUrl(calendarInput);
  const icsContent = buildIcsContent(calendarInput);

  const subject = `You are registered for ${event.title}`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #131120;">
      <p style="font-size: 16px; line-height: 1.5;">Thank you for registering for <strong>${event.title}</strong>.</p>

      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f6f4fa; border-radius: 12px;">
        <tr>
          <td style="padding: 16px 20px; font-size: 14px; line-height: 1.8;">
            <strong>Date:</strong> ${event.dateLabel}<br>
            <strong>Time:</strong> ${event.timeLabel}
          </td>
        </tr>
      </table>

      <p style="font-size: 14px; line-height: 1.5;">
        <a href="${joinWebUrl}" style="display: inline-block; background: #6633cc; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold;">Click here to join on the day</a>
      </p>

      <p style="font-size: 13px; color: #4b4763;">You will receive a reminder before the webinar starts.</p>

      <p style="font-size: 13px; color: #4b4763; margin-top: 24px;">
        Add to calendar:
        <a href="${googleUrl}" style="color: #6633cc;">Google Calendar</a> ·
        <a href="${outlookUrl}" style="color: #6633cc;">Outlook</a> ·
        <span>iCal (see attached file)</span>
      </p>
    </div>
  `.trim();

  const text = [
    `Thank you for registering for ${event.title}`,
    "",
    `Date: ${event.dateLabel}`,
    `Time: ${event.timeLabel}`,
    "",
    `Join on the day: ${joinWebUrl}`,
    "",
    "You will receive a reminder before the webinar starts.",
    "",
    "Add to calendar:",
    `Google Calendar: ${googleUrl}`,
    `Outlook: ${outlookUrl}`,
    "iCal: see attached file",
  ].join("\n");

  return {
    subject,
    html,
    text,
    icsFilename: `${event.slug}.ics`,
    icsContentBase64: Buffer.from(icsContent, "utf-8").toString("base64"),
  };
}
