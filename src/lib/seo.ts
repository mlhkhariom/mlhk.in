import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site";

const BASE_URL = "https://mlhk.in";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  noIndex?: boolean;
};

/**
 * Build a full Metadata object from site_settings + page-specific values.
 * Usage: export async function generateMetadata() { return buildSeo({ title: "..." }); }
 */
export async function buildSeo(input: SeoInput = {}): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.site_name ?? "MLHK Infotech";
  const defaultDesc =
    settings.meta_description ??
    "Enterprise-grade IT & Digital Solutions — Web, Mobile, SaaS, CRM, ERP, AI Automation";
  const defaultImage = settings.og_image ?? `${BASE_URL}/og-default.png`;

  const title = input.title ? `${input.title} | ${siteName}` : siteName;
  const description = input.description ?? defaultDesc;
  const url = `${BASE_URL}${input.path ?? ""}`;
  const image = input.image ?? defaultImage;

  return {
    title: input.title ?? undefined,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_IN",
      type: input.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(input.publishedAt ? { publishedTime: input.publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Static fallback for pages that don't need async settings lookup. */
export function staticSeo(title?: string, description?: string): Metadata {
  const siteName = "MLHK Infotech";
  return {
    title: title ?? siteName,
    description:
      description ??
      "Enterprise-grade IT & Digital Solutions — Web, Mobile, SaaS, CRM, ERP, AI Automation",
  };
}
