import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ChevronRight, Calendar, ArrowLeft, Shield, CheckCircle, FileText, Activity, Settings, Eye } from "lucide-react";
import { faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Compliance & Audit Readiness — UAE & Egypt", subtitle: "ISO 27001 · NCA ECC · EG-CERT · SOC 2 · NIST Compliance", category: "Solutions", color: "emerald" });

export const metadata: Metadata = {
  title: { absolute: "Compliance & Audit Readiness Dubai UAE — ISO 27001, NCA ECC & EG-CERT | PurpleGuard" },
  description:
    "PurpleGuard helps UAE, Egypt & KSA achieve ISO 27001, NCA ECC, SAMA, EG-CERT & SOC 2 compliance with audit-ready documentation. Get started.",
  keywords: ["ISO 27001 compliance UAE", "NCA ECC compliance Saudi Arabia", "EG-CERT compliance Egypt", "audit readiness Dubai", "SOC 2 UAE", "PCI DSS compliance", "NIST compliance UAE"],
  alternates: { canonical: "https://www.purpleguard.io/solutions/compliance-audit-readiness" },
  openGraph: {
    title: "Compliance & Audit Readiness UAE — PurpleGuard",
    description: "ISO 27001, NCA ECC, EG-CERT & SOC 2 compliance for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Compliance Audit Readiness UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Compliance & Audit Readiness UAE | PurpleGuard",
      description: "ISO 27001, NCA ECC, EG-CERT & SOC 2 compliance for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const complianceFaqs = [
  { question: "Which compliance frameworks does PurpleGuard support?", answer: "PurpleGuard supports ISO 27001:2022, NCA ECC and NCA CCC (Saudi Arabia), SAMA Cyber Security Framework (KSA financial sector), SCA and UAE TDRA / UAE Cyber Security Council requirements (UAE), EG-CERT guidelines and NTRA requirements (Egypt), NIST CSF, SOC 2, PCI DSS, and HIPAA." },
  { question: "How long does a compliance readiness assessment take?", answer: "For a mid-market organisation, a gap assessment and audit-readiness roadmap typically takes 2–4 weeks. Ongoing compliance monitoring is a continuous service — we track control changes and evidence continuously so you are always audit-ready, not just once a year." },
  { question: "Can PurpleGuard help us prepare for an NCA ECC or ISO 27001 audit in UAE or Saudi Arabia?", answer: "Yes. We work with organisations in UAE, Saudi Arabia, and Egypt to close gaps against NCA ECC 1-1:2018, ISO 27001:2022, and sector-specific frameworks. We produce all required documentation, evidence artefacts, and treatment plans in the format auditors expect." },
  { question: "Do you help with evidence collection and documentation?", answer: "Yes. PurpleGuard's compliance service includes automated evidence collection, control documentation, policy templates, exception tracking, and a live compliance dashboard — so auditors see a complete, organised evidence pack rather than scattered spreadsheets." },
];

export default function ComplianceAuditReadinessPage() {
  const serviceSchema = faqJsonLd(complianceFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
    { name: "Compliance & Audit Readiness", url: "/solutions/compliance-audit-readiness" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/solutions">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Solutions
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 mb-6">Security Solution</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Compliance & Audit Readiness
            </h1>
            <p className="text-2xl text-emerald-300 font-semibold mb-6">Be audit-ready. Stay compliant. Reduce risk.</p>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              PurpleGuard helps organizations achieve and maintain compliance through continuous security monitoring, control validation, and audit-ready documentation.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["ISO 27001", "SOC 2", "NIST CSF", "HIPAA", "PCI DSS", "GDPR"].map((fw) => (
                <Badge key={fw} className="bg-white/10 text-white border-white/20 text-sm py-1">{fw}</Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Book Compliance Consultation
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
              Compliance frameworks like ISO 27001, SOC 2, NIST CSF, HIPAA, PCI DSS, and GDPR require ongoing security operations, continuous monitoring, and documented evidence — not just a point-in-time assessment. Many organizations struggle to maintain compliance between audits, leading to gaps, findings, and escalating remediation costs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PurpleGuard Helps</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">PurpleGuard's compliance-aware services combine security operations with continuous evidence collection</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Continuous Control Monitoring", description: "Ongoing monitoring of security controls aligned to your compliance framework, with real-time visibility into control status.", icon: Activity, color: "from-emerald-500 to-teal-600" },
              { title: "Configuration Compliance", description: "CIS benchmark assessments and continuous drift monitoring to maintain secure, compliant system configurations.", icon: Settings, color: "from-teal-500 to-emerald-600" },
              { title: "Vulnerability Management", description: "Continuous vulnerability assessment with compliance-aligned prioritization and remediation tracking.", icon: Shield, color: "from-emerald-600 to-teal-700" },
              { title: "Audit-Ready Documentation", description: "Automated evidence collection and compliance reports ready for auditor review at any time.", icon: FileText, color: "from-teal-600 to-emerald-700" },
              { title: "Security Operations", description: "24/7 SOC monitoring with compliance-aware alerting and incident tracking for audit evidence.", icon: Eye, color: "from-emerald-500 to-teal-600" },
              { title: "Gap Assessment & Remediation", description: "Identify compliance gaps, prioritize remediation, and track progress toward compliance objectives.", icon: FileCheck, color: "from-teal-500 to-emerald-600" },
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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Frameworks Supported</h2>
              <div className="space-y-4">
                {[
                  { name: "NCA ECC (Saudi Arabia)", description: "National Cybersecurity Authority Essential Cybersecurity Controls for KSA organisations" },
                  { name: "NCA CCC (Saudi Arabia)", description: "Critical Systems Cybersecurity Controls for critical infrastructure in KSA" },
                  { name: "SAMA CSF (KSA)", description: "Saudi Central Bank (SAMA) Cyber Security Framework for banking & financial institutions" },
                  { name: "SCA (UAE)", description: "UAE Securities and Commodities Authority cybersecurity requirements for UAE capital market participants" },
                  { name: "UAE TDRA / CSC", description: "UAE Telecommunications and Digital Government Regulatory Authority and Cyber Security Council requirements" },
                  { name: "EG-CERT (Egypt)", description: "Egyptian Computer Emergency Readiness Team guidelines for organisations regulated in Egypt" },
                  { name: "NTRA (Egypt)", description: "National Telecom Regulatory Authority cybersecurity requirements for Egyptian telecom sector organisations" },
                  { name: "ISO 27001:2022", description: "Information security management system controls and continuous monitoring" },
                  { name: "SOC 2", description: "Trust service criteria for security, availability, and confidentiality" },
                  { name: "NIST CSF", description: "Cybersecurity framework identify, protect, detect, respond, recover functions" },
                  { name: "PCI DSS", description: "Payment card data protection, network segmentation, and vulnerability management" },
                  { name: "HIPAA", description: "Healthcare data protection, access controls, and audit logging" },
                  { name: "GDPR", description: "Data privacy, breach notification, and privacy by design requirements" },
                ].map((fw) => (
                  <div key={fw.name} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">{fw.name}</div>
                      <div className="text-slate-600 text-sm">{fw.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Services Used in This Solution</h2>
              <div className="grid gap-4">
                {[
                  { name: "PurpleVAPT", description: "Compliance-aligned vulnerability testing", path: "/services/purple-x/purplevapt" },
                  { name: "PurpleSOC", description: "24/7 monitoring with audit-ready reporting", path: "/services/purple-x/purplesoc" },
                  { name: "PurpleConfig", description: "CIS benchmark and configuration compliance", path: "/services/purple-x/purpleconfig" },
                  { name: "Managed EDR", description: "Endpoint security and event logging", path: "/services/managed-x/managed-edr" },
                  { name: "Managed Identity", description: "Access controls and identity governance", path: "/services/managed-x/managed-identity" },
                ].map((service) => (
                  <Link key={service.name} href={service.path}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-900">{service.name}</div>
                          <div className="text-slate-600 text-sm">{service.description}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-emerald-600" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
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
                <p className="text-slate-600 text-sm leading-relaxed">In the UAE, PurpleGuard covers UAE TDRA requirements, UAE Cyber Security Council (CSC) mandates, and SCA (Securities and Commodities Authority) cybersecurity requirements for capital market participants in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, PurpleGuard covers NCA ECC 1-1:2018, NCA CCC, SAMA Cyber Security Framework, and SCA (Capital Market Authority) requirements for financial and capital market organisations in Riyadh.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Egypt, PurpleGuard addresses EG-CERT guidelines, NTRA cybersecurity requirements for the telecom sector, and CBE cybersecurity requirements for financial institutions in Cairo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {complianceFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for your next audit? We'll make sure you are.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleGuard turns compliance from a once-a-year scramble into a continuous, evidence-backed operation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Book Compliance Consultation
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Compliance &amp; Audit Readiness Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
