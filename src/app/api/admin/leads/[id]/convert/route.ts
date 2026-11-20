import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

/**
 * Converts an existing CRM lead into a Client record and marks the lead as `won`.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return NextResponse.json({ error: "Database binding unavailable" }, { status: 503 });
    }
    const db = getDb(env.DB);
    const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const clientId = crypto.randomUUID();
    const now = new Date().toISOString();

    await db.insert(clients).values({
      id: clientId,
      name: lead.name,
      email: lead.email ?? null,
      phone: lead.phone ?? null,
      company: lead.company ?? null,
      notes: lead.notes ? `Converted from Lead ${lead.id}\n${lead.notes}` : `Converted from Lead ${lead.id}`,
      createdAt: now,
    });

    await db
      .update(leads)
      .set({ status: "won", updatedAt: now })
      .where(eq(leads.id, id));

    return NextResponse.json({ success: true, clientId });
  } catch (err) {
    console.error("[ADMIN_LEAD_CONVERT_ERROR]", err);
    return NextResponse.json({ error: "Failed to convert lead to client" }, { status: 500 });
  }
}
