// Manually maintained registry of webinar recordings on PurpleGuard's
// YouTube channel — same "curated data file" convention as events/reports/
// campaigns in this repo, rather than a live YouTube Data API pull (avoids
// a new API key/env var for what's currently a single-digit list, updated
// by hand as new recordings go up). Revisit as a live API integration if
// the volume ever makes manual upkeep a real burden.

export interface YoutubeVideo {
  videoId: string;
  title: string;
}

// Playlist link as given — kept verbatim rather than reconstructed.
export const WEBINARS_PLAYLIST_URL = "https://www.youtube.com/watch?v=C7OWRgUR2gU&list=PLQOl777PBRPI";

export const webinarRecordings: YoutubeVideo[] = [
  { videoId: "C7OWRgUR2gU", title: "AI Email Protection Webinar" },
];
