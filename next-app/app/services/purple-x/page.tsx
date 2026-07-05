import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, Eye, AlertTriangle, Target, Settings, Network, ChevronRight, CheckCircle, Calendar, Phone } from "lucide-react";
import { purpleXServices } from "@/lib/services-data";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Purple X — Cybersecurity Services UAE & Egypt", subtitle: "VAPT · SOC · MDR · Threat Intelligence · Red Team · NDR", category: "Purple X", color: "purple" });

export const metadata: Metadata = {
  title: { absolute: "Cybersecurity Services Dubai UAE — Purple X Advanced Security | PurpleGuard" },
  description:
    "Purple X: continuous cybersecurity for UAE, Egypt & KSA. VAPT, 24/7 SOC, MDR, threat intelligence, red teaming & NDR. Book a free consult.",
  keywords: ["cybersecurity services UAE", "VAPT Dubai", "managed SOC Egypt", "MDR UAE", "threat intelligence Dubai", "red teaming UAE", "NDR managed service", "NCA ECC cybersecurity"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x" },
  openGraph: {
    title: "Cybersecurity Services Dubai UAE — Purple X | PurpleGuard",
    description: "VAPT, SOC, MDR, threat intelligence & red teaming for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Purple X Cybersecurity UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Purple X Cybersecurity Services UAE | PurpleGuard",
      description: "VAPT, SOC, MDR, Threat Intelligence & Red Team services for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "purple-vapt": Search,
  "purple-soc": Eye,
  "purple-sentinel": Shield,
  "purple-sentry": AlertTriangle,
  "purple-strike": Target,
  "purple-config": Settings,
  "purple-reveal": Network,
};

export default function PurpleXPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Purple X", url: "/services/purple-x" },
  ]);
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-[#6633cc] to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/40 mb-6">Always-On Protection</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Purple X – Cybersecurity & Exposure Management
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              PurpleGuard's advanced cybersecurity and exposure management service line, purpose-built for SMEs and mid-market organizations.
              Continuous, compliance-aware protection across infrastructure, endpoints, applications, cloud environments, and external attack surfaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Book Security Assessment
                </Button>
              </a>
              <Link href="#services">
                <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">
                  Explore Services <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {[
                "Reduce cyber risk through continuous visibility",
                "Detect & respond to threats in real time",
                "Manage internal & external attack surfaces",
                "Support regulatory compliance (ISO 27001, NIST, SOC 2)",
              ].map((obj) => (
                <div key={obj} className="flex items-start gap-2 bg-white/5 rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-12 bg-gradient-to-b from-slate-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Navigation</h2>
            <p className="text-slate-600">Jump directly to the service you're interested in</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {purpleXServices.map((service) => {
              const Icon = iconMap[service.id] ?? Shield;
              return (
                <Link key={service.id} href={service.detailLink}>
                  <div className="group relative bg-white rounded-xl p-4 border border-slate-200 hover:border-[#6633cc]/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-[#6633cc] transition-colors text-sm">{service.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{service.tagline}</p>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4 text-[#6633cc]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Purple X Service Portfolio</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Seven specialized security services designed for comprehensive protection across your entire digital landscape
            </p>
          </div>
          <div className="space-y-16">
            {purpleXServices.map((service, index) => {
              const Icon = iconMap[service.id] ?? Shield;
              return (
                <div key={service.id} id={service.id} className={`scroll-mt-24 ${index % 2 === 1 ? "bg-slate-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-2xl" : ""}`}>
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-1">{service.category}</Badge>
                          <Link href={service.detailLink}>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 hover:text-[#6633cc] transition-colors cursor-pointer">{service.name}</h3>
                          </Link>
                        </div>
                      </div>
                      <p className="text-lg text-[#6633cc] font-medium mb-4">{service.tagline}</p>
                      <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="mb-3">
                          <div className="text-sm font-semibold text-slate-700 mb-1">Starting Price</div>
                          <div className="text-2xl font-bold text-[#6633cc]">{service.pricing}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-700 mb-1">Best For</div>
                          <div className="text-slate-600 text-sm">{service.bestFor}</div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-[#6633cc] hover:bg-[#6633cc]/90">
                            <Phone className="h-4 w-4 mr-2" /> Book Discovery Call
                          </Button>
                        </a>
                        <Link href={service.detailLink}>
                          <Button variant="outline" className="border-[#6633cc] text-[#6633cc] hover:bg-[#6633cc]/10">
                            Learn More <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="grid gap-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Shield className="h-5 w-5 text-[#6633cc]" /> Key Capabilities
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {service.capabilities.map((cap) => (
                                <li key={cap} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                  <span className="text-slate-600 text-sm">{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="border-[#6633cc]/20 bg-[#6633cc]/5">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Target className="h-5 w-5 text-[#6633cc]" /> Business Value
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {service.value.map((val) => (
                                <li key={val} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-[#6633cc] flex-shrink-0 mt-1" />
                                  <span className="text-slate-700 text-sm font-medium">{val}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Purple X */}
      <section className="py-20 bg-gradient-to-br from-[#0b0a12] to-[#6633cc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Purple X?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Smarter security and stronger defense—continuously</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Built for SMEs", description: "Designed specifically for small and mid-market organizations with enterprise-grade capabilities" },
              { title: "Subscription-Based", description: "Predictable monthly pricing with no hidden fees or surprise costs" },
              { title: "Compliance-Aware", description: "Built-in support for ISO 27001, NIST, CIS, SOC 2 and more" },
              { title: "Automation-First", description: "Leverage automation for faster detection, response, and remediation" },
              { title: "Business-Aligned", description: "Clear connection between cyber risk and business impact" },
              { title: "Always-On Protection", description: "24/7 monitoring and response from our expert security team" },
            ].map((item) => (
              <Card key={item.title} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Elevate Your Security?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a free discovery call with our security experts to discuss how Purple X can protect your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90">
                <Calendar className="h-5 w-5 mr-2" /> Book Free Discovery Call
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing Plans <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-500 italic mt-12 pt-12 border-t border-slate-200">
            All pricing shown is indicative. Final pricing depends on environment size, complexity, and compliance requirements.
          </p>
        </div>
      </section>
    </div>
  );
}
