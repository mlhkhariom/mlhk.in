import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";
import { isTrustedAdminOrigin } from "@/lib/erp-utils";
import { NextResponse } from "next/server";

export type Role = "super_admin" | "admin" | "manager" | "employee" | "client";

/** Roles allowed into the admin panel / admin APIs. Clients only get the portal. */
export const ADMIN_ROLES: Role[] = ["super_admin", "admin", "manager", "employee"];

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: Role | null;
};

export type SessionData = { user: SessionUser; session: unknown };

function deriveOriginFromHeaders(headers: Headers): string | undefined {
  const origin = headers.get("origin");
  if (origin && /^https?:\/\//i.test(origin)) return origin;
  const host = headers.get("x-forwarded-host") || headers.get("host");
  if (!host) return undefined;
  const proto = headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Resolve the better-auth session from a Headers object, or null when unauthenticated. */
export async function getSessionFromHeaders(headers: Headers): Promise<SessionData | null> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env?.DB) return null;
  const auth = createAuth(env, deriveOriginFromHeaders(headers));
  const result = await auth.api.getSession({ headers });
  if (!result) return null;
  return result as unknown as SessionData;
}

/** Resolve the better-auth session for an incoming request, or null when unauthenticated. */
export async function getSession(req: Request): Promise<SessionData | null> {
  return getSessionFromHeaders(req.headers);
}

const MUTATION_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Guard for admin API routes.
 * Enforces:
 *  1. Origin header validation against Host / X-Forwarded-Host on state-changing mutations.
 *  2. Verified server-side Better-Auth session.
 *  3. Explicit Role-Based Access Control (RBAC).
 */
export async function requireAdmin(
  req: Request,
  roles: Role[] = ADMIN_ROLES
): Promise<NextResponse | null> {
  if (MUTATION_METHODS.has(req.method.toUpperCase())) {
    const okOrigin = isTrustedAdminOrigin(
      req.headers.get("origin"),
      req.headers.get("host"),
      req.headers.get("x-forwarded-host"),
    );
    if (!okOrigin) {
      return NextResponse.json({ error: "Cross-origin mutation blocked" }, { status: 403 });
    }
  }

  let session: SessionData | null = null;
  try {
    session = await getSession(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;
  if (!role || !roles.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
