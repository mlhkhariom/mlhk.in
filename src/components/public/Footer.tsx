import { getMenu, getSiteSettings } from "@/lib/site";
import Link from "next/link";

export const runtime = "edge";

export default async function Footer() {
  const [items, settings] = await Promise.all([getMenu("footer"), getSiteSettings()]);
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-white font-bold text-lg mb-2">{settings.site_name ?? "MLHK Infotech"}</p>
          <p className="text-xs leading-relaxed">{settings.site_tagline ?? ""}</p>
          {settings.contact_address && <p className="text-xs mt-2 leading-relaxed">{settings.contact_address}</p>}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          {items.map(l => (
            <Link key={l.href} href={l.href} className="block mb-1 hover:text-white transition-colors">{l.label}</Link>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          {settings.contact_email && <p className="mb-1">{settings.contact_email}</p>}
          {settings.contact_phone && <p className="mb-1">{settings.contact_phone}</p>}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Social</p>
          {[["Facebook", settings.social_facebook], ["Instagram", settings.social_instagram], ["LinkedIn", settings.social_linkedin], ["YouTube", settings.social_youtube]].filter(([, v]) => v).map(([l, h]) => (
            <a key={l} href={h} target="_blank" className="block mb-1 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        {settings.footer_text ?? `© ${new Date().getFullYear()} MLHK Infotech`}
      </div>
    </footer>
  );
}
