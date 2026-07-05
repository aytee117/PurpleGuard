import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, BookOpen, ArrowRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Cybersecurity Blog — Insights & Resources | PurpleGuard" },
  description:
    "Cybersecurity insights, compliance guides, and threat intelligence from PurpleGuard — your MSSP partner in UAE, Egypt, and KSA. Coming soon.",
  keywords: [
    "cybersecurity blog UAE", "MSSP insights", "NCA ECC compliance guide",
    "TDRA cybersecurity Egypt", "managed security resources", "PurpleGuard blog",
  ],
  alternates: { canonical: "https://www.purpleguard.io/blog" },
  openGraph: {
    title: "Cybersecurity Blog — Insights & Resources | PurpleGuard",
    description: "Cybersecurity insights, compliance guides, and threat intelligence from PurpleGuard — coming soon.",
    url: "https://www.purpleguard.io/blog",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "https://www.purpleguard.io" },
  { name: "Blog", url: "https://www.purpleguard.io/blog" },
]);

const upcomingTopics = [
  "What is an MSSP? A guide for UAE & Egypt SMEs",
  "NCA ECC Compliance Checklist for Saudi Arabia",
  "VAPT vs. Vulnerability Scanning — what's the difference?",
  "How to choose an EDR solution in 2025",
  "EG-CERT guidelines: what Egyptian companies need to know",
  "Zero Trust Architecture: practical implementation for mid-market",
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#0b0a12] via-slate-900 to-[#0b0a12]">
        {/* Hero */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#6633cc]/20 text-purple-300 border-purple-400/30 mb-6">
              Coming Soon
            </Badge>
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6633cc] to-indigo-600 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              PurpleGuard Insights
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Cybersecurity research, compliance guides, and threat intelligence tailored for
              organisations in the UAE, Egypt, and Saudi Arabia. Launching soon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="mailto:hello@purpleguard.io?subject=Notify me when the blog launches">
                <Button size="lg" className="bg-[#6633cc] hover:bg-[#5528ad] text-white px-8">
                  <Bell className="h-5 w-5 mr-2" />
                  Notify Me at Launch
                </Button>
              </a>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 px-8">
                  Explore Our Services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming topics */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Topics We&rsquo;re Covering
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {upcomingTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-2 h-2 rounded-full bg-[#6633cc] mt-2 flex-shrink-0" />
                  <p className="text-slate-300 text-sm leading-relaxed">{topic}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">
                In the meantime, explore our{" "}
                <Link href="/services/purple-x/purplevapt/calculator" className="text-purple-400 hover:text-purple-300 underline">
                  VAPT Calculator
                </Link>{" "}
                or{" "}
                <Link href="/services/purple-x/purpleSOC/questionnaire" className="text-purple-400 hover:text-purple-300 underline">
                  SOC Sizing Tool
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
