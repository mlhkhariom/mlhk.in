import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { tickets, ticketMessages, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select({ ticket: tickets, clientName: clients.name }).from(tickets).leftJoin(clients, eq(tickets.clientId, clients.id)).all();
  return NextResponse.json(rows);
}
export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  await db.insert(tickets).values({ id: crypto.randomUUID(), ...body, status: "open" } as any);
  return NextResponse.json({ success: true });
}
export async function PATCH(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, ...rest } = await req.json() as { id: string } & Record<string, unknown>;
  await db.update(tickets).set(rest as any).where(eq(tickets.id, id));
  return NextResponse.json({ success: true });
}
