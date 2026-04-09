import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return NextResponse.json(await db.select().from(media).all());
}

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const key = `media/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const buffer = await file.arrayBuffer();
  const r2 = (env as any).R2 as R2Bucket | undefined;
  if (r2) await r2.put(key, buffer, { httpMetadata: { contentType: file.type } });

  const db = getDb(env.DB);
  const id = crypto.randomUUID();
  await db.insert(media).values({ id, name: file.name, url: key, type: file.type, size: file.size });
  return NextResponse.json({ id, name: file.name, url: key });
}

export async function DELETE(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const { id, url } = await req.json() as { id: string; url: string };
  const r2 = (env as any).R2 as R2Bucket | undefined;
  if (r2) await r2.delete(url).catch(() => {});
  await db.delete(media).where(eq(media.id, id));
  return NextResponse.json({ success: true });
}
