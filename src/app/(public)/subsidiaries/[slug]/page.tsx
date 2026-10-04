import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function SubsidiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [brand] = await db.select().from(subsidiaries).where(eq(subsidiaries.slug, slug)).limit(1);
  if (!brand) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/subsidiaries" className="text-sm text-gray-400 hover:text-blue-600 mb-8 block">← All Brands</Link>
      {brand.logo && <img src={brand.logo} alt={brand.name} className="h-16 mb-6 object-contain" />}
      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mb-4 inline-block">{brand.sector}</span>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{brand.name}</h1>
      {brand.tagline && <p className="text-xl text-gray-500 mb-6">{brand.tagline}</p>}
      {brand.description && (
        <div className="prose prose-gray max-w-none mb-8" dangerouslySetInnerHTML={{ __html: brand.description }} />
      )}
      {brand.url && (
        <a href={brand.url} target="_blank" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block">
          Visit Website →
        </a>
      )}
    </div>
  );
}
