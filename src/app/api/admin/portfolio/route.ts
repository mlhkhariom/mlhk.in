import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { pickAllowedFields } from "@/lib/seo-utils";
import { isSafeAdminUrl } from "@/lib/erp-utils";

const ALLOWED_FIELDS = ["title", "description", "image", "tags", "url", "order"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(portfolio).orderBy(asc(portfolio.order)).all());
  } catch (err) {
    console.error("[ADMIN_PORTFOLIO_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
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
    const safeFields = pickAllowedFields(body, ALLOWED_FIELDS);
    if (typeof safeFields.title !== "string" || !safeFields.title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (typeof safeFields.url === "string" && !isSafeAdminUrl(safeFields.url)) {
      return NextResponse.json({ error: "Project URL must be a safe http/https or relative path" }, { status: 400 });
    }
    if (typeof safeFields.image === "string" && !isSafeAdminUrl(safeFields.image)) {
      return NextResponse.json({ error: "Image URL must be a safe http/https or relative path" }, { status: 400 });
    }
    if ("order" in safeFields) {
      safeFields.order = Number.isFinite(Number(safeFields.order)) ? Number(safeFields.order) : 0;
    }
    const id = crypto.randomUUID();
    await db.insert(portfolio).values({ id, ...(safeFields as any), title: safeFields.title.trim() });
    revalidatePath("/portfolio");
    revalidatePath("/");
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[ADMIN_PORTFOLIO_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
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

    const updates = pickAllowedFields(body, ALLOWED_FIELDS);
    if (typeof updates.url === "string" && !isSafeAdminUrl(updates.url)) {
      return NextResponse.json({ error: "Unsafe project URL rejected" }, { status: 400 });
    }
    if (typeof updates.image === "string" && !isSafeAdminUrl(updates.image)) {
      return NextResponse.json({ error: "Unsafe image URL rejected" }, { status: 400 });
    }
    if ("order" in updates) {
      updates.order = Number.isFinite(Number(updates.order)) ? Number(updates.order) : 0;
    }
    await db.update(portfolio).set(updates as any).where(eq(portfolio.id, body.id));
    revalidatePath("/portfolio");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PORTFOLIO_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
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
    await db.delete(portfolio).where(eq(portfolio.id, id));
    revalidatePath("/portfolio");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_PORTFOLIO_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
