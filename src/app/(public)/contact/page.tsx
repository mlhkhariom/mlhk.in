import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Contact",
    description: "Tell us about your project. MLHK Infotech replies with a plan, a timeline and a clear cost.",
    path: "/contact",
  });
}

export default function ContactPage() {
  const rows: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: "Address", value: "Near Hanuman Temple, Barnawad, Shajapur, Madhya Pradesh", href: undefined },
    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: Phone, label: "Phone", value: BRAND.phoneDisplay, href: `tel:${BRAND.phoneE164}` },
    { icon: Clock, label: "Support", value: "24/7 Technical Support", href: undefined },
    { icon: InstagramGlyph, label: "Instagram", value: `@${BRAND.instagramHandle}`, href: BRAND.instagramUrl },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@type": "ContactPage",
          name: `Contact ${BRAND.name}`,
          description: "Get in touch with MLHK Infotech for project inquiries.",
          mainEntity: {
            "@type": "Organization",
            name: BRAND.name,
            email: BRAND.email,
            telephone: BRAND.phoneE164,
            address: { "@type": "PostalAddress", streetAddress: "Near Hanuman Temple, Barnawad", addressLocality: BRAND.city, addressRegion: "Madhya Pradesh", addressCountry: "IN" },
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: BRAND.email, telephone: BRAND.phoneE164, availableLanguage: ["en", "hi"] },
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <PageHero
        eyebrow="Contact"
        title={<>Tell us what you are <span className="text-brand">building.</span></>}
        description="Share the goal, the users and the deadline. We reply within 24 hours with a plan and a timeline."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
          <ul className="space-y-4 md:col-span-4">
            {rows.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ff9f1c]/10 text-[#ffb84d]">
                    <Icon className="size-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-white">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/40">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:col-span-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
