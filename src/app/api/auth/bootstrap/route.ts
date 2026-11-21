import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createAuth } from "@/lib/auth";
import { inArray, eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isTrustedAdminOrigin } from "@/lib/erp-utils";

/**
 * One-Time First-Run Super Admin Bootstrap Endpoint.
 *
 * - GET: returns `{ canBootstrap: boolean }` — true ONLY when zero super_admin/admin users exist.
 * - POST: creates (or promotes if newly created via Better-Auth) the first Super Admin account
 *   with a user-chosen password, then locks permanently the moment any admin exists.
 */
export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return NextResponse.json({ canBootstrap: false });
    }
    const db = getDb(env.DB);
    const [row] = await db
      .select({ total: count() })
      .from(users)
      .where(inArray(users.role, ["super_admin", "admin"]));
    return NextResponse.json({ canBootstrap: (row?.total ?? 0) === 0 });
  } catch (err) {
    console.error("[AUTH_BOOTSTRAP_GET_ERROR]", err);
    return NextResponse.json({ canBootstrap: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const okOrigin = isTrustedAdminOrigin(
      req.headers.get("origin"),
      req.headers.get("host"),
      req.headers.get("x-forwarded-host"),
    );
    if (!okOrigin) {
      return NextResponse.json({ error: "Cross-origin request blocked" }, { status: 403 });
    }

    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    }

    const db = getDb(env.DB);
    const [existing] = await db
      .select({ total: count() })
      .from(users)
      .where(inArray(users.role, ["super_admin", "admin"]));

    if ((existing?.total ?? 0) > 0) {
      return NextResponse.json(
        { error: "Admin bootstrap is permanently locked because an administrator already exists." },
        { status: 403 },
      );
    }

    const body = (await req.json()) as { name?: string; email?: string; password?: string };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return NextResponse.json(
        { error: "Provide a valid name, email address, and password of at least 8 characters." },
        { status: 400 },
      );
    }

    const origin = new URL(req.url).origin;
    const auth = createAuth(env, origin);

    // Create the user via Better-Auth so passwords are securely hashed with scrypt.
    const signupResult = await auth.api.signUpEmail({
      body: { name, email, password },
      asResponse: true,
    });

    if (!signupResult.ok) {
      const errBody = (await signupResult.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        { error: errBody.message || "Could not create initial admin account." },
        { status: signupResult.status || 400 },
      );
    }

    // Atomically elevate to super_admin only if still zero admins exist.
    const [recheck] = await db
      .select({ total: count() })
      .from(users)
      .where(inArray(users.role, ["super_admin", "admin"]));

    if ((recheck?.total ?? 0) > 0) {
      return NextResponse.json({ error: "Bootstrap already completed." }, { status: 403 });
    }

    await db.update(users).set({ role: "super_admin" }).where(eq(users.email, email));

    // Re-issue a fresh signed session cookie reflecting the elevated super_admin role.
    const signInResp = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    });

    const response = NextResponse.json({ success: true, email, role: "super_admin" });
    const setCookies = signInResp.headers.getSetCookie?.() ?? [];
    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }
    if (setCookies.length === 0) {
      const single = signInResp.headers.get("set-cookie");
      if (single) response.headers.append("Set-Cookie", single);
    }
    return response;
  } catch (err) {
    console.error("[AUTH_BOOTSTRAP_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to initialize admin account" }, { status: 500 });
  }
}
