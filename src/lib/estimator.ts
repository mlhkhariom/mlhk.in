/**
 * Pure decoupled project cost & timeline estimator for MLHK Infotech.
 *
 * Maps selected project scope + optional Indian business add-ons to transparent
 * INR pricing ranges, realistic engineering timelines, and matching `/contact`
 * query parameters (`service` + `budget`) so visitors can lock their quote in one click.
 */

export type EstimatorProjectId =
  | "business-website"
  | "site-redesign-fix"
  | "seo-ads-growth"
  | "mobile-app"
  | "custom-erp-crm";

export type EstimatorAddonId =
  | "upi-checkout"
  | "whatsapp-automation"
  | "multi-city-seo"
  | "admin-cms-dashboard";

export interface EstimatorProjectOption {
  id: EstimatorProjectId;
  label: string;
  shortLabel: string;
  tagline: string;
  baseMinInr: number;
  baseMaxInr: number;
  baseWeeksMin: number;
  baseWeeksMax: number;
  contactServiceSlug: string;
  deliverables: readonly string[];
}

export interface EstimatorAddonOption {
  id: EstimatorAddonId;
  label: string;
  detail: string;
  addMinInr: number;
  addMaxInr: number;
  addWeeks: number;
}

export interface ProjectEstimateResult {
  minInr: number;
  maxInr: number;
  formattedRange: string;
  weeksLabel: string;
  contactBudgetTier: string;
  contactHref: string;
  deliverables: readonly string[];
}

export const ESTIMATOR_PROJECTS: readonly EstimatorProjectOption[] = [
  {
    id: "business-website",
    label: "Custom Business Website",
    shortLabel: "Business Website",
    tagline: "Fast Next.js / Edge site with SEO schema, mobile speed & direct WhatsApp leads.",
    baseMinInr: 15000,
    baseMaxInr: 35000,
    baseWeeksMin: 1,
    baseWeeksMax: 3,
    contactServiceSlug: "web-development",
    deliverables: [
      "Custom mobile-first UI (zero templates)",
      "Cloudflare India Edge hosting setup",
      "Technical SEO + Local Schema JSON-LD",
      "100% source code & domain ownership",
    ],
  },
  {
    id: "site-redesign-fix",
    label: "Existing Site Fix & Redesign",
    shortLabel: "Site Fix / Redesign",
    tagline: "Upgrade an outdated or slow website, fix bugs, boost Core Web Vitals & modernise UX.",
    baseMinInr: 8000,
    baseMaxInr: 22000,
    baseWeeksMin: 1,
    baseWeeksMax: 2,
    contactServiceSlug: "website-redesign",
    deliverables: [
      "Speed & Core Web Vitals overhaul",
      "Clean modern responsive UI refresh",
      "Broken form, SSL & SEO error fixes",
      "Zero downtime DNS & URL preservation",
    ],
  },
  {
    id: "seo-ads-growth",
    label: "SEO, Local Maps & Meta/Google Ads",
    shortLabel: "SEO & Paid Ads",
    tagline: "Rank across city/state searches and run ROI-focused Instagram, Facebook & Google Ads.",
    baseMinInr: 10000,
    baseMaxInr: 28000,
    baseWeeksMin: 1,
    baseWeeksMax: 2,
    contactServiceSlug: "digital-marketing",
    deliverables: [
      "Keyword, Local Maps & Schema architecture",
      "Instagram, Facebook & Google Ads setup",
      "Conversion tracking (GTM + Pixel + GA4)",
      "Transparent lead & cost-per-lead report",
    ],
  },
  {
    id: "mobile-app",
    label: "Android & Cross-Platform App",
    shortLabel: "Mobile App",
    tagline: "Production Android / Flutter app with offline support, secure API & Play Store launch.",
    baseMinInr: 45000,
    baseMaxInr: 120000,
    baseWeeksMin: 4,
    baseWeeksMax: 8,
    contactServiceSlug: "mobile-applications",
    deliverables: [
      "Native Android / Flutter mobile app",
      "Secure REST API & SQL database backend",
      "Push alerts & Play Store publishing",
      "Complete repository & keystore handover",
    ],
  },
  {
    id: "custom-erp-crm",
    label: "Custom CRM, GST Billing & ERP",
    shortLabel: "CRM / GST ERP",
    tagline: "Replace messy spreadsheets with role-based invoicing, inventory & branch dashboards.",
    baseMinInr: 65000,
    baseMaxInr: 180000,
    baseWeeksMin: 5,
    baseWeeksMax: 10,
    contactServiceSlug: "enterprise-systems",
    deliverables: [
      "Role-based staff, dealer & admin portals",
      "GST PDF invoice & stock ledger engine",
      "Automated backups & audit trails",
      "Zero per-seat SaaS subscription fees",
    ],
  },
] as const;

