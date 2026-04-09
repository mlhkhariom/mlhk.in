import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROLES = ["super_admin", "admin", "manager", "employee"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("better-auth.session_token")?.value;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect portal routes
  if (pathname.startsWith("/portal")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
