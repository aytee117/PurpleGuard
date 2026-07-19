import Image from "next/image";

interface LogoBadgeProps {
  name: string;
  logo?: string;
  faviconDomain?: string;
  initials?: string;
  size?: number;
  /** Override the tile's white background — for logos that need a dark backdrop to read correctly */
  bg?: string;
  /** "cover" for photo/screenshot-style logos; default "contain" for clean vector marks */
  fit?: "contain" | "cover";
}

export function LogoBadge({ name, logo, faviconDomain, initials, size = 40, bg, fit = "contain" }: LogoBadgeProps) {
  const style = { width: size, height: size, ...(bg ? { background: bg } : {}) };

  if (logo) {
    return (
      <div
        className={`flex flex-none items-center justify-center rounded-lg border border-border ${bg ? "" : "bg-white"} ${fit === "cover" ? "overflow-hidden p-1" : "p-1"}`}
        style={style}
      >
        <Image
          src={logo}
          alt={name}
          width={size}
          height={size}
          className={`h-full w-full ${fit === "cover" ? "rounded object-cover" : "object-contain"}`}
          unoptimized
        />
      </div>
    );
  }

  if (faviconDomain) {
    return (
      <div
        className="flex flex-none items-center justify-center rounded-lg border border-border bg-white p-1.5"
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://www.google.com/s2/favicons?domain=${faviconDomain}&sz=128`}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-none items-center justify-center rounded-lg border border-border bg-muted"
      style={style}
      title={name}
    >
      <span className="font-mono text-[11px] font-semibold text-muted-foreground">{initials ?? "?"}</span>
    </div>
  );
}
