# Project Deliverables

Running tracker of work items for the PurpleGuard `next-app` migration. This file is the source of truth for what's outstanding, in progress, and done — **read it at the start of every session/section for context and continuity**, and keep it updated as work lands (see [CLAUDE.md](CLAUDE.md)).

Status legend: `Open` — not started · `In progress` · `Diagnosed` — root cause found, fix not yet implemented · `Done`

---

## 1. Restore cookie consent banner (GTM) in `next-app`

**Status:** Code fix merged to `main` and live in production. Still open: the visible banner itself isn't rendering — confirmed to be a GTM dashboard/container question, not a code bug (see below). Next step (user's, not code): use GTM's own Preview/Tag Assistant mode against the live production domain to see which tags actually fire.

**Note on where this lived:** the branch (`fix/restore-gtm-cookie-consent`) sat in a separate worktree at `C:/Users/hadda/Local Sites/PurpleGuard-gtm-fix`, not this directory, and as an uncommitted diff there for a while before being committed and pushed — worth remembering if a similar "I don't see this branch" question comes up again for other worktrees.

**Summary:** The cookie consent acknowledgement banner present on the legacy Replit-hosted site does not appear on the new Vercel-hosted `next-app`.

**Root cause:** The banner was never a custom component — it was rendered by a Google Tag Manager consent-banner tag configured inside the GTM container (`GTM-TBJDVSX4`), not by anything in the repo. The GTM bootstrap `<script>` + `<noscript>` iframe exist in the legacy app at [client/index.html:4-9](client/index.html#L4-L9) and [client/index.html:18-21](client/index.html#L18-L21), but were never carried over when `next-app/app/layout.tsx` was rebuilt for the App Router migration. Confirmed via repo-wide grep — no `googletagmanager`, `GTM-`, `gtag`, or `dataLayer` references exist anywhere in `next-app` source.

**Fix:** Added the GTM bootstrap script (via `next/script`, `strategy="afterInteractive"`) and the `<noscript>` iframe fallback to `next-app/app/layout.tsx`, pointing at the same `GTM-TBJDVSX4` container ID. Built on branch `fix/restore-gtm-cookie-consent`, branched fresh off `main` (not off the in-progress Egypt report branch).

**Verified:** `npm run build`/typecheck pass clean, both in dev and again directly against the Vercel preview deployment. Confirmed via Playwright on the preview URL — `gtm.js?id=GTM-TBJDVSX4` request fires (200), and `dataLayer` correctly populates with the `gtm.js` → `gtm.dom` → `gtm.load` sequence, meaning the container initializes fully. No visible consent banner appeared, and critically: no other consent-platform requests (Cookiebot/OneTrust/Osano/etc.) and no consent-related `dataLayer` events showed up anywhere in the session — nothing observable from the outside suggests a banner tag exists or fired inside this container at all. This confirms the repo-side fix is doing everything code can do; the remaining gap is entirely on the GTM dashboard side. Most likely causes, roughly in order: (1) the banner tag/workspace was drafted but never actually published (`Submit → Publish`) in GTM — the single most common reason a container loads fine but one specific tag never fires; (2) the banner tag doesn't actually live in `GTM-TBJDVSX4` — worth confirming this is the right container; (3) a geo- or hostname-based trigger condition on the tag (e.g. EU/California-only, or restricted to the production hostname) intentionally suppressing it outside that scope.

**Files involved:**
- `next-app/app/layout.tsx` (done)
- `client/index.html` (reference for the original snippet)

---

## 2. Missing DMARC record for the transactional email sending subdomain

**Status:** Diagnosed — fix not yet implemented

**Summary:** The dedicated Resend sending subdomain `notification.purpleguard.io` (used for the document-download email flow, see [CLAUDE.md](CLAUDE.md) "Document Download Infrastructure") has no DMARC record of its own.

**Root cause:** `_dmarc.notification.purpleguard.io` returns NXDOMAIN — no record exists at that exact hostname, so the subdomain inherits the root domain's policy at `_dmarc.purpleguard.io`, which is `v=DMARC1; p=none;` (monitor-only, no enforcement, no `sp=` override for subdomains). This isn't currently causing outright authentication failures — DKIM is correctly published and resolving (`resend._domainkey.notification.purpleguard.io`), and DKIM alignment alone is enough to pass DMARC even under `p=none` — but `p=none` is the weakest possible trust signal, and strict corporate mail gateways weigh DMARC policy strength as part of new-domain reputation scoring. Observed during testing: a send to a corporate mailbox (`mh-enterprise.com`) was accepted at the SMTP edge (250 OK) but never appeared in inbox or spam — consistent with an admin-only quarantine hold, most likely due to unfamiliar-domain + weak DMARC signal. The same email delivered cleanly to a Gmail address.

**Fix (not yet done):** Add an explicit DMARC record for the subdomain (or set `sp=` on the root `_dmarc.purpleguard.io` record to define subdomain policy). Consider strengthening from `p=none` to `p=quarantine` once sending volume/reputation has had time to build — jumping straight to enforcement on a brand-new domain risks self-inflicted delivery failures if SPF/DKIM alignment isn't rock solid yet.

**Files involved:** None in-repo — this is a DNS-only change, made in Cloudflare (where `purpleguard.io`'s DNS is hosted).

---

## 3. Egypt Threat Intel Report — landing page, hero animation, gated download

**Status:** Live in production on `main`. The landing page, homepage hero carousel, and Phase 1 SEO fixes are merged and deployed; the waitlist form is fully live (Turnstile + Supabase env vars confirmed in Vercel Production/Preview). Still blocked on real report content (PDF files, contact email) before the waitlist can be swapped back to the real instant-download flow — see the checklist below.

**Summary:** New lead-magnet landing page (`/reports/egypt-threat-intel-h1-2026`) for the SOC team's first bilingual (EN/AR) threat intelligence report, gated behind the existing email-capture infrastructure (see [CLAUDE.md](CLAUDE.md) "Document Download Infrastructure"). Ported from two claude.ai/design projects: the landing page itself and a hero background animation (reticle-sweep variant with the brand mark at its core).

**Scope decisions made:**
- Full EN/AR client-side toggle shipped now (first i18n/RTL surface in `next-app`); the design computed tab-highlight colors but never rendered its own language switch, so one was added.
- "Business email only" domain-blocking from the design was deliberately dropped — personal emails are allowed for now.
- Cloudflare Turnstile added (on top of the existing honeypot) since personal emails are allowed, to keep the open gate spam-resistant.

### Design refresh — real data pass (second `claude.ai/design` import)

The user updated the design in `claude.ai/design` with real report data and imported it via the `DesignSync` tool (project `00d0c784-e13f-44b9-94fe-6c1ef0a2c9e8`, file `Egypt Report Landing.dc.html`), explicitly keeping the existing hero (`ReportHeroReticle`) untouched and the form fields/logic untouched except the submit CTA. The old 4-tile placeholder stats section and the 3 example threat-actor profiles (MuddyWater, Molerats · TA402, LockBit affiliates) were fully replaced with real content:

- **Vulnerability Landscape** — 41K total vulnerabilities disclosed, 12.1K critical/high severity, 295 actively exploited; a "top affected brands" logo strip (Microsoft, Oracle, Splunk, Cisco, Palo Alto Networks, Fortinet, cPanel).
- **Regional Ranking** — Egypt is #1 most-targeted country in Africa, #2 in MENA (behind Turkey).
- **Victims Donut** — 92 confirmed incidents in Egypt this half, broken down across 6 categories (Data Breach 57, Ransomware 30, Defacement 2, Coordinated campaign 1, DDoS 1, Unauthenticated Access 1).
- **Threat Actors** — 3 real, confirmed groups replacing the old placeholders: The Gentlemen (Russia, double extortion/EDR killer), NightSpire (South Korea, double extortion/short deadlines), Payload (origin unknown, double extortion/Babuk-derived). Rendered as terminal-window styled cards (`ThreatActorTerminalCard.tsx`).
- **Egyptian Victims** — 22 real, confirmed victim organizations across the 3 actor groups (7/8/7), each in its own list under the responsible actor.

**Binary image assets — resolved with real files.** Initially, hand-copying base64 image data mid-conversation via the `DesignSync` tool proved unreliable (one asset, `victim-ace.png`, was caught being silently fabricated with plausible-but-wrong bytes before it was ever saved), so all photo/logo assets shipped as colored-initials fallback badges (`LogoBadge.tsx`) at first, per the user's explicit interim decision ("Placeholder badges — Recommended"). The user then downloaded the design project's asset `.zip` directly and had it extracted locally, which supplied the real files with no transcription risk — all 3 threat-actor photos and 12 more victim-org logos (previously initials/favicon placeholders) were swapped in for the genuine assets. Only 2 victims still use initials badges (`basatamfi`, `Future Association for Microfinance`) and 4 use Google's favicon service (Ebny, Smart Glass, LAMAICA, Misr Al Mahaba Hospital) — matching the source design exactly, since it uses the same fallbacks for those specific orgs (no dedicated logo asset exists for them even in the source).

**Design-fidelity pass (post-first-implementation correction).** A first implementation pass (built from the `DesignSync`-fetched HTML/copy alone, before the asset zip existed) had fidelity gaps the user caught by eye: the disclaimer was rendered as a bordered card with a heading, not the source's compact single-line icon+paragraph banner; the Egyptian Victims section used the same width as other sections instead of the source's deliberately wider `max-width:1400px`; and the threat-actor cards looked cramped/under-padded compared to the source. Fixed by reading the downloaded `.dc.html` directly (`Egypt Report Landing.dc.html`) and matching it exactly: disclaimer rewritten as a slim `shield-check`-icon banner with one inline-bold-lead paragraph inside a bordered strip (not a card); Egyptian Victims widened to `max-w-[1400px]`; other mid-page sections tightened to the source's exact pixel max-widths (880px / 480px); threat-actor avatars and victim-group headers switched to the real photos from the asset zip instead of initials badges.

**Root cause of the "cramped card" complaint, found via `getComputedStyle` diffing against the live-rendered source file (not just its CSS text):** two Tailwind classes used invalid decimal spacing steps — `p-4.5` (`ThreatActorTerminalCard.tsx`) and `py-5.5` (disclaimer section) — neither `4.5` nor `5.5` exist in Tailwind's default spacing scale (only `0.5/1.5/2.5/3.5`, and this project's `tailwind.config.ts` doesn't extend it), so both silently compiled to **zero padding** with no build error. Confirmed by comparing `getBoundingClientRect()`/`getComputedStyle()` output between the actual source `.dc.html` (served locally to render it, since the design system's own CSS bundle is part of the zip) and the live dev server at the same 1905px viewport: card content `padding` measured `0px` instead of the intended `18px`, making the "less padding" complaint literal, not a subjective read. A related bug, `pb-18` on the form section (`18` is also outside the default integer scale, which jumps `...12,14,16,20...`), was caught by the same audit. All three fixed with explicit arbitrary-value classes (`p-[18px]`, `py-[22px]`, `pb-[72px]`); while auditing, also corrected several close-but-not-exact values against the source (card `border-radius` was rendering at this project's brand-overridden `rounded-xl`=20px instead of the source's 12px, `backdrop-blur-xl`=24px vs source's 20px, border opacity 0.10 vs 0.12, paragraph `line-height` 1.625 vs source's 1.55, tag-pill padding, name letter-spacing). Post-fix, the threat-actor card's rendered height matches the source to within 1px (442px vs 443px) at identical viewport width — confirms the fix, not just a visual impression. **Takeaway for future Tailwind work on this repo:** arbitrary decimal/skipped-integer spacing utilities (anything beyond `0.5/1.5/2.5/3.5` or outside the default integer steps) fail silently — always use bracket syntax (`p-[18px]`) for non-standard values rather than guessing a bare decimal class exists.

**Blocked on — real content still needed before this can go live:**
- [ ] **Contact email** — confirm `intel@purpleguard.io` is a real, monitored inbox, or keep the current default `hello@purpleguard.io`.
- [ ] **Report PDF(s)** — English and Arabic files. Filenames are already wired up (`documentFilename.en` / `.ar` in the data file); once the real PDFs exist, place them in `next-app/private-documents/` under those exact names (case-sensitive on Vercel's Linux runtime, even though Windows dev won't catch a mismatch — see the "Updating a document" gotcha in CLAUDE.md).
- [x] Stats, regional ranking, victims breakdown, threat-actor profiles, and confirmed victim list — real data landed via the design refresh above.
- [x] Turnstile keys — set in `next-app/.env.local` for local dev, and now also added to Vercel Production + Preview env vars. Confirmed working on a live preview deployment (the earlier Cloudflare "unable to connect" error there turned out to be the same allowed-hostnames gap as the `localhost` case, not a Vercel-side issue).

**Content data format:** `next-app/src/lib/reports/egypt-threat-intel-h1-2026.ts` is a typed, fill-in-the-blanks module separating real report data (stats, threat actors, document filenames, contact email — the stuff above) from the fixed editorial copy that stays in `EgyptReportLanding.tsx` (headlines, section intros, disclaimer text, which don't need SOC/marketing sign-off to change). `gated-documents.ts` and `ReportRequestForm.tsx` both import from it, so editing the one file propagates everywhere it's used. This is a new pattern (one data file per report edition, under `src/lib/reports/`) — a template to reuse for the next bi-annual edition, distinct from the existing `services-data.ts` pattern which centralizes all *service* pages in a single file rather than one per item.

**Build verified:** `npm run build` and `tsc --noEmit` pass clean (checked both after the initial content pass and again after the design-fidelity correction pass). Manually exercised in dev via Playwright in both EN and AR — hero animation renders unchanged, all sections render correctly with real data and real photo/logo assets, full-width Egyptian Victims grid and compact disclaimer banner both match the source pixel-for-pixel, RTL mirroring correct throughout (actor cards, victim columns, and stat ordering all correctly reverse), CTA correctly reads "Join the waitlist" / "انضم لقائمة الانتظار". Earlier: fixed a bug where the reticle graphic and legibility fade didn't flip sides in Arabic, causing the headline to overlap illegibly; brand mark in the hero corrected to the purple mark (not white) per feedback, and a purple radial legibility overlay was added at the reticle's center where the headline crosses it.

**Dev-server gotcha hit again during this pass:** running `npm run build` while `next dev` was still serving the same `.next` directory left the dev server returning a 500 on next request (same corruption pattern noted earlier for this project) — fixed by killing the dev process and restarting clean. Worth remembering: don't run a production build against a live dev server on this repo.

**Known pre-existing quirk (not introduced by the design refresh, not fixed — form logic was left untouched per instruction):** `ReportRequestForm.tsx`'s "Report language" select initializes its state from the page's `lang` prop only on mount (`useState(lang)`), so if a visitor toggles the page from EN to AR after load, the select still defaults to "English" until manually changed.

**Files involved:**
- `next-app/app/reports/egypt-threat-intel-h1-2026/page.tsx` (new)
- `next-app/src/components/reports/EgyptReportLanding.tsx`, `ReportHeroReticle.tsx`, `ThreatLevel.tsx`, `ReportRequestForm.tsx`, `Turnstile.tsx`
- `next-app/src/components/reports/LogoBadge.tsx`, `VulnerabilityStats.tsx`, `RegionalRanking.tsx`, `VictimsDonut.tsx`, `ThreatActorTerminalCard.tsx`, `EgyptianVictims.tsx` (new, design-refresh pass)
- `next-app/src/lib/reports/egypt-threat-intel-h1-2026.ts` (new — the content data file described above)
- `next-app/public/reports/egypt-h1-2026/*` (vendor-brand SVGs, Egypt flag, 3 threat-actor photos, 14 victim-org logos — real assets from the user's downloaded design `.zip`)
- `next-app/src/lib/gated-documents.ts` (extended — two new entries, sourcing filenames from the data file)
- `next-app/app/api/download-request/route.ts` (extended — new fields + Turnstile verification)
- `next-app/app/globals.css` (extended — threat-severity CSS tokens)

### Temporary Supabase waitlist (interim, until the report ships)

Since the real PDF/content are still weeks out, the landing page now collects interest instead of sitting idle. `ReportRequestForm.tsx` was pointed at a new, isolated route (`app/api/report-interest/route.ts`) that upserts signups into a Supabase table (`report_signups`) instead of minting a download token and emailing instantly — the page/design itself (hero, stats, threat-actor cards, disclaimer) is untouched. `verifyTurnstileToken` was extracted out of `download-request/route.ts` into a new permanent shared lib, `src/lib/turnstile.ts`, so both routes reuse it — this is the one (behavior-preserving) touch to the real route; confirmed via curl that its honeypot/Turnstile responses are byte-for-byte unchanged post-refactor.

Once the report ships: signups get manually exported from Supabase's table editor and imported into the team's existing Mailchimp account (tagged), and the final "report is ready" email is sent manually from Mailchimp — no code-driven batch-send was built, by design (one-time event, not worth the automation). Revert runbook: point `ReportRequestForm.tsx`'s fetch back at `/api/download-request` (restore `documentSlug` in the payload and the original success copy), delete `app/api/report-interest/route.ts` and `src/lib/supabase.ts`, remove the `@supabase/supabase-js` dependency and the Supabase env vars. `src/lib/turnstile.ts` stays permanently either way — the real route depends on it too.

**NOTE: Before the first Mailchimp export/import, set the imported contacts' subscription status to "Pending" (not "Subscribed").** Turnstile + the honeypot already filter bot spam, but nothing here verifies the human actually owns the email address they typed. Mailchimp's own double opt-in — triggered automatically for contacts imported as "Pending," which then get Mailchimp's standard confirmation email — covers that for free at the one point these emails ever leave Supabase, with no code to build or maintain. Remind Claude to check this when the export actually happens.

**Manual setup — done:**
- [x] Supabase project created (`PurpleGuard ETW`), `report_signups` table created with schema `report_slug`, `email`, `job_title`, `report_lang`, `consent`, `created_at`, unique on `(report_slug, email)`. RLS enabled with zero policies (defense-in-depth); `service_role` needed an explicit `grant select, insert, update on public.report_signups to service_role;` — enabling Supabase's "Automatically expose new tables" toggle does **not** cover `service_role`, only `anon`/`authenticated` (learned the hard way via a live `permission denied` error).
- [x] `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (service-role key, not `anon`) added to `next-app/.env.local`.
- [x] Same two vars added to Vercel Project Settings (Production + Preview) and redeployed — the waitlist is live for real visitors.

**Verified:** `npm run build`/`tsc --noEmit` pass clean. Full happy-path exercised end-to-end in dev via Playwright with Cloudflare's always-pass Turnstile test keypair (swapped into `.env.local` temporarily, then reverted back to the real keys): form submits in both EN and AR, hits `/api/report-interest`, a row lands correctly in Supabase's Table Editor with the right `email`/`job_title`/`report_lang`/`consent`, and the "You're on the waitlist" success copy renders. Resubmitting the same email confirmed the upsert overwrites in place (row count stays 1). Confirmed `download-request/route.ts`'s honeypot/Turnstile responses are unchanged post-refactor via direct curl checks.

**Files involved (this subsection):**
- `next-app/src/lib/supabase.ts` (new, temporary)
- `next-app/src/lib/turnstile.ts` (new, permanent — extracted from `download-request/route.ts`)
- `next-app/app/api/report-interest/route.ts` (new, temporary)
- `next-app/src/components/reports/ReportRequestForm.tsx` (temp diff — fetch target + success copy)
- `next-app/app/api/download-request/route.ts` (refactor only — now imports `verifyTurnstileToken`, behavior unchanged)

### Homepage hero carousel — autoplay/navigation fix (post-Phase-1)

**Status:** Done, merged to `main` via branch `fix/hero-carousel-navigation`.

**Bug:** The dot indicators only called `setCurrent`, never touching the autoplay timer, and the autoplay-pause logic was hover-only (`onMouseEnter`/`onMouseLeave`) — which does nothing on touch devices. Net effect: navigating to slide 2 (by dot or, on mobile, by tap) got silently reverted back to slide 1 a few seconds later by the still-running timer.

**Fix:** Added an `autoplayStopped` state that any manual interaction (a dot **or** a new prev/next arrow) sets permanently — autoplay only ever runs until the visitor's first manual navigation. Also added small (36px) left/right arrow buttons pinned to the slide edges, vertically centered. Given a solid brand-dark background (`bg-[#0b0a12]/80`) rather than a translucent one: at mobile widths these buttons sit at the vertical center of text-heavy slide content, and a solid backdrop cleanly covers whatever they overlap instead of letting the underlying text bleed through half-legibly.

**Verified:** `tsc --noEmit`/`npm run build` clean. Confirmed via Playwright that after a manual navigation, the slide holds through multiple autoplay intervals (~8s, nearly 3 cycles) without reverting.

**Files involved:** `next-app/src/components/HomeHeroCarousel.tsx`.

### Landing page optimization deliverables

**Status:** Phase 1 done, merged and live in production. Phases 2–4 still open.

**Phase 1 — implemented and verified:**
- [x] **Sitemap** — added `/reports/egypt-threat-intel-h1-2026` to `next-app/app/sitemap.ts` (`priority: 0.8`, `changeFrequency: "monthly"`). Confirmed live in the generated `/sitemap.xml` output in dev.
- [x] **Orphan-page fix** — homepage hero (`next-app/app/page.tsx`) converted to a two-slide carousel via a new client component, `next-app/src/components/HomeHeroCarousel.tsx` (built on the existing shadcn/embla `src/components/ui/carousel.tsx`, not previously used anywhere in the app). Slide 1 is the original hero content, unchanged. Slide 2 is a static (non-toggleable, English-only) teaser for the report, reusing `ReportHeroReticle` as its background, with two CTAs: "More about the report" → `/reports/egypt-threat-intel-h1-2026`, and "Join the waitlist" → `/reports/egypt-threat-intel-h1-2026#report-form`. Dot indicators (no arrow buttons) let visitors switch slides; embla's built-in drag/keyboard-arrow navigation also works. Verified via Playwright: both slides render with correct copy/links, clicking "More about the report" navigates correctly, no new console errors introduced.
- [x] **Alt text** — fixed all 30 previously-empty `alt=""` attributes flagged by the audit, using the entity name in each case: `LogoBadge.tsx` (victim logos + favicon-service logos), `ThreatActorTerminalCard.tsx` (actor photos), plus two more the audit's "30 images" count already included but the kickoff prompt's file list didn't name — `EgyptianVictims.tsx`'s per-group actor avatar and `RegionalRanking.tsx`'s Egypt flag (`alt="Flag of Egypt"` / `"علم مصر"` by `lang`). Verified via Playwright accessibility snapshot on the live report page — images now read as "The Gentlemen", "Ebny Development", "Flag of Egypt", etc. instead of blank.
- [x] **`<html>` lang/dir sync** — `EgyptReportLanding.tsx` now mutates `document.documentElement.lang`/`.dir` on every EN/AR toggle, and restores the page's pristine pre-mount values on unmount (client-side nav away). Implementation note: the restore-on-unmount effect is declared *before* the lang-sync effect specifically so its setup captures the untouched default on the same initial commit — declaring it after would have captured the already-toggled value instead (effects run in declaration order on mount). Verified via Playwright: fresh load reads `lang="en"`/`dir="ltr"`; toggling AR reads `lang="ar"`/`dir="rtl"`; a client-side nav away (clicking the header logo, not a hard reload) restores `lang="en"`/`dir=""` — matching the site's true untouched default exactly, not just an equivalent `"ltr"`.
- [x] Verified: `tsc --noEmit` and `npm run build` both pass clean (build run only after stopping the dev server first, per the known dev/build corruption gotcha above).

**Not done — Phases 2–4** (Article JSON-LD/dateline/H2 fix/image optimization, meta description/FAQ/hreflang decision, GSC submission/llms.txt/sitemap freshness/drift baseline) — see the phase breakdown in the action plan below, unchanged from the original audit.

**Summary:** Pre-launch SEO/AI-readiness audit of `/reports/egypt-threat-intel-h1-2026`, run against the dev build (page isn't live yet, so GSC/GA4/CrUX/backlink data don't apply — findings instead come from direct source inspection, rendered-DOM inspection via Playwright, and `getComputedStyle` measurement). Full write-up published as an artifact: https://claude.ai/code/artifact/2aae6082-0816-47c3-97a6-fab925e16def

**Health score: 59/100 ("Needs work").** Category breakdown (weight): Technical SEO 55/100 (22%) · Content quality 72/100 (23%) · On-page SEO 60/100 (20%) · Schema/structured data 50/100 (10%) · Performance 68/100 (10%) · AI search readiness 50/100 (10%) · Images 40/100 (5%).

The core takeaway: the report's actual content is strong (specific stats, three named threat actors with sourced TTPs, 22 named victim orgs — exactly what both classic SEO and AI answer engines reward), but the page is currently undiscoverable, which caps every other score regardless of content quality.

**Findings — Technical SEO:**
- [x] **Critical** — Orphan page: no link to this URL exists anywhere in `Navigation.tsx`, `Footer.tsx`, or the homepage. Only reachable by typing the URL directly. **Fixed in Phase 1** — homepage hero carousel slide 2 now links to it (see above).
- [x] **Critical** — Missing from `next-app/app/sitemap.ts` (not among its ~28 listed URLs). **Fixed in Phase 1.**
- [x] **High** — `document.documentElement.lang` stays `"en"` and `dir` stays empty even after the in-page toggle switches to Arabic (only an inner wrapper `<div>` gets `dir="rtl"`) — confirmed live via `getComputedStyle`. Screen readers and language-aware crawlers see English metadata around Arabic content. **Fixed in Phase 1.**
- [ ] **Medium** — No hreflang tags; because Arabic is a client-side toggle rather than a distinct URL, Google can only ever index the English variant, capping Arabic organic visibility at zero. Needs a deliberate decision: real `/ar/` route with hreflang, or explicitly UI-only.
- [ ] **Low** — Sitewide (not page-specific): `sitemap.ts` stamps every URL with a build-time `new Date().toISOString()`, a weak/identical freshness signal across all ~28 pages.

**Findings — Content Quality:**
- [ ] **Medium** — No visible authorship or publish date on-page (real E-E-A-T/citability gap for a document positioned as authoritative threat intel).
- [ ] **Low** — No FAQ content (also blocks the `FAQPage` schema opportunity below).
- [x] Working well: high entity density (named actors, dated incidents, precise counts) — don't dilute this chasing keyword padding; the fixes here are about discoverability/attribution, not adding more content.

**Findings — On-Page SEO:**
- [x] **High** — 30 of 37 `<img>` elements (81%) have empty `alt=""` — every threat-actor photo, 20 of 22 victim-org logos, the Egypt flag. Only the 7 vendor-brand logos are labeled. Confirmed by querying the rendered DOM directly. **Fixed in Phase 1.**
- [ ] **Medium** — Regional Ranking section (`#1` Africa / `#2` MENA) has no heading element at all — breaks the H1→H2 flow, no semantic anchor for a substantial content block.
- [ ] **Low** — Meta description is ~194 characters, over Google's practical ~155–160 char budget, likely truncates in SERPs.
- [x] Working well: title tag (56 chars), canonical URL, and the rest of the H1/H2 structure are all correctly implemented.

**Findings — Schema & Structured Data:**
- [ ] **High** — No content-specific structured data for the report itself. Sitewide `Organization`/`LocalBusiness`/`WebSite` JSON-LD plus a page-level `BreadcrumbList` are present (inherited from `layout.tsx`), but nothing marks this as an `Article`-type resource with `datePublished`/`author`/`about` — a missed rich-result and AI-citation opportunity.
- [ ] **Low** — No `FAQPage` schema (follows from the missing FAQ content above).

**Findings — Performance:**
- [ ] **Medium** — 12 victim/actor images render via `next/image` with the `unoptimized` prop (a holdover from when these were placeholders), bypassing automatic resize/WebP conversion. Some source files are oversized for their ~28–46px display size (`victim-mci.png` 63KB, `victim-wastani.png` 53KB).
- [ ] **Low** — 4 logos (Ebny, Smart Glass, LAMAICA, Misr Al Mahaba Hospital) load live from `google.com/s2/favicons` — an uncached third-party dependency, fine at current traffic, worth self-hosting if volume grows.
- [x] Working well: lean JS payload (36.3KB page-specific / 165KB First Load JS per `next build`), both font families self-hosted via `next/font` already.

**Findings — AI Search Readiness (GEO):**
- [x] **High** — Same orphan-page/no-sitemap problem blocks AI crawlers (GPTBot, ClaudeBot, PerplexityBot) too — `robots.txt` doesn't block them, but they rely on the same discovery paths that are currently missing. **Fixed in Phase 1** (sitemap + internal link, see above).
- [ ] **Medium** — No sitewide `llms.txt` (not page-specific, but this page is exactly the kind of structured-fact content one would prioritize).
- [ ] **Medium** — Same missing authorship/date signals from Content Quality reduce AI answer-engine citation confidence.
- [x] Working well: the content itself (specific numbers, named entities, dated events) is close to ideal for citation — every gap here is about discovery/attribution metadata, not substance.

**Findings — Images:**
- [x] **High** — Restates the alt-text finding above; it's the single largest concrete gap in this audit. **Fixed in Phase 1.**
- [ ] **Medium** — Restates the unoptimized-image finding above.
- [x] Low risk: `next/image` enforces intrinsic dimensions even with `unoptimized` set, so CLS risk from images specifically is low.

**Action plan:**
- **Phase 1 — before launch (blocks discoverability): DONE, see above.** ~~add the page to `sitemap.ts`; add at least one internal link (footer/homepage/nearest service page); fix `alt` text on all 30 affected images (`LogoBadge.tsx`, `ThreatActorTerminalCard.tsx`); sync `<html>` `lang`/`dir` to the active language on toggle.~~
- **Phase 2 — at/just after launch (high-impact, low-risk):** add `Article` JSON-LD (headline, `datePublished`, author, `about`/`mentions` for the named threat actors); add a visible dateline/byline near the H1 or disclaimer; add an `<h2>` to the Regional Ranking section; drop `unoptimized` on victim/actor images or pre-resize the source files.
- **Phase 3 — weeks 2–3 post-launch (optimization):** tighten meta description to ~155 chars; add a short FAQ block + `FAQPage` schema; decide Arabic's SEO status (real `/ar/` route with hreflang vs. explicitly UI-only); self-host the 4 favicon-service logos.
- **Phase 4 — ongoing (monitoring):** once live, submit the URL in GSC and confirm indexation; add a sitewide `llms.txt`; fix `sitemap.ts`'s identical build-time `lastModified` across all URLs; record a `seo-drift` baseline ahead of the next redesign pass.
