import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, ChevronRight, Calendar, ArrowLeft, Shield, Activity, Settings, FileText, RefreshCw, CheckCircle, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Firewall UAE & Egypt", subtitle: "NGFW Policy Management, IDS/IPS & 24/7 Network Security Operations", category: "Managed X", color: "emerald" });

export const metadata: Metadata = {
  title: { absolute: "Managed Firewall Dubai UAE — NGFW & Perimeter Security Service | PurpleGuard" },
  description:
    "Managed Firewall: fully managed NGFW with IDS/IPS & 24/7 monitoring for UAE, Egypt & KSA. Book a free network security assessment today.",
  keywords: ["managed firewall UAE", "NGFW service Dubai", "firewall management Egypt", "network security UAE", "SD-WAN managed", "IDS IPS monitoring", "NCA ECC firewall"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-firewall" },
  openGraph: {
    title: "Managed Firewall Dubai UAE | PurpleGuard",
    description: "Fully managed NGFW and SD-WAN with 24/7 network security for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed Firewall UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Firewall UAE — 24/7 Network Security | PurpleGuard",
      description: "Expert-managed NGFW for UAE, Egypt & KSA — configuration, monitoring, compliance.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const firewallFaqs = [
  { question: "What does Managed Firewall include?", answer: "PurpleGuard's Managed Firewall service covers deployment, configuration, continuous monitoring, rule management, firmware updates, and compliance reporting for your network firewalls. This includes next-generation firewall (NGFW) features like application control, IPS, and SSL inspection — all managed by our expert team 24/7." },
  { question: "Which firewall vendors does PurpleGuard support?", answer: "PurpleGuard manages firewalls from leading vendors including Palo Alto Networks, Fortinet, Check Point, Cisco, and Sophos. We can take over management of your existing firewalls or design and deploy a new architecture aligned to your environment and compliance requirements." },
  { question: "How does Managed Firewall support NCA ECC compliance?", answer: "NCA ECC includes specific controls for network segmentation, access control, and perimeter security. PurpleGuard's Managed Firewall ensures rule sets are reviewed regularly, unnecessary access is revoked, and firewall configuration is audited against NCA ECC and UAE TDRA requirements with documented evidence." },
  { question: "What happens when a firewall alert fires at 3am?", answer: "PurpleGuard's SOC monitors firewall alerts 24/7. Critical alerts — such as blocked lateral movement, detected port scanning, or policy violations — are triaged immediately. Our analysts validate, escalate if needed, and take corrective action, so your team is only woken up for confirmed high-severity events." },
];

export default function ManagedFirewallPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed Firewall — 24/7 Network Security Management", description: "Fully managed next-generation firewall service: configuration, monitoring, rule management, and compliance reporting for UAE, Egypt, and KSA.", url: "/services/managed-x/managed-firewall", category: "Managed Security" });
  const faqSchema = faqJsonLd(firewallFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed Firewall", url: "/services/managed-x/managed-firewall" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 mb-6">Managed-X | Network Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Firewall — Perimeter & Network Security as a Service
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Full lifecycle management of your NGFW and SD-WAN infrastructure — including policy, monitoring, tuning, and response.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["NGFW & SD-WAN management", "24/7 monitoring & IPS", "Policy change management"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get Firewall Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed Firewall?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed Firewall includes everything needed to maintain a strong network perimeter — from initial deployment and policy configuration to ongoing monitoring, tuning, rule management, and incident response — all delivered by certified security engineers.
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
              { title: "NGFW & SD-WAN Management", description: "Full management of next-generation firewalls and SD-WAN from major vendors.", icon: Server, color: "from-emerald-500 to-teal-600" },
              { title: "Policy Configuration & Tuning", description: "Ongoing rule management, policy optimization, and access control enforcement.", icon: Settings, color: "from-teal-500 to-emerald-600" },
              { title: "IDS/IPS Monitoring", description: "Intrusion detection and prevention monitoring with expert-driven alert analysis.", icon: AlertTriangle, color: "from-emerald-600 to-teal-700" },
              { title: "Log Analysis & Alerting", description: "Continuous log analysis with real-time alerting for network security events.", icon: Activity, color: "from-teal-600 to-emerald-700" },
              { title: "Change Management", description: "Controlled change management process for firewall rule modifications.", icon: RefreshCw, color: "from-emerald-500 to-teal-600" },
              { title: "Compliance Reporting", description: "Regular firewall compliance reports aligned to PCI DSS, ISO 27001, and NIST.", icon: FileText, color: "from-teal-500 to-emerald-600" },
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
              { title: "Reduces configuration errors and security gaps", icon: Shield },
              { title: "Improves perimeter security posture", icon: TrendingUp },
              { title: "Frees internal IT and security resources", icon: Zap },
              { title: "Supports PCI DSS and regulatory firewall controls", icon: FileText },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$120 per firewall per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Per-firewall pricing including all management, monitoring, and operations. Pricing varies by model and SLA.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed FW Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed Firewall supports UAE TDRA and UAE Cyber Security Council network perimeter security requirements for organisations in Dubai and across the Emirates.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, Managed Firewall aligns with NCA ECC 1-1:2018 network security controls and SAMA Cyber Security Framework firewall management requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed Firewall meets EG-CERT guidelines and NTRA network security requirements for regulated sectors in Cairo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {firewallFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your perimeter deserves expert management.</h2>
          <p className="text-xl text-slate-300 mb-8">Let certified engineers handle your firewall operations while you focus on your business.</p>
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
