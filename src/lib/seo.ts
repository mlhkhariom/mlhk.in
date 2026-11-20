import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site";
import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_NAME,
  buildCanonicalUrl,
  normalizeSeoTitle,
} from "@/lib/seo-utils";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  noIndex?: boolean;
  keywords?: string[];
  locale?: "en_IN" | "hi_IN";
  alternateLanguages?: Record<string, string>;
};

/**
 * Build a full Metadata object from site_settings + page-specific values.
 * Usage: export async function generateMetadata() { return buildSeo({ title: "..." }); }
 */
export async function buildSeo(input: SeoInput = {}): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.site_name?.trim() || DEFAULT_SITE_NAME;
  const defaultDesc =
    settings.meta_description?.trim() ||
    "Enterprise-grade IT & Digital Solutions — Web Development, Mobile Apps, SEO, Digital Marketing, SaaS, CRM, ERP & AI Automation across India and Worldwide.";
  const defaultImage = settings.og_image?.trim() || DEFAULT_OG_IMAGE;

  const cleanTitle = input.title ? normalizeSeoTitle(input.title, siteName) : undefined;
  const fullTitle = cleanTitle ? `${cleanTitle} | ${siteName}` : siteName;
  const description = input.description ?? defaultDesc;
  const url = buildCanonicalUrl(input.path);
  const rawImage = input.image?.trim() || defaultImage;
  const image = rawImage.startsWith("http") ? rawImage : `${BASE_URL}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;
  const isDefaultLogo = image === DEFAULT_OG_IMAGE || image.endsWith("/brand/logo-full.png");
  const ogLocale = input.locale ?? "en_IN";
  const languages = input.alternateLanguages ?? {
    "en-IN": url,
    "x-default": url,
  };

  return {
    title: cleanTitle,
    description,
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords } : {}),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: ogLocale,
      type: input.type ?? "website",
      images: [
        {
          url: image,
          width: isDefaultLogo ? 1536 : 1200,
          height: isDefaultLogo ? 1024 : 630,
          alt: fullTitle,
        },
      ],
      ...(input.publishedAt ? { publishedTime: input.publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: input.noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/** Static fallback for pages that don't need async settings lookup. */
export function staticSeo(title?: string, description?: string): Metadata {
  const siteName = DEFAULT_SITE_NAME;
  return {
    title: title ? normalizeSeoTitle(title, siteName) : siteName,
    description:
      description ??
      "Enterprise-grade IT & Digital Solutions — Web, Mobile, SEO, Digital Marketing, SaaS, CRM, ERP & AI Automation.",
  };
}
