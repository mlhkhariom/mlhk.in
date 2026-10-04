import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, phone: 40, company: 160, message: 5000 };

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    name?: string; email?: string; phone?: string; company?: string; message?: string; website?: string;
  };

  // Honeypot: hidden field real users never fill. Bots do — accept silently, store nothing.
  if (clamp(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const name = clamp(body.name, MAX.name);
  const email = clamp(body.email, MAX.email);
  const phone = clamp(body.phone, MAX.phone);
  const company = clamp(body.company, MAX.company);
  const message = clamp(body.message, MAX.message);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const { env } = getCloudflareContext();
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
