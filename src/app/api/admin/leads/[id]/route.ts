import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { status: string };
  await db.update(leads).set({ status: body.status as any, updatedAt: new Date().toISOString() }).where(eq(leads.id, id));
  return NextResponse.json({ success: true });
}
