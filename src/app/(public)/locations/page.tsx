import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Phone, ShieldCheck, Globe } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { CollectionHubJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";
import { LOCATION_HUBS, INDIA_ZONE_DIRECTORY } from "@/lib/seo-locations";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";

export const revalidate = 3600;

const LOCATIONS_FAQS = [
  {
    question: "Does MLHK Infotech serve businesses outside Indore and Shajapur?",
    answer:
      "Yes. While our headquarters is in Barnawad, Shajapur and our operating base is in Indore (Madhya Pradesh), we deliver custom websites, website redesigns, SEO, Instagram/Facebook/Google Ads, Android apps, and CRM/ERP systems across all 28 Indian states, 8 Union Territories, Tier 1–5 cities, district towns, villages, and worldwide.",
  },
  {
    question: "How do businesses in Tier-2, Tier-3, Tier-4, Tier-5 towns or villages work with MLHK Infotech?",
    answer:
      "Everything runs smoothly over direct WhatsApp (+91 91651 00124), phone calls, and Google Meet screen shares in English or Hindi. You receive weekly live staging previews, official MSME & GST invoices, and 100% source-code ownership without needing to travel to a metro city.",
  },
  {
    question: "Can MLHK Infotech help my business rank for 'near me' searches in my exact city or town?",
    answer:
      "Yes. We configure local Schema.org structured data, Google Business Profile optimization, fast Cloudflare India edge hosting, and location-relevant service pages so nearby customers find your business at the top of Google Search and Google Maps.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Pan-India Service Locations — All 28 States, Cities & Villages",
    description:
      "MLHK Infotech delivers affordable, enterprise-grade websites, SEO, Instagram/Facebook/Google Ads, Android apps & ERP across Indore, MP, Delhi, Mumbai, Bengaluru & all 28 Indian states, Tier 1–5 cities & villages.",
    path: "/locations",
    keywords: [
      "best IT company near me India",
      "best IT company in Indore MP",
      "website development company all over India",
      "software company Tier 2 Tier 3 Tier 4 Tier 5 cities India",
      "rural and village business website India",
    ],
  });
}

