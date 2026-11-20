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
  if (!loc) return buildSeo({ title: "Location Not Found", path: `/locations/${slug}`, noIndex: true });

  return buildSeo({
    title: loc.seoTitle,
    description: loc.metaDescription,
    path: `/locations/${loc.slug}`,
    image: getLocationHeroVisual(loc).src,
    locale: "en_IN",
    alternateLanguages: {
      "en-IN": `${BRAND.url}/locations/${loc.slug}`,
      "hi-IN": `${BRAND.url}/hi/locations/${loc.slug}`,
      "x-default": `${BRAND.url}/locations/${loc.slug}`,
    },
    keywords: [...loc.keywords],
  });
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocationHub(slug);
  if (!loc) notFound();

  return (
    <>
      <LocationServiceJsonLd
        slug={loc.slug}
        path={`/locations/${loc.slug}`}
        inLanguage="en-IN"
        name={loc.name}
        state={loc.state}
        regionType={loc.regionType}
        description={loc.metaDescription}
        lat={loc.lat}
        lng={loc.lng}
        areasCovered={loc.areasCovered}
        packages={loc.startingPackages}
      />
      <FaqJsonLd faqs={loc.faqs} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Locations", href: "/locations" },
          { label: loc.name, href: `/locations/${loc.slug}` },
        ]}
      />
      <CityShowcaseTemplate loc={loc} lang="en" />
    </>
  );
}

