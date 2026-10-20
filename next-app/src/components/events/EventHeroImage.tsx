import Image from "next/image";

interface EventHeroImageProps {
  src?: string;
  alt: string;
  className?: string;
}

// Renders a brand-gradient placeholder by default — Graph's API doesn't
// expose a webinar's registration-page banner/cover image at all (checked
// the actual resource schemas), so there's no way to auto-pull a per-event
// photo. `src` (an event's manual `heroImage` override, see
// src/lib/events/index.ts) renders a real photo instead when one is set.
export function EventHeroImage({ src, alt, className = "" }: EventHeroImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`gradient-primary flex items-center justify-center overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Same brand mark used on app/page.tsx's gradient hero slide — white
          variant for contrast against the purple gradient background. */}
      <Image src="/mark-white.png" alt="" width={64} height={64} className="h-14 w-auto opacity-40" />
    </div>
  );
}
