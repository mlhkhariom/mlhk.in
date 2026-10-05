import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";


export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(testimonials).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { name: string; company?: string; message: string; rating?: number; active?: unknown };
  await db.insert(testimonials).values({
    id: crypto.randomUUID(),
    name: body.name,
    company: body.company ?? null,
    message: body.message,
    rating: body.rating ?? 5,
    active: toBool(body.active, true),
  });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id: string } & Record<string, unknown>;
  const { id, ...rest } = body;
  if ("active" in rest) rest.active = toBool(rest.active, true);
  await db.update(testimonials).set(rest as any).where(eq(testimonials.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(testimonials).where(eq(testimonials.id, id));
  return NextResponse.json({ success: true });
}
