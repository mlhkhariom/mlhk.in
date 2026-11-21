import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { expenses, projects } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getSession, requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const EXPENSE_FIELDS = ["title", "amount", "category", "projectId", "date"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const rows = await db
      .select({
        id: expenses.id,
        title: expenses.title,
        amount: expenses.amount,
        category: expenses.category,
        projectId: expenses.projectId,
        projectTitle: projects.title,
        date: expenses.date,
        createdAt: expenses.createdAt,
      })
      .from(expenses)
      .leftJoin(projects, eq(expenses.projectId, projects.id))
      .orderBy(sql`${expenses.date} desc, ${expenses.createdAt} desc`)
      .all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[ADMIN_EXPENSES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load expenses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const session = await getSession(req);
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as Record<string, unknown>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const amount = Number(body.amount);
    if (!title || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Expense title and a positive numeric amount are required" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await db.insert(expenses).values({
      id,
      title,
      amount: Math.round(amount),
      category: typeof body.category === "string" && body.category.trim() ? body.category.trim() : "Other",
      projectId: typeof body.projectId === "string" && body.projectId.trim() ? body.projectId.trim() : null,
      date:
        typeof body.date === "string" && body.date.trim()
          ? body.date.trim()
          : new Date().toISOString().slice(0, 10),
      createdBy: session?.user.id ?? null,
    });
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_EXPENSES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to log expense" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as { id?: string } & Record<string, unknown>;
    if (!body.id) {
      return NextResponse.json({ error: "Expense id is required" }, { status: 400 });
    }
    const update = pickAllowedFields(body, EXPENSE_FIELDS);
    if ("amount" in update) {
      const amount = Number(update.amount);
      if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 });
      }
      update.amount = Math.round(amount);
    }
    if ("projectId" in update) {
      update.projectId = typeof update.projectId === "string" && update.projectId.trim() ? update.projectId.trim() : null;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    await db.update(expenses).set(update as any).where(eq(expenses.id, body.id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_EXPENSES_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 });
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
      return NextResponse.json({ error: "Expense id is required" }, { status: 400 });
    }
    await db.delete(expenses).where(eq(expenses.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_EXPENSES_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
  }
}
