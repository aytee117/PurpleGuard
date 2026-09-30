import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { EventHeroImage } from "./EventHeroImage";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6633cc]/30 hover:shadow-md">
      <EventHeroImage alt={event.title} className="aspect-video w-full" />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 w-fit rounded-full border border-[#6633cc]/20 bg-[#f3eefc] px-3 py-1 text-xs font-medium text-[#6633cc]">
          Delivered in Arabic
        </span>

        <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900">
          <Link href={`/events/${event.slug}`} className="transition-colors group-hover:text-[#6633cc]">
            <span className="absolute inset-0" aria-hidden="true" />
            {event.title}
          </Link>
        </h3>

        {event.dek && <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{event.dek}</p>}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(event.startsAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {event.timeLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
