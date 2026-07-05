import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, ChevronRight, Calendar, ArrowLeft, Shield, Lock, Users, Activity, FileText, CheckCircle, TrendingUp, Zap, Eye } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Identity — MFA, SSO & Zero Trust UAE & Egypt", subtitle: "Centralized IAM with MFA, Conditional Access & Zero Trust Enforcement", category: "Managed X", color: "purple" });

export const metadata: Metadata = {
  title: { absolute: "Managed Identity & IAM Dubai UAE — MFA, SSO & Zero Trust | PurpleGuard" },
  description:
    "Managed Identity: IAM with MFA, SSO & zero trust enforcement for UAE, Egypt & KSA. Book a free identity security assessment today.",
  keywords: ["managed identity UAE", "IAM service Dubai", "MFA managed Egypt", "SSO service UAE", "zero trust identity", "conditional access UAE", "NCA ECC identity management"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-identity" },
  openGraph: {
    title: "Managed Identity & IAM Dubai UAE | PurpleGuard",
    description: "MFA, SSO & zero trust identity management for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed Identity UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Identity — IAM & PAM UAE | PurpleGuard",
      description: "Identity security management covering AD, Entra ID, MFA & PAM for UAE.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const identityFaqs = [
  { question: "What does Managed Identity cover?", answer: "Managed Identity covers the configuration, monitoring, and continuous protection of your identity infrastructure — Active Directory, Azure Entra ID, Okta, or other identity providers. This includes privileged access management (PAM), MFA enforcement, suspicious login monitoring, and identity threat detection to stop credential-based attacks." },
  { question: "Why is identity security so important?", answer: "Over 80% of breaches involve compromised credentials. Attackers exploit weak passwords, legacy protocols, over-privileged accounts, and lack of MFA. PurpleGuard's Managed Identity service continuously hardens your identity posture, monitors for anomalous access, and detects credential-based attacks before they result in a breach." },
  { question: "Does Managed Identity help meet NCA ECC identity management requirements?", answer: "Yes. NCA ECC includes detailed controls for identity and access management. PurpleGuard's Managed Identity enforces least-privilege, manages privileged accounts, ensures MFA is deployed, and provides audit-ready reports mapping your identity posture to NCA ECC, ISO 27001, and UAE TDRA requirements." },
  { question: "Can Managed Identity detect account takeover attempts?", answer: "Yes. PurpleGuard monitors identity logs for impossible travel, password spray attacks, credential stuffing, MFA bypass attempts, and unusual privileged access. Our SOC triage suspicious identity events 24/7 and respond to prevent account takeovers from progressing to full breach." },
];

export default function ManagedIdentityPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed Identity — IAM, PAM & Identity Threat Detection", description: "Identity security management covering Active Directory, Entra ID, MFA, PAM, and identity threat detection for UAE, Egypt, and KSA.", url: "/services/managed-x/managed-identity", category: "Managed Security" });
  const faqSchema = faqJsonLd(identityFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed Identity", url: "/services/managed-x/managed-identity" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 mb-6">Managed-X | Identity & Access</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Identity — MFA, SSO & Zero Trust Access Management
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Centralized identity security with MFA enforcement, SSO, conditional access policies, and continuous identity monitoring.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["MFA & SSO management", "Conditional access policies", "Identity threat monitoring"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get Identity Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed Identity?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed Identity enforces zero trust access principles through comprehensive identity and access management. PurpleGuard deploys and manages MFA, SSO, conditional access, and identity governance to ensure only the right people access the right resources — with full visibility and control.
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
              { title: "MFA & SSO Management", description: "Deployment and management of multi-factor authentication and single sign-on across all applications.", icon: KeyRound, color: "from-cyan-500 to-blue-600" },
              { title: "Conditional Access Policies", description: "Risk-based access policies that enforce context-aware authentication requirements.", icon: Lock, color: "from-blue-500 to-cyan-600" },
              { title: "Identity Threat Monitoring", description: "Continuous monitoring for identity-based threats including account compromise and privilege abuse.", icon: Eye, color: "from-cyan-600 to-blue-700" },
              { title: "Access Governance", description: "User lifecycle management, access reviews, and least-privilege enforcement.", icon: Users, color: "from-blue-600 to-cyan-700" },
              { title: "Policy Enforcement", description: "Automated enforcement of identity policies with real-time blocking of non-compliant access.", icon: Shield, color: "from-cyan-500 to-blue-600" },
              { title: "Identity Reporting", description: "Compliance-ready identity and access reporting for audits and governance.", icon: FileText, color: "from-blue-500 to-cyan-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reduces account compromise and credential attacks", icon: Shield },
              { title: "Improves access visibility and control", icon: Eye },
              { title: "Simplifies user lifecycle management", icon: Users },
              { title: "Enables zero trust security model", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$5 per user per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Covers MFA, SSO, conditional access management, and identity monitoring for all users.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed Identity Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed Identity supports UAE TDRA and UAE Cyber Security Council identity and access management requirements for organisations in Dubai and across the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, Managed Identity aligns with NCA ECC 1-1:2018 identity controls and SAMA Cyber Security Framework IAM requirements for financial institutions.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed Identity meets EG-CERT guidelines and NTRA access control requirements for regulated sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {identityFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">80% of breaches involve compromised credentials. Manage identity properly.</h2>
          <p className="text-xl text-slate-300 mb-8">Managed Identity puts zero trust access at the core of your security program.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Secure Your Identities Today
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
