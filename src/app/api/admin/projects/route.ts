import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { projects, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select({ project: projects, clientName: clients.name }).from(projects).leftJoin(clients, eq(projects.clientId, clients.id)).all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  await db.insert(projects).values({
    id: crypto.randomUUID(),
    title: String(body.title ?? ""),
    status: (body.status as any) ?? "planning",
    description: (body.description as string) || null,
    clientId: (body.clientId as string) || null,
    startDate: (body.startDate as string) || null,
    endDate: (body.endDate as string) || null,
    budget: body.budget == null || body.budget === "" ? null : Number(body.budget),
  });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;
  await db.update(projects).set(rest as any).where(eq(projects.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  await db.delete(projects).where(eq(projects.id, id));
  return NextResponse.json({ success: true });
}
