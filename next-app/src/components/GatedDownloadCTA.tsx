"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle2 } from "lucide-react";

interface GatedDownloadCTAProps {
  documentSlug: string;
  buttonLabel?: string;
  className?: string;
  buttonClassName?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function GatedDownloadCTA({
  documentSlug,
  buttonLabel = "Download Datasheet",
  className,
  buttonClassName,
}: GatedDownloadCTAProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/download-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, documentSlug, company }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <Button size="lg" variant="outline" className={buttonClassName} onClick={() => setOpen(true)}>
        <Download className="h-5 w-5 mr-2" /> {buttonLabel}
      </Button>
    );
  }

  if (status === "success") {
    return (
      <div className={className}>
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
          Check your inbox — we&apos;ve sent the download link to {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Honeypot field - hidden from real users, bots tend to fill every field */}
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
        <Input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sm:max-w-xs bg-white text-slate-900"
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send me the datasheet"}
        </Button>
      </div>
      {status === "error" && <p className="mt-2 text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
