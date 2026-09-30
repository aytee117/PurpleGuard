"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export interface ExistingRegistration {
  joinWebUrl: string | null;
  cancelled: boolean;
}

interface EventRegistrationFormProps {
  eventSlug: string;
  eventTitle: string;
  existingRegistration: ExistingRegistration | null;
}

export function EventRegistrationForm({ eventSlug, eventTitle, existingRegistration }: EventRegistrationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(
    existingRegistration && !existingRegistration.cancelled && existingRegistration.joinWebUrl ? "success" : "idle"
  );
  const [joinWebUrl, setJoinWebUrl] = useState<string | null>(
    existingRegistration && !existingRegistration.cancelled ? existingRegistration.joinWebUrl : null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const emailValid = EMAIL_REGEX.test(email.trim());
  const valid = emailValid && !!firstName.trim() && !!lastName.trim() && !!turnstileToken;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`/api/events/${eventSlug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          company,
          jobTitle,
          consent,
          website,
          turnstileToken,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setJoinWebUrl(data.joinWebUrl ?? null);
      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3eefc] text-[#6633cc]">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-semibold text-slate-900">You&apos;re registered</h2>
          <p className="text-[14.5px] leading-relaxed text-slate-600">
            You&apos;re registered for <strong>{eventTitle}</strong>. We&apos;ve also emailed your join link to{" "}
            {email || "your inbox"}.
          </p>
          {joinWebUrl && (
            <Button asChild size="lg" className="mt-2">
              <a href={joinWebUrl}>Your join link</a>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {existingRegistration?.cancelled && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[13.5px] text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Your previous registration for this event was cancelled. You can register again below.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot — hidden from real users, bots tend to fill every field.
            Named `website`, not `company`, since this form has a real company field. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-first-name" className="text-[13px] font-semibold text-slate-900">
              First name
            </label>
            <Input id="event-first-name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-last-name" className="text-[13px] font-semibold text-slate-900">
              Last name
            </label>
            <Input id="event-last-name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-email" className="text-[13px] font-semibold text-slate-900">
            Email address
          </label>
          <Input
            id="event-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-company" className="text-[13px] font-semibold text-slate-900">
              Company
            </label>
            <Input id="event-company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="event-job-title" className="text-[13px] font-semibold text-slate-900">
              Job title
            </label>
            <Input id="event-job-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-600">
          <Checkbox checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5" />
          <span>I&apos;d like to receive future event invitations and updates from PurpleGuard by email.</span>
        </label>

        <Turnstile onToken={setTurnstileToken} theme="light" />

        <Button type="submit" size="lg" disabled={!valid || status === "loading"} className="w-full">
          {status === "loading" ? "Registering…" : "Register"}
        </Button>

        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

        <p className="text-center font-mono text-[11.5px] text-slate-500">
          By registering you agree to our{" "}
          <Link href="/privacy" className="underline">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
