import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { ticketMessages, tickets, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getSession, requireAdmin } from "@/lib/auth/session";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const rows = await db
      .select({
        id: ticketMessages.id,
        ticketId: ticketMessages.ticketId,
        message: ticketMessages.message,
        createdAt: ticketMessages.createdAt,
        senderName: users.name,
        senderRole: users.role,
      })
      .from(ticketMessages)
      .leftJoin(users, eq(ticketMessages.senderId, users.id))
      .where(eq(ticketMessages.ticketId, id))
      .orderBy(sql`${ticketMessages.createdAt} asc`)
      .all();

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[ADMIN_TICKET_MESSAGES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load ticket thread" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await context.params;
    const session = await getSession(req);
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);

    const [exists] = await db.select({ id: tickets.id }).from(tickets).where(eq(tickets.id, id)).limit(1);
    if (!exists) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const body = (await req.json()) as { message?: string };
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 4000) {
      return NextResponse.json({ error: "Message must be between 1 and 4,000 characters" }, { status: 400 });
    }

    const msgId = crypto.randomUUID();
    await db.insert(ticketMessages).values({
      id: msgId,
      ticketId: id,
      senderId: session?.user.id ?? null,
      message,
    });

    return NextResponse.json({
      success: true,
      entry: {
        id: msgId,
        ticketId: id,
        message,
        createdAt: new Date().toISOString(),
        senderName: session?.user.name ?? "Admin",
        senderRole: session?.user.role ?? "admin",
      },
    });
  } catch (err) {
    console.error("[ADMIN_TICKET_MESSAGES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
