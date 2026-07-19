"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { ReportHeroReticle } from "./ReportHeroReticle";
import { ReportRequestForm } from "./ReportRequestForm";
import { VulnerabilityStats } from "./VulnerabilityStats";
import { RegionalRanking } from "./RegionalRanking";
import { VictimsDonut } from "./VictimsDonut";
import { ThreatActorTerminalCard } from "./ThreatActorTerminalCard";
import { EgyptianVictims } from "./EgyptianVictims";
import { egyptThreatIntelH1_2026 } from "@/lib/reports/egypt-threat-intel-h1-2026";

type Lang = "en" | "ar";

const FORM_ID = "report-form";

// Fixed editorial copy — headlines, section intros, disclaimer. Doesn't change per report
// edition, unlike src/lib/reports/egypt-threat-intel-h1-2026.ts (stats, threat actors,
// document filenames, contact email), which this component reads from below.
const CONTENT = {
  en: {
    dir: "ltr" as const,
    hero: {
      eyebrow: "THREAT INTELLIGENCE · EGYPT · H1 2026",
      badge: "Bi-annual",
      titlePrefix: "The Egypt threat landscape, ",
      titleEmphasis: "documented.",
      body: "Six months of ransomware, breaches, data leaks and dark-web activity targeting Egyptian organizations — plus profiles of the adversary groups behind them. Compiled and confirmed by PurpleGuard's 24/7 SOC.",
      cta: "Get the report",
      ctaNote: "Free · delivered to your inbox",
    },
    vulnStats: {
      eyebrow: "VULNERABILITY LANDSCAPE",
      title: "What six months looks like",
      brandsEyebrow: "TOP AFFECTED BRANDS",
      total: { title: "Total vulnerabilities", hint: "disclosed, H1 2026" },
      critical: { title: "Critical + High severity", hint: "CVSS 7.9–10" },
      exploited: { title: "Actively exploited", hint: "confirmed in the wild" },
    },
    ranking: {
      eyebrow: "REGIONAL STANDING · H1 2026",
      africaLine: (rank: number) => (
        <>
          {rank === 1 ? "most targeted country" : `#${rank} most targeted country`} in{" "}
          <strong className="text-white">Africa</strong> by cyberthreats
        </>
      ),
      menaLine: (_rank: number, behind: string) => (
        <>
          most targeted in the <strong className="text-white">MENA region</strong>, behind {behind}
        </>
      ),
    },
    victims: {
      eyebrow: "CONFIRMED INCIDENTS IN EGYPT",
      title: "Confirmed victims in Egypt, H1 2026",
    },
    actors: {
      eyebrow: "THREAT ACTORS TRACKED",
      title: "The groups behind the activity",
      body: "> Each profile covers background, recent activity, common techniques and objectives — factual, sourced, no speculation.",
      footnote: "Full profiles for every group active against Egypt this half — in the report.",
    },
    egyptianVictims: {
      eyebrow: "CONFIRMED TARGETS",
      title: "Egyptian Victims",
      body: "Organizations confirmed compromised this half, grouped by the actor responsible.",
    },
    disclaimer: {
      lead: "Intelligence sharing, not naming and shaming.",
      rest: " The report references real organizations that have been compromised, never to damage reputations, disrupt operations, or point fingers at their security teams — it exists so the wider community can learn and defend. Most of this data was already made public by the adversaries themselves; an organization is only included after PurpleGuard SOC engineers independently confirm the claim.",
    },
  },
  ar: {
    dir: "rtl" as const,
    hero: {
      eyebrow: "THREAT INTELLIGENCE · EGYPT · H1 2026",
      badge: "نصف سنوي",
      titlePrefix: "مشهد التهديدات في مصر، ",
      titleEmphasis: "موثّقًا.",
      body: "ستة أشهر من هجمات الفدية والاختراقات وتسريبات البيانات ونشاط الإنترنت المظلم الذي استهدف المؤسسات المصرية — إلى جانب ملفات تعريفية عن المجموعات المهاجمة. جُمعت وتأكّدت عبر مركز عمليات الأمن لدى PurpleGuard على مدار الساعة.",
      cta: "احصل على التقرير",
      ctaNote: "مجاني · يصلك عبر البريد الإلكتروني",
    },
    vulnStats: {
      eyebrow: "VULNERABILITY LANDSCAPE",
      title: "حصاد ستة أشهر",
      brandsEyebrow: "أكثر العلامات التجارية تأثرًا",
      total: { title: "إجمالي الثغرات", hint: "مُفصح عنها، النصف الأول 2026" },
      critical: { title: "حرجة + عالية الخطورة", hint: "CVSS 7.9–10" },
      exploited: { title: "مُستغَلّة فعليًا", hint: "مؤكّدة ميدانيًا" },
    },
    ranking: {
      eyebrow: "الترتيب الإقليمي · النصف الأول 2026",
      africaLine: () => (
        <>
          الدولة الأكثر استهدافًا في <strong className="text-white">أفريقيا</strong> بالتهديدات السيبرانية
        </>
      ),
      menaLine: (_rank: number, behind: string) => (
        <>
          الأكثر استهدافًا في <strong className="text-white">منطقة الشرق الأوسط وشمال أفريقيا</strong>، بعد {behind}
        </>
      ),
    },
    victims: {
      eyebrow: "CONFIRMED INCIDENTS IN EGYPT",
      title: "ضحايا مؤكّدون في مصر، النصف الأول 2026",
    },
    actors: {
      eyebrow: "THREAT ACTORS TRACKED",
      title: "المجموعات وراء النشاط",
      body: "> يغطي كل ملف تعريفي الخلفية والنشاط الأخير والتقنيات الشائعة والأهداف — وقائع موثّقة دون تكهّنات.",
      footnote: "ملفات كاملة لكل مجموعة نشطة ضد مصر هذا النصف — داخل التقرير.",
    },
    egyptianVictims: {
      eyebrow: "CONFIRMED TARGETS",
      title: "الضحايا المصريون",
      body: "المؤسسات المؤكّد اختراقها هذا النصف، مصنّفة حسب الجهة المهاجمة المسؤولة.",
    },
    disclaimer: {
      lead: "مشاركة معلومات، لا تشهير.",
      rest: " يشير التقرير إلى مؤسسات حقيقية تعرّضت للاختراق، دون أي هدف للمساس بسمعتها أو تعطيل عملياتها أو توجيه اللوم لفرقها الأمنية — بل ليتعلّم المجتمع الأوسع ويُحسّن دفاعاته. معظم هذه البيانات كانت منشورة بالفعل من قبل المهاجمين أنفسهم؛ ولا تُدرج أي مؤسسة إلا بعد أن يتحقّق مهندسو مركز عمليات الأمن لدى PurpleGuard من صحة الادعاء بشكل مستقل.",
    },
  },
};

