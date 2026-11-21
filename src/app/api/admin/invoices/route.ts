import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { invoices, invoiceItems, clients, projects } from "@/lib/db/schema";
import { eq, count, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { calculateInvoiceTotals, validateInvoiceItems } from "@/lib/erp-utils";

const VALID_STATUSES = new Set(["draft", "sent", "paid", "overdue", "cancelled"]);
const ALLOWED_INVOICE_FIELDS = new Set([
  "status",
  "dueDate",
  "notes",
  "paidAt",
  "subtotal",
  "gstPercent",
  "total",
  "clientId",
  "projectId",
]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const rows = await db
      .select({
        invoice: invoices,
        clientName: clients.name,
        clientCompany: clients.company,
        clientGst: clients.gst,
        projectTitle: projects.title,
      })
      .from(invoices)
      .leftJoin(clients, eq(invoices.clientId, clients.id))
      .leftJoin(projects, eq(invoices.projectId, projects.id))
      .orderBy(sql`${invoices.createdAt} desc`)
      .all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[ADMIN_INVOICES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load invoices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as {
      clientId?: string;
      projectId?: string;
      items?: unknown;
      gstPercent?: number;
      dueDate?: string;
      notes?: string;
      status?: string;
    };

    const validated = validateInvoiceItems(body.items);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const totals = calculateInvoiceTotals(validated.items, Number(body.gstPercent ?? 18));
    const id = crypto.randomUUID();
    const year = new Date().getFullYear();
    const initialStatus =
      typeof body.status === "string" && VALID_STATUSES.has(body.status) ? body.status : "draft";

    const [{ n }] = await db.select({ n: count() }).from(invoices);
    let num = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      num =
        attempt === 0
          ? `MLHK-${year}-${String(n + 1).padStart(4, "0")}`
          : `MLHK-${year}-${String(n + 1).padStart(4, "0")}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
      try {
        await db.insert(invoices).values({
          id,
          invoiceNumber: num,
          clientId: body.clientId && body.clientId.trim() ? body.clientId.trim() : null,
          projectId: body.projectId && body.projectId.trim() ? body.projectId.trim() : null,
          subtotal: totals.subtotal,
          gstPercent: totals.gstPercent,
          total: totals.total,
          dueDate: body.dueDate && body.dueDate.trim() ? body.dueDate.trim() : null,
          notes: body.notes && body.notes.trim() ? body.notes.trim() : null,
          status: initialStatus as "draft" | "sent" | "paid" | "overdue" | "cancelled",
          paidAt: initialStatus === "paid" ? new Date().toISOString() : null,
        });
        break;
      } catch (err) {
        if (attempt === 4) throw err;
      }
    }

    for (const item of validated.items) {
      await db.insert(invoiceItems).values({
        id: crypto.randomUUID(),
        invoiceId: id,
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate,
      });
    }

    return NextResponse.json({ success: true, id, invoiceNumber: num, total: totals.total });
  } catch (err) {
    console.error("[ADMIN_INVOICES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const { id, ...rest } = (await req.json()) as { id?: string } & Record<string, unknown>;
    if (!id) {
      return NextResponse.json({ error: "Invoice id is required" }, { status: 400 });
    }

    const update: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rest)) {
      if (!ALLOWED_INVOICE_FIELDS.has(k)) continue;
      if (k === "status") {
        if (typeof v !== "string" || !VALID_STATUSES.has(v)) {
          return NextResponse.json({ error: "Invalid invoice status" }, { status: 400 });
        }
        update.status = v;
      } else {
        update[k] = v;
      }
    }

    if (update.status === "paid") {
      update.paidAt = new Date().toISOString();
    } else if (update.status && update.status !== "paid") {
      update.paidAt = null;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await db.update(invoices).set(update as any).where(eq(invoices.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_INVOICES_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: "Invoice id is required" }, { status: 400 });
    }
    await db.delete(invoices).where(eq(invoices.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_INVOICES_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
