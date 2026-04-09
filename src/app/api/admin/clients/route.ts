import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(clients).all());
}

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { name: string; email?: string; phone?: string; company?: string; address?: string; gst?: string; notes?: string };
  await db.insert(clients).values({ id: crypto.randomUUID(), ...body });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id: string } & Record<string, unknown>;
  const { id, ...rest } = body;
  await db.update(clients).set(rest as any).where(eq(clients.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(clients).where(eq(clients.id, id));
  return NextResponse.json({ success: true });
}
