import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildSeo } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import { FaqJsonLd, LocationServiceJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import {
  LOCATION_HUBS,
  getLocationHeroVisual,
  getLocationHub,
} from "@/lib/seo-locations";
import { getHindiLocationData } from "@/lib/seo-locations-hi";
import { CityShowcaseTemplate } from "@/components/locations/CityShowcaseTemplate";

export const revalidate = 3600;

export function generateStaticParams() {
  return LOCATION_HUBS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationHub(slug);
  if (!loc) {
    return buildSeo({
      title: "शहर नहीं मिला",
      path: `/hi/locations/${slug}`,
      locale: "hi_IN",
      noIndex: true,
    });
  }

  const hi = getHindiLocationData(loc);

  return buildSeo({
    title: hi.seoTitle,
    description: hi.metaDescription,
    path: `/hi/locations/${loc.slug}`,
    image: getLocationHeroVisual(loc).src,
    locale: "hi_IN",
    alternateLanguages: {
      "hi-IN": `${BRAND.url}/hi/locations/${loc.slug}`,
      "en-IN": `${BRAND.url}/locations/${loc.slug}`,
      "x-default": `${BRAND.url}/locations/${loc.slug}`,
    },
    keywords: [...hi.keywordsHi, ...loc.keywords.slice(0, 4)],
  });
}

export default async function HindiLocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocationHub(slug);
  if (!loc) notFound();

  const hi = getHindiLocationData(loc);

  return (
    <>
      <LocationServiceJsonLd
        slug={loc.slug}
        path={`/hi/locations/${loc.slug}`}
        pageTitle={`${hi.seoTitle} | ${BRAND.name}`}
        inLanguage="hi-IN"
        name={hi.nameHi}
        state={hi.stateHi}
        regionType={loc.regionType}
        description={hi.metaDescription}
        lat={loc.lat}
        lng={loc.lng}
        areasCovered={loc.areasCovered}
        packages={hi.packagesHi}
      />
      <FaqJsonLd faqs={hi.faqsHi} />
      <Breadcrumbs
        items={[
          { label: "होम", href: "/" },
          { label: "शहर हब (हिन्दी)", href: "/hi/locations" },
          { label: hi.nameHi, href: `/hi/locations/${loc.slug}` },
        ]}
      />
      <CityShowcaseTemplate loc={loc} lang="hi" />
    </>
  );
}
