import Link from "next/link";
import { blogCategories } from "@/lib/blog";

/**
 * Category filter chips. Server-rendered as links (each category is a crawlable
 * archive URL) rather than client-side filtering. `active` is a category slug,
 * or "all" for the main index.
 */
export function CategoryChips({ active }: { active: string }) {
  const chip = (isActive: boolean) =>
    `inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "border-[#6633cc] bg-[#6633cc] text-white"
        : "border-slate-200 bg-white text-slate-600 hover:border-[#6633cc]/40 hover:text-[#6633cc]"
    }`;

  return (
    <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
      <Link href="/blog" className={chip(active === "all")}>
        All
      </Link>
      {blogCategories.map((cat) => (
        <Link key={cat.slug} href={`/blog/category/${cat.slug}`} className={chip(active === cat.slug)}>
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
