import { safeDb } from "@/lib/db/safe";
import { getDb } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Portfolio",
    description: "Selected work from MLHK Infotech: web platforms, mobile apps and enterprise systems built for clients across India.",
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const db = safeDb();
  const items = await db.select().from(portfolio).all().catch(() => []);

  return (
    <>
      <JsonLd
        data={{
          "@type": "ItemList",
          name: "MLHK Infotech Portfolio",
          itemListElement: items.map((p, i) => ({
            "@type": "CreativeWork",
            position: i + 1,
            name: p.title,
            description: p.description ?? "",
            url: p.url ?? "https://mlhk.in/portfolio",
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />

      <PageHero
        eyebrow="Work"
        title={<>Products we have <span className="text-brand">shipped.</span></>}
        description="Web platforms, mobile apps and enterprise systems built for clients across India. Each one is measured against the outcome it was built to deliver."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl">
          {items.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-white/15 p-12 text-center">
              <p className="font-display text-xl font-bold text-white">Case studies are being prepared.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                We are publishing project write-ups with the outcomes each client agreed to share. In the meantime,
                talk to us about similar work.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40">
                  {p.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-black">
                      <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold text-white">{p.title}</h2>
                    {p.description && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>}
                    {p.tags && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tags.split(",").map((t) => (
                          <li key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">{t.trim()}</li>
                        ))}
                      </ul>
                    )}
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white">
                        View project <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 text-center">
            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
              Start your project
              <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
