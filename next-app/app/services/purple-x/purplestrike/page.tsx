import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ChevronRight, Calendar, ArrowLeft, Shield, Eye, Zap, Users, Activity, CheckCircle, TrendingUp, RefreshCw } from "lucide-react";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({ title: "Red Teaming & BAS — UAE & Egypt", subtitle: "PurpleStrike: Adversary Emulation & Breach Attack Simulation", category: "Purple X", color: "red" });

export const metadata: Metadata = {
  title: { absolute: "Red Team & Breach Attack Simulation Dubai UAE — PurpleStrike | PurpleGuard" },
  description:
    "PurpleStrike: red team & BAS services simulating real-world adversary attacks for UAE, Egypt & KSA. MITRE ATT&CK-aligned. Book a free consult.",
  keywords: ["red team UAE", "breach attack simulation Dubai", "adversary emulation Egypt", "BAS cybersecurity", "red teaming UAE", "MITRE ATT&CK testing", "NCA ECC red team"],
  alternates: { canonical: "https://www.purpleguard.io/services/purple-x/purplestrike" },
  openGraph: {
    title: "Red Teaming & BAS Dubai UAE — PurpleStrike | PurpleGuard",
    description: "Simulate real-world attacks to validate controls. Red teaming & BAS for UAE, Egypt & KSA.",
    images: [{ url: OG, width: 1200, height: 630, alt: "PurpleStrike — Red Teaming UAE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PurpleStrike — Red Team & BAS UAE | PurpleGuard",
      description: "Adversary simulation & red team exercises for UAE, Egypt & KSA.",
      images: [OG],
    },
  };

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";

const strikeFaqs = [
  { question: "What is red teaming and how does PurpleStrike work?", answer: "Red teaming is an adversarial simulation where PurpleGuard's certified experts attempt to breach your organisation using the same techniques as real attackers — phishing, credential attacks, lateral movement, privilege escalation, and data exfiltration. PurpleStrike also includes Breach and Attack Simulation (BAS) for continuous automated validation between engagements." },
  { question: "How is PurpleStrike different from a penetration test?", answer: "A penetration test is scoped to specific systems. PurpleStrike red team exercises test your entire security programme — people, processes, and technology — with a goal-oriented adversary simulation over weeks. It validates whether your SOC can detect and respond to a real attacker, not just whether specific systems have known vulnerabilities." },
  { question: "Does PurpleStrike support NCA ECC red team requirements?", answer: "Yes. PurpleStrike exercises align with NCA ECC adversarial simulation controls and UAE TDRA red team requirements. Detailed engagement reports provide evidence for regulators and auditors showing your organisation's resilience to targeted attacks." },
  { question: "Can PurpleStrike test our employees' susceptibility to phishing?", answer: "Yes. PurpleStrike engagements can include social engineering and phishing simulations targeting your employees. Results are reported with actionable recommendations for awareness training and process improvement — not just technical fixes." },
];

export default function PurpleStrikePage() {
  const serviceSchema = serviceJsonLd({ name: "PurpleStrike — Red Teaming & Breach Attack Simulation", description: "Adversary emulation and breach attack simulation to test the effectiveness of your security programme against real-world attack techniques.", url: "/services/purple-x/purplestrike", category: "Cybersecurity" });
  const faqSchema = faqJsonLd(strikeFaqs);

  const breadcrumbSchema = breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Purple X", url: "/services/purple-x" },
      { name: "PurpleStrike", url: "/services/purple-x/purplestrike" },
    ]);
    return (
      <div className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative bg-gradient-to-br from-red-900 via-pink-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/services/purple-x">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purple-X Services
            </Button>
          </Link>
          <div className="max-w-4xl">
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 mb-6">Purple-X | Adversary Simulation</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PurpleStrike — Red Teaming & Breach Attack Simulation
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Test your defenses against real-world attack scenarios. Validate whether your security controls, people, and processes can stop a determined adversary.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {["MITRE ATT&CK-aligned scenarios", "Continuous BAS or point-in-time engagements", "Purple Team collaboration"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                  <Calendar className="h-5 w-5 mr-2" /> Request a Red Team Engagement
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PurpleStrike?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PurpleStrike simulates real-world adversary behavior to test the effectiveness of your security controls, detection capabilities, and incident response. Whether through continuous Breach & Attack Simulation (BAS) or targeted red team engagements, PurpleStrike gives you honest insight into your security readiness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in PurpleStrike</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Red Team Exercises", description: "Full-scope adversary simulation targeting people, processes, and technology to find real attack paths.", icon: Target, color: "from-red-500 to-pink-600" },
              { title: "Breach & Attack Simulation (BAS)", description: "Continuous, automated simulation of attack techniques to validate security control effectiveness.", icon: Activity, color: "from-pink-500 to-red-600" },
              { title: "Adversary Emulation", description: "Simulation based on real threat actor TTPs targeting your industry and risk profile.", icon: Eye, color: "from-red-600 to-pink-700" },
              { title: "MITRE ATT&CK Scenarios", description: "Structured attack scenarios mapped to MITRE ATT&CK for measurable, repeatable testing.", icon: Shield, color: "from-pink-600 to-red-700" },
              { title: "Purple Team Collaboration", description: "Joint red/blue team exercises to accelerate detection improvement and build response muscle.", icon: Users, color: "from-red-500 to-pink-600" },
              { title: "Continuous Control Testing", description: "Ongoing validation of security controls to measure improvement over time.", icon: RefreshCw, color: "from-pink-500 to-red-600" },
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
              { title: "Validate real-world security readiness", icon: Target },
              { title: "Identify detection and response gaps", icon: Eye },
              { title: "Improve SOC and MDR effectiveness", icon: Shield },
              { title: "Measure security improvements over time", icon: TrendingUp },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
            <Card className="border-2 border-red-200 shadow-lg">
              <CardHeader><CardTitle className="text-xl text-slate-900">BAS Subscription</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">$1,500<span className="text-lg text-slate-500">/month</span></div>
                <p className="text-slate-600 text-sm">Continuous automated attack simulation and control testing</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-pink-200 shadow-lg">
              <CardHeader><CardTitle className="text-xl text-slate-900">Red Team Engagement</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pink-600 mb-2">From $8,000<span className="text-lg text-slate-500">/engagement</span></div>
                <p className="text-slate-600 text-sm">Full-scope adversary simulation and red team exercises</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Calendar className="h-5 w-5 mr-2" /> Plan Your Engagement
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View All Pricing <ChevronRight className="h-5 w-5 ml-2" /></Button>
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
                <p className="text-slate-600 text-sm leading-relaxed">PurpleStrike red team operations validate controls required by UAE TDRA and the UAE Cyber Security Council for organisations in Dubai and across the UAE.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Saudi Arabia</div>
                <p className="text-slate-600 text-sm leading-relaxed">In KSA, PurpleStrike adversary emulation validates compliance against NCA ECC and NCA CCC controls, supporting organisations in Riyadh preparing for NCA assessments.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-2">Egypt</div>
                <p className="text-slate-600 text-sm leading-relaxed">For Egyptian organisations, PurpleStrike adversary simulation aligns with EG-CERT and NTRA security testing requirements for critical infrastructure sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {strikeFaqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't wait for a real attack to find your gaps.</h2>
          <p className="text-xl text-slate-300 mb-8">PurpleStrike helps you find and fix security weaknesses before adversaries exploit them.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#6633cc] hover:bg-[#6633cc]/90 text-white">
                <Calendar className="h-5 w-5 mr-2" /> Start an Engagement
              </Button>
            </a>
            <a href="mailto:hello@purpleguard.io?subject=PurpleStrike Red Team Inquiry">
              <Button size="lg" variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30">Contact Sales</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
