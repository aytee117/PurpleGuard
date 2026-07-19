import Image from "next/image";
import type { RegionalRanking as RegionalRankingData } from "@/lib/reports/egypt-threat-intel-h1-2026";

interface RegionalRankingProps {
  ranking: RegionalRankingData;
  lang: "en" | "ar";
  copy: {
    eyebrow: string;
    africaLine: (rank: number) => React.ReactNode;
    menaLine: (rank: number, behind: string) => React.ReactNode;
  };
}

export function RegionalRanking({ ranking, lang, copy }: RegionalRankingProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5">
        <Image
          src="/reports/egypt-h1-2026/egypt-flag.svg"
          alt={lang === "ar" ? "علم مصر" : "Flag of Egypt"}
          width={72}
          height={48}
          className="h-auto w-[72px] flex-none rounded border border-white/25 shadow-lg"
          unoptimized
        />
        <span className="pg-eyebrow text-[11px] font-medium text-[#b9a3f0]">{copy.eyebrow}</span>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl">
            {lang === "ar" ? (ranking.africaRank === 1 ? "١#" : `#${ranking.africaRank}`) : `#${ranking.africaRank}`}
          </span>
          <span className="text-base leading-relaxed text-slate-300">{copy.africaLine(ranking.africaRank)}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-6xl font-bold leading-none tracking-tight text-[#b9a3f0] sm:text-7xl">
            {lang === "ar" ? (ranking.menaRank === 2 ? "٢#" : `#${ranking.menaRank}`) : `#${ranking.menaRank}`}
          </span>
          <span className="text-base leading-relaxed text-slate-300">
            {copy.menaLine(ranking.menaRank, lang === "ar" ? ranking.menaBehind.ar : ranking.menaBehind.en)}
          </span>
        </div>
      </div>
    </div>
  );
}
