import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { CAMPAIGN_SLUG, LANDING_PATH, SCAN_BOOKING_URL, SLUGS } from "@/lib/campaigns/webinar-iep-aug2026";

const SITE = "https://www.purpleguard.io";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = SLUGS[slug];

  // `scan` is a post-event conversion link and goes straight to Calendly,
  // not the landing page — no UTMs appended, it isn't a campaign-tracked hop.
  const target = slug === "scan" ? new URL(SCAN_BOOKING_URL) : new URL(LANDING_PATH, SITE);

  if (cfg) {
    target.searchParams.set("utm_source", cfg.source);
    target.searchParams.set("utm_medium", cfg.medium);
    target.searchParams.set("utm_campaign", CAMPAIGN_SLUG);
    target.searchParams.set("utm_content", slug);
  }
  // An unknown slug still falls through to the bare landing page — never a
  // 404, since a typo in a sent email would otherwise dead-end a prospect.

  after(async () => {
    const supabase = getSupabaseAdmin();
    await supabase.from("link_clicks").insert({
      campaign_slug: CAMPAIGN_SLUG,
      slug,
      referrer: req.headers.get("referer"),
      user_agent: req.headers.get("user-agent"),
      country: req.headers.get("x-vercel-ip-country"),
    });
  });

  return NextResponse.redirect(target, 307);
}
