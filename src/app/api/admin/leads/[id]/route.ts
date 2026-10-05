import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";


const STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { status: string };

  if (!STATUSES.includes(body.status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await db.update(leads).set({ status: body.status as any, updatedAt: new Date().toISOString() }).where(eq(leads.id, id));
  return NextResponse.json({ success: true });
}
