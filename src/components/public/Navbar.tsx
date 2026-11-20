import { getMenu, getSiteSettings } from "@/lib/site";
import NavbarClient from "./NavbarClient";

const FALLBACK_NAV = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/portfolio" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
];

export default async function Navbar() {
  const [dbItems, settings] = await Promise.all([getMenu("header"), getSiteSettings()]);
  const items = dbItems.length > 0 ? dbItems.slice(0, 5) : FALLBACK_NAV;
  return <NavbarClient items={items} siteName={settings.site_name ?? "MLHK Infotech"} />;
}
