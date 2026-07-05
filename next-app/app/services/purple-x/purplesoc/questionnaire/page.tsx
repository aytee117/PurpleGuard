import type { Metadata } from "next";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";
import QuestionnaireClient from "./QuestionnaireClient";
import "./questionnaire.css";

const OG = ogImageUrl({
  title: "PurpleSOC Discovery Questionnaire",
  subtitle: "Size your SOC in 5 minutes — LDS, EPS, storage & pricing.",
  category: "PurpleSOC",
  color: "purple",
});

export const metadata: Metadata = {
  title: "PurpleSOC Discovery Questionnaire — Size Your SOC | PurpleGuard",
  description:
    "Interactive SOC sizing tool. Calculate your LDS, EPS, storage, and indicative monthly/annual pricing across all sites — Managed, Co-Managed, or Self-Managed.",
  alternates: {
    canonical:
      "https://www.purpleguard.io/services/purple-x/purplesoc/questionnaire",
  },
  openGraph: {
    title: "PurpleSOC Discovery Questionnaire — PurpleGuard",
    description:
      "Size your SOC in 5 minutes. LDS, EPS, storage, and indicative pricing.",
    url: "https://www.purpleguard.io/services/purple-x/purplesoc/questionnaire",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleSOC Discovery Questionnaire" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PurpleSOC Discovery Questionnaire — PurpleGuard",
    description: "Size your SOC in 5 minutes.",
    images: [OG],
  },
};

export default function QuestionnairePage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Purple X", url: "/services/purple-x" },
    { name: "PurpleSOC", url: "/services/purple-x/purplesoc" },
    {
      name: "Discovery Questionnaire",
      url: "/services/purple-x/purplesoc/questionnaire",
    },
  ]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=DM+Mono:wght@500&display=swap"
        rel="stylesheet"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <QuestionnaireClient />
    </>
  );
}
