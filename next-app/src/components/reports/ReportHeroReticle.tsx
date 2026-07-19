import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./ReportHeroReticle.module.css";

const BLIPS = [
  { left: "68.8%", top: "20.8%", size: 10, color: "#e0484d", delay: "-1.4s" },
  { left: "23.5%", top: "66.9%", size: 8, color: "#f2762e", delay: "-4.6s" },
  { left: "61.9%", top: "76.2%", size: 8, color: "#ad8ce6", delay: "-6.8s" },
  { left: "27.3%", top: "24.6%", size: 7, color: "#d99423", delay: "-3.1s" },
];

const TICKER_ITEMS = [
  "MEAN TIME TO RESPOND · 11 MIN",
  "EVENTS ANALYZED · 4.2B / 24H",
  "CAMPAIGNS TRACKED · 312",
  "ACTIVE CVES · 1,847",
  "SOC COVERAGE · 24/7",
];

/**
 * Ambient, infinite-loop hero background — reticle sweep with the PurpleGuard
 * mark glowing at its core. Ported from the "2a" option in the design's
 * Hero Animation.dc.html. Decorative-only; absolutely positioned behind the
 * hero's text column, which is why a legibility fade is baked in.
 *
 * `mirrored` flips the whole composition horizontally for the Arabic (RTL)
 * layout, where the text column sits on the right instead of the left —
 * without this, the graphic and the fade stay on the LTR side and the text
 * ends up illegible on top of the busy reticle.
 */
export function ReportHeroReticle({
  hieroglyphClassName,
  mirrored = false,
}: {
  hieroglyphClassName?: string;
  mirrored?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0a12]" aria-hidden="true">
      {/* technical grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(102,51,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(102,51,204,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: `radial-gradient(ellipse 75% 90% at ${mirrored ? "38%" : "62%"} 45%, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 75% 90% at ${mirrored ? "38%" : "62%"} 45%, black 30%, transparent 100%)`,
        }}
      />

      {/* purple glow bloom */}
      <div
        className={
          mirrored
            ? `absolute -top-[30%] left-[8%] h-[420px] w-[420px] rounded-full sm:h-[600px] sm:w-[600px] lg:h-[820px] lg:w-[820px] ${styles.glow}`
            : `absolute -top-[30%] right-[8%] h-[420px] w-[420px] rounded-full sm:h-[600px] sm:w-[600px] lg:h-[820px] lg:w-[820px] ${styles.glow}`
        }
        style={{
          background:
            "radial-gradient(circle, rgba(102,51,204,0.28) 0%, rgba(102,51,204,0.10) 40%, transparent 70%)",
        }}
      />

      {/* hieroglyph strata — hidden below lg to keep small viewports uncluttered */}
      <div
        className={
          mirrored
            ? "absolute inset-y-0 right-6 hidden flex-col justify-center gap-8 lg:flex"
            : "absolute inset-y-0 left-6 hidden flex-col justify-center gap-8 lg:flex"
        }
      >
        <div
          className={`${hieroglyphClassName ?? ""} ${styles.glyphRow1}`}
          style={{ display: "flex", flexDirection: "column", gap: "34px" }}
        >
          <div className={`text-2xl tracking-[18px] text-[#8b5cd9] opacity-10 ${styles.glyphLine1}`}>
            𓂀 𓊖 𓆓 𓏏 𓈖 𓅓
          </div>
          <div className={`text-xl tracking-[14px] text-[#8b5cd9] opacity-[0.08] ${styles.glyphLine2}`}>
            𓉐 𓋹 𓎢 𓇋 𓁹 𓆣 𓊝
          </div>
          <div className={`text-xl tracking-[22px] text-[#8b5cd9] opacity-[0.09] ${styles.glyphLine3}`}>
            𓆃 𓏇 𓈎 𓄿 𓂋
          </div>
        </div>
      </div>

      {/* reticle assembly — brand mark at core */}
      <div
        className={
          mirrored
            ? "absolute left-[25%] top-[45%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px] lg:left-[38%] lg:h-[520px] lg:w-[520px]"
            : "absolute left-[75%] top-[45%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px] lg:left-[62%] lg:h-[520px] lg:w-[520px]"
        }
      >
        <svg
          viewBox="0 0 520 520"
          className={`absolute inset-0 h-full w-full ${styles.ringBreathe}`}
        >
          <circle cx="260" cy="260" r="252" fill="none" stroke="#44208a" strokeWidth="1.5" />
          <circle cx="260" cy="260" r="214" fill="none" stroke="#321a66" strokeWidth="1" strokeDasharray="3 9" strokeLinecap="round" />
          <circle cx="260" cy="260" r="150" fill="none" stroke="#5528ad" strokeWidth="1.5" />
          <line x1="260" y1="34" x2="260" y2="92" stroke="#5e5775" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="260" y1="428" x2="260" y2="486" stroke="#5e5775" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="260" x2="92" y2="260" stroke="#5e5775" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="428" y1="260" x2="486" y2="260" stroke="#5e5775" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* rotating sweep */}
        <div
          className={`absolute inset-2 rounded-full ${styles.spin}`}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(102,51,204,0.02) 310deg, rgba(139,92,217,0.35) 358deg, rgba(173,140,230,0.65) 360deg)",
          }}
        />

        {/* soft halo behind the mark */}
        <div
          className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(11,10,18,0.92) 0%, rgba(11,10,18,0.75) 55%, transparent 75%)",
          }}
        />

        {/* the mark */}
        <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/mark-purple.png"
            alt=""
            fill
            className={styles.ringBreathe}
            style={{ objectFit: "contain", filter: "drop-shadow(0 0 28px rgba(102,51,204,0.55))" }}
          />
        </div>

        {/* blips */}
        {BLIPS.map((blip, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${styles.blip}`}
            style={
              {
                left: blip.left,
                top: blip.top,
                width: blip.size,
                height: blip.size,
                backgroundColor: blip.color,
                "--blip-delay": blip.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* scanline */}
      <div
        className={`absolute left-0 right-0 h-px ${styles.scanline}`}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,217,0.5) 30%, rgba(139,92,217,0.5) 70%, transparent)",
        }}
      />

      {/* legibility fade for the text column that sits on top of this background, plus a
          dark-purple radial spot over the reticle's own center — the headline crosses
          right through the middle of the radar, which the side fade alone doesn't cover */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            `radial-gradient(circle at ${mirrored ? "30%" : "70%"} 45%, rgba(19,17,32,0.55) 0%, rgba(19,17,32,0.3) 35%, transparent 60%)`,
            `linear-gradient(${mirrored ? "270deg" : "90deg"}, rgba(11,10,18,0.88) 0%, rgba(11,10,18,0.45) 40%, transparent 68%)`,
          ].join(", "),
        }}
      />

      {/* bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-[#0b0a12]/70 backdrop-blur-md">
        <div className={`flex w-max gap-16 whitespace-nowrap px-4 py-3 ${styles.tickerTrack}`}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="pg-eyebrow text-[11px] text-[#5e5775]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
