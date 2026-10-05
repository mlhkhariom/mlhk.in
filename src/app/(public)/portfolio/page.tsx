import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Portfolio", description: "Projects we've built for clients across India.", path: "/portfolio" });
}

export default async function PortfolioPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const items = await db.select().from(portfolio).all();

  return (
    <>
    <JsonLd data={{
      "@type": "ItemList",
      name: "MLHK Infotech Portfolio",
      itemListElement: items.map((p, i) => ({
        "@type": "CreativeWork",
        position: i + 1,
        name: p.title,
        description: p.description ?? "",
        url: p.url ?? "https://mlhk.in/portfolio",
      })),
    }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h1>
        <p className="text-gray-500">Projects we've built for clients across India</p>
      </div>
      {items.length === 0 ? (
        <p className="text-center text-gray-400 py-20">Portfolio coming soon...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />}
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                {p.description && <p className="text-sm text-gray-500 mb-3 leading-relaxed">{p.description}</p>}
                {p.tags && <div className="flex flex-wrap gap-1 mb-3">{p.tags.split(",").map(t => <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{t.trim()}</span>)}</div>}
                {p.url && <a href={p.url} target="_blank" className="text-xs text-blue-600 hover:underline">View Project →</a>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Start Your Project</Link>
      </div>
    </div>
    </>
  );
}
