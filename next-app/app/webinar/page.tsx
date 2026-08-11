import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Globe2, CheckCircle2 } from "lucide-react";
import { RegisterButton } from "@/components/webinar/RegisterButton";
import { RecordingCaptureForm } from "@/components/webinar/RecordingCaptureForm";
import { PartnerLogo } from "@/components/webinar/PartnerLogo";
import { webinarIepAug2026 } from "@/lib/campaigns/webinar-iep-aug2026";
import { ogImageUrl } from "@/lib/json-ld";

const OG = ogImageUrl({
  title: webinarIepAug2026.title,
  subtitle: `${webinarIepAug2026.dateLabel} · ${webinarIepAug2026.timeLabel}`,
  category: "Webinar",
  color: "purple",
});

export const metadata: Metadata = {
  title: { absolute: `${webinarIepAug2026.title} | PurpleGuard` },
  description:
    "Your gateway makes one decision, at delivery. This session covers everything that happens after it — account takeover, AI-assisted phishing, and post-delivery protection for Microsoft 365. 60 minutes, in Arabic.",
  alternates: { canonical: "https://www.purpleguard.io/webinar" },
  openGraph: {
    title: webinarIepAug2026.title,
    description: `${webinarIepAug2026.dateLabel} · ${webinarIepAug2026.timeLabel} · ${webinarIepAug2026.durationLabel} · ${webinarIepAug2026.languageLabel}`,
    images: [{ url: OG, width: 1200, height: 630, alt: webinarIepAug2026.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: webinarIepAug2026.title,
    images: [OG],
  },
};

const { registrationUrl, dateLabel, timeLabel, durationLabel, languageLabel, speaker, threatFigures, takeaways, credibility, terms } =
  webinarIepAug2026;

export default function WebinarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="gradient-primary relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="pg-eyebrow text-xs font-semibold uppercase text-purple-200">Live webinar</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">{webinarIepAug2026.title}</h1>
          <p className="mt-6 text-lg text-purple-100 sm:text-xl">
            Your gateway makes one decision, at delivery. This session is about everything that happens after it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white">
            <span className="font-medium">{dateLabel}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {timeLabel} · {durationLabel}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-semibold">
              <Globe2 className="h-4 w-4" /> {languageLabel}
            </span>
          </div>

          <div className="mt-10">
            <RegisterButton href={registrationUrl}>Save your seat</RegisterButton>
          </div>
        </div>
      </section>

      {/* 2. The gap */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-5 text-lg leading-relaxed text-slate-700">
          <p>
            Email security stops at delivery. Attacks don&apos;t. The decision made at the gateway is final — even
            when the message that got through was never malicious at all, and only becomes dangerous hours or weeks
            later.
          </p>
          <p>
            We watched this happen firsthand. A client running a Barracuda email gateway had mail filtered correctly
            on the way in — nothing malicious was delivered that it should have caught. An account was taken over
            anyway. Our Tier 1 SOC caught it on a geography anomaly in the sign-in logs and contained it inside the
            hour.
          </p>
          <p>
            Under an hour is fast for a team of people. Barracuda&apos;s H1 2026 data says an attacker needs five
            minutes to escalate once they&apos;re inside.
          </p>
        </div>
      </section>

      {/* 3. Threat figures */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {threatFigures.map((fig) => (
            <div key={fig.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-gradient text-4xl font-bold">{fig.value}</div>
              <p className="mt-2 text-sm text-slate-600">{fig.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-4xl px-4 text-center text-xs text-slate-400 sm:px-6">
          Source: Barracuda H1 2026 threat data.
        </p>
      </section>

      {/* 4. What you'll take away */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">What you&apos;ll take away</h2>
        <ul className="mt-8 space-y-4">
          {takeaways.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Speaker */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <Image
            src={speaker.photo}
            alt={speaker.name}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="text-lg font-semibold text-slate-900">{speaker.name}</p>
            <p className="text-sm text-slate-600">{speaker.title}</p>
          </div>
          <p className="max-w-xl text-slate-700">
            Mohamed leads PurpleGuard&apos;s regional security practice and will walk through the H1 2026 threat
            data, what post-delivery protection changes, then take live questions for the last twenty minutes.
          </p>
        </div>
      </section>

      {/* 6. Credibility */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <PartnerLogo name="Barracuda Premier Partner" src={credibility.barracudaPremierLogo} />
          <PartnerLogo name="Barracuda MSP Partner" src={credibility.barracudaMspLogo} />
          <PartnerLogo name="MHE | NextGenIT" src={credibility.mheLogo} />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-slate-700">{credibility.copy}</p>
      </section>

      {/* 7. Terms */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">Support</p>
              <p className="mt-2 text-slate-700">{terms.support}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">Seats</p>
              <p className="mt-2 text-slate-700">{terms.seats}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Read more about{" "}
            <a href={terms.secondaryLinkHref} className="text-primary underline underline-offset-2">
              {terms.secondaryLinkLabel}
            </a>
            .
          </p>
        </div>
      </section>

      {/* 8. CTA repeat */}
      <section className="gradient-primary py-16 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{dateLabel}</h2>
          <p className="mt-2 text-purple-100">
            {timeLabel} · {durationLabel} · {languageLabel}
          </p>
          <div className="mt-8">
            <RegisterButton href={registrationUrl}>Save your seat</RegisterButton>
          </div>
        </div>
      </section>

      {/* 9. Below fold — recording capture */}
      <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h2 className="text-xl font-semibold text-slate-900">Can&apos;t join live? Get the recording.</h2>
        <p className="mt-2 text-sm text-slate-600">Register your email and we&apos;ll send it after the session.</p>
        <div className="mt-6">
          <RecordingCaptureForm />
        </div>
      </section>
    </div>
  );
}
