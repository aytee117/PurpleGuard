"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, RotateCcw } from "lucide-react";

const VA_ANNUAL: Record<number, number>  = {10:799, 25:1199, 50:1699, 100:2299, 250:3499, 500:4999, 1000:7499, 2500:13999};
const VA_ONETIME: Record<number, number> = {10:699, 25:999, 50:1499, 100:1999, 250:2999, 500:4299, 1000:6499, 2500:11999};
const PT_ANNUAL: Record<number, number>  = {10:1499, 25:2999, 50:3999, 100:5999, 250:9999, 500:14999, 1000:24999};
const PT_ONETIME: Record<number, number> = {10:1299, 25:2699, 50:3599, 100:5399, 250:8999, 500:13499, 1000:20699};

const PT_EXT_ANNUAL  = 849;
const PT_EXT_ONETIME = 749;
const VA_EXT_ANNUAL  = 85;
const VA_EXT_ONETIME = 75;

const WEBAPP_AUTO    = 799;
const WEBAPP_MANUAL  = 1999;
const AD_BASELINE    = 1999;
const AD_PROFESSIONAL= 2999;
const COLLECTOR_ADDON= 299;

const PACKS_VA = [10, 25, 50, 100, 250, 500, 1000, 2500];
const PACKS_PT = [10, 25, 50, 100, 250, 500, 1000];

function findPack(ips: number, packs: number[]) {
  for (const p of packs) { if (ips <= p) return p; }
  return packs[packs.length - 1];
}

interface PriceLine {
  name: string;
  detail: string;
  price: number;
  period?: string;
  included?: boolean;
}

interface CalcResult {
  svcType: string;
  netType: string;
  intIPs: number;
  extIPs: number;
  webApps: number;
  webType: string;
  adChoice: string;
  compliance: string[];
  total: number;
  monthly: number | null;
  isAnnual: boolean;
  isPT: boolean;
  isVA: boolean;
  lines: PriceLine[];
  scopeData: { val: string | number; lbl: string }[];
  recTitle: string;
  recBody: string;
  effortD: number;
  effortPct: number;
  effortItems: { label: string; days: number }[];
  compNotes: { framework: string; text: string }[];
}

const COMPLIANCE_OPTIONS = [
  { value: "iso", label: "ISO 27001" },
  { value: "pci", label: "PCI-DSS" },
  { value: "nca", label: "NCA ECC" },
  { value: "fra", label: "FRA Decree 139" },
  { value: "none", label: "None" },
];

function Tooltip({ tip }: { tip: string }) {
  return (
    <span className="relative group inline-flex items-center justify-center w-[14px] h-[14px] bg-white/10 rounded-full text-[9px] text-slate-400 cursor-help ml-1.5 align-middle">
      ?
      <span className="absolute left-1/2 bottom-[calc(100%+7px)] -translate-x-1/2 bg-[#1A1040] border border-white/10 text-white text-[11px] font-normal p-1.5 rounded-lg pointer-events-none z-10 w-[200px] whitespace-normal text-left hidden group-hover:block">
        {tip}
      </span>
    </span>
  );
}

