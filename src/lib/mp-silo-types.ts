import type { Metadata } from "next";
import { buildSeo } from "@/lib/seo";
import { BASE_URL } from "@/lib/seo-utils";

export interface MpSiloFaq {
  readonly question: string;
  readonly answer: string;
}

export interface MpSiloVisualCard {
  readonly title: string;
  readonly summary: string;
  readonly image: string;
  readonly alt: string;
  readonly caption: string;
  readonly serviceHref: string;
  readonly serviceLabel: string;
}

export interface MpSiloSolutionPillar {
  readonly number: string;
  readonly title: string;
  readonly detail: string;
  readonly deliverables: readonly string[];
  readonly startingPrice: string;
}

export interface MpSiloRelatedLink {
  readonly label: string;
  readonly href: string;
  readonly note: string;
}

export interface MpSiloPageData {
  readonly path: string;
  readonly lang: "en" | "hi";
  readonly alternatePath?: string;
  readonly regionGroup: "Indore Hub" | "Maa Baglamukhi & Shajapur" | "Ujjain Simhastha 2028" | "MP Temple & City Circuits";
  readonly city: string;
  readonly district: string;
  readonly state: "Madhya Pradesh";
  readonly lat: number;
  readonly lng: number;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly keywords: readonly string[];
  readonly eyebrow: string;
  readonly h1: string;
  readonly h1Highlight: string;
  readonly introSummary: string;
  readonly localNarrative: readonly string[];
  readonly landmarks: readonly string[];
  readonly bannerImage: string;
  readonly bannerAlt: string;
  readonly bannerCaption: string;
  readonly featureCards: readonly MpSiloVisualCard[];
  readonly pillars: readonly MpSiloSolutionPillar[];
  readonly techStackNote: string;
  readonly aeoFaqs: readonly MpSiloFaq[];
  readonly relatedSiloLinks: readonly MpSiloRelatedLink[];
  readonly relatedBlogHref: string;
  readonly relatedBlogLabel: string;
  readonly ctaServiceDefault: string;
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function buildMpSiloMetadata(page: MpSiloPageData): Promise<Metadata> {
  const base = await buildSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    path: page.path,
    image: `${BASE_URL}${page.bannerImage}`,
  });

  const languages: Record<string, string> = {};
  if (page.lang === "en") {
    languages["en-IN"] = `${BASE_URL}${page.path}`;
    if (page.alternatePath) {
      languages["hi-IN"] = `${BASE_URL}${page.alternatePath}`;
    }
    languages["x-default"] = `${BASE_URL}${page.path}`;
  } else {
    languages["hi-IN"] = `${BASE_URL}${page.path}`;
    if (page.alternatePath) {
      languages["en-IN"] = `${BASE_URL}${page.alternatePath}`;
      languages["x-default"] = `${BASE_URL}${page.alternatePath}`;
    }
  }

  return {
    ...base,
    keywords: [...page.keywords],
    alternates: {
      canonical: `${BASE_URL}${page.path}`,
      languages,
    },
    openGraph: {
      ...base.openGraph,
      locale: page.lang === "hi" ? "hi_IN" : "en_IN",
      images: [
        {
          url: `${BASE_URL}${page.bannerImage}`,
          width: 1200,
          height: 630,
          alt: page.bannerAlt,
        },
      ],
    },
  };
}
