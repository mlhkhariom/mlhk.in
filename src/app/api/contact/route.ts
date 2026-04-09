import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; phone?: string; company?: string; message?: string };
  const { name, email, phone, company, message } = body;
  if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

  const { env } = getRequestContext();
  const db = getDb(env.DB);

  await db.insert(leads).values({
    id: crypto.randomUUID(),
    name,
    email,
    phone: phone || null,
    company: company || null,
    notes: message || null,
    source: "website",
    status: "new",
  });

  return NextResponse.json({ success: true });
}
