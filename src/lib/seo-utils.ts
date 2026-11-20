/**
 * Pure, decoupled SEO, Crawlability, Geo-Targeting, and Security utilities
 * for MLHK Infotech (https://mlhk.in).
 */

export const CANONICAL_HOST = "mlhk.in";
export const BASE_URL = `https://${CANONICAL_HOST}`;
export const DEFAULT_SITE_NAME = "MLHK Infotech";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/brand/logo-full.png`;

/**
 * Strip duplicate brand suffixes (e.g. "| MLHK Infotech") from page titles so
 * Next.js root `title.template: "%s | MLHK Infotech"` never emits a doubled suffix.
 */
export function normalizeSeoTitle(rawTitle: string, siteName: string = DEFAULT_SITE_NAME): string {
  const trimmed = rawTitle.trim();
  if (!trimmed) return "";

  const escaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const suffixRe = new RegExp(`\\s*[|\\-–—]\\s*${escaped}$`, "i");
  const cleaned = trimmed.replace(suffixRe, "").trim();

  if (!cleaned || cleaned.toLowerCase() === siteName.toLowerCase()) {
    return trimmed;
  }
  return cleaned;
}

/**
 * Build a clean canonical URL on https://mlhk.in without duplicate slashes,
 * query strings, or trailing slashes on non-root paths.
 */
export function buildCanonicalUrl(path?: string): string {
  if (!path || path === "/") return BASE_URL;
  const withoutQuery = path.split("?")[0].split("#")[0];
  const normalized = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const trimmed = normalized.length > 1 ? normalized.replace(/\/+$/, "") : "";
  return `${BASE_URL}${trimmed}`;
}

/** Determine whether a Host header should 301-redirect to apex https://mlhk.in. */
export function shouldRedirectToApex(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase().trim();
  return hostname === `www.${CANONICAL_HOST}`;
}

/**
 * Determine whether a Host header is a non-canonical mirror/preview host
 * (such as Cloudflare *.workers.dev or *.pages.dev) that must return
 * `X-Robots-Tag: noindex, nofollow` to prevent duplicate-content indexing.
 */
export function shouldNoIndexHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase().trim();
  return hostname.endsWith(".workers.dev") || hostname.endsWith(".pages.dev");
}

/** Paths that should always emit `X-Robots-Tag: noindex, nofollow`. */
export function isNoIndexPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/api/")
  );
}

/** Escape untrusted user strings before interpolating into HTML email bodies. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Allowlist object keys before passing request payloads into Drizzle `.set(...)`
 * to prevent mass-assignment vulnerabilities.
 */
export function pickAllowedFields<T extends Record<string, unknown>>(
  input: T,
  allowed: ReadonlySet<string> | readonly string[],
): Record<string, unknown> {
  const allowedSet = allowed instanceof Set ? allowed : new Set(allowed);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (allowedSet.has(key) && value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Single source of truth for canonical static public URLs (used by sitemap.ts & IndexNow).
 * Excludes redirect aliases (/terms-of-service -> /terms-and-conditions,
 * /ai-automation -> /services/ai-automation) so search engines never see duplicate URLs.
 */
export const CORE_STATIC_PATHS: readonly {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "weekly", priority: 0.95 },
  { path: "/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.85 },
  { path: "/blog", changeFrequency: "daily", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/subsidiaries", changeFrequency: "monthly", priority: 0.75 },
  { path: "/process", changeFrequency: "monthly", priority: 0.75 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cancellation-refund-policy", changeFrequency: "yearly", priority: 0.3 },
];

/** All 28 States & 8 Union Territories of India for pan-India local & regional search discovery. */
export const INDIA_STATES_AND_UTS = [
  "Madhya Pradesh",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Bihar",
  "Odisha",
  "Kerala",
  "Andhra Pradesh",
  "Chhattisgarh",
  "Jharkhand",
  "Assam",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Jammu and Kashmir",
  "Chandigarh",
  "Puducherry",
  "Tripura",
  "Meghalaya",
  "Manipur",
  "Nagaland",
  "Arunachal Pradesh",
  "Mizoram",
  "Sikkim",
  "Ladakh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
] as const;

/** Key MP HQ/regional cities + Tier 1/2/3/4/5 commercial hubs across India. */
export const INDIA_COVERAGE_CITIES = [
  "Shajapur",
  "Indore",
  "Ujjain",
  "Bhopal",
  "Dewas",
  "Gwalior",
  "Jabalpur",
  "Ratlam",
  "Agar Malwa",
  "Sehore",
  "Mandsaur",
  "Neemuch",
  "Sagar",
  "Satna",
  "Rewa",
  "New Delhi",
  "Noida",
  "Gurugram",
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Coimbatore",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Jaipur",
  "Jodhpur",
  "Udaipur",
  "Kota",
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Agra",
  "Prayagraj",
  "Patna",
  "Ranchi",
  "Raipur",
  "Bhubaneswar",
  "Kochi",
  "Thiruvananthapuram",
  "Visakhapatnam",
  "Vijayawada",
  "Chandigarh",
  "Ludhiana",
  "Amritsar",
  "Dehradun",
  "Guwahati",
  "Siliguri",
] as const;

/** Comprehensive SEO keyword set covering all services + pan-India Tier 1-5 & rural/nearby queries. */
export const PAN_INDIA_SEO_KEYWORDS: string[] = [
  "MLHK Infotech",
  "MLHK",
  "Hariom Vishwkarma",
  "Website Development Company India",
  "Best Web Developer Near Me",
  "Website Design and Redesign Services India",
  "Website Editing and Maintenance India",
  "Custom Website Development Shajapur",
  "Web Development Company Indore",
  "Mobile App Development Company India",
  "Android App Developer Near Me",
  "iOS and Flutter App Development India",
  "SEO Services India",
  "Local SEO Agency India",
  "Digital Marketing Agency India",
  "Social Media Marketing and Google Ads India",
  "Custom CRM ERP Software Development India",
  "GST Billing and Inventory Software India",
  "AI Automation and WhatsApp Business API India",
  "Cybersecurity and Cloud Server Hardening India",
  "Graphic Design and Logo Branding Agency India",
  "IT Company in Shajapur Madhya Pradesh",
  "Software Company in Indore Bhopal Ujjain",
  "Affordable Software Development Tier 2 Tier 3 Cities India",
  "Rural and Village Business Digitization India",
  "Next.js React Enterprise Web Engineering",
  "24/7 Website Support and Maintenance India",
];

/**
 * Structured Schema.org `areaServed` covering pan-India (country, all 28 states & 8 UTs,
 * metro to Tier-5 regional hubs, pan-India GeoCircle) plus Worldwide remote delivery.
 */
export function buildPanIndiaAreaServed() {
  return [
    {
      "@type": "Country",
      name: "India",
      sameAs: "https://en.wikipedia.org/wiki/India",
    },
    {
      "@type": "GeoCircle",
      name: "Pan-India Digital & Remote Software Engineering Coverage (All States, Cities, Towns & Villages)",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 23.664,
        longitude: 76.322,
      },
      geoRadius: "2000000",
    },
    ...INDIA_STATES_AND_UTS.map((state) => ({
      "@type": "AdministrativeArea",
      name: state,
    })),
    ...INDIA_COVERAGE_CITIES.map((city) => ({
      "@type": "City",
      name: city,
    })),
    {
      "@type": "Place",
      name: "Worldwide",
    },
  ];
}
