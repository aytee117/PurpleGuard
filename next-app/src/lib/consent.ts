export const CONSENT_STORAGE_KEY = "pg_cookie_consent";
const LEGACY_CONSENT_STORAGE_KEY = "pg_consent";

export type ConsentChoice = "accepted" | "rejected";
export type ConsentState = ConsentChoice | "unset";

export const CONSENT_CHANGED_EVENT = "pg-consent-changed";
export const CONSENT_OPEN_EVENT = "pg-consent-open";

function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const current = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (current === "accepted" || current === "rejected") return current;
    const legacy = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
    if (legacy === "accepted" || legacy === "rejected") {
      try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, legacy);
        window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
      } catch {}
      return legacy;
    }
  } catch {}
  return null;
}

export function getConsent(): ConsentState {
  return readStoredConsent() ?? "unset";
}

export function setConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {}
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGED_EVENT, {
      detail: { accepted: choice === "accepted" },
    })
  );
}

export function openConsentBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
