import sanitizeHtml from "sanitize-html";

// Sanitizes rich-text HTML coming from a Teams webinar's description
// (Graph's itemBody, contentType "html"). The author is always an
// organizer/coorganizer who was granted the Teams Application Access
// Policy — not an anonymous public submitter — but it's still external
// content rendered via dangerouslySetInnerHTML, so it goes through a real
// allowlist rather than being trusted blindly.
//
// Deliberately NOT isomorphic-dompurify: it pulls in jsdom, which ships a
// transitive dependency (html-encoding-sniffer -> an ESM-only package)
// that Vercel's serverless bundler can't require() as CommonJS — worked
// fine in local `next dev` (no bundling/tracing step) but threw
// ERR_REQUIRE_ESM the moment this route actually ran as a deployed
// function. sanitize-html has no jsdom dependency and is built for
// exactly this server-side use case.
const ALLOWED_TAGS = ["p", "br", "ul", "ol", "li", "strong", "em", "b", "i", "u", "a", "span"];

export function sanitizeEventDescriptionHtml(html: string): string {
  const clean = sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ["href", "target", "rel"] },
  });
  // Teams' rich-text editor commonly leaves behind empty paragraphs
  // (blank lines become `<p>&nbsp;</p>` / `<p></p>`) — strip those so they
  // don't render as stray gaps.
  return clean.replace(/<p>(&nbsp;|\s)*<\/p>/gi, "");
}
