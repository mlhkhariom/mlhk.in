import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { projects, clients, tasks } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const PROJECT_FIELDS = ["clientId", "title", "description", "status", "startDate", "endDate", "budget"] as const;
const VALID_STATUS = new Set(["planning", "active", "on_hold", "completed", "cancelled"]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const [rows, allTasks] = await Promise.all([
      db
        .select({ project: projects, clientName: clients.name, clientCompany: clients.company })
        .from(projects)
        .leftJoin(clients, eq(projects.clientId, clients.id))
        .orderBy(sql`${projects.createdAt} desc`)
        .all(),
      db.select({ projectId: tasks.projectId, status: tasks.status }).from(tasks).all(),
    ]);

    const statsMap = new Map<string, { total: number; done: number }>();
    for (const t of allTasks) {
      const curr = statsMap.get(t.projectId) ?? { total: 0, done: 0 };
      curr.total += 1;
      if (t.status === "done") curr.done += 1;
      statsMap.set(t.projectId, curr);
    }

    return NextResponse.json(
      rows.map((r) => {
        const s = statsMap.get(r.project.id) ?? { total: 0, done: 0 };
        return { ...r, taskCount: s.total, completedTaskCount: s.done };
      }),
    );
  } catch (err) {
    console.error("[ADMIN_PROJECTS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
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
    if (!title) {
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    const status =
      typeof body.status === "string" && VALID_STATUS.has(body.status) ? body.status : "planning";
    const budget =
      body.budget == null || body.budget === "" || Number.isNaN(Number(body.budget))
        ? null
        : Math.max(0, Math.round(Number(body.budget)));

    const id = crypto.randomUUID();
    await db.insert(projects).values({
      id,
      title,
      status: status as "planning" | "active" | "on_hold" | "completed" | "cancelled",
      description: typeof body.description === "string" && body.description.trim() ? body.description.trim() : null,
      clientId: typeof body.clientId === "string" && body.clientId.trim() ? body.clientId.trim() : null,
      startDate: typeof body.startDate === "string" && body.startDate.trim() ? body.startDate.trim() : null,
      endDate: typeof body.endDate === "string" && body.endDate.trim() ? body.endDate.trim() : null,
      budget,
    });
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_PROJECTS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project id is required" }, { status: 400 });
    }
    const update = pickAllowedFields(body, PROJECT_FIELDS);
    if ("status" in update && !VALID_STATUS.has(String(update.status))) {
      return NextResponse.json({ error: "Invalid project status" }, { status: 400 });
    }
    if ("budget" in update) {
      update.budget =
        update.budget == null || update.budget === "" || Number.isNaN(Number(update.budget))
          ? null
          : Math.max(0, Math.round(Number(update.budget)));
    }
    if ("clientId" in update) {
      update.clientId = typeof update.clientId === "string" && update.clientId.trim() ? update.clientId.trim() : null;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    await db.update(projects).set(update as any).where(eq(projects.id, body.id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PROJECTS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project id is required" }, { status: 400 });
    }
    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PROJECTS_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
