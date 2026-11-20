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

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(testimonials).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as {
    name: string;
    company?: string;
    message: string;
    rating?: number;
    active?: unknown;
  };
  await db.insert(testimonials).values({
    id: crypto.randomUUID(),
    name: body.name,
    company: body.company ?? null,
    message: body.message,
    rating: body.rating ?? 5,
    active: toBool(body.active, true),
  });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as { id?: string } & Record<string, unknown>;
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const updates = pickAllowedFields(body, ALLOWED_PATCH_FIELDS);
  if ("active" in updates) updates.active = toBool(updates.active, true);
  await db.update(testimonials).set(updates as any).where(eq(testimonials.id, body.id));
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = (await req.json()) as { id: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
