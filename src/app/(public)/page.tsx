import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services, subsidiaries, testimonials, portfolio } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSiteSettings } from "@/lib/site";
import { buildSeo } from "@/lib/seo";
import JsonLd, { WebSiteJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo();
}

export default async function HomePage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [settings, allServices, allBrands, allTestimonials, allPortfolio] = await Promise.all([
    getSiteSettings(),
    db.select().from(services).where(eq(services.active, true)).all(),
    db.select().from(subsidiaries).where(eq(subsidiaries.active, true)).all(),
    db.select().from(testimonials).where(eq(testimonials.active, true)).all(),
    db.select().from(portfolio).all(),
  ]);

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
        contactPoint: { "@type": "ContactPoint", email: "Mlhkinfotech@gmail.com", contactType: "sales", availableLanguage: ["en", "hi"] },
      }} />

      {/* Announcement Bar */}
      {settings.announcement_bar && (
        <div className="bg-blue-600 text-white text-center text-xs py-2 px-4">{settings.announcement_bar}</div>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-500 text-white border-0">Est. April 2020 · Shajapur, MP</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {settings.hero_title ?? "Enterprise-Grade\nDigital Solutions"}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {settings.hero_subtitle ?? "From custom software to AI automation — MLHK Infotech builds complete digital ecosystems for businesses and startups."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="border border-white/40 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      {allServices.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Do</h2>
              <p className="text-gray-500">End-to-end technology solutions under one roof</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map(s => (
                <Card key={s.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold text-sm">{s.title.slice(0, 2)}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/services" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">All Services <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["2020", "Founded"], ["50+", "Projects"], [String(allBrands.length || "5") + "+", "Brands"], ["24/7", "Support"]].map(([val, label]) => (
            <div key={label}><p className="text-3xl font-bold text-blue-600">{val}</p><p className="text-sm text-gray-500 mt-1">{label}</p></div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      {allPortfolio.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Work</h2>
              <p className="text-gray-500">Recent projects we're proud of</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPortfolio.slice(0, 6).map(p => (
                <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                    {p.description && <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>}
                    {p.tags && <div className="flex flex-wrap gap-1 mt-2">{p.tags.split(",").map(t => <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{t.trim()}</span>)}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/portfolio" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">View All <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {allTestimonials.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allTestimonials.map(t => (
                <Card key={t.id}>
                  <CardContent className="p-6">
                    <div className="flex mb-3">{Array.from({ length: t.rating ?? 5 }).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.message}"</p>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    {t.company && <p className="text-xs text-gray-400">{t.company}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subsidiaries */}
      {allBrands.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Brands</h2>
              <p className="text-gray-500">A growing ecosystem of ventures</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {allBrands.map(b => (
                <Link key={b.id} href={`/subsidiaries/${b.slug}`} className="bg-white border rounded-xl px-6 py-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{b.sector}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{settings.cta_title ?? "Ready to Build Something Great?"}</h2>
          <p className="text-blue-100 mb-8">{settings.cta_subtitle ?? "Let's discuss your project. We respond within 24 hours."}</p>
          <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
