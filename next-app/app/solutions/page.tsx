import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Cloud, Globe, FileCheck, Calendar, ChevronRight, CheckCircle } from "lucide-react";
import { solutions } from "@/lib/services-data";
import { breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Security Solutions UAE & Egypt", subtitle: "Compliance · Ransomware Defense · Cloud Security · EASM · Zero Trust", category: "Solutions", color: "orange" });

export const metadata: Metadata = {
  title: { absolute: "Cybersecurity Solutions Dubai UAE — Compliance, Ransomware & Cloud Security | PurpleGuard" },
  description:
    "Outcome-focused security solutions for UAE, Egypt & KSA: compliance, ransomware defense, cloud security, EASM & zero trust. Book a consult.",
  keywords: ["cybersecurity solutions UAE", "compliance readiness Dubai", "ransomware defense Egypt", "cloud security UAE", "EASM service", "zero trust UAE", "NCA ECC solutions"],
  alternates: { canonical: "https://www.purpleguard.io/solutions" },
  openGraph: {
    title: "Cybersecurity Solutions UAE — PurpleGuard",
    description: "Compliance, ransomware, cloud security & EASM solutions for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleGuard Cybersecurity Solutions" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Security Solutions UAE & Egypt | PurpleGuard",
      description: "Compliance, ransomware defense, cloud security & zero trust for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "compliance-audit-readiness": FileCheck,
  "ransomware-defense": Shield,
  "cloud-saas-security": Cloud,
  "external-attack-surface-management": Globe,
  "zero-trust-secure-remote-access": Lock,
};

export default function SolutionsPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
  ]);
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-[#6633cc] to-[#0b0a12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/40 mb-6">Outcome-Focused Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Security Solutions That Solve Real Problems
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              From compliance readiness to ransomware defense, PurpleGuard delivers tailored security solutions
              that address your specific challenges and industry requirements.
            </p>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Book a Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Security Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each solution combines PurpleGuard's Purple-X cybersecurity services and Managed-X infrastructure
              to deliver comprehensive protection tailored to your specific needs.
            </p>
          </div>
          <div className="space-y-8">
            {solutions.map((solution, idx) => {
              const Icon = iconMap[solution.id] ?? Shield;
              return (
                <Card key={solution.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`flex flex-col lg:flex-row ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <div className={`lg:w-1/3 bg-gradient-to-br ${solution.color} p-8 lg:p-12 flex flex-col items-center justify-center text-white`}>
                        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                          <Icon className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2">{solution.name}</h3>
                        <p className="text-white/80 text-center text-sm">{solution.tagline}</p>
                      </div>
                      <div className="lg:w-2/3 p-8 lg:p-12 bg-white">
                        <p className="text-slate-600 mb-6 leading-relaxed">{solution.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {solution.frameworks.map((fw) => (
                            <Badge key={fw} variant="secondary" className={`${solution.bgColor} text-slate-700 border-0`}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {fw}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/solutions/${solution.id}`}>
                          <Button className={`bg-gradient-to-r ${solution.color} hover:opacity-90 text-white`}>
                            Learn More <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0b0a12] via-[#6633cc] to-[#0b0a12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not sure which solution fits your needs?</h2>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Our security experts can help you identify the right combination of services to address your specific challenges and compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white min-w-[200px]">
                <Calendar className="h-5 w-5 mr-2" /> Schedule a Call
              </Button>
            </a>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30 min-w-[200px]">
                View All Services <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
