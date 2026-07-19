import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ThreatLevel } from "./ThreatLevel";
import type { ThreatActorProfile } from "@/lib/reports/egypt-threat-intel-h1-2026";

interface ThreatActorTerminalCardProps {
  actor: ThreatActorProfile;
  lang: "en" | "ar";
}

export function ThreatActorTerminalCard({ actor, lang }: ThreatActorTerminalCardProps) {
  const t = lang === "en" ? actor.en : actor.ar;
  const tags = lang === "en" ? actor.en.tags : [];

  return (
    <div className="overflow-hidden rounded-[12px] border border-white/[0.12] bg-white/[0.045] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-[20px]">
      <div className="flex items-center gap-[7px] border-b border-white/10 bg-white/[0.03] px-3.5 py-[9px]">
        <span className="h-2 w-2 rounded-full bg-[#E0484D]" />
        <span className="h-2 w-2 rounded-full bg-[#D99423]" />
        <span className="h-2 w-2 rounded-full bg-[#1F9D6B]" />
        <span className="font-mono text-[10.5px] text-white/40 ms-2">actor_profile.log</span>
      </div>
      <div className="flex flex-col gap-3 p-[18px]">
        <span
          {...(lang === "ar" ? { dir: "ltr" as const } : {})}
          className={`font-mono text-[11px] text-[#8AF0B0] ${lang === "ar" ? "text-right" : ""}`}
        >
          $ threat --profile {actor.slug}
        </span>
        <div className="flex items-center gap-3">
          <Image
            src={actor.avatar}
            alt={actor.name}
            width={46}
            height={46}
            className="h-[46px] w-[46px] flex-none rounded-lg border border-white/15 object-cover"
            unoptimized
          />
          <div className="flex flex-col gap-1">
            <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">{actor.name}</span>
            <Badge className="w-fit border-red-400/40 bg-red-500/15 text-red-400">{t.badge}</Badge>
          </div>
        </div>
        <ThreatLevel level={actor.level} size="sm" />
        <p className="text-[13.5px] leading-[1.55] text-white/65">{t.description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-[9px] py-[3px] font-mono text-[11px] text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          {...(lang === "ar" ? { dir: "ltr" as const } : {})}
          className="flex flex-col gap-0.5 border-t border-white/10 pt-2 font-mono text-[11px] text-[#8AF0B0]"
        >
          <span>&gt; first_seen: {actor.firstSeen}</span>
          <span>&gt; origin: {actor.origin}</span>
        </div>
      </div>
    </div>
  );
}
