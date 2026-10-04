import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, getSession } from "@/lib/auth/session";

export const runtime = "edge";

/** Keys that a non-super-admin must not be able to change. */
const PROTECTED_KEYS = new Set(["google_analytics", "search_console_verification"]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select().from(siteSettings).all();
  const result: Record<string, string> = {};
  rows.forEach(r => { result[r.key] = r.value ?? ""; });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin"]);
  if (denied) return denied;

  const session = await getSession(req);
  // Only a super admin may write the protected keys; everyone else silently skips them.
  const isSuperAdmin = session?.user.role === "super_admin";

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    if (PROTECTED_KEYS.has(key) && !isSuperAdmin) continue;
    await db.insert(siteSettings).values({ key, value: String(value ?? ""), group: "general" })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: String(value ?? "") } });
  }
  return NextResponse.json({ success: true });
}
