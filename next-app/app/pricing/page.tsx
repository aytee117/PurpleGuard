import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, CheckCircle, Calendar, Shield, Cpu, Eye, Target, Users, Layers, Mail } from "lucide-react";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Cybersecurity Pricing — UAE & Egypt", subtitle: "Transparent, Subscription-Based MSSP Pricing — No Lock-Ins", category: "Pricing", color: "slate" });

export const metadata: Metadata = {
  title: { absolute: "Cybersecurity Pricing Dubai UAE — MSSP Pricing Explained | PurpleGuard" },
  description:
    "PurpleGuard MSSP pricing: subscription-based, no lock-ins. Quotes in AED & EGP for UAE, Egypt & KSA. Book a free scoping call today.",
  keywords: ["cybersecurity pricing UAE", "MSSP pricing Dubai", "managed security cost Egypt", "SOC pricing UAE", "VAPT cost", "MDR subscription UAE", "security services pricing"],
  alternates: { canonical: "https://www.purpleguard.io/pricing" },
  openGraph: {
    title: "Cybersecurity Pricing Dubai UAE | PurpleGuard",
    description: "Transparent MSSP pricing for UAE, Egypt & KSA — subscription-based, no lock-ins.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleGuard Cybersecurity Pricing UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Pricing Dubai UAE | PurpleGuard",
    description: "Transparent MSSP pricing for UAE, Egypt & KSA — subscription-based, no lock-ins.",
    images: [OG],
  },
};

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const bundles = [
  {
    name: "Managed Foundation Bundle",
    bestFor: "Best for small IT teams",
    includes: ["Managed Endpoint", "Managed EDR", "Managed Email Security"],
    outcome: "Baseline protection with minimal overhead.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Secure Infrastructure Bundle",
    bestFor: "Best for growing organizations",
    includes: ["Managed Endpoint", "Managed EDR", "Managed Firewall or SASE", "Managed Backup"],
    outcome: "Improved resilience and reduced operational risk.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "PurpleGuard Complete",
    bestFor: "Best for compliance-driven organizations",
    subtitle: "Managed-X + Purple-X",
    includes: ["Managed-X core services", "PurpleSOC or PurpleSentinel (MDR)", "PurpleVAPT or PurpleConfig", "Threat intelligence and exposure monitoring"],
    outcome: "End-to-end protection, detection, and response under one MSSP.",
    color: "from-purple-600 to-purple-400",
  },
];

