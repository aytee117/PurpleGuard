import Link from "next/link";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAuthor, readingTimeMinutes, type BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostCard({ post }: { post: BlogPost }) {
  const author = getAuthor(post.authorId);
  const readingTime = readingTimeMinutes(post);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6633cc]/30 hover:shadow-md">
      <Badge className="mb-4 w-fit border-[#6633cc]/20 bg-[#f3eefc] text-[#6633cc]">
        {post.category}
      </Badge>

      <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900">
        <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-[#6633cc]">
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h3>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="font-medium text-slate-700">{author.name}</span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
          {formatDate(post.publishedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          {readingTime} min
        </span>
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#6633cc]">
        Read article
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
