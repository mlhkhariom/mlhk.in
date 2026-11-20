import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { toBool } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";
import { pickAllowedFields } from "@/lib/seo-utils";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

const ALLOWED_PATCH_FIELDS = ["name", "slug", "tagline", "description", "sector", "url", "logo", "active"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(subsidiaries).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as {
    name: string;
    slug: string;
    tagline?: string;
    description?: string;
    sector?: string;
    url?: string;
    logo?: string;
    active?: unknown;
  };
  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }
  const active = toBool(body.active, true);
  await db.insert(subsidiaries).values({
    id: crypto.randomUUID(),
    name: body.name,
    slug: body.slug,
    tagline: body.tagline ?? null,
    description: body.description ? sanitizeHtml(body.description) : null,
    sector: body.sector ?? null,
    url: body.url ?? null,
    logo: body.logo ?? null,
    active,
  });

  revalidatePath("/subsidiaries");
  revalidatePath(`/subsidiaries/${body.slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (active) {
    void pingIndexNowUrls([`https://mlhk.in/subsidiaries`, `https://mlhk.in/subsidiaries/${body.slug}`]);
  }
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
  if (typeof updates.description === "string") {
    updates.description = sanitizeHtml(updates.description);
  }

  await db.update(subsidiaries).set(updates as any).where(eq(subsidiaries.id, body.id));

  revalidatePath("/subsidiaries");
  if (typeof updates.slug === "string" && updates.slug) {
    revalidatePath(`/subsidiaries/${updates.slug}`);
    void pingIndexNowUrls([`https://mlhk.in/subsidiaries`, `https://mlhk.in/subsidiaries/${updates.slug}`]);
  }
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req, ["super_admin", "admin", "manager"]);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = (await req.json()) as { id: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await db.delete(subsidiaries).where(eq(subsidiaries.id, id));
  revalidatePath("/subsidiaries");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}
