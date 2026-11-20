import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";
import { pickAllowedFields } from "@/lib/seo-utils";

const ALLOWED_PATCH_FIELDS = ["title", "description", "icon", "order", "active"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(services).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as {
    title: string;
    description?: string;
    icon?: string;
    order?: number;
    active?: unknown;
  };
  await db.insert(services).values({
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description ?? null,
    icon: body.icon ?? null,
    order: body.order ?? 0,
    active: toBool(body.active, true),
  });
  revalidatePath("/services");
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
  await db.update(services).set(updates as any).where(eq(services.id, body.id));
  revalidatePath("/services");
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
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/services");
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
