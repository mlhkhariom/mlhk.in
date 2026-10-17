import { NextRequest, NextResponse } from "next/server";
import { generatePageMarkdown } from "@/lib/markdown-generator";

/**
 * Fast pre-filter and Content Negotiation Proxy.
 *
 * 1. Markdown for Agents Content Negotiation:
 *    When requests include `Accept: text/markdown`, returns a clean, machine-readable
 *    markdown representation of the requested page with proper Content-Type, Vary,
 *    and x-markdown-tokens headers per IETF and Cloudflare standards.
 *
 * 2. Auth Pre-Filter:
 *    better-auth session checks for `/admin/*` and `/portal/*`.
 */

const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const acceptHeader = req.headers.get("accept") || "";

  // 1. Content Negotiation for AI Agents (Accept: text/markdown)
  if (acceptHeader.includes("text/markdown")) {
    const markdown = generatePageMarkdown(pathname, req.nextUrl.origin);
    const tokenCount = Math.ceil(markdown.length / 4);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "X-Markdown-Tokens": String(tokenCount),
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  }

  // 2. Auth Guard for Admin & Portal areas
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    const hasSessionCookie = SESSION_COOKIES.some((name) => req.cookies.get(name)?.value);
    if (!hasSessionCookie) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
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