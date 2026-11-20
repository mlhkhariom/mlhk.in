import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { LEAD_SOURCES, LEAD_STATUSES, type LeadSource, type LeadStatus } from "@/lib/crm-utils";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (err) {
    console.error("[ADMIN_LEAD_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const update: {
    status?: LeadStatus;
    source?: LeadSource;
    notes?: string | null;
    company?: string | null;
    phone?: string | null;
    email?: string | null;
    updatedAt: string;
  } = { updatedAt: new Date().toISOString() };

  if (body.status !== undefined) {
    if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
      return NextResponse.json({ error: "Invalid pipeline status" }, { status: 400 });
    }
    update.status = body.status as LeadStatus;
  }

  if (body.source !== undefined) {
    if (!LEAD_SOURCES.includes(body.source as LeadSource)) {
      return NextResponse.json({ error: "Invalid lead source" }, { status: 400 });
    }
    update.source = body.source as LeadSource;
  }

  if (typeof body.notes === "string") {
    update.notes = body.notes.trim().slice(0, 4000) || null;
  }
  if (typeof body.company === "string") {
    update.company = body.company.trim().slice(0, 120) || null;
  }
  if (typeof body.phone === "string") {
    update.phone = body.phone.trim().slice(0, 32) || null;
  }
  if (typeof body.email === "string") {
    const cleanEmail = body.email.trim().toLowerCase();
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    update.email = cleanEmail || null;
  }

  if (Object.keys(update).length <= 1) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    await db.update(leads).set(update).where(eq(leads.id, id));
    return NextResponse.json({ success: true, updatedAt: update.updatedAt });
  } catch (err) {
    console.error("[ADMIN_LEAD_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    await db.delete(leads).where(eq(leads.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_LEAD_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
