import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCategories, categoryBySlug, getPostsByCategory } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { breadcrumbJsonLd } from "@/lib/json-ld";

const BASE = "https://www.purpleguard.io";

export function generateStaticParams() {
  return blogCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name} — PurpleGuard Insights`;
  return {
    title: { absolute: `${title} | PurpleGuard` },
    description: category.description,
    alternates: { canonical: `${BASE}/blog/category/${category.slug}` },
    openGraph: { title: `${title} | PurpleGuard`, description: category.description, url: `${BASE}/blog/category/${category.slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.name);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: category.name, url: `/blog/category/${category.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="min-h-screen bg-background">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500">
              <Link href="/blog" className="hover:text-[#6633cc]">
                PurpleGuard Insights
              </Link>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-700">{category.name}</span>
            </nav>
            <h1 className="max-w-3xl text-4xl font-bold text-slate-900 lg:text-5xl">{category.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">{category.description}</p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-10">
            <CategoryChips active={category.slug} />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-600">No articles in this category yet.</p>
              <Link
                href="/blog"
                className="mt-3 inline-block text-sm font-medium text-[#6633cc] hover:text-[#5528ad]"
              >
                Browse all articles →
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
