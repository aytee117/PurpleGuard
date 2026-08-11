import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { CAMPAIGN_SLUG } from "@/lib/campaigns/webinar-iep-aug2026";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; company?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, company, slug } = body;

  // Honeypot: real visitors never fill this hidden field. Silently "succeed" for bots.
  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("recording_requests")
      .upsert(
        { campaign_slug: CAMPAIGN_SLUG, email, source_slug: slug ?? null },
        { onConflict: "campaign_slug,email" }
      );
    if (error) throw error;
  } catch (error) {
    console.error("Failed to save recording request:", error);
    return NextResponse.json({ error: "We couldn't save your request. Please try again shortly." }, { status: 502 });
  }

  // Always 200 for a valid submission — never reveal whether an address already exists.
  return NextResponse.json({ success: true });
}
