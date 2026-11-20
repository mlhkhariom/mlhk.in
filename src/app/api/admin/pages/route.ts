import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeHtml } from "@/lib/sanitize";
import { pickAllowedFields } from "@/lib/seo-utils";
import { pingIndexNowUrls } from "@/app/api/indexnow/route";

const ALLOWED_PATCH_FIELDS = ["slug", "title", "content", "metaTitle", "metaDesc", "status"] as const;

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(pages).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = (await req.json()) as {
    slug: string;
    title: string;
    content?: string;
    metaTitle?: string;
    metaDesc?: string;
    status?: string;
  };
  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  const status: "draft" | "published" = body.status === "published" ? "published" : "draft";
  try {
    await db.insert(pages).values({
      id: crypto.randomUUID(),
      slug: body.slug,
      title: body.title,
      content: sanitizeHtml(body.content),
      metaTitle: body.metaTitle ?? null,
      metaDesc: body.metaDesc ?? null,
      status,
    });
  } catch {
    return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 });
  }

  revalidatePath(`/p/${body.slug}`);
  revalidatePath("/sitemap.xml");
  if (status === "published") {
    void pingIndexNowUrls([`https://mlhk.in/p/${body.slug}`]);
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
  if ("content" in updates) updates.content = sanitizeHtml(updates.content as string);
  updates.updatedAt = new Date().toISOString();
  await db.update(pages).set(updates as any).where(eq(pages.id, body.id));

  if (typeof updates.slug === "string" && updates.slug) {
    revalidatePath(`/p/${updates.slug}`);
    if (updates.status === "published") {
      void pingIndexNowUrls([`https://mlhk.in/p/${updates.slug}`]);
    }
  }
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
  await db.delete(pages).where(eq(pages.id, id));
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}
