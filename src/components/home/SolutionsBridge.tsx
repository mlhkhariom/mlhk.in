import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";
import { LOCATION_HUBS } from "@/lib/seo-locations";

export function SolutionsBridge() {
  const featuredCities = LOCATION_HUBS.slice(0, 12);

  return (
    <section
      className="relative border-y border-white/10 bg-[#050607] px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="solutions-bridge-heading"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Part 1: High-Intent Affordable Packages */}
        <div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
                Transparent Indian Packages
              </p>
              <h2
                id="solutions-bridge-heading"
                className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
              >
                One partner for every <span className="text-brand">digital need.</span>
              </h2>
            </div>
            <Link
              href="/solutions"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
            >
              <span>View all 6 solution guides</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_PAGES.map((sol) => (
              <li key={sol.slug}>
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0c0f] p-6 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/45"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold tabular-nums text-[#ffb84d]">
                        {sol.startingPriceInr}
                      </span>
                      <span className="text-zinc-400">{sol.deliveryTime}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                      {sol.shortTitle}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-300">
                      {sol.metaDescription}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-xs font-semibold text-[#ffb84d] group-hover:text-white">
                    <span>See scope &amp; deliverables</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Part 2: Pan-India Service Coverage Connectivity */}
        <div className="rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ffb84d]">
                <MapPin className="size-3.5" aria-hidden />
                <span>Serving All 28 States, 8 UTs &amp; Tier 1–5 Towns</span>
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Rooted in Indore &amp; Shajapur — trusted across India.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
                Whether you run a local business in Madhya Pradesh, a startup in Bengaluru or
                Delhi NCR, or a family-run enterprise in a Tier-3 town, we deliver remotely over
                WhatsApp &amp; Google Meet with in-person consultations across Indore &amp; Shajapur.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-5 py-2.5 text-xs font-semibold text-[#ffb84d] transition-colors hover:bg-[#ff9f1c]/20"
            >
              <span>All 18 Regional Hubs</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredCities.map((hub) => (
              <li key={hub.slug}>
                <Link
                  href={`/locations/${hub.slug}`}
                  className="flex min-h-[44px] items-center justify-between rounded-xl border border-white/10 bg-[#050607] px-3.5 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-[#ffb84d]"
                >
                  <span className="truncate">{hub.name}</span>
                  <ArrowUpRight className="size-3.5 shrink-0 text-zinc-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
