import DOMPurify from "isomorphic-dompurify";

// Sanitizes rich-text HTML coming from a Teams webinar's description
// (Graph's itemBody, contentType "html"). The author is always an
// organizer/coorganizer who was granted the Teams Application Access
// Policy — not an anonymous public submitter — but it's still external
// content rendered via dangerouslySetInnerHTML, so it goes through a real
// allowlist rather than being trusted blindly.
const ALLOWED_TAGS = ["p", "br", "ul", "ol", "li", "strong", "em", "b", "i", "u", "a", "span"];
const ALLOWED_ATTR = ["href", "target", "rel"];

export function sanitizeEventDescriptionHtml(html: string): string {
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
  // Teams' rich-text editor commonly leaves behind empty paragraphs
  // (blank lines become `<p>&nbsp;</p>` / `<p></p>`) — strip those so they
  // don't render as stray gaps.
  return clean.replace(/<p>(&nbsp;|\s)*<\/p>/gi, "");
}
