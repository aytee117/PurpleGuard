import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "PurpleGuard";
  const subtitle = searchParams.get("subtitle") ?? "Managed Security Services — UAE & Egypt";
  const category = searchParams.get("category") ?? "MSSP";
  const color = searchParams.get("color") ?? "purple";

  const gradients: Record<string, [string, string]> = {
    purple: ["#221345", "#6633cc"],
    blue: ["#0c1a4d", "#1d4ed8"],
    emerald: ["#052e16", "#065f46"],
    red: ["#450a0a", "#b91c1c"],
    orange: ["#431407", "#c2410c"],
    cyan: ["#0c1a4d", "#0e7490"],
    slate: ["#0f172a", "#334155"],
    indigo: ["#1e1b4b", "#4338ca"],
    default: ["#0b0a12", "#6633cc"],
  };

  const [gradStart, gradEnd] = gradients[color] ?? gradients.default;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `linear-gradient(135deg, ${gradStart} 0%, ${gradEnd} 100%)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top: wordmark + category badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "white",
              }}
            >
              ⬡
            </div>
            <span style={{ color: "white", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              PurpleGuard
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 999,
              padding: "6px 18px",
              color: "rgba(255,255,255,0.9)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 1, maxWidth: 900 }}>
          <div
            style={{
              color: "white",
              fontSize: title.length > 50 ? 44 : 56,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom: trust strip + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {["MSSP", "UAE · Egypt · KSA", "ISO 27001 · NIST · SOC 2"].map((item) => (
              <div
                key={item}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: "#6633cc", fontSize: 10 }}>●</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 500 }}>
            purpleguard.io
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
