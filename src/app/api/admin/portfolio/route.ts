import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";

const ALLOWED_FIELDS = ["title", "description", "image", "tags", "url", "order"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(portfolio).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as Record<string, unknown>;
  const safeFields = pickAllowedFields(body, ALLOWED_FIELDS);
  if (typeof safeFields.title !== "string" || !safeFields.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  await db.insert(portfolio).values({ id: crypto.randomUUID(), ...(safeFields as any) });
  revalidatePath("/portfolio");
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

  const updates = pickAllowedFields(body, ALLOWED_FIELDS);
  await db.update(portfolio).set(updates as any).where(eq(portfolio.id, body.id));
  revalidatePath("/portfolio");
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
  await db.delete(portfolio).where(eq(portfolio.id, id));
  revalidatePath("/portfolio");
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
