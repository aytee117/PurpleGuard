"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { Turnstile } from "./Turnstile";
import { egyptThreatIntelH1_2026 } from "@/lib/reports/egypt-threat-intel-h1-2026";

// TEMP: unused while the waitlist capture endpoint is active — restore the
// `documentSlug: DOCUMENT_SLUG` payload field when reverting to
// /api/download-request. See project deliverables.md #3.
const DOCUMENT_SLUG = "egypt-threat-intel-report-h1-2026";
const CONTACT_EMAIL = egyptThreatIntelH1_2026.contactEmail;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const JOB_TITLES_EN = [
  "CISO",
  "CIO / CTO",
  "Security Manager",
  "SOC Analyst",
  "Incident Responder",
  "Threat Intel Analyst",
  "GRC / Compliance",
  "IT Manager",
  "Consultant",
  "Other",
];

const JOB_TITLES_AR: Record<string, string> = {
  CISO: "مدير أمن المعلومات (CISO)",
  "CIO / CTO": "مدير تقنية / معلومات (CIO / CTO)",
  "Security Manager": "مدير أمن",
  "SOC Analyst": "محلل مركز عمليات أمن (SOC)",
  "Incident Responder": "مستجيب للحوادث",
  "Threat Intel Analyst": "محلل استخبارات تهديدات",
  "GRC / Compliance": "حوكمة ومخاطر وامتثال",
  "IT Manager": "مدير تقنية معلومات",
  Consultant: "استشاري",
  Other: "أخرى",
};

const COPY = {
  en: {
    eyebrow: "GET THE REPORT",
    title: "Egypt Threat Intelligence Report — H1 2026",
    subtitle: "Delivered by email, in the language you pick below.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    jobLabel: "Job title",
    jobPlaceholder: "Select your role…",
    langLabel: "Report language",
    langEn: "English",
    langAr: "العربية (Arabic)",
    consent: "I'd like to receive future threat-intelligence updates and briefings from PurpleGuard by email.",
    submit: "Join the waitlist",
    sending: "Sending…",
    footer: "We only use your email to deliver the report.",
    privacy: "Privacy policy",
    successTitle: "You're on the waitlist",
    successBody: (email: string) => (
      <>
        We&apos;ll email the report to <span className="font-mono text-[13px] text-foreground">{email}</span> the
        moment it&apos;s published — no action needed. Questions in the meantime? Write to{" "}
        <span className="font-mono text-[13px]">{CONTACT_EMAIL}</span>.
      </>
    ),
    error: "Something went wrong. Please try again.",
  },
  ar: {
    eyebrow: "GET THE REPORT",
    title: "تقرير استخبارات التهديدات — مصر، النصف الأول 2026",
    subtitle: "يصلك عبر البريد الإلكتروني، وباللغة التي تختارها أدناه.",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "you@company.com",
    jobLabel: "المسمّى الوظيفي",
    jobPlaceholder: "اختر دورك…",
    langLabel: "لغة التقرير",
    langEn: "English",
    langAr: "العربية",
    consent: "أرغب في استلام تحديثات وإحاطات استخبارات التهديدات المستقبلية من PurpleGuard عبر البريد الإلكتروني.",
    submit: "انضم لقائمة الانتظار",
    sending: "جارٍ الإرسال…",
    footer: "نستخدم بريدك لتسليم التقرير فقط.",
    privacy: "سياسة الخصوصية",
    successTitle: "أنت الآن على قائمة الانتظار",
    successBody: (email: string) => (
      <>
        سنرسل التقرير إلى <span dir="ltr" className="font-mono text-[13px] text-foreground">{email}</span> فور
        نشره — لا حاجة لأي إجراء. لأي استفسار، راسلنا على{" "}
        <span dir="ltr" className="font-mono text-[13px]">{CONTACT_EMAIL}</span>.
      </>
    ),
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
} as const;

type Status = "idle" | "loading" | "success" | "error";

export function ReportRequestForm({ id, lang }: { id: string; lang: "en" | "ar" }) {
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [reportLang, setReportLang] = useState<"en" | "ar">(lang);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailValid = EMAIL_REGEX.test(email.trim());
  const valid = emailValid && !!jobTitle && !!turnstileToken;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      // TEMP: routes to the waitlist capture endpoint until the report PDF
      // ships — see project deliverables.md #3.
      const res = await fetch("/api/report-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          jobTitle,
          reportLang,
          consent,
          company,
          turnstileToken,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || t.error);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(t.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id={id} className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--pg-brand-soft,rgba(102,51,204,0.14))] text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-semibold text-white">{t.successTitle}</h2>
          <p className="text-[14.5px] leading-relaxed text-slate-300">{t.successBody(email)}</p>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="pg-eyebrow text-[11.5px] font-medium text-[#b9a3f0]">{t.eyebrow}</span>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{t.title}</h2>
        <p className="text-[14.5px] text-slate-300">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot — hidden from real users, bots tend to fill every field */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="report-email" className="text-[13px] font-semibold text-white">
            {t.emailLabel}
          </label>
          <Input
            id="report-email"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-white">{t.jobLabel}</label>
          <Select value={jobTitle} onValueChange={setJobTitle}>
            <SelectTrigger className="border-white/20 bg-white/10 text-white">
              <SelectValue placeholder={t.jobPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {JOB_TITLES_EN.map((job) => (
                <SelectItem key={job} value={job}>
                  {lang === "ar" ? JOB_TITLES_AR[job] : job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-white">{t.langLabel}</label>
          <Select value={reportLang} onValueChange={(v) => setReportLang(v as "en" | "ar")}>
            <SelectTrigger className="border-white/20 bg-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t.langEn}</SelectItem>
              <SelectItem value="ar">{t.langAr}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-300">
          <Checkbox checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5" />
          <span>{t.consent}</span>
        </label>

        <Turnstile onToken={setTurnstileToken} />

        <Button type="submit" size="lg" disabled={!valid || status === "loading"} className="w-full">
          {status === "loading" ? t.sending : t.submit}
        </Button>

        {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}

        <p className="text-center font-mono text-[11.5px] text-slate-400">
          {t.footer}{" "}
          <Link href="/privacy" className="underline">
            {t.privacy}
          </Link>
        </p>
      </form>
    </div>
  );
}
