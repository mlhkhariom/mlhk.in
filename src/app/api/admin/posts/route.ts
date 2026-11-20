import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      coverImage?: string;
      status?: string;
    };

    const title = body.title?.trim() ?? "";
    const slug = normalizeSlug(body.slug ?? title);
    if (!title || !slug) {
      return NextResponse.json({ error: "Title and a valid URL slug are required" }, { status: 400 });
    }

    const status: "draft" | "published" = body.status === "published" ? "published" : "draft";
    const id = crypto.randomUUID();
    try {
      await db.insert(blogPosts).values({
        id,
        title,
        slug,
        excerpt: body.excerpt?.trim() || null,
        content: sanitizeHtml(body.content),
        coverImage: body.coverImage?.trim() || null,
        status,
        publishedAt: status === "published" ? new Date().toISOString() : null,
      });
    } catch {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");
    if (status === "published") {
      void pingIndexNowUrls([`https://mlhk.in/blog`, `https://mlhk.in/blog/${slug}`]);
    }
    return NextResponse.json({ success: true, id, slug });
  } catch (err) {
    console.error("[ADMIN_POSTS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const posts = await db.select().from(blogPosts).orderBy(sql`created_at desc`).all();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[ADMIN_POSTS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
