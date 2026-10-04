import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(pages).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { slug: string; title: string; content?: string; metaTitle?: string; metaDesc?: string; status?: string };
  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  try {
    await db.insert(pages).values({
      id: crypto.randomUUID(),
      slug: body.slug,
      title: body.title,
      content: sanitizeHtml(body.content),
      metaTitle: body.metaTitle ?? null,
      metaDesc: body.metaDesc ?? null,
      status: (body.status as "draft" | "published") ?? "draft",
    });
  } catch {
    return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id: string } & Record<string, unknown>;
  const { id, ...rest } = body;
  if ("content" in rest) rest.content = sanitizeHtml(rest.content as string);
  rest.updatedAt = new Date().toISOString();
  await db.update(pages).set(rest as any).where(eq(pages.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(pages).where(eq(pages.id, id));
  return NextResponse.json({ success: true });
}
