import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";
import { pickAllowedFields } from "@/lib/seo-utils";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

const ALLOWED_PATCH_FIELDS = ["title", "slug", "excerpt", "content", "coverImage", "status", "publishedAt"] as const;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    console.error("[ADMIN_POST_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load article" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as Record<string, unknown>;
    const update = pickAllowedFields(body, ALLOWED_PATCH_FIELDS);

    if (typeof update.slug === "string") {
      update.slug = update.slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }
    if (typeof update.content === "string") update.content = sanitizeHtml(update.content);
    if (typeof update.coverImage === "string") update.coverImage = update.coverImage.trim() || null;
    if (typeof update.excerpt === "string") update.excerpt = update.excerpt.trim() || null;
    if (update.status === "published" && !update.publishedAt) {
      update.publishedAt = new Date().toISOString();
    }

    await db.update(blogPosts).set(update as any).where(eq(blogPosts.id, id));

    revalidatePath("/blog");
    if (typeof update.slug === "string" && update.slug) {
      revalidatePath(`/blog/${update.slug}`);
      if (update.status === "published") {
        void pingIndexNowUrls([`https://mlhk.in/blog`, `https://mlhk.in/blog/${update.slug}`]);
      }
    }
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_POST_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_POST_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
