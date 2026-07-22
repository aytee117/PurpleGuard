import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getAllPosts,
  getPostBySlug,
  getAuthor,
  categoryByName,
  tableOfContents,
  readingTimeMinutes,
} from "@/lib/blog";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleTocSidebar, ArticleTocMobile } from "@/components/blog/ArticleToc";
import { articleJsonLd, breadcrumbJsonLd, ogImageUrl } from "@/lib/json-ld";

const BASE = "https://www.purpleguard.io";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const og = ogImageUrl({ title: post.title, subtitle: post.excerpt, category: post.category });

  return {
    title: { absolute: `${title} | PurpleGuard` },
    description,
    alternates: { canonical: `${BASE}${url}` },
    openGraph: {
      type: "article",
      url: `${BASE}${url}`,
      title: `${title} | PurpleGuard`,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [getAuthor(post.authorId).name],
      images: [{ url: og, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PurpleGuard`,
      description,
      images: [og],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorId);
  const category = categoryByName(post.category);
  const toc = tableOfContents(post);
  const readingTime = readingTimeMinutes(post);
  const url = `/blog/${post.slug}`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url },
  ]);
  const article = articleJsonLd({
    title: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    authorName: author.name,
    section: post.category,
    image: ogImageUrl({ title: post.title, subtitle: post.excerpt, category: post.category }),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500"
            >
              <Link href="/" className="hover:text-[#6633cc]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              <Link href="/blog" className="hover:text-[#6633cc]">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              <span className="truncate text-slate-700">{post.category}</span>
            </nav>

            {category ? (
              <Link href={`/blog/category/${category.slug}`} className="mb-5 inline-block">
                <Badge className="border-[#6633cc]/20 bg-[#f3eefc] text-[#6633cc] hover:bg-[#e6dcf8]">
                  {post.category}
                </Badge>
              </Link>
            ) : (
              <Badge className="mb-5 border-[#6633cc]/20 bg-[#f3eefc] text-[#6633cc]">{post.category}</Badge>
            )}

            <h1 className="max-w-4xl text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.dek && (
              <p className="mt-5 max-w-3xl text-lg text-slate-600 sm:text-xl">{post.dek}</p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6633cc] to-indigo-600 text-xs font-semibold text-white">
                  PG
                </span>
                <div className="leading-tight">
                  <div className="font-medium text-slate-800">{author.name}</div>
                  <div className="text-xs text-slate-500">{author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Body + ToC — 70/30 on desktop, single column (ToC collapsible on top) on mobile */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_3fr] lg:gap-14">
            <article className="min-w-0">
              <div className="mb-8 lg:hidden">
                <ArticleTocMobile items={toc} />
              </div>

              <ArticleBody post={post} />

              {/* Tags + back link */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                {post.tags.length > 0 && (
                  <div className="mb-8 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#6633cc] hover:text-[#5528ad]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* Sticky sidebar ToC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ArticleTocSidebar items={toc} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
