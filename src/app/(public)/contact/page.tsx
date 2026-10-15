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

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.486a.5.5 0 0 0 .613.635l5.799-1.525A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.867 9.867 0 0 1-5.031-1.376l-.36-.214-3.733.981.998-3.648-.235-.374A9.867 9.867 0 0 1 2.118 12C2.118 6.527 6.527 2.118 12 2.118S21.882 6.527 21.882 12 17.473 21.882 12 21.882z" />
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
    { icon: MapPin, label: "Address", value: `${BRAND.location}`, href: undefined },
    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: Phone, label: "Phone", value: BRAND.phoneDisplay, href: `tel:${BRAND.phoneE164}` },
    { icon: WhatsAppGlyph, label: "WhatsApp", value: "+91 91651 00124", href: "https://wa.me/919165100124" },
    { icon: Clock, label: "Support", value: "Support hours and response window set out in your plan", href: undefined },
    { icon: InstagramGlyph, label: "Instagram", value: `@${BRAND.instagramHandle}`, href: BRAND.instagramUrl },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${BRAND.url}/contact#page`,
          url: `${BRAND.url}/contact`,
          name: `Contact ${BRAND.name} Engineering Desk`,
          description:
            "Connect with MLHK Infotech for web platforms, mobile apps, enterprise systems, and AI automation inquiries.",
          mainEntity: {
            "@id": `${BRAND.url}/#organization`,
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />

      <PageHero
        eyebrow="Contact"
        title={<>Tell us what you are <span className="text-brand">building.</span></>}
        description="Share the goal, the users and the deadline. We reply with a plan and a timeline."
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
