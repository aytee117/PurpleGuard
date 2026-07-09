import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createDownloadToken } from "@/lib/download-token";
import { GATED_DOCUMENTS } from "@/lib/gated-documents";

const TEAM_NOTIFICATION_EMAIL = "hello@purpleguard.io";
// Sent from a dedicated subdomain so Resend's SPF/DKIM never touch the
// MS365 mail setup already on the bare purpleguard.io domain. Replies still
// land in the real inbox via replyTo below.
const FROM_ADDRESS = "PurpleGuard <hello@notification.purpleguard.io>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; documentSlug?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, documentSlug, company } = body;

  // Honeypot: real users never fill this hidden field. Silently "succeed" for bots.
  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const doc = documentSlug ? GATED_DOCUMENTS[documentSlug] : undefined;
  if (!doc) {
    return NextResponse.json({ error: "Unknown document." }, { status: 400 });
  }

  const token = createDownloadToken(documentSlug!);
  const downloadUrl = `${req.nextUrl.origin}/api/documents/download?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error: requesterError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: TEAM_NOTIFICATION_EMAIL,
      subject: `Your ${doc.displayName} from PurpleGuard`,
      html: `
        <p>Thanks for your interest in PurpleGuard.</p>
        <p><a href="${downloadUrl}">Click here to download the ${doc.displayName}</a></p>
        <p>This link expires in 48 hours.</p>
      `,
    });
    if (requesterError) throw requesterError;

    const { error: notificationError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_NOTIFICATION_EMAIL,
      subject: `New lead: ${email} requested ${doc.displayName}`,
      html: `<p><strong>${email}</strong> just requested the <strong>${doc.displayName}</strong>.</p>`,
    });
    if (notificationError) throw notificationError;
  } catch (error) {
    console.error("Failed to send download email:", error);
    return NextResponse.json({ error: "We couldn't send that email. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
