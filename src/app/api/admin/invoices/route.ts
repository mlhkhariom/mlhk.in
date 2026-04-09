import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { invoices, invoiceItems, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select({ invoice: invoices, clientName: clients.name }).from(invoices).leftJoin(clients, eq(invoices.clientId, clients.id)).all();
  return NextResponse.json(rows);
}
export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { clientId?: string; projectId?: string; items: { description: string; quantity: number; rate: number }[]; gstPercent?: number; dueDate?: string; notes?: string };
  const subtotal = body.items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const gst = body.gstPercent ?? 18;
  const total = Math.round(subtotal * (1 + gst / 100));
  const num = `INV-${Date.now().toString().slice(-6)}`;
  const id = crypto.randomUUID();
  await db.insert(invoices).values({ id, invoiceNumber: num, clientId: body.clientId, projectId: body.projectId, subtotal, gstPercent: gst, total, dueDate: body.dueDate, notes: body.notes, status: "draft" });
  for (const item of body.items) {
    await db.insert(invoiceItems).values({ id: crypto.randomUUID(), invoiceId: id, description: item.description, quantity: item.quantity, rate: item.rate, amount: item.quantity * item.rate });
  }
  return NextResponse.json({ success: true, id, invoiceNumber: num });
}
export async function PATCH(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;
  if (rest.status === "paid") rest.paidAt = new Date().toISOString();
  await db.update(invoices).set(rest as any).where(eq(invoices.id, id));
  return NextResponse.json({ success: true });
}
