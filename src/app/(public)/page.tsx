import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services, subsidiaries, testimonials, portfolio } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSiteSettings } from "@/lib/site";
import { buildSeo } from "@/lib/seo";
import JsonLd, { WebSiteJsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Services3D } from "@/components/home/Services3D";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ContactCTA } from "@/components/home/ContactCTA";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<any> {
  return buildSeo();
}

export default async function HomePage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const safe = <T,>(q: Promise<T[]>): Promise<T[]> => q.catch(() => []);
  const [settings, allServices, allBrands, allTestimonials, allPortfolio] = await Promise.all([
    getSiteSettings(),
    safe(db.select().from(services).where(eq(services.active, true)).all()),
    safe(db.select().from(subsidiaries).where(eq(subsidiaries.active, true)).all()),
    safe(db.select().from(testimonials).where(eq(testimonials.active, true)).all()),
    safe(db.select().from(portfolio).all()),
  ]);

  const servicesData = allServices.length > 0
    ? allServices.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description ?? "",
      }))
    : [
        { id: "svc-1", title: "Software Development", description: "Custom enterprise applications built on Node.js, Python, and Java — designed for scale from day one." },
        { id: "svc-2", title: "Mobile Apps", description: "Native and cross-platform mobile solutions for iOS and Android that users love to open." },
        { id: "svc-3", title: "Cloud Infrastructure", description: "Secure, resilient cloud architecture on AWS and Cloudflare Edge with zero-downtime deployment." },
        { id: "svc-4", title: "AI & Automation", description: "Practical AI integration — workflow automation, data analysis, and intelligent decision support." },
        { id: "svc-5", title: "Cyber Security", description: "CIS benchmark auditing, access controls, and threat monitoring to keep your data protected." },
        { id: "svc-6", title: "Data Analytics", description: "Dashboards and reporting that turn raw data into decisions your team actually uses." },
      ];

  const portfolioData = allPortfolio.length > 0
    ? allPortfolio.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description ?? "",
        image: p.image,
        tags: p.tags,
      }))
    : [
        {
          id: "proj-1",
          title: "IKSC India — E-commerce Platform",
          description: "A full-stack commerce platform handling inventory, payments, and order fulfillment for a nationwide retail brand.",
          image: "https://picsum.photos/seed/iksc-ecommerce/800/600",
          tags: "e-commerce, Node.js, Stripe",
        },
        {
          id: "proj-2",
          title: "Erotix Green Energy — Solar Monitoring",
          description: "Real-time IoT dashboard tracking solar array performance, efficiency reports, and predictive maintenance alerts.",
          image: "https://picsum.photos/seed/erotix-solar/800/600",
          tags: "IoT, React, time-series",
        },
        {
          id: "proj-3",
          title: "RX Media — Content CMS",
          description: "Headless publishing platform powering multiple regional news sites with role-based workflows and scheduling.",
          image: "https://picsum.photos/seed/rx-media/800/600",
          tags: "CMS, Next.js, workflow",
        },
        {
          id: "proj-4",
          title: "TET News — Journalism Platform",
          description: "A distributed newsroom system for reporting, verification, and cross-platform distribution to social channels.",
          image: "https://picsum.photos/seed/tet-news/800/600",
          tags: "journalism, API-first",
        },
        {
          id: "proj-5",
          title: "HVIT — Student Management System",
          description: "End-to-end academic management: admissions, grades, attendance, and certification across multiple campuses.",
          image: "https://picsum.photos/seed/hvit-sms/800/600",
          tags: "SaaS, multi-tenant",
        },
        {
          id: "proj-6",
          title: "Internal ERP — Project & Finance",
          description: "Integrated project management, timesheets, GST invoicing, and expense tracking for internal operations.",
          image: "https://picsum.photos/seed/internal-erp/800/600",
          tags: "ERP, finance, governance",
        },
      ];

  const statsData = [
    { value: 2020, label: "Founded", grouping: false },
    { value: 50, label: "Projects", suffix: "+" },
    { value: allBrands.length || 6, label: "Brands", suffix: "+" },
    { value: 24, label: "Support", suffix: "/7" },
  ];

  return (
    <>
      <WebSiteJsonLd name="MLHK Infotech" url="https://mlhk.in" />
      <JsonLd data={{
        "@type": "Organization",
        name: "MLHK Infotech",
        url: "https://mlhk.in",
        logo: "https://mlhk.in/logo.png",
        foundingDate: "2020-04",
        founder: { "@type": "Person", name: "Hariom Vishwkarma" },
        address: { "@type": "PostalAddress", streetAddress: "Near Hanuman Temple, Barnawad", addressLocality: "Shajapur", addressRegion: "Madhya Pradesh", postalCode: "466001", addressCountry: "IN" },
        sameAs: ["https://github.com/mlhkhariom"],
        telephone: "+919165100124",
        contactPoint: { "@type": "ContactPoint", email: "admin@mlhk.in", telephone: "+919165100124", contactType: "sales", availableLanguage: ["en", "hi"] },
      }} />

      <Hero />
      <Services3D services={servicesData} />
      <PortfolioGrid projects={portfolioData} />
      <AboutSection />
      <StatsCounter stats={statsData} />
      <ContactCTA
        title={settings.cta_title ?? "Ready to build something great?"}
        subtitle={settings.cta_subtitle ?? "Tell us about your project. We respond within 24 hours."}
      />
    </>
  );
}
