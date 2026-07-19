import Image from "next/image";
import { LogoBadge } from "./LogoBadge";
import type { EgyptianVictimGroup } from "@/lib/reports/egypt-threat-intel-h1-2026";

interface EgyptianVictimsProps {
  groups: EgyptianVictimGroup[];
}

export function EgyptianVictims({ groups }: EgyptianVictimsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {groups.map((group) => (
        <div key={group.actorSlug} className="flex flex-col gap-0.5">
          <div className="mb-1.5 flex w-fit items-center gap-2.5">
            <Image
              src={group.actorAvatar}
              alt={group.actorName}
              width={28}
              height={28}
              className="h-7 w-7 flex-none rounded-full object-cover"
              unoptimized
            />
            <span className="font-display text-sm font-bold text-foreground">{group.actorName}</span>
          </div>
          {group.victims.map((victim, i) => (
            <div
              key={victim.name}
              className={`flex items-center gap-3 py-2.5 ${
                i < group.victims.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <LogoBadge
                name={victim.name}
                logo={victim.logo}
                faviconDomain={victim.faviconDomain}
                initials={victim.initials}
                bg={victim.bg}
                fit={victim.fit}
              />
              <span className="text-[14.5px] text-foreground">{victim.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
