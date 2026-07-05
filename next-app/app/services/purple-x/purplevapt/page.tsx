import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ChevronRight, ArrowLeft, Shield, Target, Globe, Cloud, FileSearch, CheckCircle, Eye, Zap, TrendingUp, X, Check, RefreshCw, Clock, Layers, Calculator } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "VAPT Services UAE & Egypt", subtitle: "Vulnerability Assessment & Penetration Testing — PurpleVAPT", category: "Purple X", color: "purple" });

export const metadata: Metadata = {
  title: { absolute: "VAPT Services Dubai UAE — Vulnerability Assessment & Penetration Testing | PurpleGuard" },
  description:
    "PurpleVAPT: VAPT for networks, apps, cloud & APIs in UAE, Egypt & KSA. Risk-prioritized, compliance-ready. Book a free VAPT assessment today.",
  keywords: ["VAPT UAE", "penetration testing Dubai", "vulnerability assessment Egypt", "OWASP testing", "pen test UAE", "ISO 27001 VAPT", "NCA ECC vulnerability assessment"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplevapt" },
  openGraph: {
    title: "VAPT Services Dubai UAE — PurpleVAPT | PurpleGuard",
    description: "Continuous VAPT across networks, apps, cloud & APIs. Risk-prioritized and compliance-ready for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleVAPT — VAPT Services UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleVAPT — VAPT Services UAE & Egypt | PurpleGuard",
      description: "Continuous VAPT for networks, apps, cloud & APIs in UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const vaptFaqs = [
  { question: "What does PurpleVAPT include?", answer: "PurpleVAPT covers vulnerability assessment, penetration testing, application and API testing, cloud/SaaS configuration review, and business-aligned risk reporting. Testing is delivered in hybrid model — automated scanning plus expert-led manual validation." },
  { question: "How is PurpleVAPT different from a standard vulnerability scan?", answer: "A basic vulnerability scan is automated and generates raw output. PurpleVAPT adds expert-led penetration testing, exploit validation, business-risk prioritization, and compliance-aligned reporting — giving you validated, actionable findings rather than noisy scanner output." },
  { question: "Does PurpleVAPT meet UAE TDRA or NCA ECC requirements?", answer: "Yes. PurpleVAPT testing methodology aligns with UAE TDRA requirements and Saudi NCA ECC controls. Reports are structured to support audit evidence for ISO 27001, NCA ECC, and similar frameworks." },
  { question: "Can PurpleVAPT test cloud environments?", answer: "Yes. PurpleVAPT includes cloud and SaaS security evaluation covering configuration review for AWS, Azure, GCP, and Microsoft 365 — including exposed services, access controls, and storage misconfiguration." },
];

export default function PurpleVAPTPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleVAPT — Vulnerability Assessment & Penetration Testing", description: "Continuous vulnerability assessment and penetration testing for networks, applications, cloud, and APIs. Risk-prioritized and compliance-ready.", url: "/services/purple-x/purplevapt", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(vaptFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleVAPT", url: "/services/purple-x/purplevapt" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 mb-6">Purple-X | Exposure Identification</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleVAPT — Vulnerability Assessment & Penetration Testing
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Identify, validate, and prioritize exploitable risk across your environment—continuously and on demand.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Network, application, cloud, and API testing", "Automated + expert-led validation", "Compliance-aware, business-ready reporting"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/purple-x/purplevapt/calculator">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calculator className="h-5 w-5 mr-2" /> Estimate Your VAPT Cost
                </Button>
              </Link>
              <Link href="/services/purple-x">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  View Purple-X Services <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center">
            {[{ icon: Target, label: "MITRE ATT&CK–aligned testing" }, { icon: Shield, label: "OWASP Top 10 coverage" }, { icon: RefreshCw, label: "Subscription or engagement-based delivery" }].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-slate-600">
                <item.icon className="h-5 w-5 text-purple-600" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is PurpleVAPT */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleVAPT?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleVAPT is PurpleGuard's vulnerability assessment and penetration testing service designed to identify security weaknesses, validate real-world exploitability, and prioritize remediation based on business risk—not just CVSS scores.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleVAPT</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive testing coverage across your entire environment</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Vulnerability Assessment (VA)", description: "Continuous and scheduled scanning to identify known vulnerabilities and misconfigurations.", icon: Search, color: "from-purple-600 to-indigo-700" },
              { title: "Penetration Testing (PT)", description: "Expert-led testing to validate exploitability and attack paths across in-scope assets.", icon: Target, color: "from-indigo-600 to-purple-700" },
              { title: "Application & API Testing", description: "Assessment of web applications and APIs for OWASP Top 10 and logic flaws.", icon: Globe, color: "from-purple-500 to-indigo-600" },
              { title: "Cloud & SaaS Risk Evaluation", description: "Testing of cloud configurations, exposed services, and SaaS security posture.", icon: Cloud, color: "from-indigo-500 to-purple-600" },
              { title: "Risk Prioritization & Reporting", description: "Business-aligned findings with clear remediation guidance and executive summaries.", icon: FileSearch, color: "from-purple-600 to-indigo-600" },
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

      {/* How Delivered */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PurpleVAPT is Delivered</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">Hybrid Testing Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">PurpleVAPT combines automated scanning with manual validation to reduce false positives and highlight real risk.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">Compliance-Aware Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Testing aligned to common frameworks and audit expectations without "checkbox-only" output.</p>
                <div className="flex flex-wrap gap-2">
                  {["OWASP Top 10", "NIST", "ISO 27001", "SOC 2", "PCI DSS"].map((fw) => (
                    <Badge key={fw} variant="secondary" className="bg-purple-100 text-purple-700">{fw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Identifies exploitable weaknesses early", icon: Eye },
              { title: "Reduces attack surface and breach likelihood", icon: Shield },
              { title: "Improves remediation efficiency", icon: Zap },
              { title: "Supports audits and risk reporting", icon: TrendingUp },
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

      {/* Who is it for */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Who PurpleVAPT is For</h2>
            <div className="space-y-4">
              {["Organizations preparing for audits or certifications", "Businesses with internet-facing applications", "Cloud and SaaS environments", "Teams needing continuous risk visibility"].map((item) => (
                <div key={item} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">PurpleVAPT vs Basic Vulnerability Scanning</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-slate-200">
              <CardHeader className="bg-slate-100">
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2"><X className="h-5 w-5 text-slate-400" /> Basic Scanning</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {["Automated only", "Noisy results with false positives", "Limited context"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600">
                      <X className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <CardTitle className="text-xl text-white flex items-center gap-2"><Check className="h-5 w-5" /> PurpleVAPT</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {["Validated findings", "Exploit context included", "Business prioritization"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <Check className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/services/purple-x/purplevapt/calculator">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#5528ad] text-white">
                <Calculator className="h-5 w-5 mr-2" /> Estimate Cost
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Delivery Options</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "One-time assessment", description: "Point-in-time vulnerability assessment and penetration testing", icon: Target },
              { title: "Scheduled recurring testing", description: "Regular testing cycles aligned to your release or audit schedule", icon: Clock },
              { title: "Continuous VAPT subscription", description: "Ongoing vulnerability assessment with continuous validation", icon: RefreshCw },
            ].map((option) => (
              <Card key={option.title} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-7 w-7 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">{option.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-slate-600 text-sm">{option.description}</p></CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services/purple-x/purplevapt/calculator">
              <Button className="bg-[#6633cc] hover:bg-[#5528ad] text-white">
                <Calculator className="h-4 w-4 mr-2" /> Indicative Pricing Calculator
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="link" className="text-purple-600 hover:text-purple-700">
                View Pricing Explained <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Part of lifecycle */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Part of the Purple-X Security Lifecycle</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PurpleVAPT integrates with PurpleSOC, PurpleSentinel (MDR), PurpleConfig, and PurpleStrike to provide continuous exposure management and validation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "PurpleSOC", path: "/services/purple-x/purplesoc", description: "24/7 Managed SOC" },
              { name: "PurpleSentinel (MDR)", path: "/services/purple-x/purplesentinel", description: "Managed Detection & Response" },
              { name: "PurpleConfig", path: "/services/purple-x/purpleconfig", description: "Configuration Management" },
              { name: "PurpleStrike", path: "/services/purple-x/purplestrike", description: "Red Teaming & BAS" },
            ].map((service) => (
              <Link key={service.name} href={service.path}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-slate-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {vaptFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


        {/* Geo-Regulatory Context */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Serving UAE, Egypt & Saudi Arabia</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">🇦🇪 United Arab Emirates</div>
                <p className="text-slate-600 text-sm leading-relaxed">PurpleVAPT testing methodology aligns with UAE TDRA and UAE Cyber Security Council requirements, helping Dubai and Abu Dhabi organisations meet vulnerability assessment mandates.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">🇸🇦 Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, PurpleVAPT maps findings to NCA ECC 1-1:2018 and NCA CCC controls, supporting organisations in Riyadh and Jeddah preparing for NCA audits.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">🇪🇬 Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleVAPT reports are structured to meet EG-CERT guidelines and NTRA security requirements for the banking and telecom sectors.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Know your weaknesses before attackers do.</h2>
          <p className="text-xl text-slate-300 mb-8">Get proactive about your security posture with continuous vulnerability assessment and penetration testing.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services/purple-x/purplevapt/calculator">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calculator className="h-5 w-5 mr-2" /> Get a Custom Quote
              </Button>
            </Link>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                Talk to a Security Expert
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
