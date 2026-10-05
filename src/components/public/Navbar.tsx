import { getMenu, getSiteSettings } from "@/lib/site";
import NavbarClient from "./NavbarClient";


export default async function Navbar() {
  const [items, settings] = await Promise.all([getMenu("header"), getSiteSettings()]);
  return <NavbarClient items={items} siteName={settings.site_name ?? "MLHK Infotech"} />;
}
