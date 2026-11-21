import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { menus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { isSafeAdminUrl } from "@/lib/erp-utils";

const ALLOWED_LOCATIONS = new Set(["header", "footer", "mobile"]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(menus).all());
  } catch (err) {
    console.error("[ADMIN_MENUS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load menus" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as {
      location?: string;
      items?: Array<{ label?: string; href?: string; target?: string }>;
    };
    if (!body.location || !ALLOWED_LOCATIONS.has(body.location) || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Valid location (header, footer, mobile) and items array are required" }, { status: 400 });
    }

    const sanitizedItems: Array<{ label: string; href: string; target: "_self" | "_blank" }> = [];
    for (const raw of body.items) {
      const label = typeof raw?.label === "string" ? raw.label.trim() : "";
      const href = typeof raw?.href === "string" ? raw.href.trim() : "";
      if (!label || !href) {
        return NextResponse.json({ error: "Every navigation item must have both a label and a URL." }, { status: 400 });
      }
      if (!isSafeAdminUrl(href)) {
        return NextResponse.json({ error: `Unsafe menu link rejected: ${href}` }, { status: 400 });
      }
      sanitizedItems.push({
        label: label.slice(0, 80),
        href: href.slice(0, 300),
        target: raw?.target === "_blank" ? "_blank" : "_self",
      });
    }

    const existing = await db.select().from(menus).where(eq(menus.location, body.location)).limit(1);
    if (existing.length > 0) {
      await db
        .update(menus)
        .set({ items: JSON.stringify(sanitizedItems), updatedAt: new Date().toISOString() })
        .where(eq(menus.location, body.location));
    } else {
      await db.insert(menus).values({
        id: crypto.randomUUID(),
        location: body.location,
        items: JSON.stringify(sanitizedItems),
      });
    }
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_MENUS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to save navigation menu" }, { status: 500 });
  }
}
