import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(subsidiaries).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { name: string; slug: string; tagline?: string; description?: string; sector?: string; url?: string; logo?: string; active?: unknown };
  await db.insert(subsidiaries).values({
    id: crypto.randomUUID(),
    name: body.name,
    slug: body.slug,
    tagline: body.tagline ?? null,
    description: body.description ?? null,
    sector: body.sector ?? null,
    url: body.url ?? null,
    logo: body.logo ?? null,
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
  await db.update(subsidiaries).set(rest as any).where(eq(subsidiaries.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(subsidiaries).where(eq(subsidiaries.id, id));
  return NextResponse.json({ success: true });
}
