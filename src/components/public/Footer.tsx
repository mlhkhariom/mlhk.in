import { getMenu, getSiteSettings } from "@/lib/site";
import Link from "next/link";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default async function Footer() {
  const [items, settings] = await Promise.all([getMenu("footer"), getSiteSettings()]);
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <OrganizationJsonLd />
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-white font-bold text-lg mb-2">{settings.site_name ?? "MLHK Infotech"}</p>
          <p className="text-xs leading-relaxed">{settings.site_tagline ?? "Enterprise-grade IT & Digital Solutions"}</p>
          {settings.contact_address && <p className="text-xs mt-2 leading-relaxed">{settings.contact_address}</p>}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          {items.map(l => (
            <Link key={l.href} href={l.href} className="block mb-1 hover:text-white transition-colors">{l.label}</Link>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Resources</p>
          <Link href="/blog" className="block mb-1 hover:text-white transition-colors">Blog</Link>
          <Link href="/portfolio" className="block mb-1 hover:text-white transition-colors">Portfolio</Link>
          <Link href="/subsidiaries" className="block mb-1 hover:text-white transition-colors">Our Brands</Link>
          <Link href="/feed.xml" className="block mb-1 hover:text-white transition-colors">RSS Feed</Link>
          <Link href="/sitemap.xml" className="block mb-1 hover:text-white transition-colors">Sitemap</Link>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          {settings.contact_email && <p className="mb-1">{settings.contact_email}</p>}
          {settings.contact_phone && <p className="mb-1">{settings.contact_phone}</p>}
          <p className="mt-3 text-white font-semibold mb-1">Legal</p>
          <Link href="/privacy-policy" className="block mb-1 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="block mb-1 hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        {settings.footer_text ?? `© ${new Date().getFullYear()} MLHK Infotech. Founded by Hariom Vishwkarma.`}
      </div>
    </footer>
  );
}
