import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";
import { pickAllowedFields } from "@/lib/seo-utils";
import { isSafeAdminUrl } from "@/lib/erp-utils";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

const ALLOWED_PATCH_FIELDS = ["name", "slug", "tagline", "description", "sector", "url", "logo", "active"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(subsidiaries).all());
  } catch (err) {
    console.error("[ADMIN_SUBSIDIARIES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load subsidiaries" }, { status: 500 });
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
      name?: string;
      slug?: string;
      tagline?: string;
      description?: string;
      sector?: string;
      url?: string;
      logo?: string;
      active?: unknown;
    };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const slug = (typeof body.slug === "string" ? body.slug : name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }
    if (body.url && !isSafeAdminUrl(body.url)) {
      return NextResponse.json({ error: "Website URL must use http/https" }, { status: 400 });
    }
    if (body.logo && !isSafeAdminUrl(body.logo)) {
      return NextResponse.json({ error: "Logo URL must be a safe URL" }, { status: 400 });
    }
    const active = toBool(body.active, true);
    const id = crypto.randomUUID();
    try {
      await db.insert(subsidiaries).values({
        id,
        name,
        slug,
        tagline: body.tagline?.trim() || null,
        description: body.description ? sanitizeHtml(body.description) : null,
        sector: body.sector?.trim() || null,
        url: body.url?.trim() || null,
        logo: body.logo?.trim() || null,
        active,
      });
    } catch {
      return NextResponse.json({ error: "A subsidiary with this slug already exists" }, { status: 409 });
    }

    revalidatePath("/subsidiaries");
    revalidatePath(`/subsidiaries/${slug}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    if (active) {
      void pingIndexNowUrls([`https://mlhk.in/subsidiaries`, `https://mlhk.in/subsidiaries/${slug}`]);
    }
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_SUBSIDIARIES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create subsidiary" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as { id?: string } & Record<string, unknown>;
    if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updates = pickAllowedFields(body, ALLOWED_PATCH_FIELDS);
    if ("active" in updates) updates.active = toBool(updates.active, true);
    if (typeof updates.url === "string" && !isSafeAdminUrl(updates.url)) {
      return NextResponse.json({ error: "Unsafe URL rejected" }, { status: 400 });
    }
    if (typeof updates.logo === "string" && !isSafeAdminUrl(updates.logo)) {
      return NextResponse.json({ error: "Unsafe logo URL rejected" }, { status: 400 });
    }
    if (typeof updates.description === "string") {
      updates.description = sanitizeHtml(updates.description);
    }

    await db.update(subsidiaries).set(updates as any).where(eq(subsidiaries.id, body.id));

    revalidatePath("/subsidiaries");
    if (typeof updates.slug === "string" && updates.slug) {
      revalidatePath(`/subsidiaries/${updates.slug}`);
      void pingIndexNowUrls([`https://mlhk.in/subsidiaries`, `https://mlhk.in/subsidiaries/${updates.slug}`]);
    }
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_SUBSIDIARIES_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update subsidiary" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const { id } = (await req.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await db.delete(subsidiaries).where(eq(subsidiaries.id, id));
    revalidatePath("/subsidiaries");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_SUBSIDIARIES_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete subsidiary" }, { status: 500 });
  }
}
