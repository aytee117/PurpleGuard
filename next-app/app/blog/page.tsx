import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Cybersecurity Blog — Insights & Resources | PurpleGuard" },
  description:
    "Cybersecurity insights, compliance guides, and threat intelligence from PurpleGuard — your MSSP partner in UAE, Egypt, and KSA.",
  keywords: [
    "cybersecurity blog UAE", "MSSP insights", "NCA ECC compliance guide",
    "TDRA cybersecurity Egypt", "managed security resources", "PurpleGuard blog",
  ],
  alternates: { canonical: "https://www.purpleguard.io/blog" },
  openGraph: {
    title: "Cybersecurity Blog — Insights & Resources | PurpleGuard",
    description:
      "Cybersecurity insights, compliance guides, and threat intelligence from PurpleGuard — your MSSP partner in UAE, Egypt, and KSA.",
    url: "https://www.purpleguard.io/blog",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
]);

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <p className="pg-eyebrow mb-3 text-xs uppercase text-[#6633cc]">PurpleGuard Insights</p>
            <h1 className="max-w-3xl text-4xl font-bold text-slate-900 lg:text-5xl">
              Cybersecurity insights for the region
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Research, compliance guides, and threat intelligence tailored for organisations in the
              UAE, Egypt, and Saudi Arabia — from the PurpleGuard team.
            </p>
          </div>
        </header>

        {/* Archive */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-10">
            <CategoryChips active="all" />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No articles published yet — check back soon.</p>
          )}
        </section>
      </main>
    </>
  );
}
