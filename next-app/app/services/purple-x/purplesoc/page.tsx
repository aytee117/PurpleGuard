import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ChevronRight, Calendar, ArrowLeft, Shield, Target, Bell, Activity, FileText, CheckCircle, Clock, Zap, TrendingUp } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";
import { DirectDownloadButton } from "@/components/DirectDownloadButton";

const OG = ogImageUrl({ title: "24/7 Managed SOC — UAE & Egypt", subtitle: "PurpleSOC: Always-On Threat Monitoring & Incident Response", category: "Purple X", color: "blue" });

export const metadata: Metadata = {
  title: { absolute: "Managed SOC Dubai UAE — 24/7 Security Operations Center | PurpleGuard" },
  description:
    "PurpleSOC: 24/7 managed SOC for UAE, Egypt & KSA. SIEM-powered threat detection, alert triage & incident response. Book a free SOC assessment.",
  keywords: ["managed SOC UAE", "SOC as a service Dubai", "24/7 security monitoring Egypt", "SIEM managed service", "incident response UAE", "SOC 2 compliance", "NCA ECC SOC"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplesoc" },
  openGraph: {
    title: "Managed SOC Dubai UAE — PurpleSOC | PurpleGuard",
    description: "24/7 managed SOC with threat detection, incident response & compliance reporting for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleSOC — 24/7 Managed SOC UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleSOC — 24/7 Managed SOC UAE | PurpleGuard",
      description: "24/7 SIEM-powered managed SOC covering UAE, Egypt & KSA threats.",
      images: [OG],
    },
  };

const QUESTIONNAIRE_LINK = "/services/purple-x/purplesoc/questionnaire";

const socFaqs = [
  { question: "What is a managed SOC and how does PurpleSOC work?", answer: "A managed SOC (Security Operations Centre) monitors your environment 24/7 for threats, analyses alerts, and responds to incidents on your behalf. PurpleSOC ingests logs and signals from across your infrastructure into a cloud-native SIEM, applies threat intelligence, and provides human-led triage and response — without you needing to build an in-house team." },
  { question: "How quickly does PurpleSOC respond to incidents?", answer: "PurpleSOC targets a mean time to detect (MTTD) under 15 minutes and a mean time to respond (MTTR) under 30 minutes for critical incidents. All alerts are triaged by certified analysts, and high-severity events receive immediate escalation to your team with a containment recommendation." },
  { question: "Is PurpleSOC compliant with UAE TDRA and NCA ECC frameworks?", answer: "Yes. PurpleSOC is designed to support compliance with UAE TDRA requirements, Saudi NCA ECC controls, and Egyptian NTRA/EG-CERT guidelines. Monthly and quarterly reports map detected threats and response actions directly to framework controls, ready for audit." },
  { question: "What log sources and tools does PurpleSOC integrate with?", answer: "PurpleSOC integrates with firewalls, EDR/XDR solutions, cloud providers (AWS, Azure, GCP), Microsoft 365, identity providers (Active Directory, Entra ID), web application firewalls, and custom data sources via Syslog and API." },
];

export default function PurpleSOCPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleSOC — 24/7 Managed Security Operations Centre", description: "Continuous threat monitoring, detection, and incident response delivered as a fully managed 24/7 SOC service. Compliance-ready for UAE, Egypt, and KSA.", url: "/services/purple-x/purplesoc", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(socFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleSOC", url: "/services/purple-x/purplesoc" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6">Purple-X | Security Operations</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleSOC — 24/7 Managed Security Operations Center
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Always-on threat monitoring, detection, and incident response — without building an internal SOC.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["24/7 continuous monitoring", "Alert triage & incident investigation", "Compliance and audit-ready reporting"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={QUESTIONNAIRE_LINK}>
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Start the Discovery Questionnaire
                </Button>
              </Link>
              <Link href="/services/purple-x">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View Purple-X Services <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <DirectDownloadButton
                documentSlug="purplesoc-datasheet"
                buttonLabel="Download Datasheet"
                buttonClassName="border-white bg-white/20 text-white hover:bg-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center">
            {[{ icon: Clock, label: "24/7 expert coverage" }, { icon: Shield, label: "MITRE ATT&CK aligned" }, { icon: FileText, label: "Compliance-ready reporting" }].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-slate-600">
                <item.icon className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleSOC?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleSOC is PurpleGuard's fully managed Security Operations Center service. We provide continuous, around-the-clock monitoring, threat detection, alert triage, and incident response across your environment — so you get enterprise-grade security operations without building or staffing an internal SOC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleSOC</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Continuous Monitoring", description: "24/7 security monitoring across your entire environment — network, endpoints, cloud, and applications.", icon: Eye, color: "from-blue-500 to-cyan-600" },
              { title: "Alert Triage & Investigation", description: "Expert analysts triage every alert, reduce noise, and investigate suspicious events in real time.", icon: Bell, color: "from-cyan-500 to-blue-600" },
              { title: "Log Ingestion & Correlation", description: "Centralized log collection and SIEM-backed correlation to detect multi-stage attack patterns.", icon: Activity, color: "from-blue-600 to-cyan-700" },
              { title: "Threat Detection & Escalation", description: "Automated and manual detection with clear escalation playbooks and response procedures.", icon: Shield, color: "from-cyan-600 to-blue-700" },
              { title: "Incident Response Coordination", description: "Hands-on support for containment, eradication, and recovery when incidents occur.", icon: Target, color: "from-blue-500 to-indigo-600" },
              { title: "Compliance-Ready Reporting", description: "Regular reporting aligned to ISO 27001, SOC 2, NIST, and other frameworks.", icon: FileText, color: "from-indigo-500 to-blue-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Always-on operations without internal SOC overhead", icon: Clock },
              { title: "Faster detection and response times", icon: Zap },
              { title: "Reduced alert fatigue for your team", icon: Bell },
              { title: "Improved security maturity and compliance posture", icon: TrendingUp },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Who PurpleSOC is For</h2>
            <div className="space-y-4">
              {["Organizations lacking 24/7 internal security coverage", "Teams overwhelmed by alert volumes and false positives", "Businesses preparing for compliance certifications", "Organizations that have experienced security incidents and want to strengthen monitoring"].map((item) => (
                <div key={item} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pricing</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <CardTitle className="text-xl text-white">PurpleSOC</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">$1,500<span className="text-xl text-slate-500">/month</span></div>
                <p className="text-slate-600 mb-6">Starting price — final pricing depends on environment size, log volumes, and SLA requirements.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={QUESTIONNAIRE_LINK} className="flex-1">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="h-5 w-5 mr-2" /> Size my SOC & Get a Quote
                    </Button>
                  </Link>
                  <Link href="/pricing" className="flex-1">
                    <Button size="lg" variant="outline" className="w-full">View Pricing Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
                <p className="text-slate-600 text-sm leading-relaxed">PurpleSOC supports UAE organisations in meeting UAE TDRA and UAE Cyber Security Council continuous monitoring mandates for regulated entities in Dubai and across the Emirates.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, PurpleSOC aligns with NCA ECC 1-1:2018 security operations controls and SAMA Cyber Security Framework requirements for financial institutions in Riyadh.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleSOC provides EG-CERT-aligned incident detection and reporting, meeting CBE and NTRA security operations requirements in Cairo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {socFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your security never sleeps. Neither do we.</h2>
          <p className="text-xl text-slate-300 mb-8">Start your 24/7 managed security operations today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={QUESTIONNAIRE_LINK}>
              <Button size="lg" className="bg-[#5528ad] hover:bg-[#5528ad]/90 text-white">
                Start the Discovery Questionnaire →
              </Button>
            </Link>
            <Link href={QUESTIONNAIRE_LINK}>
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Size my SOC
              </Button>
            </Link>
            <a href="mailto:hello@purpleguard.io?subject=PurpleSOC Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
