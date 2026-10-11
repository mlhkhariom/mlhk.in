import { getMenu, getSiteSettings } from "@/lib/site";
import NavbarClient from "./NavbarClient";

const FALLBACK_NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Brands", href: "/subsidiaries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default async function Navbar() {
  const [dbItems, settings] = await Promise.all([getMenu("header"), getSiteSettings()]);
  const items = dbItems.length > 0 ? dbItems : FALLBACK_NAV;
  return <NavbarClient items={items} siteName={settings.site_name ?? "MLHK Infotech"} />;
}
