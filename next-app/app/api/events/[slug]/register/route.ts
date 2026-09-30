import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getEventBySlug, isUpcoming } from "@/lib/events";
import { registerAttendeeAndResolveJoinUrl } from "@/lib/graph/webinar";
import { signEventRegistrationToken } from "@/lib/event-registration-token";

const TEAM_NOTIFICATION_EMAIL = "hello@purpleguard.io";
const FROM_ADDRESS = "PurpleGuard <hello@notification.purpleguard.io>";

const GENERIC_GRAPH_ERROR =
  "We couldn't complete your registration on Teams. Please try again, or contact hello@purpleguard.io.";

// `website` (not `company`) is the honeypot here — unlike every other form
// in this repo, this one has a genuine `company` field, so it can't double
// as the bait field.
const registerBodySchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  company: z.string().trim().max(200).optional(),
  jobTitle: z.string().trim().max(200).optional(),
  consent: z.boolean().optional().default(false),
  preferredLanguage: z.enum(["en-us", "ar-sa"]).optional().default("en-us"),
  preferredTimezone: z.string().trim().max(100).optional(),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(),
});

interface EventRegistrationRow {
  status: string;
  teams_status: string | null;
  teams_join_url: string | null;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: silently "succeed" for bots without doing any real work.
  if (typeof rawBody === "object" && rawBody !== null && "website" in rawBody && (rawBody as { website?: unknown }).website) {
    return NextResponse.json({ success: true });
  }

  const parsed = registerBodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }
  const body = parsed.data;

  const turnstileOk = await verifyTurnstileToken(body.turnstileToken, req.headers.get("x-forwarded-for"));
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const event = await getEventBySlug(slug);
  if (!event) {
    return NextResponse.json({ error: "Unknown event." }, { status: 404 });
  }
  if (!isUpcoming(event)) {
    return NextResponse.json({ error: "Registration for this event is closed." }, { status: 409 });
  }

  const email = body.email.trim().toLowerCase();
  const supabase = getSupabaseAdmin();

  // Idempotent resubmit: if already confirmed on Teams and not since
  // cancelled/rejected there, skip straight to returning the stored link
  // rather than risking a duplicate/rejected registration on the Teams side.
  const { data: existing } = await supabase
    .from("event_registrations")
    .select("status, teams_status, teams_join_url")
    .eq("event_slug", slug)
    .eq("email", email)
    .maybeSingle<EventRegistrationRow>();

  let joinWebUrl: string | null = null;

  const alreadyConfirmed =
    existing?.status === "confirmed" &&
    existing.teams_join_url &&
    existing.teams_status !== "cancelled" &&
    existing.teams_status !== "rejected";

  if (alreadyConfirmed) {
    joinWebUrl = existing!.teams_join_url;
  } else {
    const { error: upsertError } = await supabase.from("event_registrations").upsert(
      {
        event_slug: slug,
        email,
        first_name: body.firstName,
        last_name: body.lastName,
        company: body.company || null,
        job_title: body.jobTitle || null,
        consent: body.consent,
        status: "pending",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "event_slug,email" }
    );
    if (upsertError) {
      console.error("event_registrations upsert failed:", upsertError);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
    }

    const result = await registerAttendeeAndResolveJoinUrl({
      webinarId: event.graphWebinarId,
      firstName: body.firstName,
      lastName: body.lastName,
      email,
      preferredTimezone: body.preferredTimezone ?? "Asia/Dubai",
      preferredLanguage: body.preferredLanguage,
    });

    if (!result.ok) {
      console.error(`Graph registration failed for ${email} / ${slug} at stage ${result.stage}:`, result.message);
      await supabase
        .from("event_registrations")
        .update({
          status: result.stage === "register" ? "graph_failed" : "resolve_failed",
          error_message: result.message,
          updated_at: new Date().toISOString(),
        })
        .eq("event_slug", slug)
        .eq("email", email);
      return NextResponse.json({ error: GENERIC_GRAPH_ERROR }, { status: 502 });
    }

    joinWebUrl = result.joinWebUrl;

    const { error: registeredUpdateError } = await supabase
      .from("event_registrations")
      .update({
        status: "registered",
        graph_registration_id: result.registrationId,
        teams_join_url: result.joinWebUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("event_slug", slug)
      .eq("email", email);
    if (registeredUpdateError) {
      console.error("event_registrations post-Graph update failed:", registeredUpdateError);
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error: emailError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: TEAM_NOTIFICATION_EMAIL,
        subject: `You're registered: ${event.title}`,
        html: `
          <p>You're registered for <strong>${event.title}</strong> (${event.timeLabel}).</p>
          <p><a href="${joinWebUrl}">Click here to join on the day</a></p>
        `,
      });
      if (emailError) throw emailError;

      await supabase
        .from("event_registrations")
        .update({ status: "confirmed", updated_at: new Date().toISOString() })
        .eq("event_slug", slug)
        .eq("email", email);

      resend.emails
        .send({
          from: FROM_ADDRESS,
          to: TEAM_NOTIFICATION_EMAIL,
          subject: `New registration: ${email} for ${event.title}`,
          html: `<p><strong>${email}</strong> (${body.firstName} ${body.lastName}${body.company ? `, ${body.company}` : ""}) just registered for <strong>${event.title}</strong>.</p>`,
        })
        .catch((err) => console.error("Internal notification email failed:", err));
    } catch (err) {
      console.error("Confirmation email failed to send:", err);
      await supabase
        .from("event_registrations")
        .update({ status: "email_failed", error_message: err instanceof Error ? err.message : String(err), updated_at: new Date().toISOString() })
        .eq("event_slug", slug)
        .eq("email", email);
      // Registration on Teams already succeeded — do not fail the response,
      // the join URL below is still returned directly so the visitor isn't
      // stranded by an email-send failure.
    }
  }

  const response = NextResponse.json({ success: true, joinWebUrl });
  response.cookies.set(`pg_reg_${slug}`, signEventRegistrationToken(slug, email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/events/${slug}`,
    maxAge: 180 * 24 * 60 * 60,
  });
  return response;
}
