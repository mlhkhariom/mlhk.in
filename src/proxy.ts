import { NextRequest, NextResponse } from "next/server";

/**
 * Fast pre-filter only — NOT the security boundary.
 *
 * better-auth issues `better-auth.session_token` in dev and the
 * `__Secure-` prefixed variant over HTTPS in production; both are accepted here
 * so a logged-in admin is never bounced. The authoritative check (session
 * validation + role) lives in `src/app/admin/layout.tsx` for pages and in
 * `requireAdmin()` for every `/api/admin/*` route.
 */

const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasSessionCookie = SESSION_COOKIES.some((name) => req.cookies.get(name)?.value);
  if (!hasSessionCookie) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};