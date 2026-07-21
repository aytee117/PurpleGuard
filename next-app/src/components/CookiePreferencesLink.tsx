"use client";

import { openConsentBanner } from "@/lib/consent";

export default function CookiePreferencesLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className={className}
    >
      {children}
    </button>
  );
}
