const BASE = "https://www.purpleguard.io";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PurpleGuard",
    url: BASE,
    logo: `${BASE}/logo.png`,
    description:
      "PurpleGuard is a managed security services provider (MSSP) delivering subscription-based cybersecurity for SMEs and mid-market organizations in UAE, Egypt, and KSA.",
    email: "hello@purpleguard.io",
    telephone: "+971585159666",
    sameAs: ["https://purpleguard.io"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971585159666",
        contactType: "sales",
        areaServed: ["AE", "EG", "SA"],
        availableLanguage: ["English", "Arabic"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE}#localbusiness-dubai`,
      name: "PurpleGuard — Dubai",
      url: BASE,
      image: `${BASE}/logo.png`,
      email: "hello@purpleguard.io",
      telephone: "+971585159666",
      description:
        "Managed security services provider (MSSP) in Dubai, UAE. 24/7 SOC, MDR, VAPT, and managed infrastructure for SMEs in UAE, Egypt, and Saudi Arabia.",
      priceRange: "$$",
      openingHours: "Mo-Su 00:00-24:00",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Managed Security Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleSOC — 24/7 Managed SOC" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleVAPT — Vulnerability Assessment & Penetration Testing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleSentinel — Managed Detection & Response" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed EDR" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed Firewall" } },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE}#localbusiness-cairo`,
      name: "PurpleGuard — Cairo",
      url: BASE,
      image: `${BASE}/logo.png`,
      email: "hello@purpleguard.io",
      telephone: "+971585159666",
      description:
        "Managed security services provider (MSSP) in Cairo, Egypt. 24/7 SOC, MDR, VAPT, and managed infrastructure aligned to EG-CERT, NTRA, and Egyptian Central Bank (CBE) requirements.",
      priceRange: "$$",
      openingHours: "Mo-Su 00:00-24:00",
      areaServed: [
        { "@type": "Country", name: "Egypt" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressRegion: "Cairo",
        addressCountry: "EG",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Managed Security Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleSOC — 24/7 Managed SOC" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleVAPT — Vulnerability Assessment & Penetration Testing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PurpleSentinel — Managed Detection & Response" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed EDR" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed Firewall" } },
        ],
      },
    },
  ];
}

export function serviceJsonLd({
  name,
  description,
  url,
  price,
  category,
}: {
  name: string;
  description: string;
  url: string;
  price?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE}${url}`,
    provider: {
      "@type": "Organization",
      name: "PurpleGuard",
      url: BASE,
    },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    ...(category ? { serviceType: category } : {}),
    ...(price ? { offers: { "@type": "Offer", price, priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", referenceQuantity: { "@type": "QuantitativeValue", unitText: "month" } } } } : {}),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  section,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  section?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${url}` },
    url: `${BASE}${url}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: authorName, url: BASE },
    publisher: {
      "@type": "Organization",
      name: "PurpleGuard",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    ...(section ? { articleSection: section } : {}),
    ...(image ? { image: [image.startsWith("http") ? image : `${BASE}${image}`] } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.url}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PurpleGuard",
    url: BASE,
    description: "Managed security services provider for SMEs in UAE, Egypt, and KSA.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/services?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function ogImageUrl(params: {
  title: string;
  subtitle?: string;
  category?: string;
  color?: string;
}) {
  const p = new URLSearchParams({
    title: params.title,
    subtitle: params.subtitle ?? "Managed Security Services — UAE, Egypt & KSA",
    category: params.category ?? "MSSP",
    color: params.color ?? "purple",
  });
  return `/api/og?${p.toString()}`;
}
