import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { tickets, clients, ticketMessages } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const TICKET_FIELDS = ["clientId", "title", "description", "status", "priority", "assignedTo"] as const;
const VALID_STATUS = new Set(["open", "in_progress", "resolved", "closed"]);
const VALID_PRIORITY = new Set(["low", "medium", "high", "urgent"]);

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const [rows, msgCounts] = await Promise.all([
      db
        .select({
          ticket: tickets,
          clientName: clients.name,
          clientCompany: clients.company,
        })
        .from(tickets)
        .leftJoin(clients, eq(tickets.clientId, clients.id))
        .orderBy(sql`${tickets.createdAt} desc`)
        .all(),
      db
        .select({
          ticketId: ticketMessages.ticketId,
          count: sql<number>`count(*)`,
        })
        .from(ticketMessages)
        .groupBy(ticketMessages.ticketId)
        .all(),
    ]);

    const countMap = new Map(msgCounts.map((m) => [m.ticketId, Number(m.count)]));
    return NextResponse.json(
      rows.map((r) => ({
        ...r,
        messageCount: countMap.get(r.ticket.id) ?? 0,
      })),
    );
  } catch (err) {
    console.error("[ADMIN_TICKETS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load tickets" }, { status: 500 });
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
      return NextResponse.json({ error: "Ticket subject is required" }, { status: 400 });
    }
    const priority =
      typeof body.priority === "string" && VALID_PRIORITY.has(body.priority)
        ? body.priority
        : "medium";
    const id = crypto.randomUUID();

    await db.insert(tickets).values({
      id,
      title,
      description: typeof body.description === "string" && body.description.trim() ? body.description.trim() : null,
      priority: priority as "low" | "medium" | "high" | "urgent",
      clientId: typeof body.clientId === "string" && body.clientId.trim() ? body.clientId.trim() : null,
      assignedTo: typeof body.assignedTo === "string" && body.assignedTo.trim() ? body.assignedTo.trim() : null,
      status: "open",
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_TICKETS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
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
      return NextResponse.json({ error: "Ticket id is required" }, { status: 400 });
    }
    const update = pickAllowedFields(body, TICKET_FIELDS);
    if ("status" in update && !VALID_STATUS.has(String(update.status))) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    if ("priority" in update && !VALID_PRIORITY.has(String(update.priority))) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }
    if ("clientId" in update) {
      update.clientId = typeof update.clientId === "string" && update.clientId.trim() ? update.clientId.trim() : null;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    await db.update(tickets).set(update as any).where(eq(tickets.id, body.id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TICKETS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
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
      return NextResponse.json({ error: "Ticket id is required" }, { status: 400 });
    }
    await db.delete(tickets).where(eq(tickets.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TICKETS_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
