import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ChevronRight, Calendar, ArrowLeft, Target, Activity, Cpu, Cloud, CheckCircle, Zap, Eye, TrendingUp, Lock } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "MDR Services UAE & Egypt", subtitle: "PurpleSentinel: Managed Detection & Response (MDR/MXDR)", category: "Purple X", color: "indigo" });

export const metadata: Metadata = {
  title: { absolute: "Managed Detection & Response (MDR) Dubai UAE — PurpleSentinel | PurpleGuard" },
  description:
    "PurpleSentinel MDR/MXDR: deep visibility across endpoints, cloud & network with automated containment for UAE, Egypt & KSA. Book a free demo.",
  keywords: ["MDR UAE", "managed detection response Dubai", "MXDR Egypt", "endpoint detection response", "threat hunting UAE", "XDR managed service", "NCA ECC MDR"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplesentinel" },
  openGraph: {
    title: "MDR Services Dubai UAE — PurpleSentinel | PurpleGuard",
    description: "Managed Detection & Response with automated containment and threat hunting for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleSentinel — MDR UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleSentinel — Managed MDR UAE | PurpleGuard",
      description: "24/7 managed detection & response for UAE, Egypt & KSA organisations.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const mdrFaqs = [
  { question: "What is MDR and how does PurpleSentinel differ from a standard antivirus?", answer: "Managed Detection and Response (MDR) goes far beyond antivirus. PurpleSentinel combines AI-powered detection across endpoints, identity, network, and cloud, with human analysts who investigate every alert, validate threats, and take containment actions — stopping attacks that rule-based tools miss." },
  { question: "Does PurpleSentinel cover cloud workloads as well as endpoints?", answer: "Yes. PurpleSentinel provides MXDR coverage — extending detection across endpoints (EDR), cloud workloads (AWS, Azure, GCP), identities (Active Directory, Entra ID), and email. Alerts from all surfaces are correlated for a unified attack picture." },
  { question: "How does PurpleSentinel help meet NCA ECC or EG-CERT requirements?", answer: "PurpleSentinel's continuous monitoring and incident response documentation maps directly to NCA ECC controls (Saudi Arabia), EG-CERT guidelines (Egypt), and UAE TDRA requirements. Monthly reports provide compliance evidence for auditors." },
  { question: "Can PurpleSentinel work alongside our existing security tools?", answer: "Yes. PurpleSentinel integrates with leading EDR platforms (Microsoft Defender, CrowdStrike, SentinelOne), SIEM tools, and cloud security services. We normalise signals from your existing stack rather than requiring a rip-and-replace." },
];

export default function PurpleSentinelPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleSentinel — Managed Detection & Response (MDR/MXDR)", description: "AI-powered MDR covering endpoints, cloud, identity, and network. Expert analysts validate and contain threats across your entire attack surface 24/7.", url: "/services/purple-x/purplesentinel", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(mdrFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleSentinel", url: "/services/purple-x/purplesentinel" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-400/30 mb-6">Purple-X | Advanced Threat Detection</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleSentinel — Managed Detection & Response (MDR / MXDR)
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Deep visibility and rapid response across endpoints, networks, and cloud environments — with automated containment and proactive threat hunting.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Endpoint, network & cloud telemetry", "Automated containment & remediation", "Proactive threat hunting"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get MDR Assessment
                </Button>
              </a>
              <Link href="/services/purple-x">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View Purple-X Services <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleSentinel?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleSentinel is PurpleGuard's Managed Detection and Response service, combining deep telemetry collection, behavioral analysis, and human expertise to detect and respond to advanced threats across every attack surface — endpoints, networks, identity, and cloud.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleSentinel</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Endpoint Telemetry Monitoring", description: "Continuous collection and analysis of endpoint data to detect malicious behavior and lateral movement.", icon: Cpu, color: "from-violet-500 to-purple-600" },
              { title: "Cross-Domain Correlation", description: "Unified detection across endpoint, network, cloud, and identity data for comprehensive threat visibility.", icon: Activity, color: "from-purple-500 to-violet-600" },
              { title: "Automated Containment", description: "Instant isolation of compromised endpoints and automated remediation actions to stop threats in their tracks.", icon: Lock, color: "from-violet-600 to-purple-700" },
              { title: "Network & Cloud MDR", description: "Extended detection and response across network traffic and cloud workloads.", icon: Cloud, color: "from-purple-600 to-violet-700" },
              { title: "Threat Hunting", description: "Proactive hunts by experienced analysts to surface hidden threats that evade automated detection.", icon: Target, color: "from-violet-500 to-indigo-600" },
              { title: "Risk & Threat Dashboards", description: "Real-time visibility into active threats, risk scores, and security posture across your environment.", icon: Eye, color: "from-indigo-500 to-violet-600" },
            ].map((card) => (
              <Card key={card.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{card.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-slate-600">{card.description}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Proactive threat hunting and response", icon: Target },
              { title: "Reduced dwell time of attackers", icon: Zap },
              { title: "Automation-driven containment", icon: Shield },
              { title: "Clear insight into active threats and risks", icon: TrendingUp },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <p className="text-white font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Starting at $25/endpoint/month</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Pricing depends on the number of endpoints and coverage scope (endpoint-only, endpoint + network, full MXDR).</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                <Calendar className="h-5 w-5 mr-2" /> Book MDR Consultation
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing Details <ChevronRight className="h-5 w-5 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Geo-Regulatory Context */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Serving UAE, Egypt &amp; Saudi Arabia</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">United Arab Emirates</div>
                <p className="text-slate-600 text-sm leading-relaxed">PurpleSentinel MDR supports UAE TDRA requirements for continuous threat monitoring and incident response for regulated entities in Dubai and the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, PurpleSentinel aligns with NCA ECC 1-1:2018 threat detection controls and SAMA Cyber Security Framework MDR requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleSentinel provides EG-CERT-aligned managed detection and response, meeting NTRA and CBE continuous monitoring requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {mdrFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">See threats before they become incidents.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleSentinel MDR gives you the eyes and hands to stop advanced attacks in their tracks.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Request a Demo
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=PurpleSentinel MDR Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
