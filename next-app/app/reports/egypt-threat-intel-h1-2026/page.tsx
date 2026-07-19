import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Noto_Sans_Egyptian_Hieroglyphs } from "next/font/google";
import { EgyptReportLanding } from "@/components/reports/EgyptReportLanding";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-plex-arabic",
  weight: ["400", "500", "600", "700"],
});

const hieroglyphs = Noto_Sans_Egyptian_Hieroglyphs({
  subsets: ["egyptian-hieroglyphs"],
  display: "swap",
  variable: "--font-hieroglyphs",
  weight: "400",
});

const OG = ogImageUrl({
  title: "Egypt Threat Intelligence Report — H1 2026",
  subtitle: "Ransomware, breaches, and threat-actor activity targeting Egypt, from PurpleGuard's SOC",
  category: "Threat Intelligence",
  color: "purple",
});

export const metadata: Metadata = {
  title: { absolute: "Egypt Threat Intelligence Report H1 2026 | PurpleGuard" },
  description:
    "Six months of ransomware, breaches, data leaks and threat-actor activity targeting Egyptian organizations, compiled and confirmed by PurpleGuard's 24/7 SOC. Free report, delivered by email.",
  alternates: { canonical: "https://www.purpleguard.io/reports/egypt-threat-intel-h1-2026" },
  openGraph: {
    title: "Egypt Threat Intelligence Report — H1 2026 | PurpleGuard",
    description: "Ransomware, breaches, data leaks and threat-actor activity targeting Egypt — from PurpleGuard's 24/7 SOC.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Egypt Threat Intelligence Report — H1 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Threat Intelligence Report — H1 2026 | PurpleGuard",
    description: "Ransomware, breaches, data leaks and threat-actor activity targeting Egypt — from PurpleGuard's 24/7 SOC.",
    images: [OG],
  },
};

export default function EgyptThreatIntelReportPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Egypt Threat Intelligence Report H1 2026", url: "/reports/egypt-threat-intel-h1-2026" },
  ]);

  return (
    <div className={`${plexArabic.variable} ${hieroglyphs.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EgyptReportLanding hieroglyphClassName="font-[family-name:var(--font-hieroglyphs)]" />
    </div>
  );
}
