import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ChevronRight, Calendar, ArrowLeft, Activity, Lock, Eye, FileText, CheckCircle, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed EDR — UAE & Egypt", subtitle: "Endpoint Threat Detection, Automated Containment & SOC-Backed Response", category: "Managed X", color: "indigo" });

export const metadata: Metadata = {
  title: { absolute: "Managed EDR Dubai UAE — Endpoint Threat Detection & Response | PurpleGuard" },
  description:
    "Managed EDR: behavioural threat detection, automated containment & SOC-backed investigation for UAE, Egypt & KSA. Book a free endpoint review.",
  keywords: ["managed EDR UAE", "endpoint detection response Dubai", "EDR service Egypt", "behavioural threat detection", "endpoint security UAE", "MITRE ATT&CK EDR", "NCA ECC EDR"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-edr" },
  openGraph: {
    title: "Managed EDR Dubai UAE | PurpleGuard",
    description: "Behavioural EDR with automated containment and SOC investigation for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed EDR UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed EDR UAE — Endpoint Detection | PurpleGuard",
      description: "24/7 managed endpoint detection & response for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const edrFaqs = [
  { question: "What is Managed EDR and how is it different from traditional antivirus?", answer: "Endpoint Detection and Response (EDR) goes beyond signature-based antivirus. Managed EDR uses behavioural AI to detect fileless attacks, living-off-the-land techniques, and zero-day exploits that antivirus misses. PurpleGuard manages the entire EDR lifecycle — deployment, tuning, monitoring, and response — on your behalf 24/7." },
  { question: "Which EDR platforms does PurpleGuard support?", answer: "PurpleGuard can manage leading EDR platforms including Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne, and others. We normalise alerts, tune detection rules, and provide expert-led response — regardless of which platform fits your environment." },
  { question: "Does Managed EDR support NCA ECC endpoint protection requirements?", answer: "Yes. Our Managed EDR service aligns with NCA ECC Endpoint Security controls, UAE TDRA security baseline requirements, and ISO 27001 malware protection controls. Monthly reports map detected and blocked threats to framework controls." },
  { question: "How does PurpleGuard respond when an endpoint is compromised?", answer: "When a threat is detected, our SOC analysts validate the alert, isolate the affected endpoint if needed, conduct root cause analysis, remove the threat, and guide remediation. All response actions are documented and reported within agreed SLAs." },
];

export default function ManagedEDRPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed EDR — Endpoint Detection & Response", description: "24/7 managed endpoint detection and response. Behavioural AI plus expert analyst response for all endpoints across UAE, Egypt, and KSA.", url: "/services/managed-x/managed-edr", category: "Managed Security" });
  const faqSchema = faqJsonLd(edrFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed EDR", url: "/services/managed-x/managed-edr" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 mb-6">Managed-X | Endpoint Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed EDR — Endpoint Threat Detection & Response
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Continuous behavioral threat detection, automated containment, and expert-led incident investigation for every endpoint.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Behavioral & AI-driven detection", "Automated isolation & remediation", "SOC-backed investigation"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get EDR Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed EDR?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed EDR delivers enterprise-grade endpoint detection and response as a fully managed service. PurpleGuard deploys, manages, and monitors EDR technology, handles all alert triage and investigation, and responds to confirmed threats — so your endpoints are protected without internal security overhead.
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
              { title: "Behavioral Threat Detection", description: "AI and ML-driven analysis of endpoint behavior to detect malware, ransomware, and novel attack techniques.", icon: Eye, color: "from-purple-500 to-indigo-600" },
              { title: "Automated Isolation & Remediation", description: "Instant endpoint isolation and automated remediation to contain threats before they spread.", icon: Lock, color: "from-indigo-500 to-purple-600" },
              { title: "Endpoint Telemetry Correlation", description: "Rich endpoint telemetry correlated with network and identity data for full context.", icon: Activity, color: "from-purple-600 to-indigo-700" },
              { title: "SOC Escalation Workflows", description: "Expert analysts review confirmed threats, coordinate response, and provide remediation guidance.", icon: AlertTriangle, color: "from-indigo-600 to-purple-700" },
              { title: "Incident Reporting", description: "Detailed incident reports with root cause analysis, timeline, and recommendations.", icon: FileText, color: "from-purple-500 to-indigo-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Faster threat detection and response", icon: Zap },
              { title: "Reduced ransomware impact", icon: Shield },
              { title: "Lower attacker dwell time", icon: TrendingUp },
              { title: "Stronger endpoint visibility and control", icon: Eye },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$18 per endpoint per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Full EDR management including deployment, tuning, monitoring, and response. Volume pricing available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed EDR Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed EDR supports UAE TDRA and UAE Cyber Security Council endpoint security requirements for organisations in Dubai and across the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, Managed EDR aligns with NCA ECC 1-1:2018 endpoint protection controls and SAMA Cyber Security Framework requirements for financial institutions.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed EDR provides EG-CERT-aligned endpoint detection and response, meeting NTRA and CBE endpoint security requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {edrFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your endpoints are the frontline. Protect them.</h2>
          <p className="text-xl text-slate-300 mb-8">Managed EDR delivers always-on endpoint protection without the internal security overhead.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Deploy EDR Today
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
