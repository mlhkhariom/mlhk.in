export interface ContactSubmissionInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  city?: unknown;
  message?: unknown;
  service?: unknown;
  timeline?: unknown;
  budget?: unknown;
  sourcePage?: unknown;
  website?: unknown;
}

export interface NormalizedContactLead {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  city: string | null;
  notes: string;
  service: string | null;
  timeline: string | null;
  budget: string | null;
  sourcePage: string;
  isHoneypot: boolean;
}

export type ValidationResult =
  | { ok: true; lead: NormalizedContactLead }
  | { ok: false; error: string; field?: "name" | "email" | "phone" | "message" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGIT_RE = /\d/g;

const MAX = {
  name: 120,
  email: 200,
  phone: 40,
  company: 160,
  message: 5000,
  meta: 120,
} as const;

export function clampText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidOptionalPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return true;
  const digits = trimmed.match(PHONE_DIGIT_RE)?.length ?? 0;
  return digits >= 10 && digits <= 15;
}

export function validateContactSubmission(input: ContactSubmissionInput): ValidationResult {
  const honeypot = clampText(input.website, 200);
  if (honeypot) {
    return {
      ok: true,
      lead: {
        name: "honeypot",
        email: "honeypot@invalid.local",
        phone: null,
        company: null,
        city: null,
        notes: "",
        service: null,
        timeline: null,
        budget: null,
        sourcePage: "/contact",
        isHoneypot: true,
      },
    };
  }

  const name = clampText(input.name, MAX.name);
  const email = clampText(input.email, MAX.email);
  const phone = clampText(input.phone, MAX.phone);
  const company = clampText(input.company, MAX.company);
  const city = clampText(input.city, MAX.meta) || null;
  const message = clampText(input.message, MAX.message);
  const service = clampText(input.service, MAX.meta) || null;
  const timeline = clampText(input.timeline, MAX.meta) || null;
  const budget = clampText(input.budget, MAX.meta) || null;
  const sourcePage = clampText(input.sourcePage, 160) || "/contact";

  if (name.length < 2) {
    return { ok: false, error: "Please enter your full name (at least 2 characters).", field: "name" };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address so we can send your proposal.", field: "email" };
  }
  if (!isValidOptionalPhone(phone)) {
    return { ok: false, error: "Please enter a valid 10-digit Indian or international phone number.", field: "phone" };
  }

  const scopeLines: string[] = [];
  if (service) scopeLines.push(`Service: ${service}`);
  if (city) scopeLines.push(`City: ${city}`);
  if (timeline) scopeLines.push(`Timeline: ${timeline}`);
  if (budget) scopeLines.push(`Budget: ${budget}`);

  const composedNotes =
    scopeLines.length > 0 && !message.includes("[INTERACTIVE SCOPE DETAILS]")
      ? `[SCOPE]\n${scopeLines.join("\n")}\n\n[BRIEF]\n${message || "Requested project scope & quote."}`
      : message || "Requested consultation from MLHK Infotech website.";

  return {
    ok: true,
    lead: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      city,
      notes: composedNotes.slice(0, MAX.message),
      service,
      timeline,
      budget,
      sourcePage,
      isHoneypot: false,
    },
  };
}

export function generateInquiryRef(date = new Date(), randomHex?: string): string {
  const yy = String(date.getUTCFullYear()).slice(-2);
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const token = (randomHex ?? Math.random().toString(16).slice(2, 6)).toUpperCase().slice(0, 4).padEnd(4, "0");
  return `MLHK-${yy}${mm}${dd}-${token}`;
}

export function buildWhatsAppInquiryUrl(params: {
  serviceLabel: string;
  timelineLabel: string;
  budgetLabel: string;
  name?: string;
  company?: string;
  message?: string;
  referenceId?: string;
}): string {
  const lines = [
    "Hello Hariom & MLHK Infotech team,",
    params.referenceId ? `Ref ID: ${params.referenceId}` : "I want to discuss a project:",
    `• Service: ${params.serviceLabel}`,
    `• Timeline: ${params.timelineLabel}`,
    `• Budget: ${params.budgetLabel}`,
  ];
  if (params.name?.trim()) {
    lines.push(`• Name: ${params.name.trim()}${params.company?.trim() ? ` (${params.company.trim()})` : ""}`);
  }
  if (params.message?.trim()) {
    lines.push(`• Details: ${params.message.trim().slice(0, 400)}`);
  }
  return `https://wa.me/919165100124?text=${encodeURIComponent(lines.join("\n"))}`;
}
