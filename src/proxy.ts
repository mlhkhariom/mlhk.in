import { NextRequest, NextResponse } from "next/server";
import { generatePageMarkdown } from "@/lib/markdown-generator";
import {
  BASE_URL,
  isNoIndexPath,
  shouldNoIndexHost,
  shouldRedirectToApex,
} from "@/lib/seo-utils";

/**
 * Fast pre-filter, Canonical Host Guard, and Content Negotiation Proxy.
 *
 * 1. Canonical Domain Enforcement:
 *    - 301-redirects `www.mlhk.in` -> `https://mlhk.in` preserving path & query.
 *    - Attaches `X-Robots-Tag: noindex, nofollow` on non-canonical mirror hosts
 *      (`*.workers.dev`, `*.pages.dev`) and private/auth routes.
 *
 * 2. Markdown for Agents Content Negotiation:
 *    When requests include `Accept: text/markdown`, returns a clean, machine-readable
 *    markdown representation of the requested page with proper Content-Type, Vary,
 *    and x-markdown-tokens headers per IETF and Cloudflare standards.
 *
 * 3. Auth Pre-Filter:
 *    better-auth session checks for `/admin/*` and `/portal/*`.
 */

const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

const LINK_HEADER_VALUE =
  '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="service-doc"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml"';

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = req.headers.get("host");
  const acceptHeader = req.headers.get("accept") || "";

  // 0. Canonical Apex Domain Redirect (www.mlhk.in -> https://mlhk.in)
  if (shouldRedirectToApex(host)) {
    return NextResponse.redirect(`${BASE_URL}${pathname}${search}`, 301);
  }

  // 1. Content Negotiation for AI Agents (Accept: text/markdown on HTML web pages)
  const isDirectFileOrApi =
    pathname.endsWith(".txt") ||
    pathname.endsWith(".md") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".xml") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/api");

  if (acceptHeader.includes("text/markdown") && !isDirectFileOrApi) {
    const markdown = generatePageMarkdown(pathname, req.nextUrl.origin);
    const tokenCount = Math.ceil(markdown.length / 4);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        Link: LINK_HEADER_VALUE,
        "X-Markdown-Tokens": String(tokenCount),
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        ...(shouldNoIndexHost(host) ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
      },
    });
  }

  // 2. Auth Guard for Admin & Portal areas
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    const hasSessionCookie = SESSION_COOKIES.some((name) => req.cookies.get(name)?.value);
    if (!hasSessionCookie) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      const redirectRes = NextResponse.redirect(url);
      redirectRes.headers.set("X-Robots-Tag", "noindex, nofollow");
      return redirectRes;
    }
  }

  // 3. Regular HTML response + X-Robots-Tag guard on preview hosts or private/auth paths
  const res = NextResponse.next();
  if (shouldNoIndexHost(host) || isNoIndexPath(pathname)) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static JS/CSS)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt, feed.xml (dedicated protocol files)
     * - static file extensions (.png, .jpg, .svg, .webp, .ico, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};