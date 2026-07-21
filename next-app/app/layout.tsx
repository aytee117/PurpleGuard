import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-jetbrains",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/toaster";
import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/json-ld";

const OG_IMAGE = "/api/og?title=PurpleGuard%20MSSP&subtitle=Managed%20Security%20Services%20%E2%80%94%20UAE%2C%20Egypt%20%26%20KSA&category=MSSP&color=purple";

export const metadata: Metadata = {
  title: {
    default: "PurpleGuard — Managed Security Services UAE & Egypt | MSSP",
    template: "%s | PurpleGuard",
  },
  description:
    "PurpleGuard is a managed security services provider (MSSP) delivering 24/7 SOC, MDR, VAPT, and managed infrastructure for SMEs and mid-market organisations in UAE, Egypt, and KSA. Subscription-based. Compliance-ready.",
  metadataBase: new URL("https://www.purpleguard.io"),
  keywords: [
    "MSSP UAE", "managed security services Dubai", "cybersecurity Egypt", "SOC as a service",
    "managed EDR", "VAPT UAE", "ISO 27001 compliance", "MDR services", "PurpleGuard",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.purpleguard.io",
    siteName: "PurpleGuard",
    title: "PurpleGuard — Managed Security Services UAE & Egypt | MSSP",
    description:
      "24/7 SOC, MDR, VAPT, and managed infrastructure for SMEs in UAE, Egypt, and KSA. Subscription-based. Compliance-ready.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PurpleGuard — Managed Security Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PurpleGuard — Managed Security Services UAE & Egypt",
    description:
      "Subscription-based managed cybersecurity for SMEs in UAE, Egypt, and KSA.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const org = organizationJsonLd();
  const local = localBusinessJsonLd();
  const site = websiteJsonLd();

  return (
    <html lang="en" className={`${plexSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <Analytics />
        <Navigation />
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        {local.map((lb, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
        />
      </body>
    </html>
  );
}
