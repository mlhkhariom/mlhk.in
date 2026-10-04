import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { menus, siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const rows = await db.select().from(siteSettings).all();
    const result: Record<string, string> = {};
    rows.forEach(r => { result[r.key] = r.value ?? ""; });
    return result;
  } catch { return {}; }
}

export async function getMenu(location: string): Promise<{ label: string; href: string; target?: string }[]> {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const [row] = await db.select().from(menus).where(eq(menus.location, location)).limit(1);
    if (!row) return [];
    return JSON.parse(row.items);
  } catch { return []; }
}
