import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";
import { pickAllowedFields } from "@/lib/seo-utils";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

const ALLOWED_PATCH_FIELDS = ["slug", "title", "content", "metaTitle", "metaDesc", "status"] as const;

function normalizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(pages).orderBy(sql`${pages.updatedAt} desc`).all());
  } catch (err) {
    console.error("[ADMIN_PAGES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load pages" }, { status: 500 });
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
      slug?: string;
      title?: string;
      content?: string;
      metaTitle?: string;
      metaDesc?: string;
      status?: string;
    };
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const slug = normalizeSlug(typeof body.slug === "string" && body.slug.trim() ? body.slug : title);
    if (!title || !slug) {
      return NextResponse.json({ error: "Title and valid slug are required" }, { status: 400 });
    }
    const status: "draft" | "published" = body.status === "published" ? "published" : "draft";
    const id = crypto.randomUUID();
    try {
      await db.insert(pages).values({
        id,
        slug,
        title,
        content: sanitizeHtml(body.content),
        metaTitle: body.metaTitle?.trim() || null,
        metaDesc: body.metaDesc?.trim() || null,
        status,
      });
    } catch {
      return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 });
    }

    revalidatePath(`/p/${slug}`);
    revalidatePath("/sitemap.xml");
    if (status === "published") {
      void pingIndexNowUrls([`https://mlhk.in/p/${slug}`]);
    }
    return NextResponse.json({ success: true, id, slug });
  } catch (err) {
    console.error("[ADMIN_PAGES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
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
    if (typeof updates.slug === "string") {
      const normalized = normalizeSlug(updates.slug);
      if (!normalized) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
      updates.slug = normalized;
    }
    if ("content" in updates) updates.content = sanitizeHtml(updates.content as string);
    if ("status" in updates) {
      updates.status = updates.status === "published" ? "published" : "draft";
    }
    updates.updatedAt = new Date().toISOString();
    await db.update(pages).set(updates as any).where(eq(pages.id, body.id));

    if (typeof updates.slug === "string" && updates.slug) {
      revalidatePath(`/p/${updates.slug}`);
      if (updates.status === "published") {
        void pingIndexNowUrls([`https://mlhk.in/p/${updates.slug}`]);
      }
    }
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PAGES_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
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
    await db.delete(pages).where(eq(pages.id, id));
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PAGES_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
