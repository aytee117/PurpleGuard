import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";

// TEMP: standalone waitlist capture for the Egypt Threat Intel Report while
// the real PDF isn't ready yet. Saves signups to Supabase instead of the
// instant-download flow in /api/download-request. Delete this route (and
// src/lib/supabase.ts) once the report ships and ReportRequestForm.tsx is
// pointed back at /api/download-request — see project deliverables.md #3.
const REPORT_SLUG = "egypt-threat-intel-report-h1-2026";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: {
    email?: string;
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

  const { email, company, jobTitle, reportLang, consent, turnstileToken } = body;

  // Honeypot: real users never fill this hidden field. Silently "succeed" for bots.
  if (company) {
    return NextResponse.json({ success: true });
  }

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

  if (!jobTitle) {
    return NextResponse.json({ error: "Please enter your job title." }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("report_signups")
      .upsert(
        {
          report_slug: REPORT_SLUG,
          email,
          job_title: jobTitle,
          report_lang: reportLang === "ar" ? "ar" : "en",
          consent: !!consent,
        },
        { onConflict: "report_slug,email" }
      );
    if (error) throw error;
  } catch (error) {
    console.error("Failed to save report signup:", error);
    return NextResponse.json({ error: "We couldn't save your request. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
