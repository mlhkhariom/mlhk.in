"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import type { LocationTierBucket } from "@/lib/seo-locations";

export interface DirectoryCityItem {
  slug: string;
  name: string;
  nameHi: string;
  state: string;
  stateHi: string;
  tierLabel: string;
  tierBucket: LocationTierBucket;
  summary: string;
  summaryHi: string;
  areasPreview: string;
  startingPrice: string;
  imageSrc: string;
}

const BUCKETS: readonly ("All" | LocationTierBucket)[] = [
  "All",
  "HQ & MP",
  "Tier-1 Metro",
  "Tier-2 Growth",
  "Tier-3 Regional",
  "Pan-India",
];

const BUCKET_LABELS_HI: Record<"All" | LocationTierBucket, string> = {
  All: "सभी शहर",
  "HQ & MP": "मुख्यालय व MP",
  "Tier-1 Metro": "Tier-1 मेट्रो",
  "Tier-2 Growth": "Tier-2 ग्रोथ शहर",
  "Tier-3 Regional": "Tier-3 क्षेत्रीय शहर",
  "Pan-India": "पूरा भारत व गाँव",
};

export function LocationsDirectoryClient({
  items,
  lang,
}: {
  items: readonly DirectoryCityItem[];
  lang: "en" | "hi";
}) {
  const isHi = lang === "hi";
  const [activeBucket, setActiveBucket] = useState<"All" | LocationTierBucket>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: items.length };
    for (const item of items) {
      map[item.tierBucket] = (map[item.tierBucket] ?? 0) + 1;
    }
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeBucket !== "All" && item.tierBucket !== activeBucket) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameHi.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.stateHi.toLowerCase().includes(q) ||
        item.areasPreview.toLowerCase().includes(q) ||
        item.tierBucket.toLowerCase().includes(q)
      );
    });
  }, [items, activeBucket, query]);

  return (
    <div className="space-y-8">
      {/* Search + Tier Filter Controls */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={isHi ? "अपना शहर या राज्य खोजें" : "Search your city, state, or industrial area"}
            placeholder={
              isHi
                ? "शहर या राज्य खोजें (इंदौर, सूरत, वाराणसी, रतलाम, कोटा...)"
                : "Search city or state (Indore, Surat, Varanasi, Ratlam, Kota...)"
            }
            className="w-full rounded-full border border-white/12 bg-white/[0.03] py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[#ff9f1c]/60"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear city search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="City Tier Filters">
          {BUCKETS.map((bucket) => {
            const active = activeBucket === bucket;
            const label = isHi ? BUCKET_LABELS_HI[bucket] : bucket;
            return (
              <button
                key={bucket}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveBucket(bucket)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-[#ff9f1c]/55 bg-[#ff9f1c]/15 text-[#ffb84d]"
                    : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {label} <span className="ml-1 tabular-nums opacity-75">({counts[bucket] ?? 0})</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0a0b0e] p-10 text-center">
          <p className="font-display text-lg font-bold text-white">
            {isHi ? "कोई शहर नहीं मिला।" : "No matching city hub found."}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {isHi
              ? "हम भारत के सभी 28 राज्यों और गाँवों में काम करते हैं — 'पूरा भारत' हब देखें या सर्च रीसेट करें।"
              : "We still serve every pin code in India — reset the filter or open our Pan-India hub."}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveBucket("All");
            }}
            className="mt-5 rounded-full bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black hover:bg-[#ffb84d]"
          >
            {isHi ? "सभी 38 शहर दिखाएं" : "Show all 38 hubs"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const primaryHref = isHi ? `/hi/locations/${item.slug}` : `/locations/${item.slug}`;
            const altHref = isHi ? `/locations/${item.slug}` : `/hi/locations/${item.slug}`;
            return (
              <div
                key={item.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b0e] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff9f1c]/50"
              >
                <Link href={primaryHref} className="relative block aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <ShowcaseImage
                    src={item.imageSrc}
                    alt={`${isHi ? item.nameHi : item.name} IT & Web Services`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-transparent opacity-85" />
                  <span className="absolute left-3.5 top-3.5 rounded-md border border-white/15 bg-black/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffb84d] backdrop-blur-sm">
                    {isHi ? BUCKET_LABELS_HI[item.tierBucket] : item.tierBucket}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                      <span>{isHi ? item.stateHi : item.state}</span>
                      <span className="tabular-nums text-zinc-300">
                        {isHi ? `${item.startingPrice} से` : `From ${item.startingPrice}`}
                      </span>
                    </div>
                    <Link href={primaryHref} className="mt-2 block">
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                        {isHi ? `${item.nameHi} (${item.name})` : `${item.name} · ${item.nameHi}`}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                      {isHi ? item.summaryHi : item.summary}
                    </p>
                    <p className="mt-3 line-clamp-1 text-[11px] text-zinc-500">
                      <span className="font-medium text-zinc-300">{isHi ? "क्षेत्र:" : "Covers:"}</span>{" "}
                      {item.areasPreview}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-3.5 text-xs">
                    <Link
                      href={primaryHref}
                      className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:text-white"
                    >
                      {isHi ? `${item.nameHi} पेज देखें` : `Explore ${item.name}`}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                    <Link
                      href={altHref}
                      className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:border-[#ff9f1c]/45 hover:text-[#ffb84d]"
                    >
                      {isHi ? "English" : "हिन्दी"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
