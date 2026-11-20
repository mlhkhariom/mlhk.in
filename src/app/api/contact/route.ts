import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, phone: 40, company: 160, message: 5000 };

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (ipHits.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= RATE_MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_WINDOW_MS - now) / 1000));
    ipHits.set(ip, recent);
    return { limited: true, retryAfterSec };
  }

  recent.push(now);
  ipHits.set(ip, recent);

  // Prevent unbounded memory growth across warm isolates
  if (ipHits.size > 2000) {
    for (const [k, timestamps] of ipHits) {
      if (timestamps.every((ts) => ts <= windowStart)) ipHits.delete(k);
    }
  }
  return { limited: false, retryAfterSec: 0 };
}

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const rate = isRateLimited(ip);
  if (rate.limited) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes or call/WhatsApp us directly." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
    website?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

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

  try {
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
  } catch (err) {
    console.error("[CONTACT_DB_ERROR]", err);
    return NextResponse.json(
      { error: "Unable to record your inquiry right now. Please contact us on WhatsApp or email." },
      { status: 503 },
    );
  }

  // Send email notifications (non-blocking — don't fail the request if email fails)
  try {
    const { sendLeadReply, sendLeadNotification } = await import("@/lib/email");
    await Promise.allSettled([
      sendLeadReply(name, email),
      sendLeadNotification(name, email, message),
    ]);
  } catch {
    // Email is best-effort; lead is already saved.
  }

  return NextResponse.json({ success: true });
}
