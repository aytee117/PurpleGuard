// Fill-in-the-blanks content for the Egypt Threat Intel Report H1 2026 landing page
// (next-app/app/reports/egypt-threat-intel-h1-2026). Everything in this file is real-world
// report data that changes per edition — as opposed to the surrounding page copy (headlines,
// section intros, disclaimer text) in EgyptReportLanding.tsx, which is fixed editorial content
// and doesn't need SOC/marketing sign-off to change.
//
// See "project deliverables.md" #3 for the checklist this file exists to close out. Every
// TODO below is a blocker for taking the page live — search this file for "TODO(content)".

export interface VulnerabilityStats {
  /** In thousands, e.g. 41 renders as "41K" */
  totalK: number;
  /** In thousands, e.g. 12.1 renders as "12.1K" */
  criticalK: number;
  /** Raw count, renders with locale thousands separators */
  exploited: number;
}

export interface AffectedBrand {
  name: string;
  /** Path under /public/reports/egypt-h1-2026/ */
  logo: string;
}

export interface RegionalRanking {
  africaRank: number;
  menaRank: number;
  menaBehind: { en: string; ar: string };
}

export interface VictimsBreakdownItem {
  count: number;
  /** Matches the conic-gradient wedge color in VictimsDonut */
  color: string;
  en: string;
  ar: string;
}

export interface VictimsDonut {
  total: number;
  breakdown: VictimsBreakdownItem[];
}

export interface ThreatActorProfile {
  /** Group name — rendered as-is in both languages */
  name: string;
  /** Used in the terminal card's "$ threat --profile <slug>" prompt line */
  slug: string;
  /** Local asset path under /public/reports/egypt-h1-2026/ */
  avatar: string;
  /** 2-3 letter fallback shown wherever the avatar is rendered small (e.g. victim-group headers) */
  initials: string;
  /** "danger" = ransomware-style groups (red badge), "brand" = everything else (purple badge) */
  tone: "brand" | "danger";
  level: "safe" | "low" | "medium" | "high" | "critical";
  /** Language-agnostic terminal footer fields (dates/origins stay in EN format in both langs, matching source design) */
  firstSeen: string;
  origin: string;
  en: { badge: string; description: string; tags: string[] };
  /** Arabic cards intentionally omit the technique tag pills — matches the source design */
  ar: { badge: string; description: string };
}

export interface EgyptianVictim {
  name: string;
  /** Local asset path under /public/reports/egypt-h1-2026/, if a real logo exists */
  logo?: string;
  /** Domain to resolve via Google's favicon service, if no local logo exists */
  faviconDomain?: string;
  /** 2-3 letter fallback badge if neither logo nor faviconDomain is set */
  initials?: string;
  /** Override the logo tile's white background — matches the source design for a couple of dark-on-transparent logos */
  bg?: string;
  /** "cover" for the few source logos that are photos/screenshots rather than clean vector marks; default "contain" */
  fit?: "contain" | "cover";
}

export interface EgyptianVictimGroup {
  actorSlug: string;
  actorName: string;
  /** Local asset path under /public/reports/egypt-h1-2026/ — same photo as the actor's terminal card */
  actorAvatar: string;
  actorInitials: string;
  victims: EgyptianVictim[];
}

export interface ReportStat {
  /** e.g. "42" or "1.8M" — keep it short, it's rendered at display-tile size */
  value: string;
  en: { label: string; hint: string };
  ar: { label: string; hint: string };
}

export interface EgyptReportData {
  /**
   * Shown in the form's success-state copy ("...or write to {contactEmail}") and used as the
   * Resend replyTo / internal lead-notification target in app/api/download-request/route.ts.
   */
  contactEmail: string;
  /**
   * Must exactly match the filename of the PDF placed in next-app/private-documents/ —
   * see src/lib/gated-documents.ts, which imports this. Casing matters on Vercel's Linux
   * runtime even though local Windows dev won't catch a mismatch (see CLAUDE.md gotchas).
   */
  documentFilename: { en: string; ar: string };
  vulnerabilityStats: VulnerabilityStats;
  affectedBrands: AffectedBrand[];
  regionalRanking: RegionalRanking;
  victimsDonut: VictimsDonut;
  /** Exactly 3 — rendered as a 3-up terminal-style card grid. */
  threatActors: ThreatActorProfile[];
  /** One group per threat actor above, in the same order. */
  egyptianVictims: EgyptianVictimGroup[];
}

