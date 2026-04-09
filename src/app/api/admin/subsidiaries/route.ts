import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(subsidiaries).all());
}

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { name: string; slug: string; tagline?: string; description?: string; sector?: string; url?: string };
  await db.insert(subsidiaries).values({ id: crypto.randomUUID(), ...body });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id: string } & Record<string, unknown>;
  const { id, ...rest } = body;
  await db.update(subsidiaries).set(rest as any).where(eq(subsidiaries.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(subsidiaries).where(eq(subsidiaries.id, id));
  return NextResponse.json({ success: true });
}
