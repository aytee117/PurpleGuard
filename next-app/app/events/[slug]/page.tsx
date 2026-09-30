import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Globe, User } from "lucide-react";
import { getAllEvents, getEventBySlug, isUpcoming, type EventSpeaker } from "@/lib/events";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { EventHeroImage } from "@/components/events/EventHeroImage";
import { listWebinarPresenters } from "@/lib/graph/webinar";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const BASE = "https://www.purpleguard.io";

// Shorter than the original 3600s: since events are now auto-discovered
// live from Graph (not a static registry), this is the effective "how long
// until a newly published webinar shows up" window. Lower further if 5
// minutes is still too slow; each revalidation is one Graph API call.
export const revalidate = 300;

export async function generateStaticParams() {
  // Best-effort warm cache of currently-known slugs at build time — a slug
  // published after this still renders fine on first request (Next's
  // default dynamicParams behavior) and gets cached per `revalidate` above.
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const url = `/events/${event.slug}`;
  const plainTextExcerpt = event.descriptionHtml
    ?.replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const description = event.dek ?? event.description[0] ?? plainTextExcerpt ?? event.title;
  const og = ogImageUrl({ title: event.title, subtitle: event.timeLabel, category: "Event" });

  return {
    title: { absolute: `${event.title} | PurpleGuard Events` },
    description,
    alternates: { canonical: `${BASE}${url}` },
    openGraph: {
      type: "website",
      url: `${BASE}${url}`,
      title: event.title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: event.title }],
    },
  };
}

// Live-fetches presenters from the Teams event via Graph; falls back to the
// event's manually-entered `speaker` field if Graph isn't configured yet
// (expected during local dev / before the manual setup checklist is done)
// or the call fails or returns nothing. Never throws — a broken/unconfigured
// Graph integration should degrade gracefully, not break the page.
async function resolveSpeakers(event: {
  graphWebinarId: string;
  speaker?: EventSpeaker;
}): Promise<EventSpeaker[]> {
  try {
    const presenters = await listWebinarPresenters(event.graphWebinarId);
    if (presenters.length > 0) {
      return presenters.map((p) => ({
        name: p.displayName,
        title: [p.jobTitle, p.company].filter(Boolean).join(", "),
      }));
    }
  } catch {
    // Graph not configured yet, or the call failed — fall through to the
    // manual fallback below rather than breaking the page.
  }
  return event.speaker ? [event.speaker] : [];
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event);
  const speakers = await resolveSpeakers(event);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
    { name: event.title, url: `/events/${event.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="min-h-screen bg-background">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-16">
            <p className="pg-eyebrow mb-3 text-xs uppercase text-[#6633cc]">Event</p>
            <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{event.title}</h1>
            {event.dek && <p className="mt-4 max-w-2xl text-lg text-slate-600">{event.dek}</p>}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#6633cc]" />
                {new Date(event.startsAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#6633cc]" />
                {event.timeLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-[#6633cc]" />
                Delivered in Arabic
              </span>
            </div>
          </div>
        </header>

        {/* Same hero photo used on the Teams event, directly under the date/time/language row */}
        <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <EventHeroImage src={event.heroImage} alt={event.title} className="aspect-[21/9] w-full rounded-2xl" />
        </section>

        <section className="mx-auto grid max-w-4xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-16">
          <div className="flex flex-col gap-5">
            {event.descriptionHtml ? (
              <div
                className="prose prose-slate max-w-none text-[15px] leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700"
                dangerouslySetInnerHTML={{ __html: event.descriptionHtml }}
              />
            ) : (
              event.description.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))
            )}

            {event.takeaways && event.takeaways.length > 0 && (
              <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">You&apos;ll learn</h2>
                <ul className="flex flex-col gap-3">
                  {event.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6633cc]" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {speakers.length > 0 && (
              <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Presenter</h2>
                <div className="flex flex-col gap-4">
                  {speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eefc] text-[#6633cc]">
                        <User className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{speaker.name}</p>
                        {speaker.title && <p className="text-sm text-slate-600">{speaker.title}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {upcoming ? (
              <EventRegistrationForm eventSlug={event.slug} eventTitle={event.title} />
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">This event has concluded.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
