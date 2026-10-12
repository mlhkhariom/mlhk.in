import { buildSeo } from "@/lib/seo";
import JsonLd, { WebSiteJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Services3D } from "@/components/home/Services3D";
import { WhyMlhk } from "@/components/home/WhyProcess";
import { VenturesGrid, AboutTimeline } from "@/components/home/WorkAbout";
import { StatsCounter, type StatItem } from "@/components/home/StatsCounter";
import { Faq, ContactCTA } from "@/components/home/ContactCTA";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { LatestPosts } from "@/components/home/LatestPosts";
import { BRAND, FAQS, SERVICE_LINES, VENTURES } from "@/lib/brand";
import { safeDb } from "@/lib/db/safe";
import { portfolio, blogPosts } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";

export const revalidate = 60;

export async function generateMetadata() {
  return buildSeo({
    title: "Web, Mobile, AI and Enterprise Software",
    description:
      "MLHK Infotech builds web platforms, Android apps, CRM and ERP systems and AI automation. Innovate. Integrate. Elevate. Based in Shajapur, MP.",
    path: "/",
  });
}

const STATS: StatItem[] = [
  { value: BRAND.foundedYear, label: "Founded", grouping: false },
  { value: 20, label: "Projects delivered", suffix: "+" },
  { value: VENTURES.length, label: "Brands in ecosystem" },
  { value: SERVICE_LINES.length, label: "Core service lines" },
];

export default async function HomePage() {
  const db = safeDb();
  const [featuredPortfolio, latestPosts] = await Promise.all([
    db
      ?.select()
      .from(portfolio)
      .orderBy(asc(portfolio.order))
      .limit(3)
      .all()
      .catch(() => []) ?? [],
    db
      ?.select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(3)
      .all()
      .catch(() => []) ?? [],
  ]);

  return (
    <>
      <WebSiteJsonLd name={BRAND.name} url={BRAND.url} />
      <JsonLd
        data={{
          "@type": "ProfessionalService",
          name: BRAND.name,
          url: BRAND.url,
          description: "Web, mobile, enterprise and AI systems from Shajapur, MP, India.",
          slogan: BRAND.tagline,
          foundingDate: BRAND.foundedMonthIso,
          founder: { "@type": "Person", name: BRAND.founder, jobTitle: BRAND.founderRole },
          email: BRAND.email,
          telephone: BRAND.phoneE164,
          address: {
            "@type": "PostalAddress",
            addressLocality: BRAND.city,
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
          areaServed: "IN",
          sameAs: [BRAND.instagramUrl, BRAND.githubUrl],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "MLHK Infotech services",
            itemListElement: SERVICE_LINES.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.description },
            })),
          },
        }}
      />
      <FaqJsonLd faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />

      <Hero />
      <Services3D />
      <WhyMlhk />
      <FeaturedWork items={featuredPortfolio} />
      <VenturesGrid />
      <AboutTimeline />
      <StatsCounter stats={STATS} />
      <LatestPosts posts={latestPosts} />
      <Faq />
      <ContactCTA />
    </>
  );
}
