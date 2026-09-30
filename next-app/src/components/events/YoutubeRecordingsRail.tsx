import { PlayCircle } from "lucide-react";
import { webinarRecordings, WEBINARS_PLAYLIST_URL } from "@/lib/youtube-videos";

// No-API-key thumbnail convention (i.ytimg.com serves this for any public
// video without auth) — avoids needing a YouTube Data API key for a simple
// thumbnail rail.
function thumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function YoutubeRecordingsRail() {
  if (webinarRecordings.length === 0) return null;

  return (
    <aside className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Past webinar recordings</h2>
      <div className="flex flex-col gap-3">
        {webinarRecordings.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}&list=PLQOl777PBRPI`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6633cc]/30 hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element -- external, unoptimizable thumbnail */}
              <img
                src={thumbnailUrl(video.videoId)}
                alt={video.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <PlayCircle className="h-9 w-9 text-white" />
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium leading-snug text-slate-900 group-hover:text-[#6633cc]">
                {video.title}
              </p>
            </div>
          </a>
        ))}
      </div>
      <a
        href={WEBINARS_PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-sm font-medium text-[#6633cc] hover:underline"
      >
        View full playlist →
      </a>
    </aside>
  );
}
