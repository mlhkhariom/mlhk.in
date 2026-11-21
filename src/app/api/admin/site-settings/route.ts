import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, getSession } from "@/lib/auth/session";
import { isSafeAdminUrl } from "@/lib/erp-utils";

const PROTECTED_KEYS = new Set(["google_analytics", "search_console_verification"]);
const URL_KEYS = new Set([
  "site_logo",
  "favicon",
  "og_image",
  "contact_map",
  "social_facebook",
  "social_instagram",
  "social_twitter",
  "social_linkedin",
  "social_youtube",
]);
const VALID_KEY_RE = /^[a-z0-9_]{1,64}$/i;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const rows = await db.select().from(siteSettings).all();
    const result: Record<string, string> = {};
    rows.forEach((r) => {
      result[r.key] = r.value ?? "";
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[ADMIN_SITE_SETTINGS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load site settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin"]);
  if (denied) return denied;

  try {
    const session = await getSession(req);
    const isSuperAdmin = session?.user.role === "super_admin";

    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as Record<string, unknown>;

    for (const [key, rawVal] of Object.entries(body)) {
      if (!VALID_KEY_RE.test(key)) continue;
      if (PROTECTED_KEYS.has(key) && !isSuperAdmin) continue;
      const value = String(rawVal ?? "").trim();
      if (URL_KEYS.has(key) && value && !isSafeAdminUrl(value)) {
        return NextResponse.json({ error: `Unsafe URL rejected for setting "${key}".` }, { status: 400 });
      }
      await db
        .insert(siteSettings)
        .values({ key, value, group: "general" })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value } });
    }
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_SITE_SETTINGS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to save site settings" }, { status: 500 });
  }
}
