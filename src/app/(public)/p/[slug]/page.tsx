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
    <div className="mx-auto max-w-3xl bg-[#050607] px-4 py-16">
      <h1 className="mb-10 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">{page.title}</h1>
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-zinc-400 prose-a:text-[#ffb84d]" dangerouslySetInnerHTML={{ __html: page.content ?? "" }} />
    </div>
    </>
  );
}
