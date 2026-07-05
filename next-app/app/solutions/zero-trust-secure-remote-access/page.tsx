import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ChevronRight, Calendar, ArrowLeft, Shield, Users, Globe, KeyRound, Cpu, Eye, CheckCircle } from "lucide-react";
import { faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Zero Trust & Secure Access — UAE & Egypt", subtitle: "ZTNA · SASE · Identity-Driven Access for Remote & Hybrid Workforces", category: "Solutions", color: "indigo" });

export const metadata: Metadata = {
  title: { absolute: "Zero Trust & Secure Remote Access Dubai UAE — ZTNA & SASE | PurpleGuard" },
  description:
    "Zero Trust & ZTNA: replace VPNs with identity-driven secure access for UAE, Egypt & KSA. Managed SASE service. Book a free zero trust review.",
  keywords: ["zero trust UAE", "ZTNA Dubai", "secure remote access Egypt", "VPN replacement UAE", "SASE service", "zero trust network access UAE", "NCA ECC zero trust"],
  alternates: { canonical: "https://www.purpleguard.io/solutions/zero-trust-secure-remote-access" },
  openGraph: {
    title: "Zero Trust & Secure Remote Access UAE — PurpleGuard",
    description: "ZTNA & SASE replacing VPNs for remote and hybrid workforces in UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Zero Trust Secure Access UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zero Trust & Secure Access UAE | PurpleGuard",
      description: "ZTNA & SASE replacing VPNs for remote workforces in UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const ztFaqs = [
  { question: "What is Zero Trust Network Access (ZTNA)?", answer: "ZTNA is a security model that eliminates implicit trust — every user, device, and connection is verified before access is granted, regardless of location. Unlike VPNs that give broad network access, ZTNA enforces least-privilege, application-level access based on identity and context." },
  { question: "How is ZTNA better than a traditional VPN?", answer: "Traditional VPNs grant broad network access once connected — creating lateral movement risk if credentials are compromised. ZTNA grants access only to the specific applications needed, continuously validates the user and device, and reduces your attack surface significantly." },
  { question: "What does SASE mean and how does it relate to ZTNA?", answer: "SASE (Secure Access Service Edge) combines networking (SD-WAN) and security (ZTNA, SWG, CASB, FWaaS) into a single cloud-delivered architecture. ZTNA is the access control component of SASE. PurpleGuard delivers full SASE with ZTNA at its core." },
  { question: "Does Zero Trust compliance support NCA ECC requirements in KSA?", answer: "Yes. NCA ECC mandates strong authentication, least-privilege access, and continuous monitoring. A Zero Trust architecture natively addresses these requirements and PurpleGuard provides compliance mapping and evidence for NCA ECC and SAMA assessments." },
  { question: "Can we implement Zero Trust without replacing all existing infrastructure?", answer: "Absolutely. PurpleGuard takes an incremental approach — we overlay ZTNA controls on your existing infrastructure, starting with the highest-risk access paths. You do not need to rip and replace existing systems to benefit from Zero Trust principles." },
];

export default function ZeroTrustPage() {
  const faqSchema = faqJsonLd(ztFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/solutions" },
      { name: "Zero Trust & Secure Remote Access", url: "/solutions/zero-trust-secure-remote-access" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/solutions">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Solutions
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-slate-500/30 text-slate-300 border-slate-400/30 mb-6">Security Solution</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Zero Trust & Secure Remote Access
            </h1>
            <p className="text-2xl text-slate-300 font-semibold mb-6">Secure access without trusting the network.</p>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Replace legacy VPNs with identity-driven, policy-based access. Continuously verify users, devices, and context to secure your workforce — anywhere.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["ZTNA", "MFA", "Conditional Access", "Device Trust"].map((fw) => (
                <Badge key={fw} className="bg-white/10 text-white border-white/20 text-sm py-1">{fw}</Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Plan Your Zero Trust Journey
                </Button>
              </a>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View All Solutions <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Challenge</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Traditional VPN-based access grants broad network access once connected, making it easy for attackers to move laterally after compromising a single user. Remote and hybrid work has accelerated this risk. Organizations need an access model that never trusts, always verifies — regardless of location.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PurpleGuard Enables Zero Trust</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zero Trust Network Access", description: "Identity-driven application access that verifies every user and device before granting application-specific access — not broad network access.", icon: Lock, color: "from-slate-600 to-slate-800" },
              { title: "Multi-Factor Authentication", description: "Strong MFA enforcement across all users and applications with phishing-resistant options.", icon: KeyRound, color: "from-slate-700 to-slate-900" },
              { title: "Conditional Access", description: "Risk-based, context-aware access policies that respond to user behavior, device health, and location.", icon: Shield, color: "from-slate-600 to-slate-800" },
              { title: "Device Trust & Compliance", description: "Verify device health and compliance posture before granting access to sensitive resources.", icon: Cpu, color: "from-slate-700 to-slate-900" },
              { title: "Secure Web Gateway", description: "Protect all users from web-based threats regardless of where they work — office, home, or travel.", icon: Globe, color: "from-slate-600 to-slate-800" },
              { title: "Access Monitoring & Analytics", description: "Continuous monitoring of access patterns to detect anomalous behavior and insider threats.", icon: Eye, color: "from-slate-700 to-slate-900" },
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Services Used in This Solution</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Managed SASE / ZTNA", description: "Zero trust access and secure web gateway", path: "/services/managed-x/managed-sase-ztna" },
              { name: "Managed Identity", description: "MFA, SSO, and conditional access", path: "/services/managed-x/managed-identity" },
              { name: "PurpleSentinel (MDR)", description: "Detect lateral movement and identity abuse", path: "/services/purple-x/purplesentinel" },
              { name: "Managed Endpoint", description: "Device health and compliance verification", path: "/services/managed-x/managed-endpoint" },
            ].map((service) => (
              <Link key={service.name} href={service.path}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{service.name}</div>
                      <div className="text-slate-600 text-sm">{service.description}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-700" />
                  </CardContent>
                </Card>
              </Link>
            ))}
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
                <p className="text-slate-600 text-sm leading-relaxed">In the UAE, Zero Trust & ZTNA supports UAE TDRA secure access requirements and UAE Cyber Security Council zero trust mandates for organisations in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, Zero Trust aligns with NCA ECC 1-1:2018 access control controls and SAMA Cyber Security Framework zero trust requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Zero Trust meets EG-CERT secure access guidelines and NTRA remote access security requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {ztFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Trust nothing. Verify everything.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleGuard delivers a managed Zero Trust access architecture for modern workforces.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Plan Your Zero Trust Journey
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Zero Trust &amp; ZTNA Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
