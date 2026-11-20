import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { expenses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const EXPENSE_FIELDS = ["title", "amount", "category", "projectId", "date"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(expenses).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  if (!body.title || body.amount == null || Number.isNaN(Number(body.amount))) {
    return NextResponse.json({ error: "title and numeric amount are required" }, { status: 400 });
  }
  const data = pickAllowedFields(body, EXPENSE_FIELDS);
  await db.insert(expenses).values({
    id: crypto.randomUUID(),
    ...data,
    title: String(body.title).trim(),
    amount: Number(body.amount),
    projectId: (body.projectId as string) || null,
  } as any);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id?: string } & Record<string, unknown>;
  if (!body.id) {
    return NextResponse.json({ error: "Expense id is required" }, { status: 400 });
  }
  const update = pickAllowedFields(body, EXPENSE_FIELDS);
  if ("amount" in update) update.amount = Number(update.amount);
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }
  await db.update(expenses).set(update as any).where(eq(expenses.id, body.id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Expense id is required" }, { status: 400 });
  }
  await db.delete(expenses).where(eq(expenses.id, id));
  return NextResponse.json({ success: true });
}
