import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { followUps } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const FOLLOWUP_FIELDS = ["leadId", "clientId", "note", "dueDate", "done"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(followUps).orderBy(sql`created_at desc`).all());
  } catch (err) {
    console.error("[ADMIN_FOLLOWUPS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load follow-ups" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as { leadId?: string; clientId?: string; note?: string; dueDate?: string };
    if (!body.note?.trim()) {
      return NextResponse.json({ error: "Note is required" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await db.insert(followUps).values({
      id,
      leadId: body.leadId?.trim() || null,
      clientId: body.clientId?.trim() || null,
      note: body.note.trim().slice(0, 1000),
      dueDate: body.dueDate?.trim() || null,
    });
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_FOLLOWUPS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to save follow-up" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as { id?: string } & Record<string, unknown>;
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
  } catch (err) {
    console.error("[ADMIN_FOLLOWUPS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update follow-up" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: "Follow-up id is required" }, { status: 400 });
    }
    await db.delete(followUps).where(eq(followUps.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_FOLLOWUPS_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete follow-up" }, { status: 500 });
  }
}
