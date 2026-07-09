"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, CheckCircle2 } from "lucide-react";

interface GatedDownloadCTAProps {
  documentSlug: string;
  documentDisplayName?: string;
  buttonLabel?: string;
  buttonClassName?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function GatedDownloadCTA({
  documentSlug,
  documentDisplayName = "datasheet",
  buttonLabel = "Download Datasheet",
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

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Reset so reopening later doesn't show a stale success/error state
      setStatus("idle");
      setErrorMessage("");
      setEmail("");
      setCompany("");
    }
  }

  return (
    <>
      <Button size="lg" variant="outline" className={buttonClassName} onClick={() => setOpen(true)}>
        <Download className="h-5 w-5 mr-2" /> {buttonLabel}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          {status === "success" ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Check your inbox
                </DialogTitle>
                <DialogDescription>
                  We&apos;ve sent the download link for the {documentDisplayName} to {email}.
                </DialogDescription>
              </DialogHeader>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Get the {documentDisplayName}</DialogTitle>
                <DialogDescription>
                  Enter your email and we&apos;ll send you a link to download it.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                  autoFocus
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send me the datasheet"}
                </Button>
                {status === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
