import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import {
  validateContactSubmission,
  generateInquiryRef,
  type ContactSubmissionInput,
} from "@/lib/contact-utils";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 8;
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

  if (ipHits.size > 2000) {
    for (const [k, timestamps] of ipHits) {
      if (timestamps.every((ts) => ts <= windowStart)) ipHits.delete(k);
    }
  }
  return { limited: false, retryAfterSec: 0 };
}

async function persistFallbackLead(record: Record<string, unknown>): Promise<boolean> {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, "leads-inbox.jsonl");
    await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (err) {
    console.error("[CONTACT_FALLBACK_FS_ERROR]", err);
    return false;
  }
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

  let body: ContactSubmissionInput;
  try {
    body = (await req.json()) as ContactSubmissionInput;
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const validated = validateContactSubmission(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error, field: validated.field }, { status: 400 });
  }

  if (validated.lead.isHoneypot) {
    return NextResponse.json({ success: true, referenceId: generateInquiryRef() });
  }

  const { name, email, phone, company, city, notes, service, timeline, budget, sourcePage } = validated.lead;
  const id = crypto.randomUUID();
  const referenceId = generateInquiryRef(new Date(), id.slice(0, 4));
  let storage: "d1" | "local-inbox" = "d1";

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) throw new Error("D1 binding unavailable");
    const db = getDb(env.DB);
    const now = new Date().toISOString();

    await db.insert(leads).values({
      id,
      name,
      email,
      phone,
      company,
      notes: `[REF: ${referenceId}] [PAGE: ${sourcePage}]\n${notes}`,
      source: "website",
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
  } catch (err) {
    console.warn("[CONTACT_D1_FALLBACK]", err instanceof Error ? err.message : "D1 unavailable");
    const saved = await persistFallbackLead({
      id,
      referenceId,
      name,
      email,
      phone,
      company,
      city,
      service,
      timeline,
      budget,
      notes,
      source: sourcePage || "website",
      status: "new",
      createdAt: new Date().toISOString(),
    });
    if (!saved) {
      return NextResponse.json(
        { error: "Unable to record your inquiry right now. Please contact us on WhatsApp (+91 91651 00124) or email." },
        { status: 503 },
      );
    }
    storage = "local-inbox";
  }

  // Send email notifications (non-blocking — don't fail the request if email fails)
  try {
    const { sendLeadReply, sendLeadNotification } = await import("@/lib/email");
    await Promise.allSettled([
      sendLeadReply(name, email),
      sendLeadNotification(name, email, `[REF: ${referenceId}]\n${notes}`),
    ]);
  } catch {
    // Email is best-effort; lead is already durably stored.
  }

  return NextResponse.json({
    success: true,
    referenceId,
    storage,
  });
}
