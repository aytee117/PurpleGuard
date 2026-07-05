import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ChevronRight, Calendar, ArrowLeft, Shield, Activity, Settings, AlertTriangle, CheckCircle, TrendingUp, Zap, Lock } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed WAF — Web & API Protection UAE & Egypt", subtitle: "OWASP Top 10, Bot Mitigation & DDoS Protection as a Managed Service", category: "Managed X", color: "orange" });

export const metadata: Metadata = {
  title: { absolute: "Managed WAF Dubai UAE — Web Application & API Security Service | PurpleGuard" },
  description:
    "Managed WAF: OWASP Top 10 protection, bot mitigation & API security for UAE, Egypt & KSA. Fully managed, 24/7. Book a free assessment.",
  keywords: ["managed WAF UAE", "web application firewall Dubai", "API security Egypt", "OWASP protection UAE", "DDoS mitigation", "bot management UAE", "NCA ECC WAF"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-waf" },
  openGraph: {
    title: "Managed WAF Dubai UAE | PurpleGuard",
    description: "OWASP Top 10, DDoS & API protection as a managed service for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed WAF UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed WAF UAE — Web App Protection | PurpleGuard",
      description: "Continuously tuned WAF against OWASP & API threats for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const wafFaqs = [
  { question: "What does a Managed WAF protect?", answer: "A Web Application Firewall (WAF) protects your web applications and APIs from OWASP Top 10 threats — SQL injection, XSS, RFI, CSRF, path traversal, bot attacks, and DDoS at the application layer. PurpleGuard manages WAF rules, monitors traffic, responds to attack spikes, and tunes the WAF continuously to match your specific application behaviour." },
  { question: "Does Managed WAF also protect APIs?", answer: "Yes. PurpleGuard's Managed WAF includes API security — protecting REST and GraphQL APIs from injection attacks, broken authentication, data exposure, and rate-limiting bypass. API protection policies are tuned to your specific API schema to minimise false positives." },
  { question: "How does Managed WAF help with NCA ECC or PCI DSS compliance?", answer: "PCI DSS requires a WAF or equivalent control for all internet-facing web applications that process card data. NCA ECC includes web application protection controls. PurpleGuard's Managed WAF provides the control implementation plus monthly compliance reports mapping WAF activity to applicable requirements." },
  { question: "Will the WAF block legitimate users or cause performance issues?", answer: "A poorly tuned WAF can create false positives. PurpleGuard's Managed WAF service includes a learning/tuning period where we baseline your normal traffic patterns before switching to enforcement mode. Continuous tuning ensures high detection rates with minimal impact on legitimate users and application performance." },
];

export default function ManagedWAFPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed WAF — Web Application & API Protection", description: "Continuously managed WAF protection against OWASP Top 10, bot attacks, and API threats. Tuned and monitored 24/7 for UAE, Egypt, and KSA.", url: "/services/managed-x/managed-waf", category: "Managed Security" });
  const faqSchema = faqJsonLd(wafFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed WAF", url: "/services/managed-x/managed-waf" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 mb-6">Managed-X | Application Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed WAF — Web Application & API Protection
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Protect your applications and APIs from OWASP Top 10, bot attacks, and volumetric threats — fully managed and continuously tuned.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["OWASP Top 10 protection", "API security enforcement", "Bot mitigation & DDoS protection"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get WAF Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed WAF?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed WAF protects your web applications and APIs against a broad spectrum of threats — from injection attacks and cross-site scripting to malicious bots and distributed denial-of-service. PurpleGuard handles deployment, rule tuning, monitoring, and incident response so you can focus on your application, not your security tools.
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
              { title: "OWASP Top 10 Protection", description: "Comprehensive rules covering all OWASP Top 10 web application vulnerabilities.", icon: Shield, color: "from-orange-500 to-red-600" },
              { title: "API Security Enforcement", description: "Schema-based API protection, rate limiting, and authentication enforcement.", icon: Lock, color: "from-red-500 to-orange-600" },
              { title: "Bot Mitigation", description: "Advanced bot detection and mitigation to block malicious automated traffic.", icon: AlertTriangle, color: "from-orange-600 to-red-700" },
              { title: "DDoS Protection", description: "Layer 7 DDoS protection to maintain application availability under attack.", icon: Globe, color: "from-red-600 to-orange-700" },
              { title: "Rule Tuning & Monitoring", description: "Continuous WAF rule tuning to minimize false positives and maintain coverage.", icon: Settings, color: "from-orange-500 to-red-600" },
              { title: "Incident Response", description: "Expert response to application-layer attacks with investigation and mitigation.", icon: Activity, color: "from-red-500 to-orange-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-900 via-red-800 to-orange-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reduces application attack surface", icon: Shield },
              { title: "Protects customer data from breaches", icon: Lock },
              { title: "Improves application availability and uptime", icon: Zap },
              { title: "Enables secure digital services and APIs", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$95 per application per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Per-application pricing for complete WAF management including tuning, monitoring, and response.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed WAF Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed WAF supports UAE TDRA and UAE Cyber Security Council web application security requirements for organisations in Dubai and across the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, Managed WAF aligns with NCA ECC 1-1:2018 web application protection controls and SAMA Cyber Security Framework application security requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed WAF meets EG-CERT guidelines and NTRA application security requirements for the banking and telecom sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {wafFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-900 via-red-800 to-orange-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your applications are targets. Protect them.</h2>
          <p className="text-xl text-slate-300 mb-8">Managed WAF delivers always-on application and API protection, fully tuned for your environment.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Get Started
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
