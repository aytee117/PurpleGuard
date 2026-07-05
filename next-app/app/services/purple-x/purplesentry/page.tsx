import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ChevronRight, Calendar, ArrowLeft, Globe, Shield, Eye, Search, KeyRound, CheckCircle, Zap, TrendingUp, Target } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Threat Intelligence & EASM — UAE, Egypt & KSA", subtitle: "PurpleSentry: External Attack Surface Management & Digital Risk Protection", category: "Purple X", color: "orange" });

export const metadata: Metadata = {
  title: { absolute: "Threat Intelligence & EASM Dubai UAE — PurpleSentry | PurpleGuard" },
  description:
    "PurpleSentry: external attack surface monitoring & dark web threat intelligence for UAE, Egypt & KSA. Book your free exposure assessment today.",
  keywords: ["threat intelligence UAE", "EASM Dubai", "external attack surface management Egypt", "dark web monitoring UAE", "digital risk protection", "CTI service", "NCA ECC threat intelligence"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplesentry" },
  openGraph: {
    title: "Threat Intelligence & EASM UAE — PurpleSentry | PurpleGuard",
    description: "Continuous external attack surface monitoring and threat intelligence for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleSentry — EASM UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleSentry — NDR Network Detection UAE | PurpleGuard",
      description: "Network detection & response for UAE, Egypt & KSA east-west traffic.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const sentryFaqs = [
  { question: "What does PurpleSentry monitor?", answer: "PurpleSentry continuously monitors your internet-facing attack surface — domains, subdomains, IP ranges, cloud assets, exposed services, SSL certificates, leaked credentials, and dark web mentions. It provides 24/7 digital risk protection with real-time alerts when new exposure is detected." },
  { question: "How is PurpleSentry different from a one-time penetration test?", answer: "A penetration test is a point-in-time assessment. PurpleSentry is continuous — it monitors your external attack surface 24/7 and alerts you whenever your exposure changes. New domains, misconfigured services, or exposed credentials are flagged automatically as they appear." },
  { question: "Does PurpleSentry support NCA ECC threat intelligence requirements?", answer: "Yes. PurpleSentry's threat intelligence feeds and attack surface monitoring align with NCA ECC Threat Management controls and UAE TDRA requirements. Dark web monitoring also supports brand protection and data leakage detection required by Egyptian EG-CERT guidelines." },
  { question: "Can PurpleSentry discover assets we don't know we have?", answer: "Yes. PurpleSentry's asset discovery engine continuously scans the internet to find domains, cloud resources, and services associated with your organisation — including shadow IT and forgotten assets that your internal inventory may not include." },
];

export default function PurpleSentryPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleSentry — Threat Intelligence & External Attack Surface Management", description: "Continuous external attack surface monitoring, dark web surveillance, and digital risk protection for organisations in UAE, Egypt, and KSA.", url: "/services/purple-x/purplesentry", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(sentryFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleSentry", url: "/services/purple-x/purplesentry" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 mb-6">Purple-X | External Risk & Intelligence</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleSentry — Threat Intelligence, EASM & Digital Risk Protection
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Know what attackers know about you — before they act on it. Continuous monitoring of your external attack surface and digital risk exposure.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["External attack surface discovery", "Dark web & credential monitoring", "Brand & digital risk protection"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Request EASM Assessment
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleSentry?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleSentry focuses on identifying and managing risks outside the traditional perimeter. By continuously monitoring your external attack surface and digital presence, PurpleSentry gives you early warning of exposures, data leaks, brand impersonation, and threat actor interest — before any damage is done.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleSentry</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "External Attack Surface Management", description: "Continuous discovery and monitoring of all internet-facing assets — known and unknown.", icon: Globe, color: "from-orange-500 to-red-600" },
              { title: "Internet-Facing Asset Discovery", description: "Identifies exposed services, open ports, misconfigured cloud resources, and forgotten assets.", icon: Search, color: "from-red-500 to-orange-600" },
              { title: "Dark Web Monitoring", description: "Monitors underground forums, paste sites, and dark web marketplaces for stolen credentials and data.", icon: Eye, color: "from-orange-600 to-red-700" },
              { title: "Brand & Domain Protection", description: "Detects phishing domains, brand impersonation, and fraudulent use of your identity online.", icon: Shield, color: "from-red-600 to-orange-700" },
              { title: "Credential & Data Leak Monitoring", description: "Early warning when employee credentials or sensitive data appear in breach databases.", icon: KeyRound, color: "from-orange-500 to-red-600" },
              { title: "Threat Intelligence Enrichment", description: "Context-rich intelligence on threat actors, campaigns, and TTPs targeting your industry.", icon: AlertTriangle, color: "from-red-500 to-orange-500" },
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
              { title: "Visibility into unknown or unmanaged assets", icon: Globe },
              { title: "Early warning of data leaks and credential exposure", icon: Eye },
              { title: "Reduced risk of brand abuse and impersonation", icon: Shield },
              { title: "Improved external risk posture", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Starting at $750/month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Pricing scales with the number of domains, brands, and coverage depth required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Calendar className="h-5 w-5 mr-2" /> Book a Consultation
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
                <p className="text-slate-600 text-sm leading-relaxed">PurpleSentry EASM supports UAE TDRA and UAE Cyber Security Council external attack surface monitoring requirements for organisations in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, PurpleSentry monitors dark web exposure relevant to NCA ECC and SAMA Cyber Security Framework requirements for financial sector organisations.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleSentry provides digital risk protection aligned with EG-CERT guidelines and NTRA exposure monitoring requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {sentryFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">See your business the way attackers do.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleSentry monitors what's exposed so you can act before threats materialize.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Get a Free Exposure Report
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=PurpleSentry Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
