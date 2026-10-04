import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { title: string; slug: string; excerpt?: string; content?: string; coverImage?: string; status?: string };

  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    await db.insert(blogPosts).values({
      id: crypto.randomUUID(),
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: sanitizeHtml(body.content),
      coverImage: body.coverImage ?? null,
      status: (body.status as "draft" | "published") ?? "draft",
      publishedAt: body.status === "published" ? new Date().toISOString() : null,
    });
  } catch {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const posts = await db.select().from(blogPosts).all();
  return NextResponse.json(posts);
}
