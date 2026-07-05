import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ChevronRight, Calendar, ArrowLeft, Shield, Eye, Activity, Globe, Lock, Target, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "NDR — Network Detection & Response UAE & Egypt", subtitle: "PurpleReveal: Deep Network Traffic Inspection & Behavioural Detection", category: "Purple X", color: "cyan" });

export const metadata: Metadata = {
  title: { absolute: "Network Detection & Response (NDR) Dubai UAE — PurpleReveal | PurpleGuard" },
  description:
    "PurpleReveal NDR: deep network traffic inspection & behavioural threat detection for UAE, Egypt & KSA. 24/7 managed service. Book a free demo.",
  keywords: ["NDR UAE", "network detection response Dubai", "NTA Egypt", "network traffic analysis UAE", "lateral movement detection", "managed NDR", "NCA ECC network monitoring"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplereveal" },
  openGraph: {
    title: "NDR Services Dubai UAE — PurpleReveal | PurpleGuard",
    description: "Deep network detection & response across on-prem and cloud for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleReveal — NDR UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleReveal — Threat Intelligence UAE | PurpleGuard",
      description: "Dark web monitoring & threat intelligence for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const revealFaqs = [
  { question: "What is NDR and why is it different from a firewall?", answer: "Network Detection and Response (NDR) analyses all network traffic in real time to detect threats that bypass perimeter controls. Firewalls block known bad traffic at the edge. NDR detects anomalies, lateral movement, encrypted command-and-control traffic, and data exfiltration inside your network — threats that are already past the firewall." },
  { question: "Does PurpleReveal work with encrypted traffic?", answer: "Yes. PurpleReveal uses machine learning and behavioural analysis to detect threats in encrypted traffic without decryption. It identifies anomalous traffic patterns, unusual connection volumes, and known threat actor infrastructure based on metadata and behaviour — not just packet inspection." },
  { question: "How does NDR support NCA ECC or NTRA network monitoring requirements?", answer: "PurpleReveal's continuous network monitoring supports NCA ECC network security controls, NTRA monitoring requirements (Egypt), and UAE TDRA network security guidelines. All detected events are logged with compliance-grade timestamps and chain-of-custody for incident investigations." },
  { question: "Can PurpleReveal detect insider threats?", answer: "Yes. PurpleReveal establishes a behavioural baseline for each device and user on the network. Deviations — such as unusual data transfers, access to sensitive shares outside normal hours, or connection to unfamiliar external services — trigger alerts that may indicate insider threats or compromised accounts." },
];

export default function PurpleRevealPage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleReveal — Network Detection & Response (NDR)", description: "Deep network traffic analysis, behavioural detection, and threat hunting across on-premises and cloud networks. East-west traffic visibility for UAE, Egypt, and KSA.", url: "/services/purple-x/purplereveal", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(revealFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleReveal", url: "/services/purple-x/purplereveal" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 mb-6">Purple-X | Network Visibility</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleReveal — Network Detection & Response (NDR)
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Deep, real-time insight into network traffic to detect advanced threats that bypass endpoint and perimeter controls.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Deep packet inspection", "East-west traffic visibility", "Behavioral anomaly detection"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Request NDR Assessment
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleReveal?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleReveal provides deep, real-time insight into network traffic to detect advanced threats that bypass traditional security controls. By analyzing north-south and east-west traffic patterns, PurpleReveal identifies lateral movement, command-and-control activity, and anomalous behavior that other tools miss.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleReveal</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Deep Network Traffic Inspection", description: "Full packet capture and analysis to understand exactly what's traversing your network.", icon: Network, color: "from-cyan-500 to-blue-600" },
              { title: "East-West Traffic Visibility", description: "Detect lateral movement and internal threats that never touch your perimeter controls.", icon: Activity, color: "from-blue-500 to-cyan-600" },
              { title: "Behavioral & Anomaly Detection", description: "ML-driven behavioral analysis to surface deviations from normal network patterns.", icon: Eye, color: "from-cyan-600 to-blue-700" },
              { title: "Threat Hunting Support", description: "NDR telemetry feeds proactive threat hunts to surface hidden adversaries.", icon: Target, color: "from-blue-600 to-cyan-700" },
              { title: "Zero Trust & Lateral Movement Detection", description: "Map network behavior to Zero Trust principles and detect unauthorized lateral movement.", icon: Lock, color: "from-cyan-500 to-blue-600" },
              { title: "Cloud Network Visibility", description: "Extend NDR coverage to cloud environments and hybrid infrastructure.", icon: Globe, color: "from-blue-500 to-cyan-600" },
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
              { title: "Detect stealthy and advanced threats", icon: Eye },
              { title: "Improved visibility across on-prem and cloud networks", icon: Globe },
              { title: "Enhanced Zero Trust initiatives", icon: Lock },
              { title: "Strong complement to EDR and SOC services", icon: Shield },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Starting at $1,500/month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Pricing scales with environment size, network throughput, and cloud coverage.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Calendar className="h-5 w-5 mr-2" /> Book a Network Security Review
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
                <p className="text-slate-600 text-sm leading-relaxed">PurpleReveal NDR supports UAE TDRA and UAE Cyber Security Council network visibility requirements for critical infrastructure organisations in Dubai and the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, PurpleReveal network detection aligns with NCA ECC 1-1:2018 network monitoring controls and SAMA Cyber Security Framework requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleReveal NDR provides EG-CERT-aligned network traffic analysis, meeting NTRA and CBE network security requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {revealFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">See everything moving on your network.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleReveal gives you the network visibility to detect what other tools miss.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=PurpleReveal NDR Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
