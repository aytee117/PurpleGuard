import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, ChevronRight, Calendar, Mail, Target, Eye, Zap, Lock, Server,
  Globe, Building2, Stethoscope, Landmark, Code, Briefcase, Factory,
  ShieldCheck, Cpu, FileCheck, Handshake, AlertTriangle,
  Cloud, Radar, KeyRound, MapPin, Calculator
} from "lucide-react";
import { faqJsonLd, ogImageUrl, websiteJsonLd } from "@/lib/json-ld";
import { HomeHeroCarousel } from "@/components/HomeHeroCarousel";

const OG = ogImageUrl({
  title: "Managed Security Services UAE & Egypt",
  subtitle: "24/7 SOC · MDR · VAPT · Managed Infrastructure — SME-Focused MSSP",
  category: "MSSP",
  color: "purple",
});

export const metadata: Metadata = {
  title: "Managed Security Services Provider (MSSP) — UAE, Egypt & KSA | PurpleGuard",
  description:
    "PurpleGuard — MSSP delivering 24/7 SOC, MDR, VAPT & managed infrastructure for SMEs in UAE, Egypt & KSA. Subscription-based. Get a free assessment.",
  keywords: [
    "MSSP UAE", "managed security services Dubai", "cybersecurity Egypt Cairo", "SOC as a service UAE",
    "MDR managed detection response", "VAPT penetration testing UAE", "ISO 27001 compliance Egypt",
    "NCA ECC compliance Saudi Arabia", "EG-CERT compliance", "TDRA cybersecurity UAE",
  ],
  alternates: { canonical: "https://www.purpleguard.io" },
  openGraph: {
    title: "PurpleGuard — Managed Security Services UAE, Egypt & KSA",
    description:
      "24/7 SOC, MDR, VAPT, and managed infrastructure for SMEs in UAE, Egypt, and KSA.",
    url: "https://www.purpleguard.io",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleGuard MSSP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PurpleGuard — MSSP UAE, Egypt & KSA",
    description: "Subscription-based managed cybersecurity for SMEs.",
    images: [OG],
  },
};

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const purpleXServices = [
  { name: "PurpleVAPT", description: "Vulnerability Assessment & Pen Testing", icon: Target, href: "/services/purple-x/purplevapt" },
  { name: "PurpleSOC", description: "24/7 SOC & Incident Response", icon: Eye, href: "/services/purple-x/purplesoc" },
  { name: "PurpleSentinel", description: "Managed Detection & Response (MDR)", icon: Shield, href: "/services/purple-x/purplesentinel" },
  { name: "PurpleSentry", description: "Threat Intelligence & EASM", icon: Radar, href: "/services/purple-x/purplesentry" },
  { name: "PurpleStrike", description: "Red Teaming & BAS", icon: Zap, href: "/services/purple-x/purplestrike" },
  { name: "PurpleConfig", description: "Security Configuration & Hardening", icon: Lock, href: "/services/purple-x/purpleconfig" },
  { name: "PurpleReveal", description: "Network Detection & Response", icon: Globe, href: "/services/purple-x/purplereveal" },
];

const managedXServices = [
  { name: "Managed Endpoint", description: "Endpoint management & patching", icon: Cpu, href: "/services/managed-x/managed-endpoint" },
  { name: "Managed EDR", description: "Endpoint threat detection & response", icon: Shield, href: "/services/managed-x/managed-edr" },
  { name: "Managed Firewall", description: "Network perimeter protection", icon: Server, href: "/services/managed-x/managed-firewall" },
  { name: "Managed WAF", description: "Web application & API protection", icon: Globe, href: "/services/managed-x/managed-waf" },
  { name: "Managed Email Security", description: "Phishing & email-borne threat defense", icon: Mail, href: "/services/managed-x/managed-email-security" },
  { name: "Managed Backup & BCDR", description: "Business continuity & disaster recovery", icon: Server, href: "/services/managed-x/managed-backup-bcdr" },
];

const whyPurpleGuard = [
  { title: "Built for SMEs", description: "No enterprise bloat — predictable monthly pricing", icon: Building2 },
  { title: "Automation-Driven", description: "SOAR, telemetry correlation, continuous validation", icon: Cpu },
  { title: "Compliance-Ready", description: "Audit-friendly reporting and evidence collection", icon: FileCheck },
  { title: "Single Partner Model", description: "One MSSP, full security lifecycle — no tool sprawl", icon: Handshake },
];

