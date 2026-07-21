"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;
    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

function ConsentBridge() {
  useEffect(() => {
    const handler = (event: Event) => {
      if (typeof window.gtag !== "function") return;
      const detail = (event as CustomEvent<{ accepted: boolean }>).detail;
      const granted = detail?.accepted ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
      });
      if (detail?.accepted) {
        window.gtag("event", "page_view", {
          page_path: window.location.pathname + window.location.search,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    };
    window.addEventListener("pg-consent-changed", handler as EventListener);
    return () =>
      window.removeEventListener("pg-consent-changed", handler as EventListener);
  }, []);
  return null;
}

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var stored = null;
          try {
            stored = window.localStorage.getItem('pg_cookie_consent');
            if (stored !== 'accepted' && stored !== 'rejected') {
              var legacy = window.localStorage.getItem('pg_consent');
              if (legacy === 'accepted' || legacy === 'rejected') {
                stored = legacy;
                try {
                  window.localStorage.setItem('pg_cookie_consent', legacy);
                  window.localStorage.removeItem('pg_consent');
                } catch (e2) {}
              }
            }
          } catch (e) {}
          var granted = stored === 'accepted';
          gtag('consent', 'default', {
            ad_storage: granted ? 'granted' : 'denied',
            ad_user_data: granted ? 'granted' : 'denied',
            ad_personalization: granted ? 'granted' : 'denied',
            analytics_storage: granted ? 'granted' : 'denied',
            wait_for_update: 500,
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <ConsentBridge />
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
