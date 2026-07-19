"use client";

import { useEffect, useRef, useState } from "react";
import type { VictimsDonut as VictimsDonutData } from "@/lib/reports/egypt-threat-intel-h1-2026";

interface VictimsDonutProps {
  data: VictimsDonutData;
  lang: "en" | "ar";
  caption: string;
}

export function VictimsDonut({ data, lang, caption }: VictimsDonutProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let cursor = 0;
  const stops = data.breakdown.map((item) => {
    const start = (cursor / data.total) * 360;
    cursor += item.count;
    const end = (cursor / data.total) * 360;
    return `${item.color} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
  });

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-8">
      <div className="flex flex-none flex-col items-center gap-3.5">
        <div
          className="h-[200px] w-[200px] rounded-full transition-all duration-700 ease-out"
          style={{
            background: `conic-gradient(from 0deg, ${stops.join(", ")})`,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.85)",
          }}
        >
          <div className="relative inset-[22px] flex h-[156px] w-[156px] items-center justify-center rounded-full bg-background shadow-sm">
            <span className="font-display text-6xl font-extrabold tracking-tight text-foreground">
              {data.total}
            </span>
          </div>
        </div>
        <span className="pg-eyebrow text-center font-mono text-[11px] text-muted-foreground">{caption}</span>
      </div>
      <div className="flex min-w-[220px] flex-1 flex-col gap-2.5">
        {data.breakdown.map((item) => (
          <div key={item.en} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 flex-none rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-[14.5px] text-foreground">{lang === "ar" ? item.ar : item.en}</span>
            <span className="ms-auto font-mono text-sm text-muted-foreground">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
