"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// window.gtag is already declared globally in Analytics.tsx — no need to
// redeclare it here (and doing so with different optionality would conflict).

interface RegisterButtonProps {
  href: string;
  className?: string;
  size?: "default" | "lg";
  children: React.ReactNode;
}

export function RegisterButton({ href, className, size = "lg", children }: RegisterButtonProps) {
  const onClick = () => {
    const p = new URLSearchParams(window.location.search);
    window.gtag?.("event", "teams_handoff", {
      utm_source: p.get("utm_source") ?? "direct",
      utm_medium: p.get("utm_medium") ?? "none",
      utm_content: p.get("utm_content") ?? "none",
    });
  };

  return (
    <Button asChild size={size} className={cn("gradient-primary text-white hover:opacity-90", className)}>
      {/* Same tab, deliberately — target="_blank" would fragment the GA4 session. */}
      <a href={href} onClick={onClick}>
        {children}
      </a>
    </Button>
  );
}
