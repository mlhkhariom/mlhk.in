import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { followUps } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";


export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(followUps).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { leadId?: string; clientId?: string; note: string; dueDate?: string };
  if (!body.note?.trim()) {
    return NextResponse.json({ error: "Note is required" }, { status: 400 });
  }
  await db.insert(followUps).values({
    id: crypto.randomUUID(),
    // Empty strings would violate the FK — store NULL when no lead/client is attached.
    leadId: body.leadId || null,
    clientId: body.clientId || null,
    note: body.note,
    dueDate: body.dueDate || null,
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
  if ("done" in rest) rest.done = Boolean(rest.done);
  await db.update(followUps).set(rest as any).where(eq(followUps.id, id));
  return NextResponse.json({ success: true });
}
