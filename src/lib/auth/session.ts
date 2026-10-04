import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";
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

/** Resolve the better-auth session from a Headers object, or null when unauthenticated. */
export async function getSessionFromHeaders(headers: Headers): Promise<SessionData | null> {
  const { env } = getCloudflareContext();
  const auth = createAuth(env);
  const result = await auth.api.getSession({ headers });
  if (!result) return null;
  return result as unknown as SessionData;
}

/** Resolve the better-auth session for an incoming request, or null when unauthenticated. */
export async function getSession(req: Request): Promise<SessionData | null> {
  return getSessionFromHeaders(req.headers);
}

/**
 * Guard for admin API routes.
 *
 * Returns a Response to short-circuit with when the caller is not
 * authenticated/authorized, or null when the request may proceed.
 *
 * Usage:
 *   const denied = await requireAdmin(req);
 *   if (denied) return denied;
 */
export async function requireAdmin(
  req: Request,
  roles: Role[] = ADMIN_ROLES
): Promise<NextResponse | null> {
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
