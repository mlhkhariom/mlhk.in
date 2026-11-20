import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { followUps } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const FOLLOWUP_FIELDS = ["leadId", "clientId", "note", "dueDate", "done"] as const;

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
  const body = await req.json() as { id?: string } & Record<string, unknown>;
  if (!body.id) {
    return NextResponse.json({ error: "Follow-up id is required" }, { status: 400 });
  }
  const update = pickAllowedFields(body, FOLLOWUP_FIELDS);
  if ("done" in update) update.done = Boolean(update.done);
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }
  await db.update(followUps).set(update as any).where(eq(followUps.id, body.id));
  return NextResponse.json({ success: true });
}
