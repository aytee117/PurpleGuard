import Image from "next/image";

interface PartnerLogoProps {
  name: string;
  src: string | null;
}

// Falls back to a text badge when the real logo asset hasn't been supplied
// yet (see project deliverables.md #8) — mirrors the LogoBadge.tsx pattern
// used for the Egypt report's placeholder-asset phase, so this never ships
// a broken <img>.
export function PartnerLogo({ name, src }: PartnerLogoProps) {
  if (!src) {
    return (
      <div className="flex h-12 items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-sm font-semibold tracking-wide text-slate-400">
        {name}
      </div>
    );
  }

  // next.config.js doesn't set dangerouslyAllowSVG, so local SVGs must skip
  // the built-in optimizer (it refuses to process them either way).
  const unoptimized = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={name}
      width={140}
      height={48}
      unoptimized={unoptimized}
      className="h-12 w-auto object-contain"
    />
  );
}
