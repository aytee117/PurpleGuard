import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ChevronRight, Calendar, ArrowLeft, Shield, Server, RefreshCw, Lock, FileText, CheckCircle, TrendingUp, Zap, Cloud } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Backup & BCDR — UAE & Egypt", subtitle: "Ransomware-Proof Backup, Immutable Storage & Business Continuity", category: "Managed X", color: "cyan" });

export const metadata: Metadata = {
  title: { absolute: "Managed Backup & BCDR Dubai UAE — Business Continuity & Disaster Recovery | PurpleGuard" },
  description:
    "Managed Backup & BCDR: immutable storage, ransomware recovery & continuity testing for UAE, Egypt & KSA. Book a free data protection review.",
  keywords: ["managed backup UAE", "BCDR service Dubai", "business continuity Egypt", "ransomware recovery UAE", "disaster recovery service", "immutable backup UAE", "NCA ECC backup"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-backup-bcdr" },
  openGraph: {
    title: "Managed Backup & BCDR Dubai UAE | PurpleGuard",
    description: "Immutable backup, ransomware recovery & business continuity for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed Backup BCDR UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Backup & BCDR UAE | PurpleGuard",
      description: "Immutable backup & disaster recovery management for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const backupFaqs = [
  { question: "What is BCDR and how does Managed Backup protect us?", answer: "Business Continuity and Disaster Recovery (BCDR) ensures your organisation can recover from ransomware, hardware failure, or data loss. PurpleGuard manages immutable, air-gapped backups with automated recovery testing — so you have a verified clean copy of your data ready at all times." },
  { question: "How quickly can we recover with Managed Backup?", answer: "Recovery time depends on your environment and the chosen tier, but Managed Backup targets recovery time objectives (RTO) as low as 1 hour for critical systems. Automated runbooks and pre-tested recovery procedures eliminate the scramble that extends downtime in a real incident." },
  { question: "Are backups protected from ransomware encryption?", answer: "Yes. PurpleGuard uses immutable backup storage — once written, backups cannot be modified or deleted by ransomware. Air-gapped copies ensure attackers who gain access to your primary environment cannot reach or encrypt your backup data." },
  { question: "Does Managed Backup meet NCA ECC or ISO 27001 backup requirements?", answer: "Yes. Our backup and recovery service aligns with NCA ECC Data Protection controls, ISO 27001 Annex A.12.3 requirements, and Egyptian Central Bank/EG-CERT continuity guidelines. Monthly recovery test reports provide audit-ready evidence." },
];

export default function ManagedBackupBCDRPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed Backup & BCDR — Business Continuity & Disaster Recovery", description: "Immutable, air-gapped backup management with automated BCDR for rapid recovery from ransomware or disasters. Compliance-ready for UAE, Egypt, and KSA.", url: "/services/managed-x/managed-backup-bcdr", category: "Managed Security" });
  const faqSchema = faqJsonLd(backupFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed Backup & BCDR", url: "/services/managed-x/managed-backup-bcdr" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-400/30 mb-6">Managed-X | Business Continuity</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Backup & BCDR — Resilient Recovery for Modern Threats
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Business-grade backup, immutable storage, and ransomware recovery readiness — managed to protect your most critical data assets.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Cloud & on-prem backup management", "Immutable & ransomware-proof storage", "Recovery testing & BCDR planning"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get BCDR Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed Backup & BCDR?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Managed Backup & BCDR provides monitored, tested, and compliance-aligned backup and recovery services. PurpleGuard manages backup jobs, verifies restore integrity, maintains retention policies, and ensures your organization can recover quickly from ransomware, accidental deletion, or disaster scenarios.
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
              { title: "Cloud & On-Prem Backups", description: "Managed backup for servers, VMs, databases, and SaaS data across cloud and on-premises environments.", icon: Cloud, color: "from-violet-500 to-purple-600" },
              { title: "Immutable Storage", description: "Write-once, read-many storage to protect backups from ransomware encryption and deletion.", icon: Lock, color: "from-purple-500 to-violet-600" },
              { title: "Ransomware Recovery", description: "Tested recovery procedures specifically designed for ransomware incidents with clean restore verification.", icon: Shield, color: "from-violet-600 to-purple-700" },
              { title: "Recovery Testing", description: "Regular restore tests to validate backup integrity and recovery time objectives.", icon: RefreshCw, color: "from-purple-600 to-violet-700" },
              { title: "Retention Management", description: "Compliance-aligned retention policies for regulatory requirements.", icon: Database, color: "from-violet-500 to-purple-600" },
              { title: "BCDR Reporting", description: "Regular backup health reports and business continuity compliance documentation.", icon: FileText, color: "from-purple-500 to-violet-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Minimizes data loss from incidents", icon: Database },
              { title: "Improves recovery time after ransomware", icon: Zap },
              { title: "Strengthens overall ransomware resilience", icon: Shield },
              { title: "Supports compliance audits and data governance", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$35 per workload per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Per-workload pricing covering servers, VMs, and databases. Storage costs billed separately based on volume.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed Backup &amp; BCDR Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed Backup & BCDR supports UAE TDRA and UAE Cyber Security Council business continuity and data protection requirements for organisations in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, Managed Backup aligns with NCA ECC 1-1:2018 backup controls and SAMA Cyber Security Framework business continuity requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed Backup & BCDR meets EG-CERT and CBE business continuity requirements, and NTRA data resilience mandates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {backupFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ransomware happens. Recovery is your plan B. Make it a good one.</h2>
          <p className="text-xl text-slate-300 mb-8">Managed Backup & BCDR ensures your organization can recover fast when the worst happens.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Protect Your Data Today
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
