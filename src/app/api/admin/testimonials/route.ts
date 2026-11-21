import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";
import { pickAllowedFields } from "@/lib/seo-utils";

const ALLOWED_PATCH_FIELDS = ["name", "company", "message", "rating", "active"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(testimonials).all());
  } catch (err) {
    console.error("[ADMIN_TESTIMONIALS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
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
      name?: string;
      company?: string;
      message?: string;
      rating?: number;
      active?: unknown;
    };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!name || !message) {
      return NextResponse.json({ error: "Client name and testimonial message are required" }, { status: 400 });
    }
    const ratingRaw = Number(body.rating ?? 5);
    const rating = Number.isFinite(ratingRaw) ? Math.max(1, Math.min(5, Math.round(ratingRaw))) : 5;
    const id = crypto.randomUUID();
    await db.insert(testimonials).values({
      id,
      name,
      company: body.company?.trim() || null,
      message,
      rating,
      active: toBool(body.active, true),
    });
    revalidatePath("/");
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_TESTIMONIALS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
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
    if ("rating" in updates) {
      const r = Number(updates.rating);
      updates.rating = Number.isFinite(r) ? Math.max(1, Math.min(5, Math.round(r))) : 5;
    }
    await db.update(testimonials).set(updates as any).where(eq(testimonials.id, body.id));
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TESTIMONIALS_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
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
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_TESTIMONIALS_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
