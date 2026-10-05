import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";


export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(services).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { title: string; description?: string; icon?: string; order?: number; active?: unknown };
  await db.insert(services).values({
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description ?? null,
    icon: body.icon ?? null,
    order: body.order ?? 0,
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
  await db.update(services).set(rest as any).where(eq(services.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(services).where(eq(services.id, id));
  return NextResponse.json({ success: true });
}
