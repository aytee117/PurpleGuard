import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ChevronRight, Calendar, ArrowLeft, Shield, Globe, Users, Activity, Eye, CheckCircle, TrendingUp, Zap, KeyRound } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed SASE / ZTNA — UAE & Egypt", subtitle: "Zero Trust Network Access, SWG & CASB as a Managed Cloud Service", category: "Managed X", color: "slate" });

export const metadata: Metadata = {
  title: { absolute: "Managed SASE & ZTNA Dubai UAE — Zero Trust Secure Access | PurpleGuard" },
  description:
    "Managed SASE & ZTNA: cloud-delivered zero trust replacing VPNs for UAE, Egypt & KSA. Book a free secure access assessment today.",
  keywords: ["managed SASE UAE", "ZTNA service Dubai", "zero trust network access Egypt", "CASB managed UAE", "secure web gateway UAE", "VPN replacement", "NCA ECC ZTNA"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-sase-ztna" },
  openGraph: {
    title: "Managed SASE & ZTNA Dubai UAE | PurpleGuard",
    description: "Zero Trust Network Access, SWG & CASB managed cloud service for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed SASE ZTNA UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed SASE & ZTNA UAE — Secure Access | PurpleGuard",
      description: "Cloud-delivered SASE replacing VPN with zero trust for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const saseFaqs = [
  { question: "What is SASE and how is it different from a traditional VPN?", answer: "Secure Access Service Edge (SASE) combines network security and wide-area networking into a cloud-delivered service. Unlike traditional VPNs that backhaul traffic through a data centre and grant broad network access, SASE enforces identity-based zero trust access — users connect directly to the application they need, and access is verified continuously based on identity, device posture, and context." },
  { question: "What is ZTNA and how does it fit into SASE?", answer: "Zero Trust Network Access (ZTNA) is the access control layer within SASE. It replaces VPN by granting application-level access only after verifying user identity, device health, and context — never exposing the full network. PurpleGuard's Managed SASE includes ZTNA as the core access model for all remote and hybrid workers." },
  { question: "Does Managed SASE support NCA ECC or UAE TDRA requirements?", answer: "Yes. SASE and ZTNA architectures align with NCA ECC access control requirements, UAE TDRA cybersecurity guidelines, and Zero Trust principles increasingly required by regulators in Egypt and KSA. PurpleGuard provides compliance-mapped reports for each framework." },
  { question: "Can Managed SASE replace our existing VPN immediately?", answer: "PurpleGuard's migration approach is phased — we assess your current remote access architecture, identify critical application groups, and migrate them to SASE incrementally to avoid disruption. Most organisations complete their VPN migration within 60–90 days with zero downtime." },
];

export default function ManagedSASEZTNAPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed SASE & ZTNA — Cloud-Delivered Secure Access", description: "Cloud-delivered SASE replacing legacy VPN with identity-driven zero trust access. Secure remote and hybrid workforce access for UAE, Egypt, and KSA.", url: "/services/managed-x/managed-sase-ztna", category: "Managed Security" });
  const faqSchema = faqJsonLd(saseFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed SASE & ZTNA", url: "/services/managed-x/managed-sase-ztna" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-slate-500/30 text-slate-300 border-slate-400/30 mb-6">Managed-X | Secure Access</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed SASE / ZTNA — Secure Cloud-Delivered Access
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Replace legacy VPNs with zero trust, identity-driven, policy-based access for remote and hybrid workforces — managed end-to-end.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Zero Trust Network Access", "Secure Web Gateway & CASB", "Policy-based access enforcement"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get SASE Quote
                </Button>
              </a>
              <Link href="/services/managed-x">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View All Managed-X Services <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed SASE / ZTNA?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed SASE delivers a cloud-native security architecture that combines Zero Trust Network Access (ZTNA), Secure Web Gateway (SWG), and Cloud Access Security Broker (CASB) capabilities. PurpleGuard manages the full lifecycle — from deployment and policy configuration to ongoing monitoring and optimization.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zero Trust Network Access", description: "Identity-based access that verifies every user and device before granting access to applications.", icon: Lock, color: "from-slate-600 to-slate-800" },
              { title: "Secure Web Gateway", description: "Cloud-delivered web filtering and threat protection for users browsing from anywhere.", icon: Globe, color: "from-slate-700 to-slate-900" },
              { title: "CASB", description: "Cloud Access Security Broker to monitor and control SaaS application usage and data flows.", icon: Eye, color: "from-slate-600 to-slate-800" },
              { title: "Policy-Based Access Control", description: "Granular, user and context-aware access policies enforced at the cloud edge.", icon: KeyRound, color: "from-slate-700 to-slate-900" },
              { title: "Remote User Protection", description: "Security for remote and hybrid workers without requiring backhauling traffic through corporate networks.", icon: Users, color: "from-slate-600 to-slate-800" },
              { title: "Encrypted Traffic Inspection", description: "SSL/TLS inspection to detect threats hidden in encrypted traffic.", icon: Shield, color: "from-slate-700 to-slate-900" },
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

      <section className="py-16 lg:py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Secures remote and hybrid workforce access", icon: Users },
              { title: "Replaces legacy VPNs with zero trust", icon: Lock },
              { title: "Improves user experience and performance", icon: Zap },
              { title: "Scales securely as your team grows", icon: TrendingUp },
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$12 per user per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Full SASE management including ZTNA, SWG, CASB, and policy operations for all users.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-slate-700 hover:bg-slate-800">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed SASE/ZTNA Inquiry">
              <Button size="lg" variant="outline">Contact Sales <ChevronRight className="h-5 w-5 ml-2" /></Button>
            </a>
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed SASE & ZTNA supports UAE TDRA and UAE Cyber Security Council secure remote access requirements for organisations in Dubai and across the Emirates.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, Managed SASE/ZTNA aligns with NCA ECC 1-1:2018 secure connectivity controls and SAMA Cyber Security Framework zero trust requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed SASE & ZTNA meets EG-CERT guidelines and NTRA remote access security requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {saseFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your workforce is everywhere. Your security should be too.</h2>
          <p className="text-xl text-slate-300 mb-8">Managed SASE delivers cloud-first, zero trust access for the modern workforce.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Modernize Your Access Security
              </Button>
            </a>
            <Link href="/services/managed-x">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">View All Managed-X Services</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
