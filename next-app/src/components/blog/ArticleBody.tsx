import { Fragment } from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import type { BlogPost, ContentBlock, InlineNode } from "@/lib/blog";

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

function renderInline(nodes: InlineNode[]) {
  return nodes.map((node, i) => {
    if (typeof node === "string") return <Fragment key={i}>{node}</Fragment>;
    const className =
      "font-medium text-[#6633cc] underline decoration-[#6633cc]/30 underline-offset-2 transition-colors hover:text-[#5528ad] hover:decoration-[#6633cc]";
    if (isInternal(node.href)) {
      return (
        <Link key={i} href={node.href} className={className}>
          {node.text}
        </Link>
      );
    }
    return (
      <a key={i} href={node.href} target="_blank" rel="noopener noreferrer" className={className}>
        {node.text}
      </a>
    );
  });
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return <p>{renderInline(block.content)}</p>;
  }
  if (block.type === "list") {
    const items = block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>);
    return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
  }
  // callout
  return (
    <div className="not-prose my-8 flex gap-4 rounded-2xl border border-[#6633cc]/20 bg-[#f3eefc] p-5 sm:p-6">
      <ShieldAlert className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#6633cc]" />
      <p className="text-base font-medium leading-relaxed text-[#321a66] sm:text-lg">
        {renderInline(block.content)}
      </p>
    </div>
  );
}

/**
 * Renders the article body: intro blocks, then each section as an <h2> anchor
 * target followed by its content. `scroll-mt-24` keeps headings clear of the
 * 64px sticky nav when jumped to from the table of contents.
 */
export function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <div className="prose prose-slate max-w-none prose-lg prose-headings:font-display prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-700">
      {post.intro.map((block, i) => (
        <Block key={`intro-${i}`} block={block} />
      ))}

      {post.sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="scroll-mt-24">
            {section.heading}
          </h2>
          {section.blocks.map((block, i) => (
            <Block key={`${section.id}-${i}`} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
