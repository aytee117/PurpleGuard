import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, ChevronRight, Calendar, ArrowLeft, Shield, Settings, Eye, Lock, KeyRound, Activity, CheckCircle } from "lucide-react";
import { faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Cloud & SaaS Security — UAE & Egypt", subtitle: "AWS · Azure · GCP · Microsoft 365 · Google Workspace Protection", category: "Solutions", color: "cyan" });

export const metadata: Metadata = {
  title: { absolute: "Cloud & SaaS Security Dubai UAE — AWS, Azure, M365 Protection | PurpleGuard" },
  description:
    "PurpleGuard secures AWS, Azure, GCP, M365 & Google Workspace for UAE, Egypt & KSA. CSPM & SSPM managed service. Book a free cloud review.",
  keywords: ["cloud security UAE", "SaaS security Dubai", "AWS security Egypt", "Azure security UAE", "Microsoft 365 security", "cloud posture management UAE", "NCA CCC cloud compliance"],
  alternates: { canonical: "https://www.purpleguard.io/solutions/cloud-saas-security" },
  openGraph: {
    title: "Cloud & SaaS Security UAE — PurpleGuard",
    description: "AWS, Azure, M365 & Google Workspace security for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Cloud SaaS Security UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cloud & SaaS Security UAE | PurpleGuard",
      description: "AWS, Azure, M365 & Google Workspace security for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const cloudFaqs = [
  { question: "What cloud platforms does PurpleGuard support?", answer: "We support all major cloud platforms including AWS, Microsoft Azure, Google Cloud Platform (GCP), Microsoft 365, and Google Workspace. Our CSPM and SSPM capabilities cover identity, configuration, data, and access across all platforms." },
  { question: "How does Cloud Security Posture Management (CSPM) work?", answer: "CSPM continuously scans your cloud environments for misconfigurations, compliance violations, and exposed resources. Our team remediates issues before attackers exploit them — covering CIS benchmarks, NCA ECC, and TDRA cloud security requirements." },
  { question: "Can you secure our Microsoft 365 and Google Workspace environments?", answer: "Yes. Our SaaS Security Posture Management (SSPM) covers Microsoft 365 and Google Workspace, monitoring for misconfigured sharing settings, over-privileged users, OAuth app risks, and suspicious sign-in activity." },
  { question: "How does cloud security help with NCA ECC compliance in KSA?", answer: "NCA ECC requires organisations to maintain a secure cloud posture, enforce identity controls, and document their cloud configurations. PurpleGuard maps your cloud controls directly to NCA ECC requirements and generates compliance-ready evidence." },
  { question: "What is the difference between CSPM and CWPP?", answer: "CSPM (Cloud Security Posture Management) focuses on the configuration and compliance of cloud resources, while CWPP (Cloud Workload Protection Platform) protects the workloads themselves — virtual machines, containers, and serverless functions. PurpleGuard provides both." },
];

export default function CloudSaaSSecurityPage() {
  const faqSchema = faqJsonLd(cloudFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/solutions" },
      { name: "Cloud & SaaS Security", url: "/solutions/cloud-saas-security" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/solutions">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Solutions
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6">Security Solution</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Cloud & SaaS Security</h1>
            <p className="text-2xl text-blue-300 font-semibold mb-6">Secure your cloud. Control your SaaS. Reduce risk at scale.</p>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Continuous Cloud and SaaS security protecting identities, configurations, data, and access across public cloud platforms and business-critical SaaS applications.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["AWS", "Azure", "GCP", "Microsoft 365", "Google Workspace"].map((fw) => (
                <Badge key={fw} className="bg-white/10 text-white border-white/20 text-sm py-1">{fw}</Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Book Cloud Security Review
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
              Cloud adoption has expanded the attack surface dramatically. Misconfigured storage buckets, over-privileged identities, unmonitored SaaS applications, and shadow IT create risks that traditional security tools miss. Organizations need visibility, control, and continuous protection across their entire cloud and SaaS estate.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PurpleGuard Secures Your Cloud</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Cloud Configuration Security", description: "Continuous assessment of cloud configurations against CIS benchmarks and cloud security best practices.", icon: Settings, color: "from-blue-500 to-cyan-600" },
              { title: "Cloud Threat Detection", description: "Detection of cloud-based attacks including credential abuse, data exfiltration, and misconfiguration exploitation.", icon: Eye, color: "from-cyan-500 to-blue-600" },
              { title: "SaaS Security Monitoring", description: "CASB-based visibility into SaaS usage, data flows, and anomalous user behavior across M365, Google Workspace, and more.", icon: Activity, color: "from-blue-600 to-cyan-700" },
              { title: "Identity & Access Security", description: "Zero trust identity controls, MFA, and conditional access policies for cloud and SaaS access.", icon: KeyRound, color: "from-cyan-600 to-blue-700" },
              { title: "Cloud VAPT", description: "Cloud security assessments and penetration testing to identify exploitable vulnerabilities in cloud environments.", icon: Shield, color: "from-blue-500 to-cyan-600" },
              { title: "Data Protection", description: "Control sensitive data across cloud storage, collaboration tools, and SaaS applications.", icon: Lock, color: "from-cyan-500 to-blue-600" },
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
              { name: "PurpleVAPT", description: "Cloud & SaaS risk evaluation and penetration testing", path: "/services/purple-x/purplevapt" },
              { name: "PurpleConfig", description: "Cloud configuration assessment and hardening", path: "/services/purple-x/purpleconfig" },
              { name: "PurpleSentinel (MDR)", description: "Cloud-native threat detection and response", path: "/services/purple-x/purplesentinel" },
              { name: "Managed Identity", description: "Zero trust access for cloud and SaaS", path: "/services/managed-x/managed-identity" },
              { name: "Managed SASE / ZTNA", description: "CASB and secure SaaS access management", path: "/services/managed-x/managed-sase-ztna" },
            ].map((service) => (
              <Link key={service.name} href={service.path}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{service.name}</div>
                      <div className="text-slate-600 text-sm">{service.description}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-blue-600" />
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
                <p className="text-slate-600 text-sm leading-relaxed">In the UAE, Cloud & SaaS Security supports UAE TDRA cloud security requirements and UAE Cyber Security Council data protection mandates for organisations in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, Cloud & SaaS Security aligns with NCA ECC 1-1:2018 cloud controls and SAMA Cyber Security Framework cloud security requirements for financial institutions.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Cloud & SaaS Security meets EG-CERT cloud security guidelines and NTRA data protection requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {cloudFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Adopt cloud securely. Stay in control.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleGuard delivers continuous cloud and SaaS security without slowing down your business.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Book Cloud Security Assessment
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Cloud &amp; SaaS Security Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
