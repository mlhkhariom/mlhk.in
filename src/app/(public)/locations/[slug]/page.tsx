import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { FaqJsonLd, LocationServiceJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { BRAND, SERVICE_LINES, CAPABILITIES } from "@/lib/brand";
import { LOCATION_HUBS, getLocationHub } from "@/lib/seo-locations";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";

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

  const nearbyLocations = loc.nearbySlugs
    .map((s) => getLocationHub(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const allServices = [
    ...SERVICE_LINES.map((s) => ({ title: s.title, slug: s.slug, description: s.description })),
    ...CAPABILITIES.map((c) => ({ title: c.title, slug: c.slug, description: c.description })),
  ];

  return (
    <>
      <LocationServiceJsonLd
        slug={loc.slug}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#050607] px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[#ff9f1c]/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {loc.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
            {loc.heroHeadline} <span className="text-brand">{loc.heroHighlight}</span>
          </h1>
          <p data-speakable="summary" className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            {loc.heroSummary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] whitespace-nowrap"
            >
              Start Your Project in {loc.name} <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={`https://wa.me/919165100124?text=${encodeURIComponent(`Hi MLHK Infotech, I am looking for IT/website/marketing services in ${loc.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] whitespace-nowrap"
            >
              <Phone className="size-4 text-[#ff9f1c]" />
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>

          {/* Grounded Regional Trust Bar */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">Local Edge Performance</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{loc.localEdgePop}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">MSME &amp; GST Compliant</p>
                <p className="mt-1 text-xs tabular-nums text-zinc-400">Udyam {BRAND.udyamNumber} · GST {BRAND.gstin}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">Direct Founder Oversight</p>
                <p className="mt-1 text-xs text-zinc-400">Led by {BRAND.founder} · 100% Code Ownership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Industry Solutions */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Built for {loc.name}</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
                How Businesses in {loc.name} Grow With MLHK Infotech
              </h2>
              <ul className="mt-6 space-y-4">
                {loc.whyMlhkHere.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 lg:col-span-7">
              {loc.localIndustries.map((ind, idx) => (
                <div key={ind.name} className="rounded-2xl border border-white/10 bg-[#0a0b0d] p-6">
                  <p className="text-xs font-semibold tabular-nums text-[#ffb84d]">0{idx + 1}. Industry Focus</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ind.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent INR Pricing Packages */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Transparent INR Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
            Low-Cost, High-Quality Packages for {loc.name}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
            Fixed upfront estimates with zero agency bloat and zero monthly hostage fees. Every deliverable is engineered in-house and backed by GST invoicing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {loc.startingPackages.map((pkg) => (
              <div key={pkg.name} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0b0d] p-6">
                <div>
                  <p className="text-xs text-zinc-400 tabular-nums">{pkg.timeline}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="mt-3 font-display text-xl font-bold tabular-nums text-[#ffb84d]">{pkg.price}</p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-300">{pkg.summary}</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#ffb84d]"
                >
                  Request exact quote <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas, Towns & Villages Served */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Local &amp; Nearby Coverage</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                Areas, Industrial Belts &amp; Nearby Towns Served Around {loc.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Whether your business operates in a commercial hub, industrial estate, district headquarters, or rural town near {loc.name}, our team works directly with you via WhatsApp, calls, and Google Meet.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {loc.areasCovered.map((area) => (
                  <li key={area} className="flex items-center gap-2.5 border-b border-white/10 py-2.5 text-sm text-zinc-200">
                    <MapPin className="size-3.5 shrink-0 text-[#ff9f1c]" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Full Service & Solution Matrix */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Complete Stack in {loc.name}</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
            All 8 Engineering Lines &amp; Specialized Solutions Available in {loc.name}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#ff9f1c]/40"
              >
                <h3 className="font-display text-sm font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-3">{svc.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Popular Problem-Solving Guides</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
              {SOLUTION_PAGES.map((sol) => (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1 text-zinc-300 transition-colors hover:text-[#ffb84d]"
                >
                  <span>{sol.shortTitle}</span>
                  <ArrowUpRight className="size-3.5 text-[#ff9f1c]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6" aria-labelledby="loc-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Questions</p>
          <h2 id="loc-faq" className="mt-3 font-display text-3xl font-bold text-white">
            Frequently Asked Questions — {loc.name}
          </h2>
          <div className="mt-8">
            {loc.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Regional Hubs Cross-Link */}
      {nearbyLocations.length > 0 && (
        <section className="border-t border-white/10 bg-[#050607] px-4 py-14 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Also Serving Nearby &amp; National Hubs
              </p>
              <Link href="/locations" className="text-xs font-semibold text-[#ffb84d] hover:underline">
                View all 28 states &amp; 8 UTs →
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {nearbyLocations.map((near) => (
                <Link
                  key={near.slug}
                  href={`/locations/${near.slug}`}
                  className="text-zinc-300 transition-colors hover:text-[#ffb84d]"
                >
                  IT &amp; Web Services in {near.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