const useCases = [
  { name: "Compliance & Audit Readiness", icon: FileCheck, href: "/solutions/compliance-audit-readiness" },
  { name: "Ransomware Defense", icon: AlertTriangle, href: "/solutions/ransomware-defense" },
  { name: "Cloud & SaaS Security", icon: Cloud, href: "/solutions/cloud-saas-security" },
  { name: "External Attack Surface Management", icon: Radar, href: "/solutions/external-attack-surface-management" },
  { name: "Zero Trust & Secure Remote Access", icon: KeyRound, href: "/solutions/zero-trust-secure-remote-access" },
];

const industries = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Financial Services", icon: Landmark },
  { name: "SaaS & Technology", icon: Code },
  { name: "Professional Services", icon: Briefcase },
  { name: "Manufacturing", icon: Factory },
];

const homeFaqs = [
  {
    question: "What is a managed SOC?",
    answer: "A managed Security Operations Centre (SOC) is a 24/7 service where a team of security analysts monitors your IT environment for threats, investigates alerts, and responds to incidents on your behalf. PurpleGuard's managed SOC — PurpleSOC — covers UAE, Egypt, and Saudi Arabia and is staffed around the clock so you have expert protection without hiring an in-house team.",
  },
  {
    question: "How much does VAPT cost in UAE?",
    answer: "VAPT (Vulnerability Assessment and Penetration Testing) pricing in the UAE depends on scope: the number of IPs, web applications, cloud resources, and testing depth. PurpleGuard's PurpleVAPT starts from a project-based engagement and is also available as a continuous subscription. Contact us for a scoped quote in AED.",
  },
  {
    question: "What is MDR (Managed Detection and Response)?",
    answer: "MDR is a fully managed service combining advanced threat detection technology (EDR, XDR, SIEM) with human expert analysts who investigate, validate, and respond to threats on your behalf — 24/7. PurpleGuard's PurpleSentinel MDR service covers endpoints, cloud, and network for organisations in UAE, Egypt, and KSA.",
  },
  {
    question: "Is PurpleGuard suitable for SMEs in Egypt?",
    answer: "Yes. PurpleGuard is purpose-built for SMEs and mid-market organisations in Egypt, UAE, and Saudi Arabia. Our subscription model eliminates the need to hire a full internal security team — you get enterprise-grade 24/7 protection at an SME-appropriate cost, with compliance alignment to EG-CERT, Egyptian Central Bank (CBE), and NTRA requirements.",
  },
];

