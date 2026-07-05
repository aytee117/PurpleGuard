import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ChevronRight, Calendar, ArrowLeft, AlertTriangle, Eye, Database, Settings, Lock, Zap, CheckCircle } from "lucide-react";
import { faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Ransomware Defense — UAE & Egypt", subtitle: "Prevention · Detection · Containment · Recovery Across All Layers", category: "Solutions", color: "red" });

export const metadata: Metadata = {
  title: { absolute: "Ransomware Defense Dubai UAE — Prevention, Detection & Recovery | PurpleGuard" },
  description:
    "Ransomware defense for UAE, Egypt & KSA: layered prevention, real-time detection, automated containment & rapid recovery. Book a free review.",
  keywords: ["ransomware defense UAE", "ransomware protection Dubai", "ransomware recovery Egypt", "ransomware prevention UAE", "immutable backup UAE", "EDR ransomware", "NCA ECC ransomware"],
  alternates: { canonical: "https://www.purpleguard.io/solutions/ransomware-defense" },
  openGraph: {
    title: "Ransomware Defense UAE — PurpleGuard",
    description: "Layered ransomware prevention, detection, containment & recovery for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Ransomware Defense UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ransomware Defense UAE & Egypt | PurpleGuard",
      description: "Full ransomware prevention, detection & recovery for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const ransomwareFaqs = [
  { question: "How does PurpleGuard protect against ransomware?", answer: "PurpleGuard provides a layered ransomware defense: endpoint detection and response (EDR) to block and contain execution; network detection (NDR) to identify lateral movement; identity protection to stop credential-based access; immutable backup to guarantee recovery; and 24/7 SOC monitoring to catch early-stage indicators before encryption begins." },
  { question: "What happens if ransomware gets through — can we recover?", answer: "Yes. PurpleGuard's defense includes air-gapped, immutable backup management so you always have a clean, recent restore point. In the event of a ransomware incident, our SOC team isolates affected systems, preserves forensic evidence, and guides recovery — reducing downtime from weeks to hours." },
  { question: "Does ransomware defense meet NCA ECC or EG-CERT incident response requirements?", answer: "Yes. Our incident response procedures are aligned with NCA ECC incident management controls, EG-CERT best practices, and UAE TDRA guidelines. We maintain a documented IR plan and provide post-incident reports in the format required by regulators." },
  { question: "How quickly can ransomware be contained?", answer: "Our SOC monitors for ransomware indicators 24/7 with automated isolation playbooks. In most cases, containment of an active ransomware event is achieved within minutes of detection — before encryption spreads beyond the initially compromised host." },
];

export default function RansomwareDefensePage() {
  const faqSchema = faqJsonLd(ransomwareFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/solutions" },
      { name: "Ransomware Defense", url: "/solutions/ransomware-defense" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-red-900 via-orange-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/solutions">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Solutions
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 mb-6">Security Solution</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Ransomware Defense</h1>
            <p className="text-2xl text-red-300 font-semibold mb-6">Stop ransomware before it stops your business.</p>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              PurpleGuard delivers layered, ransomware-focused defense that prevents attacks, detects malicious behavior early, and enables rapid containment and recovery.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Prevention", "Detection", "Response", "Recovery"].map((fw) => (
                <Badge key={fw} className="bg-white/10 text-white border-white/20 text-sm py-1">{fw}</Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Assess Your Ransomware Risk
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
              Ransomware attacks have become more sophisticated, targeted, and destructive. Modern ransomware operators conduct multi-stage attacks — stealing credentials, establishing persistence, moving laterally across networks, exfiltrating data, and then encrypting systems. A successful attack can paralyze operations and cost millions in recovery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Layered Ransomware Defense</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">PurpleGuard combines multiple services across the attack chain to stop ransomware at every stage</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Prevention", description: "Reduce the attack surface through vulnerability management, endpoint hardening, and email security to stop initial access.", icon: Shield, color: "from-red-500 to-orange-600" },
              { title: "Early Detection", description: "Behavioral endpoint and network detection to identify ransomware precursors — credential abuse, lateral movement, and data staging.", icon: Eye, color: "from-orange-500 to-red-600" },
              { title: "Rapid Containment", description: "Automated endpoint isolation and SOC-coordinated response to contain threats before encryption begins.", icon: AlertTriangle, color: "from-red-600 to-orange-700" },
              { title: "Identity Protection", description: "MFA enforcement and conditional access to prevent credential-based lateral movement — a key ransomware tactic.", icon: Lock, color: "from-orange-600 to-red-700" },
              { title: "Configuration Hardening", description: "CIS benchmark enforcement to remove misconfigurations that ransomware operators exploit.", icon: Settings, color: "from-red-500 to-orange-600" },
              { title: "Resilient Recovery", description: "Immutable backups and tested recovery procedures to restore operations quickly when prevention fails.", icon: Database, color: "from-orange-500 to-red-600" },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Services Used in This Solution</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Managed EDR", description: "Ransomware detection and automated containment", path: "/services/managed-x/managed-edr" },
              { name: "PurpleSentinel (MDR)", description: "Cross-domain threat hunting and response", path: "/services/purple-x/purplesentinel" },
              { name: "Managed Backup & BCDR", description: "Immutable backup and fast recovery", path: "/services/managed-x/managed-backup-bcdr" },
              { name: "Managed Email Security", description: "Block phishing — the #1 ransomware entry point", path: "/services/managed-x/managed-email-security" },
              { name: "PurpleConfig", description: "Harden systems against ransomware exploitation", path: "/services/purple-x/purpleconfig" },
              { name: "Managed Identity", description: "Stop credential abuse and lateral movement", path: "/services/managed-x/managed-identity" },
            ].map((service) => (
              <Link key={service.name} href={service.path}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{service.name}</div>
                      <div className="text-slate-600 text-sm">{service.description}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-red-600" />
                  </CardContent>
                </Card>
              </Link>
            ))}
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
                <p className="text-slate-600 text-sm leading-relaxed">In the UAE, ransomware defense supports UAE TDRA incident response requirements and UAE Cyber Security Council resilience mandates for Dubai organisations.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, ransomware defense aligns with NCA ECC 1-1:2018 malware protection controls and SAMA Cyber Security Framework incident response requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, ransomware defense meets EG-CERT incident response guidelines and NTRA resilience requirements for critical infrastructure sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {ransomwareFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-900 via-orange-800 to-red-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't wait until ransomware hits to plan your defense.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleGuard builds layered ransomware resilience across every attack surface.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Assess Your Ransomware Risk
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Ransomware Defense Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
