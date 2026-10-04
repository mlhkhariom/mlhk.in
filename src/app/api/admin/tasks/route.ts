import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const projectId = req.nextUrl.searchParams.get("projectId");
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = projectId ? await db.select().from(tasks).where(eq(tasks.projectId, projectId)).all() : await db.select().from(tasks).all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  // project_id is NOT NULL with a FK — reject early instead of letting D1 throw.
  if (!body.projectId || !body.title) {
    return NextResponse.json({ error: "projectId and title are required" }, { status: 400 });
  }
  await db.insert(tasks).values({
    id: crypto.randomUUID(),
    projectId: String(body.projectId),
    title: String(body.title),
    status: (body.status as any) ?? "todo",
    priority: (body.priority as any) ?? "medium",
    description: (body.description as string) ?? null,
    assignedTo: (body.assignedTo as string) || null,
    dueDate: (body.dueDate as string) || null,
  });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;
  await db.update(tasks).set(rest as any).where(eq(tasks.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(tasks).where(eq(tasks.id, id));
  return NextResponse.json({ success: true });
}
