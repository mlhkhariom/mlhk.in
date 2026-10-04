/**
 * Conservative, dependency-free HTML sanitizer for rich-text content.
 *
 * Why hand-rolled: the app runs on Cloudflare Workers, where there is no DOM.
 * DOMPurify / jsdom / sanitize-html are not viable in that runtime. This is an
 * allowlist sanitizer: anything not explicitly permitted is stripped.
 *
 * This is a hardening layer, not the only defence — admin API routes require an
 * authenticated session, and a strict Content-Security-Policy is applied in
 * `next.config.ts`. Do not treat user-supplied HTML as trusted on this alone.
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup",
  "code", "pre", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "span", "div",
]);

const VOID_TAGS = new Set(["br", "hr", "img"]);

/** Tags whose *contents* must be discarded along with the tag. */
const DROP_CONTENT_TAGS = ["script", "style", "iframe", "object", "embed", "form", "noscript", "template", "svg", "math"];

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  th: new Set(["colspan", "rowspan"]),
  td: new Set(["colspan", "rowspan"]),
  ol: new Set(["start"]),
};

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/|#)/i;

function isSafeUrl(value: string): boolean {
  // Strip control characters that could smuggle `java\0script:` past a naive check.
  const v = value.replace(/[\u0000- ]/g, "").trim();
  return SAFE_URL.test(v);
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sanitizeHtml(input: string | null | undefined): string {
  if (!input) return "";
  let html = String(input);

  // 1. Remove comments (can hide conditional-comment payloads).
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Remove dangerous elements together with their inner content.
  for (const tag of DROP_CONTENT_TAGS) {
    html = html.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}\\s*>`, "gi"), "");
    html = html.replace(new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi"), "");
  }

  // 3. Walk the remaining tags, keeping only allowlisted tags/attributes.
  return html.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)\/?>/g,
    (match, rawTag: string, rawAttrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";

      const closing = match.startsWith("</");
      if (closing || VOID_TAGS.has(tag)) {
        return VOID_TAGS.has(tag) && !closing ? `<${tag}${filterAttrs(tag, rawAttrs)} />` : `</${tag}>`;
      }
      return `<${tag}${filterAttrs(tag, rawAttrs)}>`;
    }
  );
}

function filterAttrs(tag: string, rawAttrs: string): string {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed || !rawAttrs) return "";

  const out: string[] = [];
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m: RegExpExecArray | null;

  while ((m = attrRe.exec(rawAttrs)) !== null) {
    const name = m[1].toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";

    if (!allowed.has(name)) continue;              // drops all on* handlers, style, etc.
    if (name === "href" || name === "src") {
      if (!isSafeUrl(value)) continue;             // drops javascript:, data:, vbscript:
    }
    out.push(`${name}="${escapeAttr(value)}"`);
  }

  // Force safe link behaviour on anchors.
  if (tag === "a" && out.some((a) => a.startsWith("target="))) {
    if (!out.some((a) => a.startsWith("rel="))) out.push('rel="noopener noreferrer"');
  }

  return out.length ? " " + out.join(" ") : "";
}