export default function CalculatorPage() {
  const [serviceType, setServiceType] = useState("pt_annual");
  const [networkType, setNetworkType] = useState("internal");
  const [intIPs, setIntIPs] = useState("");
  const [extIPs, setExtIPs] = useState("");
  const [webApps, setWebApps] = useState("0");
  const [webAppType, setWebAppType] = useState("automated");
  const [adChoice, setAdChoice] = useState("none");
  const [checkedCompliance, setCheckedCompliance] = useState<string[]>([]);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [intError, setIntError] = useState(false);
  const [extError, setExtError] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const intRef = useRef<HTMLInputElement>(null);
  const extRef = useRef<HTMLInputElement>(null);

  const showIntField = networkType === "internal" || networkType === "both";
  const showExtField = networkType === "external" || networkType === "both";
  const showWebAppType = parseInt(webApps) > 0;

  const toggleCompliance = useCallback((val: string) => {
    setCheckedCompliance((prev) => {
      if (val === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      const without = prev.filter((v) => v !== "none");
      return without.includes(val)
        ? without.filter((v) => v !== val)
        : [...without, val];
    });
  }, []);

  const calculate = useCallback(() => {
    const intIPval = parseInt(intIPs) || 0;
    const extIPval = parseInt(extIPs) || 0;
    const webCount = parseInt(webApps) || 0;
    const compliance = checkedCompliance.filter((v) => v !== "none");

    let iIPs = 0, eIPs = 0;
    if (networkType === "internal") { iIPs = intIPval; }
    else if (networkType === "external") { eIPs = extIPval; }
    else { iIPs = intIPval; eIPs = extIPval; }

    const hasScope = (iIPs + eIPs + webCount) > 0 || adChoice !== "none";
    if (!hasScope) {
      if (networkType === "external") {
        setExtError(true);
        extRef.current?.focus();
        setTimeout(() => setExtError(false), 1800);
      } else {
        setIntError(true);
        intRef.current?.focus();
        setTimeout(() => setIntError(false), 1800);
      }
      return;
    }

    const isAnnual = serviceType.includes("annual");
    const isVA = serviceType.startsWith("va");
    const isPT = serviceType.startsWith("pt");

    const lines: PriceLine[] = [];
    let total = 0;
    let effortD = 0;
    const setupDays = iIPs > 0 ? 0.5 : 0;

    if (iIPs > 0) {
      if (isVA) {
        const pack = findPack(iIPs, PACKS_VA);
        const price = isAnnual ? VA_ANNUAL[pack] : VA_ONETIME[pack];
        const valDays = [0.3, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0][PACKS_VA.indexOf(pack)];
        lines.push({
          name: `Vulnerability Assessment — Internal (${iIPs} IPs, ${pack}-IP pack)`,
          detail: isAnnual ? "Continuous annual scanning + live dashboard + monthly trend report" : "One-time engagement + retest included",
          price, period: isAnnual ? "/year" : ""
        });
        total += price; effortD += setupDays + valDays;
      }
      if (isPT) {
        const pack = findPack(iIPs, PACKS_PT);
        const price = isAnnual ? PT_ANNUAL[pack] : PT_ONETIME[pack];
        const vaPrice = isAnnual ? VA_ANNUAL[findPack(iIPs, PACKS_VA)] : VA_ONETIME[findPack(iIPs, PACKS_VA)];
        const ptDays = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0][PACKS_PT.indexOf(pack)];
        const vaDays = [0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8][PACKS_PT.indexOf(pack)];
        lines.push({
          name: `Penetration Testing — Internal (${iIPs} IPs, ${pack}-IP pack)`,
          detail: isAnnual ? "Continuous PTaaS — automated + manual exploitation, live dashboard" : "One-time engagement — full technical report + retest",
          price, period: isAnnual ? "/year" : ""
        });
        lines.push({
          name: `Vulnerability Assessment — Internal (${pack}-IP pack)`,
          detail: "Automated VA runs first → findings passed to PT engine for targeted exploitation",
          price: vaPrice, included: true
        });
        total += price; effortD += setupDays + ptDays + vaDays;
      }
    }

    if (eIPs > 0) {
      let extPrice = 0;
      if (isPT) {
        extPrice = isAnnual ? PT_EXT_ANNUAL * eIPs : PT_EXT_ONETIME * eIPs;
      } else {
        extPrice = isAnnual ? VA_EXT_ANNUAL * eIPs : VA_EXT_ONETIME * eIPs;
      }
      lines.push({
        name: `${isPT ? "Penetration Testing" : "Vulnerability Assessment"} — External (${eIPs} IPs)`,
        detail: isAnnual ? "Annual external scanning / testing — internet-facing assets" : "One-time external engagement",
        price: extPrice, period: isAnnual ? "/year" : ""
      });
      total += extPrice; effortD += 0.5;
    }

    if (webCount > 0) {
      const isManual = webAppType === "manual";
      const appPrice = isManual ? WEBAPP_MANUAL * webCount : WEBAPP_AUTO * webCount;
      lines.push({
        name: `Web / API Assessment — ${webCount} app${webCount > 1 ? "s" : ""} (${isManual ? "Manual" : "Automated"})`,
        detail: isManual
          ? "Full manual testing — authentication, business logic, OWASP Top 10, compliance-grade report"
          : "Automated scanning — OWASP Top 10 coverage, fast turnaround",
        price: appPrice
      });
      total += appPrice; effortD += isManual ? webCount * 2 : webCount * 0.5;
    }

    if (adChoice === "baseline") {
      lines.push({ name: "Active Directory Baseline Assessment", detail: "Privilege escalation paths, misconfigurations, attack path analysis, MITRE mapping", price: AD_BASELINE });
      total += AD_BASELINE; effortD += 1.0;
    } else if (adChoice === "professional") {
      lines.push({ name: "Active Directory Professional Assessment", detail: "Full AD assessment — credential audit, LAPS review, ACL analysis, penetration testing", price: AD_PROFESSIONAL });
      total += AD_PROFESSIONAL; effortD += 2.0;
    }

    if (iIPs > 100) {
      const colPrice = isAnnual ? COLLECTOR_ADDON : 199;
      lines.push({ name: "Additional Collector Agent", detail: "Required for segmented networks or multiple physical sites", price: colPrice, period: isAnnual ? "/year" : "" });
      total += colPrice; effortD += 0.25;
    }

    let recTitle = "", recBody = "";
    const totalIPs = iIPs + eIPs;

    if (isPT) {
      recTitle = "Penetration Testing with bundled Vulnerability Assessment";
      recBody = `Automated vulnerability scanning runs first across all ${totalIPs || webCount + " app(s)"} in scope, then confirmed findings are passed to the penetration testing engine for active exploitation. You receive both a vulnerability report and a full penetration testing technical report in a single engagement.`;
    } else if (isAnnual) {
      recTitle = "Continuous Vulnerability Assessment — recommended for compliance";
      recBody = "Annual continuous scanning gives you monthly trend reports, a live dashboard, and retest validation after remediation. The right choice for FRA Decree 139, ISO 27001, or NCA ECC compliance requirements.";
    } else {
      recTitle = "One-time Vulnerability Assessment — a good starting point";
      recBody = "A one-time scan gives you a clear picture of your current exposure. Consider upgrading to an annual subscription for continuous visibility — typically only 15–20% more for year-round coverage and audit-ready reporting.";
    }

    if (compliance.length > 0 && !isAnnual && !isPT) {
      recTitle = "\u26A0 Compliance requirement detected — annual contract recommended";
      recBody = `Your compliance framework${compliance.length > 1 ? "s" : ""} (${compliance.map((c) => c.toUpperCase()).join(", ")}) require${compliance.length === 1 ? "s" : ""} continuous or at-minimum quarterly scanning. We strongly recommend switching to an annual contract to maintain audit-ready documentation throughout the year.`;
    }

    const effortPct = Math.min((effortD / 15) * 100, 100);
    const effortItems = [
      setupDays > 0 ? { label: "Setup & deployment", days: setupDays } : null,
      (iIPs > 0 || eIPs > 0) ? { label: isPT ? "Penetration testing" : "VA validation & reporting", days: Math.max(effortD - setupDays - (adChoice === "baseline" ? 1 : adChoice === "professional" ? 2 : 0) - (webCount > 0 ? (webAppType === "manual" ? webCount * 2 : webCount * 0.5) : 0), 0) } : null,
      webCount > 0 ? { label: `Web app assessment (${webCount} app${webCount > 1 ? "s" : ""})`, days: webAppType === "manual" ? webCount * 2 : webCount * 0.5 } : null,
      adChoice !== "none" ? { label: "AD assessment", days: adChoice === "professional" ? 2 : 1 } : null,
    ].filter(Boolean) as { label: string; days: number }[];

    const compNotes: { framework: string; text: string }[] = [];
    if (compliance.includes("fra")) compNotes.push({ framework: "FRA Decree 139", text: "Requires annual penetration testing and activity logging. This scope satisfies the pentest requirement." });
    if (compliance.includes("iso")) compNotes.push({ framework: "ISO 27001", text: "Annex A.12.6.1 (vulnerability management) and A.18.2 (security review) are covered by annual VA + PT." });
    if (compliance.includes("pci")) compNotes.push({ framework: "PCI-DSS", text: "Req. 11.3 mandates annual internal + external PT. Req. 11.2 requires quarterly vulnerability scans." });
    if (compliance.includes("nca")) compNotes.push({ framework: "NCA ECC", text: "ECC-1-5-3 requires regular vulnerability assessment and penetration testing for critical systems." });

    const monthly = isAnnual ? Math.round(total / 10) : null;

    const scopeData = [
      iIPs > 0 ? { val: iIPs, lbl: "Internal IPs" } : null,
      eIPs > 0 ? { val: eIPs, lbl: "External IPs" } : null,
      webCount > 0 ? { val: webCount, lbl: "Web Apps" } : null,
      { val: adChoice !== "none" ? "Yes" : "No", lbl: "AD Scope" },
      { val: isAnnual ? "Annual" : "One-time", lbl: "Contract" },
      { val: `${Math.round(effortD * 10) / 10}d`, lbl: "Est. Effort" },
    ].filter(Boolean) as { val: string | number; lbl: string }[];

    setResult({
      svcType: serviceType, netType: networkType, intIPs: iIPs, extIPs: eIPs,
      webApps: webCount, webType: webAppType, adChoice, compliance,
      total, monthly, isAnnual, isPT, isVA,
      lines, scopeData, recTitle, recBody, effortD, effortPct, effortItems, compNotes,
    });

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [serviceType, networkType, intIPs, extIPs, webApps, webAppType, adChoice, checkedCompliance]);

  const resetCalc = useCallback(() => {
    setResult(null);
    setIntIPs("");
    setExtIPs("");
    setWebApps("0");
    setWebAppType("automated");
    setAdChoice("none");
    setCheckedCompliance([]);
    setServiceType("pt_annual");
    setNetworkType("internal");
  }, []);

  const sendProposal = useCallback(() => {
    if (!result) return;
    const r = result;
    const svcLabel: Record<string, string> = {
      va_annual: "Vulnerability Assessment — Annual (Continuous)",
      va_onetime: "Vulnerability Assessment — One-time",
      pt_annual: "Penetration Testing — Annual (VA Included)",
      pt_onetime: "Penetration Testing — One-time (VA Included)",
    };
    const netLabel: Record<string, string> = { internal: "Internal only", external: "External only", both: "Internal + External" };
    const adLabel: Record<string, string> = { none: "Not in scope", baseline: "Baseline Assessment", professional: "Professional Assessment" };
    const compLabel = r.compliance.length ? r.compliance.map((c) => c.toUpperCase()).join(", ") : "None";
    const webLabel = r.webApps > 0 ? `${r.webApps} application(s) — ${r.webType}` : "Not in scope";

    const emailLines = [
      `Service Type:           ${svcLabel[r.svcType] || r.svcType}`,
      `Network Coverage:       ${netLabel[r.netType] || r.netType}`,
      r.intIPs > 0 ? `Internal IPs:           ${r.intIPs}` : null,
      r.extIPs > 0 ? `External IPs:           ${r.extIPs}` : null,
      `Web Applications:       ${webLabel}`,
      `Active Directory:       ${adLabel[r.adChoice] || r.adChoice}`,
      `Compliance:             ${compLabel}`,
      "",
      `Estimated Total:        $${r.total.toLocaleString()} ${r.isAnnual ? "/ year" : "(one-time)"}`,
      r.monthly ? `Monthly Billing:        ~$${r.monthly.toLocaleString()} / month` : null,
      "",
      "Please provide a formal proposal for the scope above.",
      "",
      "— Generated by PurpleVAPT Sizing Calculator | purpleguard.io",
    ].filter((l) => l !== null).join("\n");

    const subject = encodeURIComponent(`PurpleVAPT Proposal Request — ${svcLabel[r.svcType] || r.svcType}`);
    const body = encodeURIComponent(emailLines);
    window.location.href = `mailto:hello@purpleguard.io?subject=${subject}&body=${body}`;
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0a12] via-slate-900 to-[#0b0a12] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 55% 45% at 8% 18%, rgba(127,119,221,0.13) 0%, transparent 60%), radial-gradient(ellipse 45% 38% at 92% 82%, rgba(13,148,136,0.07) 0%, transparent 60%)"
      }} />

      <div className="relative z-10 max-w-[880px] mx-auto px-4 sm:px-6 py-12 pb-20">
        <div className="mb-6">
          <Link href="/services/purple-x/purplevapt">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to PurpleVAPT
            </Button>
          </Link>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-[clamp(36px,6vw,58px)] font-extrabold text-white leading-none tracking-tight mb-4">
            PurpleVAPT Sizing Calculator
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-[clamp(24px,4vw,36px)] font-semibold leading-tight tracking-tight text-slate-400 mb-4">
            Know your <em className="not-italic text-purple-400">scope.</em><br />Know your <em className="not-italic text-purple-400">price.</em>
          </h2>
          <p className="text-[15px] text-slate-400 max-w-[500px] mx-auto leading-relaxed">
            Answer a few questions and get an instant estimate for Vulnerability Assessment and Penetration Testing — with effort breakdown and compliance guidance.
          </p>
        </header>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-9 mb-5 backdrop-blur-lg">
          <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-5">
            Service & Scope
            <span className="flex-1 h-px bg-purple-400/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Service type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="bg-white/[0.06] border border-white/[0.11] rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239CA3AF' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center", paddingRight: "34px" }}
              >
                <option value="va_annual" className="bg-[#1a1a2e] text-white">Vulnerability Assessment — Annual (continuous)</option>
                <option value="va_onetime" className="bg-[#1a1a2e] text-white">Vulnerability Assessment — One-time</option>
                <option value="pt_annual" className="bg-[#1a1a2e] text-white">Penetration Testing — Annual (VA included)</option>
                <option value="pt_onetime" className="bg-[#1a1a2e] text-white">Penetration Testing — One-time (VA included)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Network coverage</label>
              <select
                value={networkType}
                onChange={(e) => setNetworkType(e.target.value)}
                className="bg-white/[0.06] border border-white/[0.11] rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239CA3AF' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center", paddingRight: "34px" }}
              >
                <option value="internal" className="bg-[#1a1a2e] text-white">Internal network only</option>
                <option value="external" className="bg-[#1a1a2e] text-white">External / internet-facing only</option>
                <option value="both" className="bg-[#1a1a2e] text-white">Both internal + external</option>
              </select>
            </div>

            {showIntField && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">
                  Internal IPs
                  <Tooltip tip="Count all internal IP addresses in scope — servers, workstations, network devices." />
                </label>
                <input
                  ref={intRef}
                  type="number"
                  value={intIPs}
                  onChange={(e) => setIntIPs(e.target.value)}
                  placeholder="e.g. 50"
                  min={1}
                  max={5000}
                  className={`bg-white/[0.06] border ${intError ? "border-red-500" : "border-white/[0.11]"} rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors placeholder:text-slate-600`}
                />
                <span className="text-[11px] text-slate-600 mt-0.5">Servers, workstations, network devices</span>
              </div>
            )}

            {showExtField && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">
                  External IPs
                  <Tooltip tip="Count public-facing IP addresses only — web servers, mail servers, VPN gateways, firewalls." />
                </label>
                <input
                  ref={extRef}
                  type="number"
                  value={extIPs}
                  onChange={(e) => setExtIPs(e.target.value)}
                  placeholder="e.g. 10"
                  min={1}
                  max={500}
                  className={`bg-white/[0.06] border ${extError ? "border-red-500" : "border-white/[0.11]"} rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors placeholder:text-slate-600`}
                />
                <span className="text-[11px] text-slate-600 mt-0.5">Public-facing IPs only</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Web / API applications in scope</label>
              <select
                value={webApps}
                onChange={(e) => setWebApps(e.target.value)}
                className="bg-white/[0.06] border border-white/[0.11] rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239CA3AF' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center", paddingRight: "34px" }}
              >
                <option value="0" className="bg-[#1a1a2e] text-white">None</option>
                <option value="1" className="bg-[#1a1a2e] text-white">1 application</option>
                <option value="2" className="bg-[#1a1a2e] text-white">2 applications</option>
                <option value="3" className="bg-[#1a1a2e] text-white">3 applications</option>
                <option value="5" className="bg-[#1a1a2e] text-white">4–5 applications</option>
                <option value="8" className="bg-[#1a1a2e] text-white">6–10 applications</option>
              </select>
            </div>

            {showWebAppType && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">
                  Web app assessment type
                  <Tooltip tip="Automated: fast, broad coverage. Manual: deeper, logic-flaw testing, compliance-grade report." />
                </label>
                <select
                  value={webAppType}
                  onChange={(e) => setWebAppType(e.target.value)}
                  className="bg-white/[0.06] border border-white/[0.11] rounded-lg text-white text-[15px] font-medium py-2.5 px-3.5 w-full outline-none focus:border-purple-400 focus:bg-purple-400/[0.07] transition-colors appearance-none cursor-pointer"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239CA3AF' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center", paddingRight: "34px" }}
                >
                  <option value="automated" className="bg-[#1a1a2e] text-white">Automated</option>
                  <option value="manual" className="bg-[#1a1a2e] text-white">Manual (compliance-grade)</option>
                </select>
              </div>
            )}

            <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Active Directory in scope?</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { val: "none", label: "No AD" },
                  { val: "baseline", label: "AD Baseline assessment" },
                  { val: "professional", label: "AD Professional assessment" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setAdChoice(opt.val)}
                    className={`flex-1 min-w-[90px] rounded-lg text-[13px] font-medium py-2.5 px-3 text-center transition-all border cursor-pointer ${
                      adChoice === opt.val
                        ? "bg-purple-400/[0.18] border-purple-400 text-purple-200"
                        : "bg-white/[0.05] border-white/10 text-slate-400 hover:border-purple-400/40 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Compliance requirements
                <Tooltip tip="Compliance-driven engagements require additional evidence and audit-ready reporting." />
              </label>
              <div className="flex gap-2.5 flex-wrap">
                {COMPLIANCE_OPTIONS.map((opt) => {
                  const isChecked = checkedCompliance.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleCompliance(opt.value)}
                      className={`flex items-center gap-1.5 rounded-full py-1.5 px-3.5 text-[13px] font-medium transition-all border cursor-pointer select-none ${
                        isChecked
                          ? "bg-purple-400/[0.18] border-purple-400 text-purple-200"
                          : "bg-white/[0.05] border-white/10 text-slate-400 hover:border-purple-400/40 hover:text-white"
                      }`}
                    >
                      <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 transition-colors ${isChecked ? "bg-purple-400" : "bg-slate-600"}`} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-purple-500 hover:bg-purple-400 border-none rounded-xl text-white text-base font-bold py-4 cursor-pointer tracking-wide mt-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Calculate my estimate →
          </button>
        </div>

        {result && (
          <div ref={resultsRef} className="animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-9 backdrop-blur-lg">
              <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-5">
                Scope summary
                <span className="flex-1 h-px bg-purple-400/20" />
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3.5 mb-7">
                {result.scopeData.map((s, i) => (
                  <div key={i} className="bg-white/[0.05] rounded-lg p-4 text-center">
                    <span className="block text-[28px] font-extrabold text-purple-400 mb-0.5 tracking-tight">{s.val}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{s.lbl}</span>
                  </div>
                ))}
              </div>

              <div className="bg-purple-400/10 border border-purple-400/[0.28] rounded-lg p-4 sm:p-5 mb-6 flex items-start gap-3.5">
                <div className="w-[38px] h-[38px] bg-purple-400/20 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                  ◈
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{result.recTitle}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{result.recBody}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-5">
                Pricing estimate
                <span className="flex-1 h-px bg-purple-400/20" />
              </div>

              <div className="flex flex-col gap-2.5">
                {result.lines.map((l, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-lg border gap-4 flex-wrap ${
                      l.included
                        ? "border-dashed border-white/[0.07] bg-white/[0.03] opacity-70"
                        : i === 0
                        ? "bg-purple-400/10 border-purple-400/30"
                        : "border-white/[0.07] bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white mb-0.5">{l.name}</div>
                      <div className="text-xs text-slate-400">{l.detail}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {l.included ? (
                        <>
                          <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/[0.13] border border-emerald-500/[0.28] py-0.5 px-2.5 rounded-full">Included</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">List value: ${(l.price || 0).toLocaleString()}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-xl font-bold text-white">${l.price.toLocaleString()}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{l.period || "one-time"}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-5 bg-[#534AB7] rounded-lg flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-bold text-sm text-white">Total estimate{result.isAnnual ? " (annual)" : ""}</div>
                  {result.monthly && <div className="text-xs text-white/70 mt-0.5">≈ ${result.monthly.toLocaleString()} / month (÷10 billing model)</div>}
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">${result.total.toLocaleString()}</div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Estimated delivery effort</span>
                  <span>~{Math.round(result.effortD * 10) / 10} man-days</span>
                </div>
                <div className="h-[7px] bg-white/[0.08] rounded overflow-hidden mb-3.5">
                  <div
                    className="h-full rounded bg-purple-400 transition-all duration-500 ease-out"
                    style={{ width: `${result.effortPct}%` }}
                  />
                </div>
                <div className="flex gap-4 flex-wrap">
                  {result.effortItems.map((e, i) => (
                    <span key={i} className="text-xs text-slate-400">
                      <strong className="text-white">{e.days}d</strong> {e.label}
                    </span>
                  ))}
                </div>
              </div>

              {result.compNotes.length > 0 && (
                <div className="mt-4 p-3.5 bg-amber-500/[0.08] border border-amber-500/[0.24] rounded-lg text-[13px] text-amber-200 leading-relaxed">
                  {result.compNotes.map((n, i) => (
                    <span key={i}>
                      <strong className="text-amber-400">{n.framework}:</strong> {n.text}{" "}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <button
                  onClick={sendProposal}
                  className="py-3 px-4 rounded-lg text-sm font-bold text-center cursor-pointer transition-all bg-teal-600 hover:bg-teal-700 text-white border-none"
                >
                  <Mail className="h-4 w-4 inline mr-2" />
                  Get a formal proposal →
                </button>
                <button
                  onClick={resetCalc}
                  className="py-3 px-4 rounded-lg text-sm font-bold text-center cursor-pointer transition-all bg-transparent border border-white/[0.14] text-slate-400 hover:border-purple-400 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4 inline mr-2" />
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center mt-11 text-xs text-slate-600 leading-relaxed">
          Prices are indicative list prices in USD. Final pricing subject to scoping and SOW.<br />
          <Link href="/" className="text-purple-400 hover:underline">purpleguard.io</Link> · Egypt & Gulf · Subscription-based cybersecurity
        </footer>
      </div>
    </div>
  );
}
