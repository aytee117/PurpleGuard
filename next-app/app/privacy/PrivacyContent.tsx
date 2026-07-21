"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ChevronDown, ShieldCheck } from "lucide-react";
import CookiePreferences from "@/components/CookiePreferences";

const EMAIL = "hello@purpleguard.io";
const PHONE_DISPLAY = "+971 58 515 9666";
const PHONE_TEL = "+971585159666";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "what-we-collect", label: "What We Collect" },
  { id: "how-we-collect", label: "How We Collect It" },
  { id: "why-we-collect", label: "Why We Collect It" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "cookies", label: "Cookies" },
  { id: "retention", label: "Data Retention" },
  { id: "transfers", label: "International Transfers" },
  { id: "security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyContent() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#0b0a12] via-slate-900 to-[#0b0a12] border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-400/30 text-purple-200 px-3 py-1 rounded-full text-xs font-semibold mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal · Privacy
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-purple-200 font-light mb-4">
            Your data. Your rights. Our commitment.
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Effective Date: April 2026 · Last Updated: April 2026
          </p>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            PurpleGuard is committed to protecting your personal data in accordance with
            the UAE PDPL, Egyptian Data Protection Law, and the Saudi Arabia PDPL.
          </p>
        </div>
      </section>

      {/* Body — sidebar + content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Mobile ToC accordion */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-semibold"
              aria-expanded={tocOpen}
            >
              <span>Table of Contents</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            {tocOpen && (
              <nav className="mt-2 bg-white/[0.03] border border-white/[0.08] rounded-lg p-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setTocOpen(false)}
                    className={`block px-3 py-2 rounded text-sm transition-colors ${
                      activeId === s.id
                        ? "bg-purple-500/15 text-purple-200 font-medium"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Desktop sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 px-3">
                On this page
              </div>
              <nav className="space-y-0.5">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block px-3 py-2 rounded-md text-sm border-l-2 transition-all ${
                      activeId === s.id
                        ? "border-purple-400 text-purple-200 bg-purple-500/10 font-medium"
                        : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article
            className="max-w-[720px] text-slate-300"
            style={{ lineHeight: 1.8 }}
          >
            <style>{`
              .prose-section { scroll-margin-top: 90px; }
              .prose-section h2 {
                color: #fff;
                font-size: 1.6rem;
                font-weight: 700;
                margin-top: 3rem;
                margin-bottom: 1rem;
                letter-spacing: -0.01em;
              }
              .prose-section:first-child h2 { margin-top: 0; }
              .prose-section h3 {
                color: #fff;
                font-size: 1.05rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
              }
              .prose-section p { margin-bottom: 1rem; }
              .prose-section a { color: #c4b5fd; text-decoration: underline; text-underline-offset: 3px; }
              .prose-section a:hover { color: #ddd6fe; }
              .prose-section ul { margin: 1rem 0; padding-left: 1.25rem; list-style: disc; }
              .prose-section ul li { margin-bottom: 0.4rem; }
              .prose-section .callout {
                border-left: 3px solid #a78bfa;
                background: rgba(124, 58, 237, 0.08);
                padding: 1rem 1.25rem;
                border-radius: 0 8px 8px 0;
                margin: 1.5rem 0;
                color: #e2e8f0;
              }
              .prose-section .divider {
                border: 0;
                border-top: 1px solid rgba(255,255,255,0.06);
                margin: 1.5rem 0;
              }
            `}</style>

            <section id="introduction" className="prose-section">
              <h2>1. Introduction</h2>
              <p>
                PurpleGuard is a Managed Security Services Provider (MSSP) operating
                across the UAE, Egypt, and Saudi Arabia, committed to protecting personal
                data. This policy explains what data we collect, why we collect it, how we
                protect it, and the rights you hold — in line with{" "}
                <strong className="text-white">
                  UAE Federal Decree-Law No. 45 of 2021
                </strong>
                ,{" "}
                <strong className="text-white">
                  Egyptian Data Protection Law No. 151 of 2020
                </strong>
                , and{" "}
                <strong className="text-white">Saudi Arabia PDPL</strong>.
              </p>
              <p>
                Using <a href="https://purpleguard.io">purpleguard.io</a> constitutes
                acknowledgment of this policy.
              </p>
            </section>

            <section id="who-we-are" className="prose-section">
              <h2>2. Who We Are (Data Controller)</h2>
              <p>
                PurpleGuard, with offices in Dubai and Cairo, acts as the data controller
                for all data collected via this website and associated channels.
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  Phone:{" "}
                  <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                </li>
                <li>Offices: Dubai, UAE · Cairo, Egypt</li>
              </ul>
            </section>

            <section id="what-we-collect" className="prose-section">
              <h2>3. What Personal Data We Collect</h2>

              <h3>Contact &amp; Identity</h3>
              <p>Full name, business email, phone number, and job title.</p>
              <hr className="divider" />

              <h3>Company &amp; Organization</h3>
              <p>Company name, industry, and country of operation.</p>
              <hr className="divider" />

              <h3>Technical &amp; Usage</h3>
              <p>
                IP address, browser type, operating system, pages visited, session
                duration, referring URL, and cookie identifiers.
              </p>

              <div className="callout">
                <strong className="text-white">Note:</strong> We do <strong>not</strong>{" "}
                collect payment data. We do <strong>not</strong> knowingly collect data
                from individuals under 18.
              </div>
            </section>

            <section id="how-we-collect" className="prose-section">
              <h2>4. How We Collect Your Data</h2>

              <h3>Website Contact Forms</h3>
              <p>
                When you submit a form on our website, we collect the information you
                provide directly.
              </p>

              <h3>Email Correspondence</h3>
              <p>
                When you write to{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, the contents of that
                correspondence are retained for service and recordkeeping purposes.
              </p>

              <h3>Calendly Booking</h3>
              <p>
                When you book a meeting via Calendly, the booking and any details you
                share are processed by Calendly. See{" "}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calendly's Privacy Policy
                </a>
                .
              </p>

              <h3>WhatsApp Chat</h3>
              <p>
                Conversations initiated via our WhatsApp button are processed through
                Meta's WhatsApp service. See{" "}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp's Privacy Policy
                </a>
                .
              </p>

              <h3>Automatically via Google Analytics</h3>
              <p>
                We use Google Analytics to collect aggregated, pseudonymous usage data
                about how visitors interact with the website.
              </p>
            </section>

            <section id="why-we-collect" className="prose-section">
              <h2>5. Why We Collect Your Data</h2>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full min-w-[560px] text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b border-white/[0.1]">
                      <th className="py-3 pr-4 font-semibold text-white">Purpose</th>
                      <th className="py-3 pr-4 font-semibold text-white">Data Used</th>
                      <th className="py-3 font-semibold text-white">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[
                      ["Responding to inquiries", "Name, email, phone, company", "Legitimate interest / Consent"],
                      ["Scheduling calls", "Name, email", "Consent (Calendly)"],
                      ["Delivering services", "All contact & company data", "Contractual necessity"],
                      ["Website improvement", "Technical & usage data", "Legitimate interest"],
                      ["Service communications", "Email", "Consent"],
                      ["Legal compliance", "All applicable data", "Legal obligation"],
                    ].map(([purpose, data, basis]) => (
                      <tr key={purpose} className="border-b border-white/[0.05]">
                        <td className="py-3 pr-4 align-top">{purpose}</td>
                        <td className="py-3 pr-4 align-top">{data}</td>
                        <td className="py-3 align-top">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout mt-6">
                We do <strong className="text-white">not</strong> sell, rent, or trade
                your personal data.
              </div>
            </section>

            <section id="third-party" className="prose-section">
              <h2>6. Third-Party Services</h2>

              <h3>Google Analytics</h3>
              <p>
                We share pseudonymous usage data (IP, browser, pages viewed) with Google
                to understand site performance and improve content. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>
                .
              </p>

              <h3>Calendly</h3>
              <p>
                When booking via Calendly, your name, email, and meeting details are
                processed by Calendly to schedule the call. See{" "}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calendly's Privacy Policy
                </a>
                .
              </p>

              <h3>WhatsApp / Meta</h3>
              <p>
                Messages you send via WhatsApp are processed by Meta. See{" "}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp's Privacy Policy
                </a>
                .
              </p>
            </section>

            <section id="cookies" className="prose-section">
              <h2>7. Cookies</h2>

              <h3>Strictly Necessary</h3>
              <p>
                Required for the website to function (e.g. session, security). These
                cannot be disabled.
              </p>

              <h3>Analytics</h3>
              <p>
                Google Analytics cookies that help us understand site usage in aggregate.
              </p>

              <h3>Your Choice</h3>
              <p>
                On your first visit, a cookie consent banner asks whether you accept
                analytics cookies. If you reject, Google Analytics is loaded in a
                consent-denied state and no analytics or advertising cookies are stored.
                Your choice is remembered in your browser's local storage. You can
                update your choice at any time using the controls below.
              </p>
              <CookiePreferences />
              <div className="callout">
                You can also block or delete cookies at any time through your browser
                settings.
              </div>
            </section>

            <section id="retention" className="prose-section">
              <h2>8. Data Retention</h2>
              <p>
                We retain personal data for less than 12 months from the date of last
                interaction, unless required by law or by an active contract. Data is
                securely deleted or anonymized when no longer needed.
              </p>
            </section>

            <section id="transfers" className="prose-section">
              <h2>9. International Data Transfers</h2>
              <p>
                Data may be accessed by our teams across the UAE, Egypt, and Saudi
                Arabia. Some third-party processors (such as Google and Calendly) may
                process data in the United States or other jurisdictions. Where
                cross-border transfers occur, we apply appropriate safeguards consistent
                with applicable data protection laws.
              </p>
            </section>

            <section id="security" className="prose-section">
              <h2>10. Data Security</h2>
              <p>As a cybersecurity company, we apply layered safeguards including:</p>
              <ul>
                <li>TLS/HTTPS encryption for all data in transit</li>
                <li>Access controls with least-privilege principles</li>
                <li>Regular security assessments and reviews</li>
                <li>Employee security awareness training</li>
              </ul>
              <div className="callout">
                No method of transmission over the internet or electronic storage is 100%
                secure. We continuously work to strengthen our protections.
              </div>
            </section>

            <section id="your-rights" className="prose-section">
              <h2>11. Your Rights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-4">
                {[
                  "Right to access",
                  "Right to correction",
                  "Right to deletion",
                  "Right to restrict processing",
                  "Right to object",
                  "Right to data portability",
                  "Right to withdraw consent",
                ].map((right) => (
                  <div
                    key={right}
                    className="bg-white/[0.04] border border-white/[0.08] hover:border-purple-400/40 rounded-lg px-4 py-3 text-sm text-slate-200 transition-colors"
                  >
                    {right}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Rights granted under UAE PDPL, Egyptian Law No. 151/2020, and Saudi
                Arabia PDPL, depending on jurisdiction.
              </p>
              <div className="callout">
                <strong className="text-white">To exercise your rights</strong>, email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We respond within 30 days.
              </div>
            </section>

            <section id="changes" className="prose-section">
              <h2>12. Changes to This Policy</h2>
              <p>
                When we update this policy, we will revise the "Last Updated" date at the
                top of the page. Continued use of the site constitutes acceptance of the
                revised policy.
              </p>
            </section>

            <section id="contact" className="prose-section">
              <h2>13. Contact Us</h2>
              <div className="not-prose bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 rounded-xl p-6 my-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {EMAIL}
                  </a>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {PHONE_DISPLAY}
                  </a>
                  <div className="flex items-center gap-3 text-slate-200">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    Dubai, UAE
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    Cairo, Egypt
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#0b0a12] via-[#6633cc] to-[#0b0a12] py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Questions about your data? We're here to help.
          </h2>
          <p className="text-purple-100 mb-8">
            Reach out and we'll respond within one business day.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#0b0a12] hover:bg-purple-50 shadow-lg"
          >
            <a href={`mailto:${EMAIL}`}>
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