export default function PricingPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-[#6633cc] to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 mb-6">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Pricing, Without the Confusion</h1>
            <p className="text-2xl text-purple-200 font-semibold mb-6">Clear. Scalable. Built for SMEs.</p>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              PurpleGuard pricing is subscription-based, risk-aligned, and designed to scale with your business—without hidden costs or tool sprawl.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@purpleguard.io?subject=Custom Quote Request">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Mail className="h-5 w-5 mr-2" /> Get a Custom Quote
                </Button>
              </a>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/50 bg-white/20 hover:bg-white/30 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Talk to an Expert
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How PurpleGuard Pricing Works</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4 max-w-3xl">
            PurpleGuard pricing is based on what you protect, how critical it is, and the level of operational support required. Services are billed monthly and aligned to real-world risk, not arbitrary licensing.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Quotes are provided in <strong>AED</strong> (UAE Dirham) for clients in the UAE and KSA, and in <strong>EGP</strong> (Egyptian Pound) for Egypt-based organisations — ensuring pricing is always clear, local, and comparable.
          </p>
          <div className="bg-slate-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Pricing Factors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Number of endpoints, users, applications, or workloads",
                "Required coverage (business hours vs 24/7)",
                "Compliance and reporting requirements",
                "Integration with existing tools or environments",
              ].map((factor) => (
                <div key={factor} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#6633cc] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managed X pricing */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Pricing for Managed-X Services</h2>
              <p className="text-slate-600">Security Infrastructure</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">What You're Paying For</h3>
              <p className="text-slate-600 mb-6">
                Managed-X pricing covers technology, configuration, continuous management, monitoring, and support—not just access to tools.
              </p>
              <h4 className="font-semibold text-slate-900 mb-3">Included by default:</h4>
              <ul className="space-y-2 mb-6">
                {["Platform licensing (where applicable)", "Day-to-day operations and tuning", "Monitoring and alert handling", "Policy management and change control", "Standard reporting and health checks"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader><CardTitle>Typical Pricing Model</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Cpu, label: "Per endpoint", sub: "Managed Endpoint, EDR" },
                  { icon: Users, label: "Per user", sub: "Identity, SASE, Email" },
                  { icon: Layers, label: "Per application or asset", sub: "WAF, Firewall, Backup" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-slate-600">{item.sub}</div>
                    </div>
                  </div>
                ))}
                <Link href="/services/managed-x">
                  <Button variant="outline" className="w-full mt-4">View Managed-X Services <ChevronRight className="h-4 w-4 ml-2" /></Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Purple X pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Pricing for Purple-X Services</h2>
              <p className="text-slate-600">Cybersecurity & Exposure Management</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">What Makes Purple-X Different</h3>
              <p className="text-slate-600 mb-6">
                Purple-X services price expertise, automation, and outcomes, not infrastructure. These services actively reduce exposure and respond to threats.
              </p>
              <h4 className="font-semibold text-slate-900 mb-3">Included by default:</h4>
              <ul className="space-y-2 mb-6">
                {["24/7 SOC or specialist oversight (where applicable)", "Threat analysis and prioritization", "Incident response and escalation", "Compliance-ready reporting", "Continuous validation or monitoring"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader><CardTitle>Typical Pricing Model</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Calendar, label: "Subscription-based", sub: "Monthly or annual" },
                  { icon: Target, label: "Scope-based", sub: "Assets, users, environments" },
                  { icon: Eye, label: "Engagement-based", sub: "For Red Teaming or VAPT" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <item.icon className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-slate-600">{item.sub}</div>
                    </div>
                  </div>
                ))}
                <Link href="/services/purple-x">
                  <Button variant="outline" className="w-full mt-4">View Purple-X Services <ChevronRight className="h-4 w-4 ml-2" /></Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-16 bg-gradient-to-br from-[#0b0a12] to-[#6633cc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Do You Offer Bundles?</h2>
            <p className="text-xl text-slate-300">Yes. PurpleGuard offers bundled security packages.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-white mb-3">Why Bundles Exist</h3>
            <p className="text-slate-300">
              Bundles reduce cost, simplify operations, and eliminate security gaps by combining prevention, detection, and response under one operating model.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <Card key={bundle.name} className="bg-white border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${bundle.color}`} />
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{bundle.bestFor}</Badge>
                  <CardTitle className="text-xl">{bundle.name}</CardTitle>
                  {bundle.subtitle && <CardDescription className="text-[#6633cc] font-medium">{bundle.subtitle}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-slate-900 mb-3">Includes:</h4>
                  <ul className="space-y-2 mb-6">
                    {bundle.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">Business outcome:</div>
                    <div className="text-sm text-slate-600">{bundle.outcome}</div>
                  </div>
                  <a href="mailto:hello@purpleguard.io?subject=Bundle Pricing Request">
                    <Button className="w-full bg-[#6633cc] hover:bg-[#6633cc]/90">
                      Request Bundle Pricing <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & No price list explanation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Compliance & Pricing</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Compliance requirements influence pricing due to evidence collection, reporting depth, and response SLAs.
              </p>
              <h3 className="font-semibold text-slate-900 mb-4">Frameworks supported:</h3>
              <div className="flex flex-wrap gap-3">
                {["ISO 27001", "SOC 2", "NIST CSF", "HIPAA", "PCI DSS"].map((fw) => (
                  <Badge key={fw} variant="secondary" className="text-sm py-1.5 px-3">{fw}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Don't Show a Simple Price List</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Cybersecurity pricing varies based on environment complexity and risk. Flat pricing often leads to under-protection or surprise costs later.
              </p>
              <h3 className="font-semibold text-slate-900 mb-4">What you get instead:</h3>
              <ul className="space-y-3">
                {["Transparent scoping", "Predictable monthly costs", "No shelfware", "No forced long-term lock-ins"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0b0a12] to-[#6633cc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Know your risk. Pay only for what you need.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@purpleguard.io?subject=Custom Quote Request">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Mail className="h-5 w-5 mr-2" /> Get a Custom Quote
              </Button>
            </a>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/50 bg-white/20 hover:bg-white/30 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Schedule a Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
