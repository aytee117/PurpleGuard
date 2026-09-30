import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { YoutubeRecordingsRail } from "@/components/events/YoutubeRecordingsRail";
import { breadcrumbJsonLd } from "@/lib/json-ld";

// Shorter than the original 3600s — events are now auto-discovered live
// from Graph, so this is the "how long until a newly published webinar
// shows up" window. Lower further if 5 minutes is still too slow.
export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Upcoming Events & Webinars | PurpleGuard" },
  description:
    "Live webinars and briefings from PurpleGuard — register in a couple of clicks, no Microsoft account needed.",
  alternates: { canonical: "https://www.purpleguard.io/events" },
  openGraph: {
    title: "Upcoming Events & Webinars | PurpleGuard",
    description:
      "Live webinars and briefings from PurpleGuard — register in a couple of clicks, no Microsoft account needed.",
    url: "https://www.purpleguard.io/events",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Events", url: "/events" },
]);

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="min-h-screen bg-background">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <p className="pg-eyebrow mb-3 text-xs uppercase text-[#6633cc]">Events</p>
            <h1 className="max-w-3xl text-4xl font-bold text-slate-900 lg:text-5xl">Upcoming events</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Live webinars and briefings from the PurpleGuard team. Register right here — your join link lands
              in your inbox.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              {events.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {events.map((event) => (
                    <EventCard key={event.slug} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No upcoming events right now — check back soon.</p>
              )}
            </div>

            <YoutubeRecordingsRail />
          </div>
        </section>
      </main>
    </>
  );
}
