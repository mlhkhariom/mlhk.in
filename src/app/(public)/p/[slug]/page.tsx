import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return { title: page?.metaTitle ?? page?.title, description: page?.metaDesc ?? undefined };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  if (!page || page.status !== "published") notFound();

  return (
    <>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: page.content ?? "" }} />
    </div>
    </>
  );
}
