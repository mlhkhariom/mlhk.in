import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buildSeo } from "@/lib/seo";
import { ServiceJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamic = "force-dynamic";

const serviceFaqs = [
  { question: "What web development services does MLHK Infotech offer?", answer: "We build custom websites, SaaS platforms, web applications, e-commerce stores, and admin dashboards using modern frameworks like Next.js, React, and Node.js." },
  { question: "Do you provide mobile app development?", answer: "Yes, we develop native Android and cross-platform mobile apps for businesses and startups." },
  { question: "What is included in your CRM/ERP solutions?", answer: "Our CRM/ERP systems include lead management, client tracking, invoicing, project management, ticketing, and expense tracking — fully customizable to your business." },
  { question: "How long does a typical project take?", answer: "Simple websites take 1-2 weeks. SaaS platforms and custom apps typically take 4-12 weeks depending on complexity. We provide detailed timelines before starting." },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Services", description: "Complete technology solutions — Web, Mobile, SaaS, CRM, ERP, AI Automation.", path: "/services" });
}

export default async function ServicesPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const allServices = await db.select().from(services).where(eq(services.active, true)).all();

  return (
    <>
      <ServiceJsonLd services={allServices.map(s => ({ name: s.title, description: s.description ?? "" }))} />
      <FaqJsonLd faqs={serviceFaqs} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Complete technology solutions — from idea to deployment and beyond.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map(s => (
            <Card key={s.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 font-bold">{s.title.slice(0, 2)}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section for AEO */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {serviceFaqs.map(faq => (
              <details key={faq.question} className="group border rounded-xl p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center mt-14">
          <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Discuss Your Project</Link>
        </div>
      </div>
    </>
  );
}
