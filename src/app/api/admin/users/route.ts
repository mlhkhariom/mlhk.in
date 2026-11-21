import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq, gt, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getSession, requireAdmin } from "@/lib/auth/session";
import { validateRoleChange, type AdminRole } from "@/lib/erp-utils";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin"]);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const session = await getSession(req);

    const [allUsers, activeSessions] = await Promise.all([
      db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          emailVerified: users.emailVerified,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(sql`${users.createdAt} asc`)
        .all(),
      db
        .select({ userId: sessions.userId, count: sql<number>`count(*)` })
        .from(sessions)
        .where(gt(sessions.expiresAt, new Date()))
        .groupBy(sessions.userId)
        .all(),
    ]);

    const sessMap = new Map(activeSessions.map((s) => [s.userId, Number(s.count)]));

    return NextResponse.json({
      currentUserId: session?.user.id ?? null,
      currentUserRole: session?.user.role ?? null,
      users: allUsers.map((u) => ({
        ...u,
        activeSessions: sessMap.get(u.id) ?? 0,
      })),
    });
  } catch (err) {
    console.error("[ADMIN_USERS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load team accounts" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin"]);
  if (denied) return denied;

  try {
    const session = await getSession(req);
    if (!session?.user.id || !session.user.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const body = (await req.json()) as { id?: string; role?: AdminRole };
    if (!body.id || !body.role) {
      return NextResponse.json({ error: "User id and role are required" }, { status: 400 });
    }

    const allUsers = await db.select({ id: users.id, role: users.role }).from(users).all();
    const target = allUsers.find((u) => u.id === body.id);
    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const superAdminCount = allUsers.filter((u) => u.role === "super_admin").length;
    const guard = validateRoleChange({
      actorId: session.user.id,
      actorRole: session.user.role as AdminRole,
      targetId: target.id,
      targetCurrentRole: (target.role ?? "client") as AdminRole,
      nextRole: body.role,
      superAdminCount,
    });

    if (!guard.ok) {
      return NextResponse.json({ error: guard.error }, { status: 403 });
    }

    await db.update(users).set({ role: body.role }).where(eq(users.id, body.id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_USERS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