function scrollToForm() {
  const target = document.getElementById(FORM_ID);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top, behavior: "smooth" });
}

export function EgyptReportLanding({ hieroglyphClassName }: { hieroglyphClassName?: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [formVisible, setFormVisible] = useState(false);
  const observedRef = useRef<Element | null>(null);
  const c = CONTENT[lang];
  const data = egyptThreatIntelH1_2026;

  useEffect(() => {
    const target = document.getElementById(FORM_ID);
    if (!target || target === observedRef.current) return;
    observedRef.current = target;

    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.12,
    });
    io.observe(target);
    return () => io.disconnect();
  }, [lang]);

  // Restore the site's default <html> lang/dir once this page is left, since this is the
  // only surface in next-app that mutates them client-side (see CLAUDE.md "Egypt Threat
  // Intel Report landing page" — no general i18n system exists elsewhere in the app).
  // Declared before the sync effect below so its setup captures the pristine value on
  // mount, ahead of that effect's first mutation (effects run in declaration order).
  useEffect(() => {
    const root = document.documentElement;
    const initialLang = root.lang;
    const initialDir = root.dir;
    return () => {
      root.lang = initialLang;
      root.dir = initialDir;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = c.dir;
  }, [lang, c.dir]);

  return (
    <div dir={c.dir}>
      {/* language toggle */}
      <div className="fixed right-4 top-20 z-50 flex rounded-full border border-white/15 bg-[#0b0a12]/80 p-1 backdrop-blur-md">
        {(["en", "ar"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-colors ${
              lang === l ? "bg-primary text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden py-18 pb-16 pt-20 sm:pt-24">
        <ReportHeroReticle hieroglyphClassName={hieroglyphClassName} mirrored={lang === "ar"} />
        <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-5 px-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="pg-eyebrow text-[11.5px] font-medium text-[#b9a3f0]">{c.hero.eyebrow}</span>
            <Badge className="border-purple-400/40 bg-purple-500/20 text-purple-200">{c.hero.badge}</Badge>
          </div>
          <h1 className="font-display text-[34px] font-medium leading-[1.06] tracking-tight text-white sm:text-5xl">
            {c.hero.titlePrefix}
            <span className="font-bold text-[#b9a3f0]">{c.hero.titleEmphasis}</span>
          </h1>
          <p className="max-w-[52ch] text-[16.5px] leading-relaxed text-slate-300">{c.hero.body}</p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button size="lg" onClick={scrollToForm}>
              {c.hero.cta}
            </Button>
            <span className="font-mono text-xs text-slate-400">{c.hero.ctaNote}</span>
          </div>
        </div>
      </section>

      {/* VULNERABILITY LANDSCAPE */}
      <section className="bg-background py-14">
        <div className="mx-auto flex max-w-[880px] flex-col gap-6 px-5">
          <div className="flex flex-col gap-2">
            <span className="pg-eyebrow text-[11.5px] font-medium text-primary">{c.vulnStats.eyebrow}</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {c.vulnStats.title}
            </h2>
          </div>
          <VulnerabilityStats
            stats={data.vulnerabilityStats}
            brands={data.affectedBrands}
            labels={{
              total: c.vulnStats.total,
              critical: c.vulnStats.critical,
              exploited: c.vulnStats.exploited,
              brandsEyebrow: c.vulnStats.brandsEyebrow,
            }}
          />
        </div>
      </section>

      {/* REGIONAL RANKING */}
      <section className="relative overflow-hidden bg-[#0b0a12] py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(102,51,204,0.30), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[880px] px-5">
          <RegionalRanking ranking={data.regionalRanking} lang={lang} copy={c.ranking} />
        </div>
      </section>

      {/* VICTIMS DONUT */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto flex max-w-[880px] flex-col gap-6 px-5">
          <div className="flex flex-col gap-2">
            <span className="pg-eyebrow text-[11.5px] font-medium text-primary">{c.victims.eyebrow}</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {c.victims.title}
            </h2>
          </div>
          <VictimsDonut data={data.victimsDonut} lang={lang} caption={c.victims.title} />
        </div>
      </section>

      {/* THREAT ACTORS */}
      <section className="relative overflow-hidden bg-[#0b0a12] py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(102,51,204,0.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto flex max-w-[880px] flex-col gap-6 px-5">
          <div className="flex flex-col gap-2">
            <span className="pg-eyebrow text-[11.5px] font-medium text-[#b9a3f0]">{c.actors.eyebrow}</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {c.actors.title}
            </h2>
            <p dir="ltr" className="max-w-[62ch] font-mono text-[13px] leading-relaxed text-[#8AF0B0]">
              {c.actors.body}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.threatActors.map((actor) => (
              <ThreatActorTerminalCard key={actor.slug} actor={actor} lang={lang} />
            ))}
          </div>
          <p className="text-sm text-slate-300">{c.actors.footnote}</p>
        </div>
      </section>

      {/* EGYPTIAN VICTIMS */}
      <section className="bg-background py-14">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-7 px-5">
          <div className="flex flex-col gap-2">
            <span className="pg-eyebrow text-[11.5px] font-medium text-primary">{c.egyptianVictims.eyebrow}</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {c.egyptianVictims.title}
            </h2>
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">{c.egyptianVictims.body}</p>
          </div>
          <EgyptianVictims groups={data.egyptianVictims} />
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-y border-border bg-muted/30 py-[22px]">
        <div className="mx-auto flex max-w-[1100px] items-start gap-2.5 px-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={1.75} />
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">{c.disclaimer.lead}</strong>
            {c.disclaimer.rest}
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="relative overflow-hidden bg-[#0b0a12] py-14 pb-[72px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(102,51,204,0.22), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[480px] px-5">
          <ReportRequestForm id={FORM_ID} lang={lang} />
        </div>
      </section>

      {/* STICKY CTA */}
      {!formVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0a12]/90 px-4 py-2.5 backdrop-blur-md">
          <div className="mx-auto flex max-w-[480px] items-center gap-3">
            <span className="h-2 w-2 flex-none animate-pulse rounded-full bg-primary" />
            <Button className="w-full" onClick={scrollToForm}>
              {c.hero.cta}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