export default function HomePage() {
  const faqSchema = faqJsonLd(homeFaqs);
  const siteSchema = websiteJsonLd();

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <HomeHeroCarousel />

      {/* Trust bar */}
      <section className="bg-[#f6f4fa] py-6 border-b border-[#e9e6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            {[
              { icon: ShieldCheck, label: "Compliance-aligned (CIS, NIST, ISO-ready)" },
              { icon: Target, label: "MITRE ATT&CK aligned operations" },
              { icon: Building2, label: "SME & Mid-Market Focused MSSP" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-purple-600" />
                <span className="text-slate-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculate Yourself */}
      <section className="relative bg-[#0b0a12] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Badge className="bg-purple-500/15 text-purple-200 border-purple-400/40 mb-4">
              Self-Service Estimators
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Calculate Yourself</h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Don't like to wait for budgetary estimates? Use our calculators to estimate the costs for your required services and deliverables. Fully anonymous, no sales follow-ups if not requested.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link href="/services/purple-x/purplevapt/calculator" className="group">
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-purple-500/60 backdrop-blur-sm p-8 transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center mb-6">
                  <Calculator className="h-7 w-7 text-purple-300" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">PurpleVAPT Calculator</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Scope your vulnerability assessment and penetration testing engagement. Price IPs, web apps, AD, and compliance testing in minutes.
                </p>
                <span className="inline-flex items-center text-purple-300 font-semibold group-hover:text-white transition-colors">
                  Estimate VAPT cost
                  <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
            <Link href="/services/purple-x/purplesoc/questionnaire" className="group">
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-purple-500/60 backdrop-blur-sm p-8 transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center mb-6">
                  <Calculator className="h-7 w-7 text-purple-300" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Size my SOC</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Walk through our PurpleSOC discovery questionnaire to size your environment, estimate EPS &amp; LDS, and get an indicative annual quote.
                </p>
                <span className="inline-flex items-center text-purple-300 font-semibold group-hover:text-white transition-colors">
                  Start the questionnaire
                  <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Purple X */}
      <section id="services" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-4">
                Cybersecurity & Exposure Management
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Purple X Services</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Always-on security services covering prevention, detection, response, and exposure reduction.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {purpleXServices.map((service) => (
                <Link key={service.name} href={service.href}>
                  <Card className="h-full hover:shadow-lg hover:border-[#6633cc]/30 transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#6633cc] transition-colors">{service.name}</h3>
                      <p className="text-slate-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/services/purple-x">
                <Button variant="outline" className="border-[#6633cc] text-[#6633cc] hover:bg-[#6633cc] hover:text-white">
                  Explore Purple X Services <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Managed X */}
          <div>
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
                Managed Security Infrastructure
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Managed X Services</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Fully managed security infrastructure with continuous monitoring and policy enforcement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {managedXServices.map((service) => (
                <Link key={service.name} href={service.href}>
                  <Card className="h-full hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                      <p className="text-slate-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/services/managed-x">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Explore Managed X Services <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why PurpleGuard */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why PurpleGuard</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Security built for your business, not enterprise complexity</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {whyPurpleGuard.map((item) => (
              <Card key={item.title} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#6633cc] to-purple-500 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Use Cases & Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Outcome-focused security solutions tailored to your specific challenges and industry requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {useCases.map((useCase) => (
              <Link key={useCase.name} href={useCase.href}>
                <Card className="h-full hover:shadow-lg hover:border-[#6633cc]/30 transition-all cursor-pointer group text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center mx-auto mb-4">
                      <useCase.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#6633cc] transition-colors text-sm">{useCase.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/solutions">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                View All Solutions <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Where We Operate — GEO block */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Where We Operate</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Regional MSSP with offices in Dubai and Cairo — serving clients across UAE, Egypt, and Saudi Arabia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                flag: "🇦🇪",
                country: "United Arab Emirates",
                city: "Dubai",
                detail: "PurpleGuard's primary hub. We help UAE businesses meet TDRA regulations, UAE Cyber Security Council directives, and Central Bank of UAE cybersecurity circulars. Industries served: banking & finance, healthcare, logistics, government-adjacent entities.",
                color: "border-blue-200 bg-blue-50",
                accent: "text-blue-700",
              },
              {
                flag: "🇪🇬",
                country: "Egypt",
                city: "Cairo",
                detail: "Operations centre serving Egyptian SMEs and regulated sectors. PurpleGuard supports alignment with EG-CERT advisories, NTRA cybersecurity frameworks, and Egyptian Central Bank cybersecurity guidelines. Industries served: fintech, telecom, professional services.",
                color: "border-purple-200 bg-purple-50",
                accent: "text-purple-700",
              },
              {
                flag: "🇸🇦",
                country: "Saudi Arabia",
                city: "Riyadh · Jeddah",
                detail: "Serving KSA clients remotely with full alignment to NCA ECC (Essential Cybersecurity Controls) and NCA CCC (Cloud Cybersecurity Controls). Helping organisations achieve SAMA compliance and NCA compliance across critical sectors.",
                color: "border-emerald-200 bg-emerald-50",
                accent: "text-emerald-700",
              },
            ].map((loc) => (
              <div key={loc.country} className={`rounded-xl border p-6 ${loc.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{loc.flag}</span>
                  <div>
                    <div className={`font-bold text-lg ${loc.accent}`}>{loc.country}</div>
                    <div className="flex items-center gap-1 text-slate-600 text-sm">
                      <MapPin className="h-3 w-3" /> {loc.city}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{loc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Common questions about PurpleGuard and managed security services</p>
          </div>
          <div className="space-y-6">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry-specific security expertise for regulated and high-risk sectors
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {industries.map((industry) => (
              <Link key={industry.name} href="/services">
                <Card className="h-full hover:shadow-lg hover:border-[#6633cc]/30 transition-all cursor-pointer group text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center mx-auto mb-4">
                      <industry.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#6633cc] transition-colors">{industry.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#f6f4fa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-purple-600 px-8 py-16 sm:px-14 text-center shadow-glow-brand">
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 40%)" }}
            />
            <div className="relative">
              <Image src="/mark-white.png" alt="" width={44} height={44} className="mx-auto mb-6 h-11 w-auto" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">Know your risk. Control your exposure.</h2>
              <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
                Get a comprehensive security assessment from our experts and discover how PurpleGuard can protect your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-purple-700 shadow-none hover:bg-slate-100 px-8">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book a Free Security Consultation
                  </Button>
                </a>
                <a href="mailto:hello@purpleguard.io">
                  <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 hover:text-white px-8">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Sales
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
