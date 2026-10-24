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
import { BRAND, FAQS, SERVICE_LINES, CAPABILITIES, VENTURES } from "@/lib/brand";
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
          "@id": `${BRAND.url}/#organization`,
          name: BRAND.name,
          url: BRAND.url,
          logo: `${BRAND.url}/brand/logo-full.png`,
          image: `${BRAND.url}/brand/logo-full.png`,
          description:
            "Enterprise software engineering, scalable web platforms, high-performance Android applications, CRM/ERP infrastructure, and AI automation.",
          slogan: BRAND.tagline,
          foundingDate: "2020-04-01",
          taxID: BRAND.gstin,
          identifier: [
            { "@type": "PropertyValue", name: "MSME Udyam", value: BRAND.udyamNumber },
            { "@type": "PropertyValue", name: "GSTIN", value: BRAND.gstin },
          ],
          founder: {
            "@type": "Person",
            "@id": `${BRAND.url}/about#hariom-vishwkarma`,
            name: BRAND.founder,
            jobTitle: BRAND.founderRole,
            url: `${BRAND.url}/about`,
          },
          email: BRAND.email,
          telephone: BRAND.phoneE164,
          address: {
            "@type": "PostalAddress",
            streetAddress: BRAND.addressLine,
            addressLocality: BRAND.city,
            addressRegion: "Madhya Pradesh",
            postalCode: BRAND.postalCode,
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 23.664,
            longitude: 76.322,
          },
          areaServed: ["IN", "Worldwide"],
          sameAs: [
            BRAND.instagramUrl,
            BRAND.githubUrl,
            BRAND.founderLinkedin,
            BRAND.founderTwitter,
            "https://wa.me/919165100124",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "MLHK Infotech Engineering Services",
            itemListElement: [
              ...SERVICE_LINES.map((s) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: s.title,
                  description: s.description,
                  url: `${BRAND.url}/services/${s.slug}`,
                },
              })),
              ...CAPABILITIES.map((c) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: c.title,
                  description: c.description,
                  url: `${BRAND.url}/services/${c.slug}`,
                },
              })),
            ],
          },
        }}
      />
      <FaqJsonLd faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />

      <Hero />

      {/* What We Actually Do — real crawlable content for Google */}
      <section className="bg-[#050607] px-4 py-20 md:px-6 md:py-28" aria-labelledby="what-we-do-heading">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">What we actually do</p>
          <h2 id="what-we-do-heading" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Software that runs your business, not just a website that sits there.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-300">
            <p>
              Most businesses come to us because they need a website. But what they actually need is a system — something
              that takes orders, sends invoices, tracks inventory, manages clients, or automates the repetitive work that
              eats up three hours of every day. That is what we build.
            </p>
            <p>
              We started in 2020 from Shajapur, a small town in Madhya Pradesh that most tech companies have never heard
              of. Hariom Vishwkarma, the founder, was studying computer applications at Vikram University in Ujjain when
              he took on his first few clients — local businesses that needed websites but could not afford Delhi or
              Bangalore prices. Those early projects taught us something important: the software itself matters less than
              whether it actually solves the problem the business has.
            </p>
            <p>
              Six years later, we have delivered over 20 projects across web development, mobile apps, CRM systems,
              billing platforms, and AI automation. Our clients range from solar energy companies that needed field
              operations tracking to e-commerce startups that needed a complete storefront with payment integration. We
              have built admin dashboards for schools, WhatsApp bots for customer support, and inventory management tools
              for small manufacturers.
            </p>
            <p>
              We are not a large agency with 50 people and a fancy office. We are a focused engineering team that writes
              every line of code in-house. No outsourcing, no templates, no WordPress themes with a fresh coat of paint.
              When you hire us, you get custom software that belongs to you — the source code, the design, everything.
            </p>
            <p>
              Our work ships on modern infrastructure — Cloudflare edge servers that load your site in under a second
              from anywhere in India, proper SSL encryption, automated backups, and server monitoring that alerts us
              before problems become downtime. We use the same technology stack that companies in San Francisco use, but
              we charge prices that make sense for Indian businesses.
            </p>
            <p>
              If you are a business owner looking for a website, an app, or a system to replace the spreadsheets and
              paper registers your team currently uses, we would like to talk. No hard sell, no jargon — just a
              straightforward conversation about what you need and what it would take to build it.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]">
              See all services we offer →
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-5 py-2.5 text-sm font-medium text-[#ffb84d] transition-colors hover:bg-[#ff9f1c]/20">
              Talk to us on WhatsApp →
            </a>
          </div>
        </div>
      </section>

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
