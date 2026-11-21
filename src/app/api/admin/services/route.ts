import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";
import { pickAllowedFields } from "@/lib/seo-utils";

const ALLOWED_PATCH_FIELDS = ["title", "description", "icon", "order", "active"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(services).orderBy(asc(services.order)).all());
  } catch (err) {
    console.error("[ADMIN_SERVICES_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    const body = (await req.json()) as {
      title?: string;
      description?: string;
      icon?: string;
      order?: number;
      active?: unknown;
    };
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) return NextResponse.json({ error: "Service title is required" }, { status: 400 });

    const id = crypto.randomUUID();
    await db.insert(services).values({
      id,
      title,
      description: body.description?.trim() || null,
      icon: body.icon?.trim() || null,
      order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
      active: toBool(body.active, true),
    });
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_SERVICES_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
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
    if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updates = pickAllowedFields(body, ALLOWED_PATCH_FIELDS);
    if ("active" in updates) updates.active = toBool(updates.active, true);
    if ("order" in updates) updates.order = Number.isFinite(Number(updates.order)) ? Number(updates.order) : 0;
    await db.update(services).set(updates as any).where(eq(services.id, body.id));
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_SERVICES_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_SERVICES_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
