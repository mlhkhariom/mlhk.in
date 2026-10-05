import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";


/** Public base URL for media, e.g. an R2 custom domain. Falls back to storing the bare key. */
function mediaUrl(env: CloudflareEnv, key: string): string {
  const base = env.MEDIA_PUBLIC_URL;
  return base ? `${base.replace(/\/$/, "")}/${key}` : key;
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(media).all());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const key = `media/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const buffer = await file.arrayBuffer();
  const r2 = (env as unknown as { R2?: R2Bucket }).R2;
  if (!r2) {
    return NextResponse.json(
      { error: "Media storage is not configured (R2 bucket missing)" },
      { status: 503 }
    );
  }
  await r2.put(key, buffer, { httpMetadata: { contentType: file.type } });

  const url = mediaUrl(env, key);
  const db = getDb(env.DB);
  const id = crypto.randomUUID();
  await db.insert(media).values({ id, name: file.name, url, type: file.type, size: file.size });
  return NextResponse.json({ id, name: file.name, url });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: string };
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);

  const r2 = (env as unknown as { R2?: R2Bucket }).R2;
  // Only delete from R2 when we stored a bare key (no public base configured).
  if (r2 && row && row.url.startsWith("media/")) {
    await r2.delete(row.url).catch(() => {});
  }
  await db.delete(media).where(eq(media.id, id));
  return NextResponse.json({ success: true });
}
