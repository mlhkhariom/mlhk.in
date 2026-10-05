import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Our Brands", description: "A growing ecosystem of ventures under MLHK Infotech.", path: "/subsidiaries" });
}

export default async function SubsidiariesPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const brands = await db.select().from(subsidiaries).where(eq(subsidiaries.active, true)).all();

  return (
    <>
    <JsonLd data={{
      "@type": "ItemList",
      name: "MLHK Infotech Brands",
      description: "A growing ecosystem of ventures under MLHK Infotech.",
      itemListElement: brands.map((b, i) => ({
        "@type": "Organization",
        position: i + 1,
        name: b.name,
        description: b.tagline ?? "",
        url: b.url ?? `https://mlhk.in/subsidiaries/${b.slug}`,
        parentOrganization: { "@type": "Organization", name: "MLHK Infotech", url: "https://mlhk.in" },
      })),
    }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Brands" }]} />
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Brands</h1>
        <p className="text-gray-500">A growing ecosystem of ventures under MLHK Infotech</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map(b => (
          <div key={b.id} className="bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            {b.logo && <img src={b.logo} alt={b.name} className="h-12 mb-4 object-contain" />}
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mb-3 inline-block">{b.sector}</span>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{b.name}</h2>
            {b.tagline && <p className="text-sm text-gray-500 mb-3">{b.tagline}</p>}
            {b.description && <p className="text-sm text-gray-600 leading-relaxed mb-4">{b.description}</p>}
            {b.url && <a href={b.url} target="_blank" className="text-sm text-blue-600 hover:underline font-medium">Visit Website →</a>}
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/about" className="text-sm text-blue-600 hover:underline">Learn more about MLHK Infotech →</Link>
      </div>
    </div>
    </>
  );
}
