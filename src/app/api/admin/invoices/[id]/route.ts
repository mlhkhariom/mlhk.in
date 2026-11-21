import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { invoices, invoiceItems, clients, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

const VALID_STATUSES = new Set(["draft", "sent", "paid", "overdue", "cancelled"]);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const [row] = await db
      .select({
        invoice: invoices,
        client: clients,
        project: projects,
      })
      .from(invoices)
      .leftJoin(clients, eq(invoices.clientId, clients.id))
      .leftJoin(projects, eq(invoices.projectId, projects.id))
      .where(eq(invoices.id, id))
      .limit(1);

    if (!row) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const items = await db
      .select()
      .from(invoiceItems)
      .where(eq(invoiceItems.invoiceId, id))
      .all();

    return NextResponse.json({ ...row, items });
  } catch (err) {
    console.error("[ADMIN_INVOICE_DETAIL_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load invoice details" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as { status?: string; notes?: string; dueDate?: string };

    const update: Record<string, unknown> = {};
    if (body.status !== undefined) {
      if (!VALID_STATUSES.has(body.status)) {
        return NextResponse.json({ error: "Invalid invoice status" }, { status: 400 });
      }
      update.status = body.status;
      update.paidAt = body.status === "paid" ? new Date().toISOString() : null;
    }
    if (typeof body.notes === "string") update.notes = body.notes.trim() || null;
    if (typeof body.dueDate === "string") update.dueDate = body.dueDate.trim() || null;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await db.update(invoices).set(update as any).where(eq(invoices.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_INVOICE_DETAIL_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    await db.delete(invoices).where(eq(invoices.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_INVOICE_DETAIL_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
