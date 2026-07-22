import type { BlogPost, ContentBlock, InlineNode } from "./types";
import { egyptCyberthreatLandscape2026 } from "./posts/egypt-cyberthreat-landscape-2026";

export type { BlogPost, ArticleSection, ContentBlock, InlineNode, InlineLink } from "./types";
export { getAuthor } from "./authors";

/**
 * Blog categories (primary taxonomy — one per post).
 *
 * PROPOSED — not yet wired into navigation or archive pages. The category
 * archive URL is `/blog/category/{slug}`. Keep this list authoritative: every
 * post's `category` must match one of these `name`s, so category pages, filter
 * chips, and the future CMS all read from a single source of truth.
 */
export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "threat-intelligence",
    name: "Threat Intelligence",
    description:
      "Regional threat landscape, threat-actor profiles, active campaigns, and PurpleGuard's Egypt Threat Watch briefings.",
  },
  {
    slug: "compliance-regulations",
    name: "Compliance & Regulations",
    description:
      "TDRA, EG-CERT, NCA, SAMA, PDPL and ISO 27001 — what regional frameworks mean for SMEs and how to stay audit-ready.",
  },
  {
    slug: "security-guidance",
    name: "Security Guidance",
    description:
      "Practical hardening, tooling and best-practice guides — Zero Trust, EDR selection, VAPT, and defending mid-market environments.",
  },
  {
    slug: "company-product-news",
    name: "Company & Product News",
    description: "PurpleGuard announcements, service launches, events, and behind-the-scenes from the SOC.",
  },
];

export function categoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

export function categoryByName(name: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.name === name);
}

/** All posts, newest first. Add new posts here. */
const posts: BlogPost[] = [egyptCyberthreatLandscape2026];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(name: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === name);
}

/** Section headings → table-of-contents entries. */
export function tableOfContents(post: BlogPost): { id: string; heading: string }[] {
  return post.sections.map((s) => ({ id: s.id, heading: s.heading }));
}

function countInline(nodes: InlineNode[]): number {
  return nodes.reduce((sum, n) => {
    const text = typeof n === "string" ? n : n.text;
    return sum + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

function countBlocks(blocks: ContentBlock[]): number {
  return blocks.reduce((sum, block) => {
    if (block.type === "list") {
      return sum + block.items.reduce((s, item) => s + countInline(item), 0);
    }
    return sum + countInline(block.content);
  }, 0);
}

/** Estimated reading time in whole minutes (~220 wpm), floored at 1. */
export function readingTimeMinutes(post: BlogPost): number {
  const words =
    countBlocks(post.intro) +
    post.sections.reduce((sum, s) => sum + s.heading.split(/\s+/).length + countBlocks(s.blocks), 0);
  return Math.max(1, Math.round(words / 220));
}
