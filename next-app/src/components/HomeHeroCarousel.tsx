"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Noto_Sans_Egyptian_Hieroglyphs } from "next/font/google";
import { Calendar, ChevronRight, FileText, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReportHeroReticle } from "@/components/reports/ReportHeroReticle";
import { CheckCircle } from "lucide-react";

const hieroglyphs = Noto_Sans_Egyptian_Hieroglyphs({
  subsets: ["egyptian-hieroglyphs"],
  display: "swap",
  variable: "--font-hieroglyphs",
  weight: "400",
});

const CALENDLY_LINK = "https://calendly.com/mmowafy-purpleguard/30min";
const REPORT_URL = "/reports/egypt-threat-intel-h1-2026";

// Mobile: fit exactly below the sticky nav (h-16 = 4rem, plus its 1px border-b) within the
// viewport so the hero never needs a scroll on a phone. `dvh` (not `vh`) tracks the real
// visible height as mobile browser chrome shows/hides. Wider breakpoints revert to fixed
// heights sized for their roomier, less-stacked layout.
const SLIDE_HEIGHT = "min-h-[calc(100dvh-65px)] sm:min-h-[660px] lg:min-h-[600px]";
const SLIDE_COUNT = 2;
const AUTOPLAY_DELAY_MS = 3000;
const TRANSITION_MS = 500;

export function HomeHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDE_COUNT);
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className={`relative bg-[#0b0a12] overflow-hidden ${hieroglyphs.variable}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: `transform ${TRANSITION_MS}ms ease-in-out`,
        }}
      >
        {/* SLIDE 1 — main hero */}
        <div className={`relative flex min-w-0 shrink-0 grow-0 basis-full items-center ${SLIDE_HEIGHT}`}>
          <div
            className="absolute inset-0 opacity-100"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
            }}
          />
          <div
            className="absolute -top-44 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-3xl"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(102,51,204,0.42), transparent 62%)" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-purple-500/15 text-purple-200 border-purple-400/40 mb-3 sm:mb-6">
                Managed Security Services — UAE · Egypt · KSA
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-3 sm:mb-6 tracking-tight">
                Smarter Security. Stronger Defense.
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-4 sm:mb-8 leading-relaxed">
                Next-generation managed cybersecurity and exposure management for SMEs and mid-market organizations in the UAE, Egypt, and Saudi Arabia.
              </p>
              <ul className="flex flex-col md:flex-row justify-center gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-10 text-sm sm:text-base text-slate-300">
                {["24/7 SOC, MDR, and Exposure Management", "Subscription-based, compliance-aware", "Built for scale and automation"].map((item) => (
                  <li key={item} className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="px-8">
                    <Calendar className="h-5 w-5 mr-2" />
                    Request a Security Assessment
                  </Button>
                </a>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white px-8">
                    View Services
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
              {/* Live status strip — hidden on mobile to keep the hero within one screen height */}
              <div className="hidden sm:inline-flex items-center gap-5 mt-14 px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.04]">
                <span className="flex items-center gap-2 font-mono text-[13px] text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  SOC online
                </span>
                <span className="w-px h-4 bg-white/15" />
                <span className="font-mono text-[13px] text-slate-400">UAE · Egypt · KSA coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2 — Egypt Threat Intel Report teaser */}
        <div className={`relative flex min-w-0 shrink-0 grow-0 basis-full items-center ${SLIDE_HEIGHT}`}>
          <ReportHeroReticle hieroglyphClassName="font-[family-name:var(--font-hieroglyphs)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-5">
                <span className="pg-eyebrow text-[11.5px] font-medium text-[#b9a3f0]">
                  THREAT INTELLIGENCE · EGYPT · H1 2026
                </span>
                <Badge className="border-purple-400/40 bg-purple-500/20 text-purple-200">Bi-annual</Badge>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-6 tracking-tight">
                The Egypt threat landscape, <span className="text-[#b9a3f0]">documented.</span>
              </h1>
              <p className="max-w-[52ch] text-base sm:text-xl md:text-2xl text-slate-300 mb-4 sm:mb-8 leading-relaxed">
                Six months of ransomware, breaches, data leaks and dark-web activity targeting Egyptian organizations — plus profiles of the adversary groups behind them.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href={REPORT_URL}>
                  <Button size="lg" className="px-8">
                    <FileText className="h-5 w-5 mr-2" />
                    More about the report
                  </Button>
                </Link>
                <Link href={`${REPORT_URL}#report-form`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white px-8">
                    <Mail className="h-5 w-5 mr-2" />
                    Join the waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* slide indicators */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={current === i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${current === i ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