export default function LocationsIndexPage() {
  return (
    <>
      <CollectionHubJsonLd
        path="/locations"
        name="MLHK Infotech Pan-India & Regional Service Locations"
        description="Official regional service hubs of MLHK Infotech covering Indore, Shajapur, Madhya Pradesh, major Indian metros, all 28 states, 8 Union Territories, Tier 1–5 cities, and rural towns."
        items={LOCATION_HUBS.map((loc) => ({
          name: `${loc.seoTitle} (${loc.shortName})`,
          url: `${BRAND.url}/locations/${loc.slug}`,
          description: loc.metaDescription,
        }))}
      />
      <FaqJsonLd faqs={LOCATIONS_FAQS} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Locations", href: "/locations" },
        ]}
      />

      <PageHero
        eyebrow="Pan-India & Global Delivery"
        title={
          <>
            Built in Bharat, serving <span className="text-brand">every city, town &amp; village.</span>
          </>
        }
        description="Registered in Shajapur with an operating base in Indore, MP — delivering custom websites, SEO, Instagram & Google Ads, Android apps, and ERP systems across all 28 Indian states, 8 Union Territories, and worldwide."
      />

      {/* Verified Trust & Speed Strip */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-12 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium text-zinc-400">National Coverage</p>
            <p className="mt-1.5 font-display text-2xl font-bold tabular-nums text-white">28 States · 8 UTs</p>
            <p className="mt-1 text-xs text-zinc-400">Tier 1 metros to Tier 5 towns &amp; villages</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Edge Latency in India</p>
            <p className="mt-1.5 font-display text-2xl font-bold tabular-nums text-[#ffb84d]">&lt; 30ms</p>
            <p className="mt-1 text-xs text-zinc-400">Mumbai, Delhi, Bengaluru, Hyderabad &amp; Kolkata PoPs</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Verified Registration</p>
            <p className="mt-1.5 font-display text-2xl font-bold text-white">MSME &amp; GST</p>
            <p className="mt-1 text-xs tabular-nums text-zinc-400">{BRAND.gstin}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">Direct Founder Desk</p>
            <p className="mt-1.5 font-display text-2xl font-bold text-white">Hindi &amp; English</p>
            <p className="mt-1 text-xs tabular-nums text-zinc-400">WhatsApp {BRAND.phoneDisplay}</p>
          </div>
        </div>
      </section>

      {/* Regional & Metro Hub Cards */}
      <section className="bg-[#050607] px-4 py-20 md:px-6" aria-labelledby="regional-hubs-heading">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Dedicated Regional Hubs</p>
            <h2 id="regional-hubs-heading" className="mt-3 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              Explore IT, Website, App &amp; Marketing Services by Region
            </h2>
            <p data-speakable="summary" className="mt-4 text-base leading-relaxed text-zinc-300">
              Select your city, state, or pan-India hub below for local industry solutions, transparent INR pricing, nearby towns covered, and direct WhatsApp consultation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LOCATION_HUBS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0b0d] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff9f1c]/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>{loc.tier} · {loc.state}</span>
                    <ArrowUpRight className="size-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                    {loc.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {loc.heroSummary}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                    <span className="font-medium text-zinc-200">Covers:</span>{" "}
                    {loc.areasCovered.slice(0, 4).join(" · ")}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="tabular-nums text-zinc-300">
                    From {loc.startingPackages[0]?.price.split("–")[0]?.trim() ?? "₹15,000"}
                  </span>
                  <span className="font-semibold text-[#ffb84d]">View {loc.name} hub</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Complete 28 States & 8 UTs Directory */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6" aria-labelledby="states-directory">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Complete India Directory</p>
            <h2 id="states-directory" className="mt-3 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              Every State, Union Territory, Tier 1–5 City &amp; Village Covered
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              No matter where your shop, factory, clinic, school, or startup is located — our remote-first engineering and marketing workflow delivers metro-grade execution directly to your WhatsApp and Google Meet.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {INDIA_ZONE_DIRECTORY.map((zone) => (
              <div key={zone.zone} className="border-t border-white/10 pt-8">
                <h3 className="font-display text-lg font-bold text-[#ffb84d]">{zone.zone}</h3>
                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
                  {zone.states.map((st) => (
                    <div key={st.name} className="space-y-1.5">
                      <Link
                        href={`/locations/${st.linkSlug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[#ffb84d]"
                      >
                        <MapPin className="size-3.5 text-[#ff9f1c]" />
                        <span>{st.name}</span>
                      </Link>
                      <p className="text-xs leading-relaxed text-zinc-400">{st.hubs}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Intent Solutions Cross-Links */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">All-In-One Solutions</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Every Digital &amp; IT Requirement Solved Under One Roof
              </h2>
            </div>
            <Link href="/solutions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white whitespace-nowrap shrink-0">
              View all solutions <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_PAGES.map((sol) => (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#ff9f1c]/45"
              >
                <p className="text-xs text-zinc-400 tabular-nums">{sol.category} · From {sol.startingPriceInr}</p>
                <h3 className="mt-2 font-display text-base font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                  {sol.shortTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">{sol.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visible FAQs matching FAQPage JSON-LD */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6" aria-labelledby="locations-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Questions</p>
          <h2 id="locations-faq" className="mt-3 font-display text-3xl font-bold text-white">
            Pan-India Delivery FAQs
          </h2>
          <div className="mt-8">
            {LOCATIONS_FAQS.map((faq) => (
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

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="size-4 text-[#ff9f1c]" />
            <span>MSME {BRAND.udyamNumber} · GSTIN {BRAND.gstin}</span>
            <Globe className="ml-2 size-4 text-[#ff9f1c]" />
            <span>India &amp; Worldwide</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance">
            Need a Website, App, SEO, or Ads in Your City?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Message our engineering desk directly on WhatsApp or request a fixed-price proposal today. Zero spam, honest advice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] whitespace-nowrap"
            >
              Get a Free Proposal <ArrowUpRight className="size-4" />
            </Link>
            <a
              href="https://wa.me/919165100124?text=Hi%20MLHK%20Infotech%2C%20I%20need%20help%20with%20a%20digital%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] whitespace-nowrap"
            >
              <Phone className="size-4 text-[#ff9f1c]" />
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
