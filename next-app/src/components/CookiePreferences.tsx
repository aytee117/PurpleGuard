"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CONSENT_CHANGED_EVENT,
  ConsentChoice,
  ConsentState,
  getConsent,
  openConsentBanner,
  setConsent,
} from "@/lib/consent";

const STATUS_LABEL: Record<ConsentState, string> = {
  accepted: "Accepted",
  rejected: "Rejected",
  unset: "Not set",
};

const STATUS_CLASS: Record<ConsentState, string> = {
  accepted: "bg-emerald-500/15 border-emerald-400/30 text-emerald-200",
  rejected: "bg-rose-500/15 border-rose-400/30 text-rose-200",
  unset: "bg-slate-500/15 border-slate-400/30 text-slate-200",
};

export default function CookiePreferences() {
  const [state, setState] = useState<ConsentState>("unset");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  const handleChoice = (choice: ConsentChoice) => {
    setConsent(choice);
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

  useEffect(() => {
    setMounted(true);
    setState(getConsent());
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ accepted: boolean }>).detail;
      setState(detail?.accepted ? "accepted" : "rejected");
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(
        CONSENT_CHANGED_EVENT,
        handler as EventListener
      );
  }, []);

  const status = mounted ? state : "unset";

  return (
    <div className="not-prose mt-6 rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-900/20 to-slate-900/40 p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-400/30 flex items-center justify-center">
          <Cookie className="w-4 h-4 text-purple-300" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-base mb-1">
            Manage cookie preferences
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Update your analytics cookie choice at any time. Changes take effect
            immediately.
          </p>
        </div>
        <span
          className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_CLASS[status]}`}
          aria-live="polite"
        >
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => handleChoice("accepted")}
          className="bg-purple-500 hover:bg-purple-400 text-white"
        >
          Accept analytics
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleChoice("rejected")}
          className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          Reject analytics
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => openConsentBanner()}
          className="text-purple-200 hover:text-white hover:bg-white/10"
        >
          Reopen banner
        </Button>
      </div>
    </div>
  );
}
