"use client";

import { useEffect, useRef, useState } from "react";
import { ListTree, ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  heading: string;
}

/** Shared scrollspy — returns the id of the section currently in view. */
function useActiveHeading(items: TocItem[]): string {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      // A heading counts as "active" once it enters the top ~34% of the viewport
      // (offset for the 64px sticky nav) and until the next one takes over.
      { rootMargin: "-96px 0px -66% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

/** Desktop: sticky sidebar in the 30% column, with active-section highlight. */
export function ArticleTocSidebar({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="pg-eyebrow text-xs uppercase text-slate-500 mb-4">On this page</p>
      <ul className="space-y-1 border-l border-slate-200">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 leading-snug transition-colors ${
                  isActive
                    ? "border-[#6633cc] font-medium text-[#6633cc]"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile / tablet: a collapsible "On this page" panel that closes on selection. */
export function ArticleTocMobile({ items }: { items: TocItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <details
      ref={detailsRef}
      className="group rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-800">
        <span className="flex items-center gap-2">
          <ListTree className="h-4 w-4 text-[#6633cc]" />
          On this page
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <ul className="space-y-0.5 px-4 pb-4 pt-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => detailsRef.current?.removeAttribute("open")}
              className="block rounded-md px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#6633cc]"
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
