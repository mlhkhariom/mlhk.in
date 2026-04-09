import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as { title: string; slug: string; excerpt?: string; content?: string; status?: string };
  await db.insert(blogPosts).values({
    id: crypto.randomUUID(),
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? null,
    content: body.content ?? null,
    status: (body.status as "draft" | "published") ?? "draft",
    publishedAt: body.status === "published" ? new Date().toISOString() : null,
  });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const posts = await db.select().from(blogPosts).all();
  return NextResponse.json(posts);
}
