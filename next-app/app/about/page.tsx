import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Building2, Cpu, FileCheck, Handshake, Calendar, Mail, Phone,
  MapPin, ChevronRight, Target, Eye, Radar, Zap, Lock, Globe, Server,
  KeyRound, Cloud, Stethoscope, Landmark, Code, Briefcase, Factory,
  CheckCircle,
} from "lucide-react";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";
const EMAIL = "hello@purpleguard.io";
const PHONE_DISPLAY = "+971 58 515 9666";
const PHONE_TEL = "+971585159666";

const OG = ogImageUrl({
  title: "About PurpleGuard",
  subtitle: "Smarter Security. Stronger Defense. — MSSP for SMEs in UAE, Egypt & KSA",
  category: "About",
  color: "purple",
});

export const metadata: Metadata = {
  title: "About PurpleGuard — MSSP for SMEs in UAE, Egypt & KSA",
  description:
    "PurpleGuard is a managed security services provider (MSSP) built for SMEs and mid-market organizations across UAE, Egypt, and Saudi Arabia. Subscription-based, compliance-ready cybersecurity.",
  keywords: [
    "About PurpleGuard", "MSSP company UAE", "cybersecurity company Egypt",
    "managed security provider Saudi Arabia", "SME cybersecurity MSSP",
  ],
  alternates: { canonical: "https://www.purpleguard.io/about" },
  openGraph: {
    title: "About PurpleGuard — Smarter Security. Stronger Defense.",
    description:
      "Subscription-based managed cybersecurity for SMEs and mid-market organizations across UAE, Egypt, and KSA.",
    url: "https://www.purpleguard.io/about",
    images: [{ url: OG, width: 1200, height: 630, alt: "About PurpleGuard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PurpleGuard — MSSP UAE, Egypt & KSA",
    description: "Subscription-based managed cybersecurity for SMEs.",
    images: [OG],
  },
};

const differentiators = [
  {
    title: "Built for SMEs",
    description:
      "No enterprise bloat. Predictable monthly pricing with service tiers designed around how SMEs actually operate.",
    icon: Building2,
  },
  {
    title: "Automation-Driven",
    description:
      "SOAR, continuous telemetry correlation, and automated validation to reduce noise and respond faster.",
    icon: Cpu,
  },
  {
    title: "Compliance-Ready",
    description:
      "Structured around CIS, NIST, ISO, MITRE ATT&CK, NCA, SAMA, TDRA, EG-CERT, and CBE. Audit-friendly reporting built in.",
    icon: FileCheck,
  },
  {
    title: "Single Partner Model",
    description:
      "One MSSP. Full security lifecycle. No tool sprawl, no vendor finger-pointing.",
    icon: Handshake,
  },
];

const purpleX = [
  { name: "PurpleVAPT", icon: Target, href: "/services/purple-x/purplevapt" },
  { name: "PurpleSOC", icon: Eye, href: "/services/purple-x/purplesoc" },
  { name: "PurpleSentinel (MDR)", icon: Shield, href: "/services/purple-x/purplesentinel" },
  { name: "PurpleSentry (Threat Intelligence & EASM)", icon: Radar, href: "/services/purple-x/purplesentry" },
  { name: "PurpleStrike (Red Teaming)", icon: Zap, href: "/services/purple-x/purplestrike" },
  { name: "PurpleConfig", icon: Lock, href: "/services/purple-x/purpleconfig" },
  { name: "PurpleReveal (NDR)", icon: Globe, href: "/services/purple-x/purplereveal" },
];

const managedX = [
  { name: "Managed Endpoint", icon: Cpu, href: "/services/managed-x/managed-endpoint" },
  { name: "Managed EDR", icon: Shield, href: "/services/managed-x/managed-edr" },
  { name: "Managed Firewall", icon: Server, href: "/services/managed-x/managed-firewall" },
  { name: "Managed WAF", icon: Globe, href: "/services/managed-x/managed-waf" },
  { name: "Managed SASE / ZTNA", icon: KeyRound, href: "/services/managed-x/managed-sase-ztna" },
  { name: "Managed Email Security", icon: Mail, href: "/services/managed-x/managed-email-security" },
  { name: "Managed Identity", icon: KeyRound, href: "/services/managed-x/managed-identity" },
  { name: "Managed Backup & BCDR", icon: Server, href: "/services/managed-x/managed-backup-bcdr" },
];

const regions = [
  {
    flag: "🇦🇪",
    country: "UAE",
    city: "Dubai",
    frameworks: "TDRA · UAE Cyber Security Council · CBUAE",
    industries: "Banking, Healthcare, Logistics, Government-adjacent",
  },
  {
    flag: "🇪🇬",
    country: "Egypt",
    city: "Cairo",
    frameworks: "EG-CERT · NTRA · CBE",
    industries: "Fintech, Telecom, Professional Services",
  },
  {
    flag: "🇸🇦",
    country: "Saudi Arabia",
    city: "Riyadh & Jeddah",
    frameworks: "NCA ECC · NCA CCC · SAMA",
    industries: "Critical sectors",
  },
];

const industries = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Financial Services", icon: Landmark },
  { name: "SaaS & Technology", icon: Code },
  { name: "Professional Services", icon: Briefcase },
  { name: "Manufacturing", icon: Factory },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PurpleGuard",
    url: "https://www.purpleguard.io/about",
    description:
      "PurpleGuard is a managed security services provider (MSSP) built for SMEs and mid-market organizations across UAE, Egypt, and Saudi Arabia.",
    mainEntity: {
      "@type": "Organization",
      name: "PurpleGuard",
      url: "https://www.purpleguard.io",
      email: EMAIL,
      telephone: PHONE_TEL,
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-slate-900 to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 hover:bg-purple-500/30 mb-6">
            About PurpleGuard
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Who We Are
          </h1>
          <p className="text-2xl lg:text-3xl text-purple-200 font-light mb-8">
            Smarter Security. Stronger Defense.
          </p>
          <p className="text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
            PurpleGuard is a Managed Security Services Provider (MSSP) built for SMEs and
            mid-market organizations across the UAE, Egypt, and Saudi Arabia. We deliver
            subscription-based, always-on cybersecurity — combining expert human analysts
            with automation — so businesses stay protected without the overhead of an
            in-house security team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#6633cc] to-purple-500 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30"
            >
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Consultation
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-400/40 text-purple-100 hover:bg-purple-500/10 bg-transparent"
            >
              <Link href="/services">
                Explore Our Services
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#6633cc] to-purple-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
            We exist to close the security gap for growing businesses in the Middle East.
            Too many SMEs are underserved by enterprise-grade vendors and overcharged by
            generalist IT providers. PurpleGuard was built to change that — delivering
            real, compliance-ready protection at a cost and operational model designed for
            your scale.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 mb-4">
              Why PurpleGuard
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What sets us apart</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Four principles that shape every engagement, every report, and every
              detection we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <Card
                  key={d.title}
                  className="bg-white/[0.03] border border-white/[0.08] hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6633cc] to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{d.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {d.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 mb-4">
              What We Do
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Services Overview</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Two complementary service lines covering the full security lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Purple X */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/60 border border-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6633cc] to-purple-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Purple X</h3>
                    <p className="text-sm text-purple-300">Cybersecurity Services</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {purpleX.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.name}>
                        <Link
                          href={s.href}
                          className="flex items-center gap-3 text-slate-300 hover:text-purple-200 transition-colors group"
                        >
                          <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="group-hover:translate-x-1 transition-transform">
                            {s.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/* Managed X */}
            <Card className="bg-gradient-to-br from-indigo-900/30 to-slate-900/60 border border-indigo-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Managed X</h3>
                    <p className="text-sm text-indigo-300">Managed Infrastructure</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {managedX.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.name}>
                        <Link
                          href={s.href}
                          className="flex items-center gap-3 text-slate-300 hover:text-indigo-200 transition-colors group"
                        >
                          <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          <span className="group-hover:translate-x-1 transition-transform">
                            {s.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 font-semibold transition-colors"
            >
              View All Services
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 mb-4">
              Regional Coverage
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Where We Operate</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Local presence and regulatory alignment across three core markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((r) => (
              <Card
                key={r.country}
                className="bg-white/[0.03] border border-white/[0.08] hover:border-purple-400/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{r.flag}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{r.country}</h3>
                  <div className="flex items-center gap-2 text-purple-300 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {r.city}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                        Frameworks
                      </div>
                      <p className="text-sm text-slate-300">{r.frameworks}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                        Industries
                      </div>
                      <p className="text-sm text-slate-300">{r.industries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Industries We Serve</h2>
            <p className="text-slate-400">
              Trusted across regulated and growth-stage sectors.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:border-purple-400/40 hover:bg-purple-500/10 px-5 py-3 rounded-full transition-all"
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-slate-200">{ind.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0b0a12] via-[#6633cc] to-[#0b0a12] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Know your risk. Control your exposure.
          </h2>
          <p className="text-lg lg:text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Talk to our team about a free consultation tailored to your environment,
            compliance scope, and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#0b0a12] hover:bg-purple-50 shadow-lg"
            >
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Security Consultation
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 bg-transparent"
            >
              <a href={`mailto:${EMAIL}`}>
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-purple-100 text-sm">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dubai, UAE · Cairo, Egypt
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
