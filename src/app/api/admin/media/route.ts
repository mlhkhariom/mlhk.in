import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getSession, requireAdmin } from "@/lib/auth/session";

function mediaUrl(env: CloudflareEnv, key: string): string {
  const base = env.MEDIA_PUBLIC_URL;
  return base ? `${base.replace(/\/$/, "")}/${key}` : `/api/media/${key}`;
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    const db = getDb(env.DB);
    return NextResponse.json(await db.select().from(media).orderBy(sql`${media.createdAt} desc`).all());
  } catch (err) {
    console.error("[ADMIN_MEDIA_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to load media library" }, { status: 500 });
  }
}

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "application/pdf",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
]);

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const session = await getSession(req);
    const { env } = await getCloudflareContext({ async: true });
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 413 },
      );
    }

    const mime = file.type?.toLowerCase();
    if (!mime || !ALLOWED_MIME_TYPES.has(mime)) {
      return NextResponse.json(
        { error: "Unsupported file type. Only standard images, PDFs, and media are allowed." },
        { status: 415 },
      );
    }

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^\.+/, "");
    const key = `media/${Date.now()}-${safeName || "asset"}`;

    const buffer = await file.arrayBuffer();
    if (mime === "image/svg+xml" || safeName.endsWith(".svg")) {
      const svgText = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
      if (/<script\b|<foreignObject\b|javascript:|on[a-z]+\s*=/i.test(svgText)) {
        return NextResponse.json(
          { error: "Unsafe SVG content rejected (scripts and inline event handlers are not allowed)." },
          { status: 400 },
        );
      }
    }

    const r2 = (env as unknown as { R2?: R2Bucket }).R2;
    if (!r2) {
      return NextResponse.json(
        { error: "Media storage is not configured (R2 bucket missing)" },
        { status: 503 },
      );
    }
    await r2.put(key, buffer, { httpMetadata: { contentType: mime } });

    const url = mediaUrl(env, key);
    const db = getDb(env.DB);
    const id = crypto.randomUUID();
    await db.insert(media).values({
      id,
      name: safeName || "asset",
      url,
      type: mime,
      size: file.size,
      uploadedBy: session?.user.id ?? null,
    });
    return NextResponse.json({ id, name: safeName, url });
  } catch (err) {
    console.error("[MEDIA_UPLOAD_ERROR]", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "Missing media id" }, { status: 400 });
    const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);

    const r2 = (env as unknown as { R2?: R2Bucket }).R2;
    if (r2 && row) {
      let objectKey = row.url;
      if (objectKey.startsWith("/api/media/")) {
        objectKey = objectKey.replace("/api/media/", "");
      } else if (env.MEDIA_PUBLIC_URL && objectKey.startsWith(env.MEDIA_PUBLIC_URL)) {
        objectKey = objectKey.replace(env.MEDIA_PUBLIC_URL.replace(/\/$/, "") + "/", "");
      }
      await r2.delete(objectKey).catch(() => {});
    }
    await db.delete(media).where(eq(media.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ADMIN_MEDIA_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
