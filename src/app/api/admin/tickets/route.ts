import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { tickets, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";


export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select({ ticket: tickets, clientName: clients.name }).from(tickets).leftJoin(clients, eq(tickets.clientId, clients.id)).all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  await db.insert(tickets).values({
    id: crypto.randomUUID(),
    title: String(body.title ?? ""),
    description: (body.description as string) || null,
    priority: (body.priority as any) ?? "medium",
    clientId: (body.clientId as string) || null,
    assignedTo: (body.assignedTo as string) || null,
    status: "open",
  } as any);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;
  await db.update(tickets).set(rest as any).where(eq(tickets.id, id));
  return NextResponse.json({ success: true });
}