export const egyptThreatIntelH1_2026: EgyptReportData = {
  // TODO(content): confirm this is a real, monitored inbox before launch — or revert to
  // hello@purpleguard.io. See "project deliverables.md" #3.
  contactEmail: "hello@purpleguard.io",

  // TODO(content): placeholder filenames — no PDF has been supplied yet. The download route
  // will 404 until matching files exist in private-documents/.
  documentFilename: {
    en: "PurpleGuard - Egypt Threat Intel Report H1 2026 (EN).pdf",
    ar: "PurpleGuard - Egypt Threat Intel Report H1 2026 (AR).pdf",
  },

  vulnerabilityStats: {
    totalK: 41,
    criticalK: 12.1,
    exploited: 295,
  },

  affectedBrands: [
    { name: "Microsoft", logo: "/reports/egypt-h1-2026/microsoft.svg" },
    { name: "Oracle", logo: "/reports/egypt-h1-2026/oracle.svg" },
    { name: "Splunk", logo: "/reports/egypt-h1-2026/splunk-full.svg" },
    { name: "Cisco", logo: "/reports/egypt-h1-2026/cisco.svg" },
    { name: "Palo Alto Networks", logo: "/reports/egypt-h1-2026/paloalto-full.svg" },
    { name: "Fortinet", logo: "/reports/egypt-h1-2026/fortinet-full.svg" },
    { name: "cPanel", logo: "/reports/egypt-h1-2026/cpanel-full.svg" },
  ],

  regionalRanking: {
    africaRank: 1,
    menaRank: 2,
    menaBehind: { en: "Turkey", ar: "تركيا" },
  },

  victimsDonut: {
    total: 92,
    breakdown: [
      { count: 57, color: "#E0484D", en: "Data Breach", ar: "اختراق بيانات" },
      { count: 30, color: "#6633CC", en: "Ransomware", ar: "فدية" },
      { count: 2, color: "#D99423", en: "Defacement", ar: "تشويه المواقع" },
      { count: 1, color: "#3E7BFA", en: "Coordinated cyber campaign", ar: "حملة سيبرانية منسّقة" },
      { count: 1, color: "#1F9D6B", en: "DDoS", ar: "هجوم حرمان خدمة (DDoS)" },
      { count: 1, color: "#9A96A8", en: "Unauthenticated Access", ar: "وصول غير مصرّح به" },
    ],
  },

  threatActors: [
    {
      name: "The Gentlemen",
      slug: "the-gentlemen",
      avatar: "/reports/egypt-h1-2026/actor-the-gentlemen.jpg",
      initials: "TG",
      tone: "danger",
      level: "high",
      firstSeen: "17-Jul-25",
      origin: "Russia",
      en: {
        badge: "Ransomware · RaaS",
        description:
          "Russian-speaking RaaS operation, also tracked by Microsoft as Storm-2697. Runs an aggressive 90/10 affiliate split, the GentleKiller EDR-killer suite and a Go-based encryptor, with double extortion via BreachForums-recruited affiliates.",
        tags: ["Double extortion", "EDR killer"],
      },
      ar: {
        badge: "فدية · RaaS",
        description:
          "عملية فدية-كخدمة ناطقة بالروسية، تتبعها Microsoft أيضًا باسم Storm-2697. تعتمد نموذج شراكة عدواني بنسبة 90/10 وحزمة GentleKiller لتعطيل الحماية، مع ابتزاز مزدوج عبر شركاء يُجنَّدون من BreachForums.",
      },
    },
    {
      name: "NightSpire",
      slug: "nightspire",
      avatar: "/reports/egypt-h1-2026/actor-nightspire.jpg",
      initials: "NS",
      tone: "danger",
      level: "high",
      firstSeen: "1-Feb-25",
      origin: "South Korea",
      en: {
        badge: "Ransomware",
        description:
          "Likely a rebrand of the Rbfs operation. Escalated quickly from data theft to double extortion, imposing ransom deadlines as short as 48 hours and encrypting OneDrive files without changing icons to delay detection.",
        tags: ["Double extortion", "Short deadlines"],
      },
      ar: {
        badge: "فدية",
        description:
          "على الأرجح إعادة تسمية لعملية Rbfs. تصاعدت سريعًا من سرقة البيانات إلى الابتزاز المزدوج، مع مهلات فدية تصل إلى 48 ساعة وتشفير ملفات OneDrive دون تغيير أيقوناتها لتأخير الاكتشاف.",
      },
    },
    {
      name: "Payload",
      slug: "payload",
      avatar: "/reports/egypt-h1-2026/actor-payload.jpg",
      initials: "PL",
      tone: "danger",
      level: "high",
      firstSeen: "15-Feb-26",
      origin: "unknown",
      en: {
        badge: "Ransomware",
        description:
          "Fast-growing group with a global footprint, using Babuk-derived source code. Exploits critical vulnerabilities in widely-used enterprise software for initial access, then threatens to publish stolen files on Tor leak sites.",
        tags: ["Double extortion", "Babuk-derived"],
      },
      ar: {
        badge: "فدية",
        description:
          "مجموعة سريعة النمو ذات حضور عالمي، تستخدم شيفرة مصدرية مشتقة من Babuk. تستغل ثغرات حرجة في برمجيات مؤسسية شائعة للوصول الأولي، ثم تهدد بنشر الملفات المسروقة على مواقع Tor.",
      },
    },
  ],

  egyptianVictims: [
    {
      actorSlug: "the-gentlemen",
      actorName: "The Gentlemen",
      actorAvatar: "/reports/egypt-h1-2026/actor-the-gentlemen.jpg",
      actorInitials: "TG",
      victims: [
        { name: "Ebny Development", faviconDomain: "ebny.com.eg" },
        { name: "Misr Chemical Industries", logo: "/reports/egypt-h1-2026/victim-mci.png" },
        { name: "EEC Group", logo: "/reports/egypt-h1-2026/victim-eec.png" },
        { name: "ACE Consulting Engineers", logo: "/reports/egypt-h1-2026/victim-ace.png", fit: "cover" },
        { name: "Nile Air", logo: "/reports/egypt-h1-2026/victim-nileair.png", bg: "#0b1d3a", fit: "cover" },
        { name: "Smart Glass", faviconDomain: "smartglassegypt.com" },
        { name: "Bouri Group", logo: "/reports/egypt-h1-2026/victim-bouri.png" },
      ],
    },
    {
      actorSlug: "nightspire",
      actorName: "NightSpire",
      actorAvatar: "/reports/egypt-h1-2026/actor-nightspire.jpg",
      actorInitials: "NS",
      victims: [
        { name: "Sheraton Miramar Resort El Gouna", logo: "/reports/egypt-h1-2026/victim-sheraton.svg" },
        { name: "basatamfi", initials: "BA" },
        { name: "Papa John's Egypt", logo: "/reports/egypt-h1-2026/victim-papajohns.svg" },
        { name: "Rawaj Consumer Finance", logo: "/reports/egypt-h1-2026/victim-rawaj.png" },
        { name: "LAMAICA", faviconDomain: "lamaica.com" },
        { name: "Future Association for Microfinance", initials: "FA" },
        { name: "INI Investments", logo: "/reports/egypt-h1-2026/victim-ini.png" },
        { name: "MISR AL MAHABA HOSPITAL", faviconDomain: "care4needycopts.org" },
      ],
    },
    {
      actorSlug: "payload",
      actorName: "Payload",
      actorAvatar: "/reports/egypt-h1-2026/actor-payload.jpg",
      actorInitials: "PL",
      victims: [
        { name: "Oriental Weavers", faviconDomain: "orientalweavers.com" },
        { name: "United Finance Egypt", faviconDomain: "uf-eg.com" },
        { name: "SODIC", logo: "/reports/egypt-h1-2026/victim-sodic.png" },
        { name: "Grid Fine Finishes", logo: "/reports/egypt-h1-2026/victim-grid.png" },
        { name: "El Wastani Petroleum Company", logo: "/reports/egypt-h1-2026/victim-wastani.png" },
        { name: "Better House Development", logo: "/reports/egypt-h1-2026/victim-betterhouse.png", bg: "#000", fit: "cover" },
        { name: "Sayegh 1944", logo: "/reports/egypt-h1-2026/victim-sayegh.png" },
      ],
    },
  ],
};
