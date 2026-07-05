import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ChevronRight, Calendar, ArrowLeft, Shield, AlertTriangle, Globe, Activity, FileText, CheckCircle, TrendingUp, Zap, Eye } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Managed Email Security — UAE & Egypt", subtitle: "Phishing, BEC & Email Threat Protection with DMARC & SPF/DKIM", category: "Managed X", color: "red" });

export const metadata: Metadata = {
  title: { absolute: "Managed Email Security Dubai UAE — Phishing & BEC Protection | PurpleGuard" },
  description:
    "Managed Email Security: phishing, BEC & malware protection with DMARC enforcement for UAE, Egypt & KSA. Book a free email security assessment.",
  keywords: ["managed email security UAE", "phishing protection Dubai", "BEC defence Egypt", "DMARC service UAE", "email threat protection", "business email compromise UAE", "NCA ECC email security"],
  alternates: { canonical: "https://www.purpleguard.io/services/managed-x/managed-email-security" },
  openGraph: {
    title: "Managed Email Security Dubai UAE | PurpleGuard",
    description: "Phishing, BEC & email threat protection with DMARC enforcement for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Managed Email Security UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Managed Email Security UAE | PurpleGuard",
      description: "Phishing, BEC & malware protection for M365 & Google Workspace in UAE.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const emailFaqs = [
  { question: "What does Managed Email Security protect against?", answer: "PurpleGuard's Managed Email Security protects against phishing, spear-phishing, business email compromise (BEC), malware attachments, ransomware delivery via email, spoofing, and brand impersonation. AI-based threat detection catches novel attacks that bypass traditional gateways." },
  { question: "Does it work with Microsoft 365 and Google Workspace?", answer: "Yes. PurpleGuard Managed Email Security integrates natively with Microsoft 365 and Google Workspace. We layer AI-based threat detection on top of Microsoft Defender for Office 365 or add a dedicated secure email gateway for deeper protection." },
  { question: "Can Managed Email Security help meet NCA ECC or EG-CERT requirements?", answer: "Yes. Email is the top attack vector and a key focus of both NCA ECC (Saudi Arabia) and EG-CERT (Egypt) guidelines. PurpleGuard's email security reporting maps phishing attempts, BEC incidents, and blocking stats to compliance framework controls." },
  { question: "What happens when a suspicious email is detected?", answer: "Suspicious emails are quarantined for review. High-severity threats (BEC, targeted spear-phishing) trigger immediate alerts to your team with context and recommended actions. PurpleGuard analysts validate detections and tune filters continuously to minimise both false positives and missed threats." },
];

export default function ManagedEmailSecurityPage() {
  const serviceSchema = serviceJsonLd({ name: "Managed Email Security — Phishing, BEC & Malware Protection", description: "AI-powered email threat detection for phishing, BEC, ransomware, and impersonation attacks. Managed 24/7 for Microsoft 365 and Google Workspace.", url: "/services/managed-x/managed-email-security", category: "Managed Security" });
  const faqSchema = faqJsonLd(emailFaqs);
  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Managed X", url: "/services/managed-x" },
      { name: "Managed Email Security", url: "/services/managed-x/managed-email-security" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-red-900 via-pink-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/managed-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Managed-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 mb-6">Managed-X | Email Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Managed Email Security — Stop Phishing, BEC & Email Threats
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Advanced email threat protection, impersonation defense, and DMARC enforcement — managed end-to-end by PurpleGuard.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["Phishing & BEC protection", "DMARC & spoofing prevention", "Incident response support"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Get Email Security Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Managed Email Security?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Email is the #1 attack vector. Managed Email Security defends your organization against phishing, business email compromise (BEC), malware delivery, and impersonation attacks — with expert management, continuous tuning, and incident response support.
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
              { title: "Phishing & BEC Protection", description: "AI-powered detection of phishing emails and business email compromise attempts.", icon: AlertTriangle, color: "from-red-500 to-pink-600" },
              { title: "DMARC & Spoofing Prevention", description: "DMARC, SPF, and DKIM enforcement to prevent email spoofing and domain impersonation.", icon: Shield, color: "from-pink-500 to-red-600" },
              { title: "Malware Scanning", description: "Advanced sandboxing and attachment analysis to detect malicious content.", icon: Eye, color: "from-red-600 to-pink-700" },
              { title: "Email Continuity", description: "Ensure email availability during outages with emergency inbox services.", icon: Globe, color: "from-pink-600 to-red-700" },
              { title: "Threat Intelligence Integration", description: "Real-time threat intelligence feeds to block known malicious senders and domains.", icon: Activity, color: "from-red-500 to-pink-600" },
              { title: "Incident Response Support", description: "Expert-led response to email-borne security incidents including BEC and phishing campaigns.", icon: FileText, color: "from-pink-500 to-red-600" },
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

      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-900 via-pink-800 to-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reduces user-driven breaches via phishing", icon: Shield },
              { title: "Protects brand reputation from spoofing", icon: Globe },
              { title: "Lowers incident response costs", icon: Zap },
              { title: "Improves employee security posture", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">$4 per mailbox per month</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Simple per-mailbox pricing. Works with Microsoft 365, Google Workspace, and other platforms.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Calendar className="h-5 w-5 mr-2" /> Get a Quote
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=Managed E-mail Security Inquiry">
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
                <p className="text-slate-600 text-sm leading-relaxed">Managed Email Security supports UAE TDRA and UAE Cyber Security Council phishing and email fraud prevention requirements for organisations in Dubai.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In Saudi Arabia, Managed Email Security aligns with NCA ECC 1-1:2018 email protection controls and SAMA Cyber Security Framework anti-phishing requirements.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, Managed Email Security provides EG-CERT-aligned email threat protection, meeting NTRA and CBE email security requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {emailFaqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-900 via-pink-800 to-red-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Email is the #1 attack vector. Are you protected?</h2>
          <p className="text-xl text-slate-300 mb-8">Managed Email Security keeps phishing, BEC, and malware out of your inboxes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Protect Your Inbox Today
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
