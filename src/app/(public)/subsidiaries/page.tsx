import { safeDb } from "@/lib/db/safe";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { VENTURES } from "@/lib/brand";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Our Brands",
    description: "The ventures under MLHK Infotech: e-commerce, creative, solar energy, media, journalism and education.",
    path: "/subsidiaries",
  });
}

export default async function SubsidiariesPage() {
  const db = safeDb();
  const dbBrands = await db.select().from(subsidiaries).where(eq(subsidiaries.active, true)).all().catch(() => []);

  // Use the admin-managed brand records when they exist; otherwise show the verified venture list.
  const useDb = dbBrands.length > 0;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": "https://mlhk.in/subsidiaries#list",
          name: "MLHK Infotech Venture Ecosystem",
          description: "The indigenous enterprise ventures and brands founded and operated under MLHK Infotech.",
          itemListElement: useDb
            ? dbBrands.map((b, i) => ({
                "@type": "Organization",
                position: i + 1,
                name: b.name,
                description: b.tagline ?? "",
                url: b.url ?? `https://mlhk.in/subsidiaries/${b.slug}`,
                parentOrganization: {
                  "@type": "Organization",
                  "@id": "https://mlhk.in/#organization",
                  name: "MLHK Infotech",
                  url: "https://mlhk.in",
                },
              }))
            : VENTURES.map((v, i) => ({
                "@type": "Organization",
                position: i + 1,
                name: v.name,
                description: `${v.sector} venture by MLHK Infotech.`,
                parentOrganization: {
                  "@type": "Organization",
                  "@id": "https://mlhk.in/#organization",
                  name: "MLHK Infotech",
                  url: "https://mlhk.in",
                },
              })),
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Brands", href: "/subsidiaries" }]} />

      <PageHero
        eyebrow="Ecosystem"
        title={<>Our brands, <span className="text-brand">one group.</span></>}
        description="The brands listed on our website. Each one is presented as part of the MLHK ecosystem; the legal and ownership relationship of each is confirmed on request."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl">
          {useDb ? (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dbBrands.map((b) => (
                <li key={b.id} className="group flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40">
                  {b.logo && <img src={b.logo} alt={b.name} className="mb-5 h-10 w-auto self-start object-contain" />}
                  {b.sector && <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">{b.sector}</span>}
                  <h2 className="mt-2 font-display text-xl font-bold text-white">{b.name}</h2>
                  {b.tagline && <p className="mt-2 text-sm text-zinc-300">{b.tagline}</p>}
                  {b.description && <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400" dangerouslySetInnerHTML={{ __html: b.description }} />}
                  <div className="mt-6 flex items-center gap-5">
                    <Link href={`/subsidiaries/${b.slug}`} className="text-sm font-semibold text-[#ffb84d] hover:text-white">Details</Link>
                    {b.url && (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-300 hover:text-white">
                        Visit <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {VENTURES.map((v, i) => (
                <li key={v.name} className={`group bg-[#050607] p-7 transition-colors duration-500 hover:bg-[#0c0d10] ${i === VENTURES.length - 1 && VENTURES.length % 3 === 2 ? "lg:col-span-2" : ""} ${i === VENTURES.length - 1 && VENTURES.length % 2 === 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <span className="font-display text-xs text-zinc-600 tabular-nums">0{i + 1}</span>
                  <h2 className="mt-6 font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">{v.name}</h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">{v.sector}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 text-center">
            <Link href="/about" className="text-sm font-semibold text-[#ffb84d] hover:text-white">
              Read the company story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
