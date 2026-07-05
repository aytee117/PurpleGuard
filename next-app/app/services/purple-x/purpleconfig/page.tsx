import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ChevronRight, Calendar, ArrowLeft, Shield, CheckCircle, RefreshCw, FileText, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Configuration Hardening — UAE & Egypt", subtitle: "PurpleConfig: CIS Benchmarks & Security Hardening", category: "Purple X", color: "emerald" });

export const metadata: Metadata = {
  title: { absolute: "Security Configuration Hardening UAE — CIS Benchmarks & PurpleConfig | PurpleGuard" },
  description:
    "PurpleConfig: CIS & NIST security configuration hardening for UAE, Egypt & KSA. Detect misconfigurations, enforce secure baselines. Get started.",
  keywords: ["security hardening UAE", "CIS benchmarks Dubai", "configuration assessment Egypt", "NIST security controls", "secure baseline UAE", "ISO 27001 hardening", "NCA ECC configuration"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purpleconfig" },
  openGraph: {
    title: "Security Configuration Hardening UAE — PurpleConfig | PurpleGuard",
    description: "CIS benchmark-aligned configuration hardening and misco detection for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleConfig — Configuration Hardening UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleConfig — Security Hardening UAE | PurpleGuard",
      description: "CIS benchmarks & security configuration hardening for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const configFaqs = [
  { question: "What does PurpleConfig do?", answer: "PurpleConfig delivers continuous security configuration management and hardening across servers, cloud environments, network devices, and endpoints. We assess your configuration against CIS Benchmarks, DISA STIGs, and compliance frameworks, then remediate gaps and monitor for configuration drift continuously." },
  { question: "How does PurpleConfig reduce the risk of a breach?", answer: "Misconfiguration is the leading cause of cloud breaches. PurpleConfig enforces least-privilege access, disables unnecessary services, applies security baseline profiles, and monitors for any deviation — eliminating the configuration drift that attackers exploit." },
  { question: "Does PurpleConfig support NCA ECC or ISO 27001 hardening requirements?", answer: "Yes. PurpleConfig's hardening standards align with NCA ECC Asset Management and Protection controls, ISO 27001 Annex A controls, and UAE TDRA security baseline requirements. Configuration audit reports are structured as compliance evidence ready for auditors." },
  { question: "What platforms does PurpleConfig cover?", answer: "PurpleConfig covers Windows and Linux servers, AWS, Azure, and GCP cloud environments, Microsoft 365 tenants, Active Directory and Entra ID, network devices (firewalls, switches, routers), and endpoint operating systems." },
];

export default function PurpleConfigPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleConfig — Security Configuration Management & Hardening", description: "Continuous configuration hardening against CIS Benchmarks across servers, cloud, and network devices. Drift detection and compliance-aligned reporting.", url: "/services/purple-x/purpleconfig", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(configFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleConfig", url: "/services/purple-x/purpleconfig" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 mb-6">Purple-X | Configuration Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleConfig — Security Configuration Assessment & Hardening
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Continuously assess your systems against industry benchmarks and enforce secure configurations to eliminate misconfiguration risk.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["CIS benchmark assessments", "Continuous drift monitoring", "Remediation guidance"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Request Configuration Assessment
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleConfig?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleConfig continuously assesses systems and endpoints against industry-recognized security benchmarks (CIS, NIST, ISO 27001) to identify misconfigurations, enforce secure baselines, and monitor for security drift. It's the foundation of a strong security posture.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleConfig</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "CIS Benchmark Assessments", description: "Evaluate systems against CIS Level 1 and Level 2 benchmarks for Windows, Linux, and cloud platforms.", icon: Shield, color: "from-emerald-500 to-teal-600" },
              { title: "NIST-Aligned Configuration Checks", description: "Map configuration security to NIST CSF controls for compliance and risk management.", icon: FileText, color: "from-teal-500 to-emerald-600" },
              { title: "Endpoint Hardening", description: "Windows and Linux endpoint hardening to remove unnecessary attack surface.", icon: Settings, color: "from-emerald-600 to-teal-700" },
              { title: "Misconfiguration Detection", description: "Identify high-risk misconfigurations before they are exploited.", icon: AlertTriangle, color: "from-teal-600 to-emerald-700" },
              { title: "Security Drift Monitoring", description: "Continuous monitoring with alerts when configurations deviate from secure baselines.", icon: RefreshCw, color: "from-emerald-500 to-teal-600" },
              { title: "Remediation Recommendations", description: "Actionable, prioritized remediation guidance with technical and executive views.", icon: Zap, color: "from-teal-500 to-emerald-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reduced risk from misconfigurations", icon: AlertTriangle },
              { title: "Improved baseline security posture", icon: Shield },
              { title: "Continuous compliance visibility", icon: TrendingUp },
              { title: "Support for audits and regulatory requirements", icon: FileText },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Starting at $5/endpoint/month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Simple per-endpoint pricing that scales with your environment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="h-5 w-5 mr-2" /> Get Started
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
                <p className="text-slate-600 text-sm leading-relaxed">PurpleConfig maps hardening findings to UAE TDRA and UAE Cyber Security Council secure configuration requirements for organisations in Dubai and the Emirates.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, PurpleConfig benchmarks align with NCA ECC 1-1:2018 configuration controls and SAMA Cyber Security Framework hardening requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleConfig assesses configurations against EG-CERT guidelines and NTRA security baseline requirements for regulated sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {configFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Misconfiguration is the #1 cause of cloud breaches. Fix it.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleConfig gives you continuous visibility and control over your security baseline.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Book a Configuration Assessment
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=PurpleConfig Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
