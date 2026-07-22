/**
 * Blog content model for PurpleGuard Insights.
 *
 * One typed data file per post lives under `src/lib/blog/posts/`, registered in
 * `src/lib/blog/index.ts`. Content is stored as structured blocks (not raw HTML)
 * so the article renderer can auto-generate the on-page table of contents from
 * section headings, and so a future headless-CMS migration is a data-source swap
 * rather than a rewrite (mirrors the `src/lib/reports/` per-edition pattern, but
 * one registry for many uniform posts rather than one bespoke file per report).
 */

/** A run of inline content — either plain text or a link. */
export type InlineNode = string | InlineLink;

export interface InlineLink {
  text: string;
  /** Internal links start with "/" or "#" (rendered via next/link); anything
   *  else is treated as external (new tab, rel="noopener noreferrer"). */
  href: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  content: InlineNode[];
}

export interface ListBlock {
  type: "list";
  ordered?: boolean;
  items: InlineNode[][];
}

/** A callout / highlighted stat strip, used to break up long prose. */
export interface CalloutBlock {
  type: "callout";
  content: InlineNode[];
}

export type ContentBlock = ParagraphBlock | ListBlock | CalloutBlock;

/** A top-level section — its `heading` becomes an <h2> and a ToC entry. */
export interface ArticleSection {
  /** URL-fragment id; must be unique within a post and stable (used as anchor). */
  id: string;
  heading: string;
  blocks: ContentBlock[];
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Optional standfirst shown under the title, above the byline. */
  dek?: string;
  /** ~150-char summary — used for meta description, OG, and archive cards. */
  excerpt: string;
  /** Primary taxonomy — one per post. See `src/lib/blog/index.ts` categories. */
  category: string;
  tags: string[];
  /** Regional relevance, for future faceting/hreflang. */
  regions?: string[];
  authorId: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  hero?: { src: string; alt: string };
  /** Blocks rendered before the first section heading. */
  intro: ContentBlock[];
  sections: ArticleSection[];
  /** Optional SEO overrides; falls back to title/excerpt. */
  seo?: { title?: string; description?: string };
}
