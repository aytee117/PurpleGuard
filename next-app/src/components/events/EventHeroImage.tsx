import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface EventHeroImageProps {
  src?: string;
  alt: string;
  className?: string;
}

// Renders the event's hero photo (the same image used on the Teams event)
// once captured — see events plan / project deliverables.md for the manual
// capture step. Falls back to a brand-gradient placeholder so the section's
// layout is still reviewable before a real photo exists.
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
      <ImageIcon className="h-10 w-10 text-white/40" />
    </div>
  );
}
