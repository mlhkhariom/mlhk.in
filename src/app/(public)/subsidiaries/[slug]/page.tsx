import { safeDb } from "@/lib/db/safe";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const db = safeDb();
  const [brand] = await db
    .select()
    .from(subsidiaries)
    .where(eq(subsidiaries.slug, slug))
    .limit(1)
    .catch(() => []);
  if (!brand) return {};
  return buildSeo({
    title: `${brand.name} | MLHK Infotech Ecosystem`,
    description: brand.tagline ?? `${brand.name} by MLHK Infotech`,
    path: `/subsidiaries/${brand.slug}`,
    image: brand.logo ?? undefined,
  });
}

export default async function SubsidiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = safeDb();
  const [brand] = await db
    .select()
    .from(subsidiaries)
    .where(eq(subsidiaries.slug, slug))
    .limit(1)
    .catch(() => []);
  if (!brand) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `https://mlhk.in/subsidiaries/${brand.slug}#organization`,
          name: brand.name,
          description: brand.tagline ?? "",
          url: brand.url ?? `https://mlhk.in/subsidiaries/${brand.slug}`,
          ...(brand.logo ? { logo: brand.logo } : {}),
          parentOrganization: {
            "@type": "Organization",
            "@id": "https://mlhk.in/#organization",
            name: "MLHK Infotech",
            url: "https://mlhk.in",
          },
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Our Brands", href: "/subsidiaries" },
          { label: brand.name, href: `/subsidiaries/${brand.slug}` },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-[#050607] px-4 pb-20 pt-10 md:px-6 md:pt-16">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-30%] h-[400px] w-[80vw] max-w-3xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/15 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          {brand.sector && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              {brand.sector}
            </span>
          )}
          {brand.logo && <img src={brand.logo} alt={brand.name} className="mt-8 h-14 w-auto object-contain" />}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">{brand.name}</h1>
          {brand.tagline && <p className="mt-5 text-lg text-zinc-300">{brand.tagline}</p>}
          {brand.description && (
            <div className="prose prose-invert mt-8 max-w-none prose-p:text-zinc-400 prose-a:text-[#ffb84d]" dangerouslySetInnerHTML={{ __html: brand.description }} />
          )}

          <div className="mt-10 flex flex-wrap items-center gap-6">
            {brand.url && (
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
                Visit website
                <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            )}
            <Link href="/subsidiaries" className="text-sm font-semibold text-zinc-400 hover:text-white">
              All brands
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
