import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createDownloadToken } from "@/lib/download-token";
import { GATED_DOCUMENTS } from "@/lib/gated-documents";
import { verifyTurnstileToken } from "@/lib/turnstile";

const TEAM_NOTIFICATION_EMAIL = "hello@purpleguard.io";
// Sent from a dedicated subdomain so Resend's SPF/DKIM never touch the
// MS365 mail setup already on the bare purpleguard.io domain. Replies still
// land in the real inbox via replyTo below.
const FROM_ADDRESS = "PurpleGuard <hello@notification.purpleguard.io>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Documents that expect a `reportLang` field and resolve their slug as
// `${baseDocumentSlug}-${reportLang}` instead of trusting a raw slug from
// the client. Keeps the language choice server-authoritative.
const LANGUAGE_VARIANT_DOCUMENTS = new Set(["egypt-threat-intel-report-h1-2026"]);

export async function POST(req: NextRequest) {
  let body: {
    email?: string;
    documentSlug?: string;
    company?: string;
    jobTitle?: string;
    reportLang?: "en" | "ar";
    consent?: boolean;
    turnstileToken?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, documentSlug, company, jobTitle, reportLang, consent, turnstileToken } = body;

  // Honeypot: real users never fill this hidden field. Silently "succeed" for bots.
  if (company) {
    return NextResponse.json({ success: true });
  }

  // Required on every request through this shared endpoint, including the dormant
  // GatedDownloadCTA flow — if that's reactivated, it needs a Turnstile widget too.
  if (!turnstileToken) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }
  const turnstileOk = await verifyTurnstileToken(turnstileToken, req.headers.get("x-forwarded-for"));
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!documentSlug) {
    return NextResponse.json({ error: "Unknown document." }, { status: 400 });
  }

  // For language-variant documents, resolve the slug server-side from
  // reportLang rather than trusting a raw slug the client could tamper with.
  const resolvedSlug = LANGUAGE_VARIANT_DOCUMENTS.has(documentSlug)
    ? `${documentSlug}-${reportLang === "ar" ? "ar" : "en"}`
    : documentSlug;

  const doc = GATED_DOCUMENTS[resolvedSlug];
  if (!doc) {
    return NextResponse.json({ error: "Unknown document." }, { status: 400 });
  }

  if (LANGUAGE_VARIANT_DOCUMENTS.has(documentSlug) && !jobTitle) {
    return NextResponse.json({ error: "Please enter your job title." }, { status: 400 });
  }

  const token = createDownloadToken(resolvedSlug);
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

    const notificationDetails = [
      `<p><strong>${email}</strong> just requested the <strong>${doc.displayName}</strong>.</p>`,
      jobTitle ? `<p>Job title: ${jobTitle}</p>` : "",
      reportLang ? `<p>Report language: ${reportLang === "ar" ? "Arabic" : "English"}</p>` : "",
      `<p>Marketing updates opt-in: ${consent ? "Yes" : "No"}</p>`,
    ].join("");

    const { error: notificationError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_NOTIFICATION_EMAIL,
      subject: `New lead: ${email} requested ${doc.displayName}`,
      html: notificationDetails,
    });
    if (notificationError) throw notificationError;
  } catch (error) {
    console.error("Failed to send download email:", error);
    return NextResponse.json({ error: "We couldn't send that email. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
