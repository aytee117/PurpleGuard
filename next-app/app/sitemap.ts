import type { MetadataRoute } from "next";

const BASE = "https://www.purpleguard.io";
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },

    {
      url: `${BASE}/services`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/services/purple-x`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/services/managed-x`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/solutions`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    {
      url: `${BASE}/services/purple-x/purplevapt`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purplesoc`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purplesentinel`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purplesentry`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purplestrike`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purpleconfig`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/purple-x/purplereveal`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE}/services/managed-x/managed-endpoint`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-edr`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-firewall`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-waf`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-email-security`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-backup-bcdr`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-identity`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/managed-x/managed-sase-ztna`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE}/solutions/compliance-audit-readiness`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/solutions/ransomware-defense`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/solutions/cloud-saas-security`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/solutions/external-attack-surface-management`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/solutions/zero-trust-secure-remote-access`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE}/pricing`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/blog`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
