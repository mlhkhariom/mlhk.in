import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, string>;
  const update: Record<string, string | null> = { ...body };
  if ("content" in update) update.content = sanitizeHtml(update.content);
  if (body.status === "published" && !body.publishedAt) update.publishedAt = new Date().toISOString();
  await db.update(blogPosts).set(update as any).where(eq(blogPosts.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return NextResponse.json({ success: true });
}
