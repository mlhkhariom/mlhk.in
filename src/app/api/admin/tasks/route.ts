import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const TASK_FIELDS = ["projectId", "title", "description", "status", "priority", "assignedTo", "dueDate"] as const;
const VALID_STATUS = new Set(["todo", "in_progress", "review", "done"]);
const VALID_PRIORITY = new Set(["low", "medium", "high"]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const projectId = req.nextUrl.searchParams.get("projectId");
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const rows = projectId
      ? await db.select().from(tasks).where(eq(tasks.projectId, projectId)).orderBy(sql`${tasks.createdAt} asc`).all()
      : await db.select().from(tasks).orderBy(sql`${tasks.createdAt} desc`).all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[ADMIN_TASKS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as Record<string, unknown>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const projectId = typeof body.projectId === "string" ? body.projectId.trim() : "";
    if (!projectId || !title) {
      return NextResponse.json({ error: "projectId and title are required" }, { status: 400 });
    }
    const status =
      typeof body.status === "string" && VALID_STATUS.has(body.status) ? body.status : "todo";
    const priority =
      typeof body.priority === "string" && VALID_PRIORITY.has(body.priority) ? body.priority : "medium";
    const id = crypto.randomUUID();
    await db.insert(tasks).values({
      id,
      projectId,
      title,
      status: status as "todo" | "in_progress" | "review" | "done",
      priority: priority as "low" | "medium" | "high",
      description: typeof body.description === "string" && body.description.trim() ? body.description.trim() : null,
      assignedTo: typeof body.assignedTo === "string" && body.assignedTo.trim() ? body.assignedTo.trim() : null,
      dueDate: typeof body.dueDate === "string" && body.dueDate.trim() ? body.dueDate.trim() : null,
    });
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_TASKS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
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
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const update = pickAllowedFields(body, TASK_FIELDS);
    if ("status" in update && !VALID_STATUS.has(String(update.status))) {
      return NextResponse.json({ error: "Invalid task status" }, { status: 400 });
    }
    if ("priority" in update && !VALID_PRIORITY.has(String(update.priority))) {
      return NextResponse.json({ error: "Invalid task priority" }, { status: 400 });
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    await db.update(tasks).set(update as any).where(eq(tasks.id, body.id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TASKS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
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
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    await db.delete(tasks).where(eq(tasks.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TASKS_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
