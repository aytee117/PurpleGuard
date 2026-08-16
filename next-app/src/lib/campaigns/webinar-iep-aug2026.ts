import { CALENDLY_LINK } from "@/lib/services-data";

// AI Email Protection | Email Under Attack — Mon 31 Aug 2026.
// One typed data file per one-off campaign (mirrors src/lib/reports/), since
// a second campaign (September SASE/ZTNA) is already anticipated.

export const CAMPAIGN_SLUG = "iep-aug31";
export const LANDING_PATH = "/webinar";

// Where the /r/scan post-event conversion link goes — no UTMs appended,
// it's a booking link, not a campaign-tracked one.
export const SCAN_BOOKING_URL = CALENDLY_LINK;

interface ChannelConfig {
  source: string;
  medium: string;
}

// One slug per channel, not per post — per-post granularity is noise at this
// volume. `scan` is handled separately (see app/r/[slug]/route.ts) since it
// redirects to SCAN_BOOKING_URL instead of LANDING_PATH.
export const SLUGS: Record<string, ChannelConfig> = {
  e1: { source: "email", medium: "promo-1" },
  e2: { source: "email", medium: "promo-2" },
  e3: { source: "email", medium: "promo-3" },
  e4: { source: "email", medium: "promo-4" },
  lf: { source: "linkedin", medium: "founder-post" },
  lp: { source: "linkedin", medium: "page-post" },
  nl: { source: "linkedin", medium: "newsletter" },
  mhe: { source: "linkedin", medium: "mhe-repost" },
  ev: { source: "linkedin", medium: "event-page" },
  dm: { source: "sales", medium: "outreach" },
};

export const webinarIepAug2026 = {
  campaignSlug: CAMPAIGN_SLUG,
  title: "AI Email Protection | Email Under Attack",
  dateLabel: "Monday 31 August",
  timeLabel: "11:30 Cairo · 12:30 Dubai",
  durationLabel: "60 minutes",
  languageLabel: "Delivered in Arabic",
  registrationUrl: process.env.NEXT_PUBLIC_TEAMS_EVENT_URL ?? "",
  speaker: {
    name: "Mohamed Mowafy",
    title: "CEO & Co-founder, PurpleGuard",
    // Sourced from "Content and build plan/Mohamed Mowafy.png" (local-only,
    // not git-tracked) — copy into next-app/public/webinar/ before use.
    photo: "/webinar/mohamed-mowafy.png",
  },
  // Approved figures — Barracuda H1 2026 only. Do not mix in the 2025
  // report's 20% ATO figure; it contradicts the 34% below.
  threatFigures: [
    { value: "34%", label: "of organisations experience an account takeover every month" },
    { value: "+60%", label: "year-on-year growth in account takeover" },
    { value: "5 min", label: "for an attacker to escalate once they're inside" },
  ],
  takeaways: [
    "What happens to email after your gateway has already approved it",
    "Why account takeover grew 60% while gateways kept working correctly",
    "What post-delivery protection does that perimeter filtering cannot",
    "How this deploys alongside Microsoft 365 with no MX change",
  ],
  credibility: {
    barracudaPremierLogo: "/webinar/partners/barracuda-premier-badge.svg",
    barracudaMspLogo: "/webinar/partners/barracuda-msp-badge.svg",
    mheLogo: "/webinar/partners/mhe-logo.png",
    copy:
      "Barracuda Premier Partner and MSP Partner via MHE | NextGenIT, email defence since 2009.",
  },
  terms: {
    support: "Arabic-speaking L1/L2 engineers, 9am–3am, 7 days a week.",
    seats: "Monthly prorated seat adjustment, no lock-in.",
    secondaryLinkHref: "/services/managed-x/managed-email-security",
    secondaryLinkLabel: "Managed Email Security",
  },
} as const;
