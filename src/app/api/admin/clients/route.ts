import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const CLIENT_FIELDS = ["userId", "name", "email", "phone", "company", "address", "gst", "notes"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(clients).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown>;
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  }
  const data = pickAllowedFields(body, CLIENT_FIELDS);
  await db.insert(clients).values({ id: crypto.randomUUID(), name: body.name.trim(), ...data } as any);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as { id?: string } & Record<string, unknown>;
  if (!body.id) {
    return NextResponse.json({ error: "Client id is required" }, { status: 400 });
  }
  const update = pickAllowedFields(body, CLIENT_FIELDS);
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }
  await db.update(clients).set(update as any).where(eq(clients.id, body.id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Client id is required" }, { status: 400 });
  }
  await db.delete(clients).where(eq(clients.id, id));
  return NextResponse.json({ success: true });
}
