import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { validateManualLeadInput } from "@/lib/crm-utils";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    }
    const db = getDb(env.DB);
    const allLeads = await db.select().from(leads).orderBy(sql`created_at desc`).all();
    return NextResponse.json(allLeads);
  } catch (err) {
    console.error("[ADMIN_LEADS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let rawBody: Record<string, unknown>;
  try {
    rawBody = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = validateManualLeadInput(rawBody);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    }
    const db = getDb(env.DB);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await db.insert(leads).values({
      id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      source: parsed.data.source,
      status: parsed.data.status,
      notes: parsed.data.notes,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      lead: {
        id,
        ...parsed.data,
        createdAt: now,
        updatedAt: now,
      },
    });
  } catch (err) {
    console.error("[ADMIN_LEADS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
