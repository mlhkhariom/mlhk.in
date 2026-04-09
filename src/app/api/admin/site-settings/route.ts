import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const rows = await db.select().from(siteSettings).all();
  const result: Record<string, string> = {};
  rows.forEach(r => { result[r.key] = r.value ?? ""; });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await db.insert(siteSettings).values({ key, value, group: "general" })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value } });
  }
  return NextResponse.json({ success: true });
}
