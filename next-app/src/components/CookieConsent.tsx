"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CONSENT_OPEN_EVENT,
  ConsentChoice,
  getConsent,
  setConsent,
} from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (getConsent() === "unset") {
      setVisible(true);
    }
    const openHandler = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, openHandler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, openHandler);
  }, []);

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
    toast({
      title:
        choice === "accepted"
          ? "Analytics cookies accepted"
          : "Analytics cookies rejected",
      description:
        choice === "accepted"
          ? "Thanks — analytics will help us improve the site."
          : "We won't load analytics cookies on your visits.",
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-xl border border-purple-400/30 bg-slate-950/95 backdrop-blur-md shadow-2xl shadow-purple-900/40 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-shrink-0 hidden sm:flex w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-400/30 items-center justify-center">
            <Cookie className="w-5 h-5 text-purple-300" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-white mb-1">
              We value your privacy
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We use cookies for analytics to understand how visitors use our
              site. You can accept or reject analytics cookies. Read our{" "}
              <Link
                href="/privacy#cookies"
                className="text-purple-300 hover:text-purple-200 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center">
              <Button
                size="sm"
                onClick={() => choose("accepted")}
                className="bg-purple-500 hover:bg-purple-400 text-white"
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => choose("rejected")}
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Reject
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Close"
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors p-1 -m-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
