import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, ChevronRight, Calendar, ArrowLeft, Shield, RefreshCw, Activity, Settings, FileText, CheckCircle, TrendingUp, Zap, Server } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Endpoint UAE & Egypt", subtitle: "Centralized Endpoint Management, Patching & Compliance Monitoring", category: "Managed X", color: "blue" });

export const metadata: Metadata = {
  title: { absolute: "Managed Endpoint Security Dubai UAE — Patching & Compliance Monitoring | PurpleGuard" },
  description:
    "Managed Endpoint: centralized patching, health monitoring & compliance posture for UAE, Egypt & KSA. Book a free endpoint security assessment.",
  keywords: ["managed endpoint UAE", "endpoint management Dubai", "patch management Egypt", "endpoint compliance UAE", "Windows Linux patching", "TDRA compliance", "NCA ECC endpoint"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-endpoint" },
  openGraph: {
    title: "Managed Endpoint Security Dubai UAE | PurpleGuard",
    description: "Centralized patching, health monitoring, and endpoint compliance for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed Endpoint UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Endpoint — Patch & Hardening UAE | PurpleGuard",
      description: "Fully managed endpoint patching & hardening for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const endpointFaqs = [
  { question: "What does Managed Endpoint cover?", answer: "Managed Endpoint handles the full lifecycle of your endpoints — Windows, macOS, and Linux. This includes patch management, OS and software updates, configuration hardening, software deployment, compliance monitoring, and device health reporting — all delivered as a managed service without requiring your internal IT team." },
  { question: "How does Managed Endpoint reduce security risk?", answer: "Unpatched software is one of the top causes of compromise. Managed Endpoint ensures all systems are patched within agreed SLAs, hardened against known misconfigurations, and continuously monitored for compliance drift — closing the gaps that ransomware and threat actors exploit." },
  { question: "Does Managed Endpoint support NCA ECC vulnerability management requirements?", answer: "Yes. Managed Endpoint's patch management and configuration hardening aligns with NCA ECC Vulnerability Management controls, UAE TDRA security requirements, and ISO 27001 patch management controls. Monthly dashboards show patch compliance rates ready for auditors." },
  { question: "Can Managed Endpoint work alongside our existing IT helpdesk?", answer: "Yes. PurpleGuard Managed Endpoint is designed to complement your internal IT team. We handle the security-focused management tasks — patching, hardening, compliance monitoring — while your helpdesk focuses on user support. Clear escalation paths keep coordination seamless." },
];

export default function ManagedEndpointPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed Endpoint — Patch Management & Device Hardening", description: "Fully managed endpoint lifecycle: patching, hardening, and compliance monitoring for Windows, macOS, and Linux across UAE, Egypt, and KSA.", url: "/services/managed-x/managed-endpoint", category: "Managed Security" });
  const faqSchema = faqJsonLd(endpointFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed Endpoint", url: "/services/managed-x/managed-endpoint" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6">Managed-X | Endpoint Management</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Endpoint — Centralized Management, Patching & Compliance
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Continuous endpoint visibility, automated patching, and policy enforcement for workstations and servers in hybrid environments.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Automated patch management", "Endpoint health monitoring", "Compliance posture reporting"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get Started
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed Endpoint?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed Endpoint provides centralized, continuous endpoint management for organizations that need reliable patch management, device health monitoring, and configuration enforcement without dedicating internal resources to endpoint operations.
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
              { title: "Patch & Update Management", description: "Automated OS and application patching across Windows and Linux endpoints with testing and rollback capabilities.", icon: RefreshCw, color: "from-blue-500 to-cyan-600" },
              { title: "Endpoint Inventory & Lifecycle", description: "Complete visibility into all managed endpoints, hardware specs, OS versions, and software inventory.", icon: Cpu, color: "from-cyan-500 to-blue-600" },
              { title: "Configuration & Policy Enforcement", description: "Centralized policy management to enforce security baselines and compliance requirements.", icon: Settings, color: "from-blue-600 to-cyan-700" },
              { title: "Device Health Monitoring", description: "Continuous monitoring of endpoint health metrics with proactive alerts for issues.", icon: Activity, color: "from-cyan-600 to-blue-700" },
              { title: "Compliance Posture Reporting", description: "Regular reports showing patch compliance, configuration drift, and endpoint security posture.", icon: FileText, color: "from-blue-500 to-cyan-600" },
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
              { title: "Reduces IT overhead and operational burden", icon: Server },
              { title: "Improves endpoint hygiene and patch compliance", icon: Shield },
              { title: "Lowers misconfiguration and vulnerability risk", icon: Zap },
              { title: "Supports audit readiness and compliance reporting", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$6 per endpoint per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Simple per-endpoint pricing. Volume discounts available for organizations with 100+ endpoints.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed Endpoint Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed Endpoint supports UAE TDRA and UAE Cyber Security Council patch management and compliance requirements for organisations across Dubai and the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, Managed Endpoint aligns with NCA ECC 1-1:2018 patch management controls and SAMA Cyber Security Framework endpoint requirements for financial institutions.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed Endpoint meets EG-CERT guidelines and NTRA endpoint security requirements for the telecom and banking sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {endpointFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Keep your endpoints healthy. Always.</h2>
          <p className="text-xl text-slate-300 mb-8">Let PurpleGuard handle endpoint management so your team can focus on the business.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Start Today
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
