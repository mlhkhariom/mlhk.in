import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { menus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(menus).all());
}

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { location: string; items: unknown[] };
  const existing = await db.select().from(menus).where(eq(menus.location, body.location)).limit(1);
  if (existing.length > 0) {
    await db.update(menus).set({ items: JSON.stringify(body.items), updatedAt: new Date().toISOString() }).where(eq(menus.location, body.location));
  } else {
    await db.insert(menus).values({ id: crypto.randomUUID(), location: body.location, items: JSON.stringify(body.items) });
  }
  return NextResponse.json({ success: true });
}
