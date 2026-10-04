import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { invoices, invoiceItems, clients } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select({ invoice: invoices, clientName: clients.name }).from(invoices).leftJoin(clients, eq(invoices.clientId, clients.id)).all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { clientId?: string; projectId?: string; items: { description: string; quantity: number; rate: number }[]; gstPercent?: number; dueDate?: string; notes?: string };

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "At least one line item is required" }, { status: 400 });
  }

  const subtotal = body.items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const gst = body.gstPercent ?? 18;
  const total = Math.round(subtotal * (1 + gst / 100));
  const id = crypto.randomUUID();
  const year = new Date().getFullYear();

  // Sequential numbering (INV-YYYY-0001). Retry on the rare race with a random suffix
  // so a unique-constraint violation can never surface as a bare 500.
  const [{ n }] = await db.select({ n: count() }).from(invoices);
  let num = "";
  for (let attempt = 0; attempt < 5; attempt++) {
    num = attempt === 0
      ? `INV-${year}-${String(n + 1).padStart(4, "0")}`
      : `INV-${year}-${String(n + 1).padStart(4, "0")}-${Math.random().toString(36).slice(2, 6)}`;
    try {
      await db.insert(invoices).values({
        id,
        invoiceNumber: num,
        clientId: (body.clientId as string) || null,
        projectId: (body.projectId as string) || null,
        subtotal,
        gstPercent: gst,
        total,
        dueDate: (body.dueDate as string) || null,
        notes: (body.notes as string) || null,
        status: "draft",
      });
      break;
    } catch (err) {
      if (attempt === 4) throw err;
    }
  }

  for (const item of body.items) {
    await db.insert(invoiceItems).values({ id: crypto.randomUUID(), invoiceId: id, description: item.description, quantity: item.quantity, rate: item.rate, amount: item.quantity * item.rate });
  }
  return NextResponse.json({ success: true, id, invoiceNumber: num });
}

const ALLOWED_INVOICE_FIELDS = new Set(["status", "dueDate", "notes", "paidAt", "subtotal", "gstPercent", "total", "clientId", "projectId"]);

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;

  const update: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) if (ALLOWED_INVOICE_FIELDS.has(k)) update[k] = v;
  if (update.status === "paid") update.paidAt = new Date().toISOString();

  await db.update(invoices).set(update as any).where(eq(invoices.id, id));
  return NextResponse.json({ success: true });
}
