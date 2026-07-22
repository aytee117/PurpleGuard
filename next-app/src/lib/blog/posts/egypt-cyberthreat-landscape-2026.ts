import type { BlogPost } from "../types";

const REPORT_URL = "/reports/egypt-threat-intel-h1-2026";
const BRIEFING_URL =
  "https://events.teams.microsoft.com/event/edf35b5b-f7ec-42cb-bf35-30f47123fcbd@5373d2ad-cd01-44cb-b751-6edb44d966ee";

export const egyptCyberthreatLandscape2026: BlogPost = {
  slug: "egypt-cyberthreat-landscape-2026",
  title: "The cyberthreat landscape for Egypt has taken a fast turn in 2026",
  dek: "For decades, Egyptian organizations felt safe with a basic cybersecurity posture. The first half of 2026 makes clear those days are over.",
  excerpt:
    "Egypt is now the #1 targeted country in Africa and #2 in MENA. PurpleGuard's SOC breaks down 92 confirmed incidents from H1 2026 and why the threat landscape has changed.",
  category: "Threat Intelligence",
  tags: ["Egypt", "Threat Intelligence", "Ransomware", "Data Breach", "Egypt Threat Watch"],
  regions: ["Egypt"],
  authorId: "purpleguard-soc",
  publishedAt: "2026-07-22",
  intro: [
    {
      type: "paragraph",
      content: [
        "For decades, data breaches and ransomware incidents were never a concern. Talk to most cybersecurity professionals who are responsible for an Egyptian entity's technology assets, and you would quickly realize that they felt safe with a basic cybersecurity posture.",
      ],
    },
    {
      type: "paragraph",
      content: [
        "What was the definition of baseline cybersecurity for most Egyptian entities? Probably a couple of firewalls and an antivirus solution.",
      ],
    },
  ],
  sections: [
    {
      id: "startup-acceleration",
      heading: "The Egyptian tech startup acceleration phase",
      blocks: [
        {
          type: "paragraph",
          content: [
            "However, between 2015 and 2020, a strong focus on the Egyptian technology landscape started to happen. The local and international communities started witnessing major shifts in digital transformation, internet adoption and technology literacy among the Egyptian people and business leaders alike.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Accelerated by milestones like Otlob's acquisition, Breadfast's funding, SWVL and Fawry's IPOs among other highlights; investors started taking an interest in Egypt's technology landscape.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Peak activity happened during the Corona Virus pandemic. Egypt's telecom infrastructure was put under a real stress test and survived gracefully. Proving to be the most robust in Africa, and among the niche players in the Middle East.",
          ],
        },
      ],
    },
    {
      id: "first-reported-attacks",
      heading: "First reported cyber-attacks on Egyptian organizations",
      blocks: [
        {
          type: "paragraph",
          content: [
            "With this energy, adversaries and cyber criminals started to pay attention to the value of data residing in cloud and web facing platforms. And the Egyptian community was shocked by the first ever recorded, publicized attack claimed to have targeted Fawry in 2023.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "The attack was followed by multiple others, targeting the healthcare sector, an automotive agent (GAC), as well as the electricity holding company. All financially motivated, all exposing personal data.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "At the time, cybersecurity professionals were still in denial, believing that these were individual incidents, not a systemic approach to target Egyptian organizations. But our team at PurpleGuard believed otherwise. And they are not to blame. No one has ever curated the threat landscape for Egypt only. We often saw reports produced by vendors or technology providers, but all were global reports. When and if any of the reports mentioned the MENA region, it wasn't more than a paragraph within a report of tens of pages.",
          ],
        },
      ],
    },
    {
      id: "purplesoc-cti",
      heading: "PurpleSOC's Cyber Threat Intelligence",
      blocks: [
        {
          type: "paragraph",
          content: [
            "We knew that such incidents could not go unnoticed. We started building our cyberthreat intelligence tool stack to gain early visibility onto attack intent and motivation, threat actors and compromised sectors. Our SOC team started collecting information, monitoring dark web forums and marketplaces, validating those findings, and accumulating the first ever Egypt-scoped cyber threat intelligence report.",
          ],
        },
      ],
    },
    {
      id: "the-preview",
      heading: "Egypt Threat Watch — The preview",
      blocks: [
        {
          type: "paragraph",
          content: [
            "We get it. Naming victims is never good for their business. But we are not naming them for the sake of public shaming. We feel deeply for the teams responsible, and we are ready to support with all remediation and protection tools at our disposal. But if we do not address the obvious situation where Egypt is starting to become a strong target for adversaries and cyber criminals, we will only see the number of victims increasing.",
          ],
        },
      ],
    },
    {
      id: "h1-2026-in-numbers",
      heading: "Egypt Threat Watch — H1 2026 in numbers",
      blocks: [
        {
          type: "paragraph",
          content: [
            "In the first half of 2026 alone, the recorded incidents are almost double those recorded in all of 2025. Confirming the speculations by PurpleGuard's SOC team, that Egypt is being an active target.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "The numbers also confirm that Egypt is now the #1 targeted country in Africa, and #2 in the MENA region behind Turkey.",
          ],
        },
        {
          type: "callout",
          content: [
            "92 confirmed incidents: 57 data breaches, 30 ransomware incidents among other attack types. With DDoS attacks accounting for 3% of the entire region.",
          ],
        },
      ],
    },
    {
      id: "the-strategic-report",
      heading: "Egypt Threat Watch — The strategic report",
      blocks: [
        {
          type: "paragraph",
          content: [
            "The report is being made available for download, for free, for the sake of intel sharing and posture hardening. We are giving cybersecurity professionals a bi-annual digest, with the intent of rising together as a community.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "You can find the download link for the report ",
            { text: "here", href: REPORT_URL },
            ".",
          ],
        },
      ],
    },
    {
      id: "sharing-and-caring",
      heading: "Egypt Threat Watch — Sharing and caring",
      blocks: [
        {
          type: "paragraph",
          content: [
            "We're sharing the full Egypt Threat Intelligence Report H1 2026 in two ways: a live SOC briefing on July 30, and the full written report shipping August 1. ",
            { text: "Register for the briefing through this link", href: BRIEFING_URL },
            ", or ",
            { text: "join the waitlist to get the report the moment it's ready", href: REPORT_URL },
            ".",
          ],
        },
      ],
    },
  ],
};
