import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cpu, Server, Lock, Mail, Database, KeyRound, Globe, ChevronRight, CheckCircle, Calendar, Phone, Target } from "lucide-react";
import { managedXServices } from "@/lib/services-data";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed X — Security Infrastructure UAE & Egypt", subtitle: "EDR · Firewall · WAF · Email · Backup · Identity · SASE", category: "Managed X", color: "blue" });

export const metadata: Metadata = {
  title: { absolute: "Managed Security Infrastructure Dubai UAE — Managed X Services | PurpleGuard" },
  description:
    "Managed X: fully managed EDR, firewall, WAF, identity, email security, backup & SASE for SMEs in UAE, Egypt & KSA. Book a free assessment.",
  keywords: ["managed security infrastructure UAE", "managed EDR Dubai", "managed firewall Egypt", "managed WAF UAE", "managed email security", "SASE managed UAE", "NCA ECC managed services"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x" },
  openGraph: {
    title: "Managed Security Infrastructure UAE — Managed X | PurpleGuard",
    description: "Fully managed EDR, firewall, WAF, identity, email & backup for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed X Services UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed X Infrastructure Services UAE | PurpleGuard",
      description: "Managed EDR, Firewall, Email, Backup & SASE for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "managed-endpoint": Cpu,
  "managed-edr": Shield,
  "managed-firewall": Server,
  "managed-waf": Globe,
  "managed-email": Mail,
  "managed-backup": Database,
  "managed-identity": KeyRound,
  "managed-sase": Lock,
};

export default function ManagedXPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Managed X", url: "/services/managed-x" },
  ]);
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-blue-800 to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6">Managed Security Infrastructure</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Security Infrastructure. Delivered as a Service.
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Fully managed security services that reduce operational burden while strengthening protection, visibility, and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white shadow-md">
                  <Calendar className="h-5 w-5 mr-2" /> Talk to an Expert
                </Button>
              </a>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/50 bg-white/20 hover:bg-white/30 text-white">
                  Request Pricing <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {["24/7 monitoring and management", "Reduce operational security burden", "Compliance-ready operations", "Predictable monthly pricing"].map((obj) => (
                <div key={obj} className="flex items-start gap-2 bg-white/5 rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {managedXServices.map((service) => {
              const Icon = iconMap[service.id] ?? Shield;
              return (
                <Link key={service.id} href={service.detailLink}>
                  <div className="group relative bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{service.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{service.tagline}</p>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Managed-X Service Catalog</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Eight specialized managed services designed to protect and optimize your security infrastructure
            </p>
          </div>
          <div className="space-y-16">
            {managedXServices.map((service, index) => {
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
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">{service.name}</h3>
                          </Link>
                        </div>
                      </div>
                      <p className="text-lg text-blue-600 font-medium mb-4">{service.tagline}</p>
                      <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="mb-3">
                          <div className="text-sm font-semibold text-slate-700 mb-1">Starting Price</div>
                          <div className="text-2xl font-bold text-blue-600">{service.pricing}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-700 mb-1">Best For</div>
                          <div className="text-slate-600 text-sm">{service.bestFor}</div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        <Link href={service.detailLink}>
                          <Button className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                            View More <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                        <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Phone className="h-4 w-4 mr-2" /> Book Discovery Call
                          </Button>
                        </a>
                        <a href={`mailto:hello@purpleguard.io?subject=${encodeURIComponent(service.emailSubject)}`}>
                          <Button variant="outline" className="border-slate-300 text-slate-700">
                            <Mail className="h-4 w-4 mr-2" /> Email Inquiry
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="grid gap-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Shield className="h-5 w-5 text-blue-600" /> Key Capabilities
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
                        <Card className="border-blue-200 bg-blue-50">
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

      {/* Why Managed X */}
      <section className="py-20 bg-gradient-to-br from-[#0b0a12] to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Managed-X?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Let us manage your security infrastructure so you can focus on your business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "24/7 Expert Management", description: "Round-the-clock monitoring and management by certified security professionals" },
              { title: "Predictable Costs", description: "Subscription-based pricing with no hidden fees or surprise expenses" },
              { title: "Reduced Complexity", description: "Offload the burden of managing complex security infrastructure" },
              { title: "Compliance Support", description: "Built-in compliance reporting for ISO 27001, SOC 2, NIST and more" },
              { title: "Faster Response", description: "Rapid incident detection, escalation, and coordinated response" },
              { title: "Scalable Services", description: "Easily scale protection as your organization grows" },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Stop managing security tools. Start managing risk.</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experts to discuss how Managed-X can strengthen your security posture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Schedule a Consultation
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io">
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700">
                Contact Sales <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </a>
          </div>
          <p className="text-sm text-slate-500 italic mt-12 pt-12 border-t border-slate-200">
            Final pricing depends on scale, SLAs, integrations, and compliance scope.
          </p>
        </div>
      </section>
    </div>
  );
}