export const ESTIMATOR_ADDONS: readonly EstimatorAddonOption[] = [
  {
    id: "upi-checkout",
    label: "Razorpay UPI & Payments",
    detail: "Accept UPI, cards & auto-verify orders",
    addMinInr: 6000,
    addMaxInr: 12000,
    addWeeks: 1,
  },
  {
    id: "whatsapp-automation",
    label: "WhatsApp Lead & Order Alerts",
    detail: "Instant WhatsApp receipts & auto-replies",
    addMinInr: 5000,
    addMaxInr: 12000,
    addWeeks: 1,
  },
  {
    id: "multi-city-seo",
    label: "Multi-City / Pan-India SEO",
    detail: "Location hubs, FAQ schema & Search Console",
    addMinInr: 7000,
    addMaxInr: 15000,
    addWeeks: 1,
  },
  {
    id: "admin-cms-dashboard",
    label: "Custom Admin CMS Panel",
    detail: "Edit pages, products & leads yourself",
    addMinInr: 9000,
    addMaxInr: 18000,
    addWeeks: 1,
  },
] as const;

export function formatInrCompact(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    const rounded = Number.isInteger(lakhs) ? lakhs.toFixed(0) : lakhs.toFixed(1).replace(/\.0$/, "");
    return `₹${rounded}L`;
  }
  return `₹${Math.round(amount / 1000)}k`;
}

export function mapBudgetTierFromInr(maxInr: number): string {
  if (maxInr <= 25000) return "₹8k – ₹25k";
  if (maxInr <= 60000) return "₹25k – ₹60k";
  if (maxInr <= 120000) return "₹60k – ₹1.2L";
  if (maxInr <= 250000) return "₹1.2L – ₹2.5L";
  return "₹2.5L+";
}

export function calculateProjectEstimate(
  projectId: EstimatorProjectId,
  addonIds: readonly EstimatorAddonId[],
): ProjectEstimateResult {
  const project =
    ESTIMATOR_PROJECTS.find((p) => p.id === projectId) ?? ESTIMATOR_PROJECTS[0];

  const uniqueAddonSet = new Set(addonIds);
  const selectedAddons = ESTIMATOR_ADDONS.filter((a) => uniqueAddonSet.has(a.id));

  const minInr =
    project.baseMinInr + selectedAddons.reduce((sum, a) => sum + a.addMinInr, 0);
  const maxInr =
    project.baseMaxInr + selectedAddons.reduce((sum, a) => sum + a.addMaxInr, 0);

  const extraWeeks = Math.min(
    3,
    Math.ceil(selectedAddons.reduce((sum, a) => sum + a.addWeeks, 0) / 2),
  );
  const weeksMin = project.baseWeeksMin + (selectedAddons.length > 0 ? 1 : 0);
  const weeksMax = project.baseWeeksMax + extraWeeks;

  const formattedRange = `${formatInrCompact(minInr)} – ${formatInrCompact(maxInr)}`;
  const weeksLabel = `${weeksMin}–${weeksMax} weeks`;
  const contactBudgetTier = mapBudgetTierFromInr(maxInr);

  const params = new URLSearchParams({
    service: project.contactServiceSlug,
    budget: contactBudgetTier,
  });
  if (selectedAddons.length > 0) {
    params.set(
      "project",
      `${project.shortLabel} + ${selectedAddons.map((a) => a.label).join(", ")}`,
    );
  } else {
    params.set("project", project.shortLabel);
  }

  return {
    minInr,
    maxInr,
    formattedRange,
    weeksLabel,
    contactBudgetTier,
    contactHref: `/contact?${params.toString()}`,
    deliverables: [
      ...project.deliverables,
      ...selectedAddons.map((a) => `${a.label} included`),
    ],
  };
}
