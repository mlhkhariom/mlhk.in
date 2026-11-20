/**
 * Pure CRM utilities for lead metadata parsing, pipeline metrics, validation,
 * and WhatsApp follow-up link generation. Decoupled from DB/React for unit testing.
 */

export const LEAD_STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ["website", "referral", "social", "manual", "other"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface CrmLeadRecord {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  status: string | null;
  notes: string | null;
  createdAt: string | null;
  updatedAt?: string | null;
}

export interface ParsedLeadNotes {
  referenceId: string | null;
  sourcePage: string | null;
  service: string | null;
  city: string | null;
  timeline: string | null;
  budget: string | null;
  message: string;
}

/**
 * Extracts structured metadata lines written by `/api/contact` out of `lead.notes`
 * while preserving the human-readable inquiry message cleanly.
 */
export function parseLeadNotes(rawNotes: string | null | undefined): ParsedLeadNotes {
  if (!rawNotes) {
    return {
      referenceId: null,
      sourcePage: null,
      service: null,
      city: null,
      timeline: null,
      budget: null,
      message: "",
    };
  }

  let referenceId: string | null = null;
  let sourcePage: string | null = null;
  let service: string | null = null;
  let city: string | null = null;
  let timeline: string | null = null;
  let budget: string | null = null;

  const lines = rawNotes.split(/\r?\n/);
  const bodyLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const refMatch = line.match(/\[REF:\s*([^\]]+)\]/i);
    if (refMatch) referenceId = refMatch[1].trim();

    const pageMatch = line.match(/\[PAGE:\s*([^\]]+)\]/i);
    if (pageMatch) sourcePage = pageMatch[1].trim();

    if (refMatch || pageMatch) {
      const remainder = line
        .replace(/\[REF:\s*[^\]]+\]/gi, "")
        .replace(/\[PAGE:\s*[^\]]+\]/gi, "")
        .trim();
      if (remainder) bodyLines.push(remainder);
      continue;
    }

    if (/^Service:\s*/i.test(line)) {
      service = line.replace(/^Service:\s*/i, "").trim();
      continue;
    }
    if (/^City:\s*/i.test(line)) {
      city = line.replace(/^City:\s*/i, "").trim();
      continue;
    }
    if (/^Timeline:\s*/i.test(line)) {
      timeline = line.replace(/^Timeline:\s*/i, "").trim();
      continue;
    }
    if (/^Budget:\s*/i.test(line)) {
      budget = line.replace(/^Budget:\s*/i, "").trim();
      continue;
    }
    if (/^Phone:\s*/i.test(line)) {
      continue;
    }

    bodyLines.push(line);
  }

  return {
    referenceId,
    sourcePage,
    service,
    city,
    timeline,
    budget,
    message: bodyLines.join("\n").trim(),
  };
}

export interface PipelineMetrics {
  total: number;
  newCount: number;
  contactedCount: number;
  proposalCount: number;
  wonCount: number;
  lostCount: number;
  conversionRate: number;
}

export function computePipelineMetrics(items: readonly CrmLeadRecord[]): PipelineMetrics {
  let newCount = 0;
  let contactedCount = 0;
  let proposalCount = 0;
  let wonCount = 0;
  let lostCount = 0;

  for (const item of items) {
    switch (item.status) {
      case "contacted":
        contactedCount++;
        break;
      case "proposal":
        proposalCount++;
        break;
      case "won":
        wonCount++;
        break;
      case "lost":
        lostCount++;
        break;
      default:
        newCount++;
        break;
    }
  }

  const total = items.length;
  const closed = wonCount + lostCount;
  const conversionRate = closed > 0 ? Math.round((wonCount / closed) * 100) : total > 0 ? Math.round((wonCount / total) * 100) : 0;

  return {
    total,
    newCount,
    contactedCount,
    proposalCount,
    wonCount,
    lostCount,
    conversionRate,
  };
}

export function filterCrmLeads(
  items: readonly CrmLeadRecord[],
  options: { query?: string; status?: string; source?: string },
): CrmLeadRecord[] {
  const q = (options.query ?? "").trim().toLowerCase();
  const status = (options.status ?? "all").toLowerCase();
  const source = (options.source ?? "all").toLowerCase();

  return items.filter((lead) => {
    if (status !== "all" && (lead.status ?? "new").toLowerCase() !== status) return false;
    if (source !== "all" && (lead.source ?? "website").toLowerCase() !== source) return false;
    if (!q) return true;

    const haystack = [
      lead.name,
      lead.email ?? "",
      lead.phone ?? "",
      lead.company ?? "",
      lead.notes ?? "",
      lead.source ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function normalizeIndianPhoneForWhatsApp(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length >= 11 && digits.length <= 15) return digits;
  return null;
}

export function buildAdminWhatsAppReplyUrl(lead: Pick<CrmLeadRecord, "name" | "phone" | "notes">): string | null {
  const waNumber = normalizeIndianPhoneForWhatsApp(lead.phone);
  if (!waNumber) return null;
  const parsed = parseLeadNotes(lead.notes);
  const serviceHint = parsed.service ? ` regarding ${parsed.service}` : "";
  const refHint = parsed.referenceId ? ` (Ref: ${parsed.referenceId})` : "";
  const msg = `Namaste ${lead.name} ji, this is Hariom Vishwkarma from MLHK Infotech${serviceHint}${refHint}. Thank you for reaching out — when is a good time for a quick 5-minute call?`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}

export function validateManualLeadInput(input: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  source?: unknown;
  status?: unknown;
  notes?: unknown;
}):
  | {
      ok: true;
      data: {
        name: string;
        email: string | null;
        phone: string | null;
        company: string | null;
        source: LeadSource;
        status: LeadStatus;
        notes: string | null;
      };
    }
  | { ok: false; error: string } {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Lead name must be between 2 and 120 characters." };
  }

  const emailRaw = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (emailRaw && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailRaw)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const phoneRaw = typeof input.phone === "string" ? input.phone.trim() : "";
  if (phoneRaw && phoneRaw.replace(/\D/g, "").length < 7) {
    return { ok: false, error: "Phone number must contain at least 7 digits." };
  }

  const company = typeof input.company === "string" && input.company.trim() ? input.company.trim().slice(0, 120) : null;
  const notes = typeof input.notes === "string" && input.notes.trim() ? input.notes.trim().slice(0, 4000) : null;

  const source: LeadSource = LEAD_SOURCES.includes(input.source as LeadSource)
    ? (input.source as LeadSource)
    : "manual";
  const status: LeadStatus = LEAD_STATUSES.includes(input.status as LeadStatus)
    ? (input.status as LeadStatus)
    : "new";

  return {
    ok: true,
    data: {
      name,
      email: emailRaw || null,
      phone: phoneRaw || null,
      company,
      source,
      status,
      notes,
    },
  };
}
