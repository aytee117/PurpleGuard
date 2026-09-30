import { NextRequest, NextResponse } from "next/server";
import { verifyEventRegistrationToken } from "@/lib/event-registration-token";
import { getSupabaseAdmin } from "@/lib/supabase";

// Split out of app/events/[slug]/page.tsx: that page is ISR-cached
// (revalidate) and shares one HTML output across every visitor, so it can't
// also read a per-visitor cookie in the same render — Next.js rejects the
// combination (cookies() is a "dynamic" API, incompatible with a page-level
// revalidate). This route is a normal Route Handler, inherently per-request,
// so it's the right place for the cookie check instead. Called client-side
// on mount by EventRegistrationForm.
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = req.cookies.get(`pg_reg_${slug}`)?.value;
  if (!token) return NextResponse.json({ registered: false });

  const verified = verifyEventRegistrationToken(token, slug);
  if (!verified) return NextResponse.json({ registered: false });

  const { data } = await getSupabaseAdmin()
    .from("event_registrations")
    .select("status, teams_status, teams_join_url")
    .eq("event_slug", slug)
    .eq("email", verified.email)
    .maybeSingle<{ status: string; teams_status: string | null; teams_join_url: string | null }>();

  if (!data || data.status !== "confirmed" || !data.teams_join_url) {
    return NextResponse.json({ registered: false });
  }

  const cancelled = data.teams_status === "cancelled" || data.teams_status === "rejected";
  return NextResponse.json({ registered: true, joinWebUrl: data.teams_join_url, cancelled });
}
