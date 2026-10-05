import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Contact", description: "Have a project in mind? Let's talk. We respond within 24 hours.", path: "/contact" });
}

export default function ContactPage() {
  return (
    <>
    <JsonLd data={{
      "@type": "ContactPage",
      name: "Contact MLHK Infotech",
      description: "Get in touch with MLHK Infotech for project inquiries. We respond within 24 hours.",
      mainEntity: {
        "@type": "Organization",
        name: "MLHK Infotech",
        email: "admin@mlhk.in",
        telephone: "+919165100124",
        address: { "@type": "PostalAddress", streetAddress: "Near Hanuman Temple, Barnawad", addressLocality: "Shajapur", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
        contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "admin@mlhk.in", telephone: "+919165100124", availableLanguage: ["en", "hi"] },
      },
    }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Have a project in mind? Let's talk. We respond within 24 hours.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-8">
          {[
            { icon: MapPin, label: "Address", value: "Near Hanuman Temple, Barnawad, Shajapur, MP" },
            { icon: Mail, label: "Email", value: "admin@mlhk.in" },
            { icon: Phone, label: "Phone", value: "+91-9165100124" },
            { icon: Clock, label: "Support", value: "24/7 Technical Support" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm text-gray-700 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-2 bg-white border rounded-2xl p-8">
          <ContactForm />
        </div>
      </div>
    </div>
    </>
  );
}
