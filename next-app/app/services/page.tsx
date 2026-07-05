import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Search, Eye, AlertTriangle, Target, Settings, Network,
  Cpu, Server, Lock, Mail, Database, KeyRound, Globe,
  ChevronRight, CheckCircle, Calendar
} from "lucide-react";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Security Services — UAE & Egypt", subtitle: "Purple X Cybersecurity · Managed X Infrastructure", category: "MSSP", color: "purple" });

export const metadata: Metadata = {
  title: { absolute: "Managed Security Services Dubai UAE — Purple X & Managed X | PurpleGuard" },
  description:
    "Purple X cybersecurity & Managed X infrastructure services for UAE, Egypt & KSA. VAPT, SOC, MDR, EDR, firewall & more. Book a free consultation.",
  keywords: ["managed security services UAE", "cybersecurity services Dubai", "MSSP Egypt", "Purple X Managed X", "SOC VAPT MDR UAE", "NCA ECC MSSP", "TDRA cybersecurity"],
  alternates: { canonical: "https://www.purpleguard.io/services" },
  openGraph: {
    title: "Managed Security Services UAE — PurpleGuard",
    description: "Purple X cybersecurity + Managed X infrastructure — 15 services for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleGuard Security Services UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Security Services UAE & Egypt | PurpleGuard",
      description: "Purple X cybersecurity + Managed X infrastructure for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const purpleXItems = [
  { name: "PurpleVAPT", tagline: "Vulnerability Assessment & Pen Testing", href: "/services/purple-x/purplevapt", icon: Search, color: "from-purple-500 to-indigo-600" },
  { name: "PurpleSOC", tagline: "24/7 Managed SOC", href: "/services/purple-x/purplesoc", icon: Eye, color: "from-blue-500 to-cyan-600" },
  { name: "PurpleSentinel", tagline: "Managed Detection & Response", href: "/services/purple-x/purplesentinel", icon: Shield, color: "from-violet-500 to-purple-600" },
  { name: "PurpleSentry", tagline: "Threat Intelligence & EASM", href: "/services/purple-x/purplesentry", icon: AlertTriangle, color: "from-orange-500 to-red-600" },
  { name: "PurpleStrike", tagline: "Red Teaming & BAS", href: "/services/purple-x/purplestrike", icon: Target, color: "from-red-500 to-pink-600" },
  { name: "PurpleConfig", tagline: "Configuration Hardening", href: "/services/purple-x/purpleconfig", icon: Settings, color: "from-emerald-500 to-teal-600" },
  { name: "PurpleReveal", tagline: "Network Detection & Response", href: "/services/purple-x/purplereveal", icon: Network, color: "from-cyan-500 to-blue-600" },
];

const managedXItems = [
  { name: "Managed Endpoint", tagline: "Patching & health monitoring", href: "/services/managed-x/managed-endpoint", icon: Cpu, color: "from-blue-500 to-cyan-600" },
  { name: "Managed EDR", tagline: "Endpoint threat detection", href: "/services/managed-x/managed-edr", icon: Shield, color: "from-purple-500 to-indigo-600" },
  { name: "Managed Firewall", tagline: "Perimeter protection", href: "/services/managed-x/managed-firewall", icon: Server, color: "from-emerald-500 to-teal-600" },
  { name: "Managed WAF", tagline: "Web & API protection", href: "/services/managed-x/managed-waf", icon: Globe, color: "from-orange-500 to-red-600" },
  { name: "Managed Email Security", tagline: "Phishing & BEC defense", href: "/services/managed-x/managed-email-security", icon: Mail, color: "from-red-500 to-pink-600" },
  { name: "Managed Backup & BCDR", tagline: "Ransomware recovery", href: "/services/managed-x/managed-backup-bcdr", icon: Database, color: "from-violet-500 to-purple-600" },
  { name: "Managed Identity", tagline: "MFA, SSO, zero trust", href: "/services/managed-x/managed-identity", icon: KeyRound, color: "from-cyan-500 to-blue-600" },
  { name: "Managed SASE / ZTNA", tagline: "Secure cloud access", href: "/services/managed-x/managed-sase-ztna", icon: Lock, color: "from-slate-600 to-slate-800" },
];

export default function ServicesPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-[#6633cc] to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/40 mb-6">Full Service Portfolio</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Complete Managed Security — Purple X & Managed X
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              PurpleGuard's two service lines cover every layer of your security program — from advanced cybersecurity and exposure management to fully managed infrastructure services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Discovery Call
                </Button>
              </a>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View Pricing <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {["7 Purple X cybersecurity services", "8 Managed X infrastructure services", "Subscription-based, no lock-ins", "24/7 monitoring & compliance-ready"].map((item) => (
                <div key={item} className="flex items-start gap-2 bg-white/5 rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Purple X */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Purple X</h2>
              <p className="text-[#6633cc] font-medium">Cybersecurity & Exposure Management</p>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl">
            Always-on security services covering vulnerability management, threat detection, incident response, and external risk monitoring.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {purpleXItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Card className="h-full hover:shadow-lg hover:border-[#6633cc]/30 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#6633cc] transition-colors">{item.name}</h3>
                    <p className="text-slate-600 text-sm">{item.tagline}</p>
                    <div className="mt-3 flex items-center text-[#6633cc] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Link href="/services/purple-x">
            <Button variant="outline" className="border-[#6633cc] text-[#6633cc] hover:bg-[#6633cc] hover:text-white">
              Explore All Purple X Services <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Managed X */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
              <Server className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Managed X</h2>
              <p className="text-blue-600 font-medium">Managed Security Infrastructure</p>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl">
            Fully managed security services that reduce operational burden while strengthening protection, visibility, and compliance.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {managedXItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Card className="h-full hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <p className="text-slate-600 text-sm">{item.tagline}</p>
                    <div className="mt-3 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Link href="/services/managed-x">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Explore All Managed X Services <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0b0a12] to-[#6633cc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not sure where to start?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our security experts will help you build the right combination of services for your risk profile and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Book Free Consultation
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                View Pricing <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
