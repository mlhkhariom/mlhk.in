import { getMenu, getSiteSettings } from "@/lib/site";
import Link from "next/link";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { BrandMark, BrandWordmark } from "@/components/brand/BrandMark";
import { BRAND } from "@/lib/brand";
import { Phone, Mail, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.486a.5.5 0 0 0 .613.635l5.799-1.525A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.867 9.867 0 0 1-5.031-1.376l-.36-.214-3.733.981.998-3.648-.235-.374A9.867 9.867 0 0 1 2.118 12C2.118 6.527 6.527 2.118 12 2.118S21.882 6.527 21.882 12 17.473 21.882 12 21.882z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.93H5.06v8.57h2.8z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default async function Footer() {
  const [dbItems, settings] = await Promise.all([getMenu("footer"), getSiteSettings()]);

  // Data sanitization: protect against placeholder masked numbers ("+91-XXXXXXXXXX") and stale texts
  const instagram = settings.social_instagram || BRAND.instagramUrl;
  const rawPhone = settings.contact_phone || "";
  const phone = rawPhone && !rawPhone.includes("X") && rawPhone.length > 8 ? rawPhone : BRAND.phoneDisplay;
  const email = settings.contact_email && !settings.contact_email.includes("gmail") ? settings.contact_email : BRAND.email;
  const supportEmail = BRAND.supportEmail;
  const address = BRAND.location;
  const mapsUrl = BRAND.mapsUrl;
  const year = new Date().getFullYear();

  const servicesLinks = [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "AI & Automation", href: "/ai-automation" },
    { label: "Enterprise Systems (ERP)", href: "/services/enterprise-systems" },
    { label: "Graphics & UI/UX Branding", href: "/services/graphics-and-branding" },
    { label: "Digital Marketing & SEO", href: "/services/digital-marketing" },
    { label: "Support & Maintenance", href: "/services/support-and-maintenance" },
  ];

  const companyLinks = dbItems.length > 0 ? dbItems : [
    { label: "About MLHK", href: "/about" },
    { label: "Selected Portfolio", href: "/portfolio" },
    { label: "Venture Ecosystem", href: "/subsidiaries" },
    { label: "Delivery Process", href: "/process" },
    { label: "FAQs & Engagement", href: "/faq" },
    { label: "Contact Executive Desk", href: "/contact" },
  ];

  const portalLinks = [
    { label: "Client Workspace Portal", href: "/portal/dashboard" },
    { label: "Console Sign In", href: "/login" },
    { label: "Register Account", href: "/register" },
    { label: "Engineering Insights Blog", href: "/blog" },
    { label: "XML Sitemap", href: "/sitemap.xml" },
    { label: "RSS Feed", href: "/feed.xml" },
    { label: "Security & Disclosure", href: "/security.txt" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050607] text-sm text-zinc-400">
      <OrganizationJsonLd />

      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-4xl rounded-full bg-[#ff9f1c]/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#3b82f6]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Main Brand Column (lg:col-span-4) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group" aria-label="MLHK Infotech Home">
              <BrandMark className="transition-transform group-hover:scale-105" />
              <BrandWordmark />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Enterprise digital systems, high-speed web platforms, scalable Android apps, CRM/ERP infrastructure, and AI automation. Headquartered in Shajapur with an operating base in Indore, MP.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_8px_#ff9f1c]" />
              <p className="font-display text-xs tracking-[0.25em] text-[#ffb84d] font-semibold">
                INNOVATE. INTEGRATE. ELEVATE.
              </p>
            </div>

            {/* Pride in Bharat & National Mission Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              <span className="text-sm">🇮🇳</span>
              <span className="font-medium text-zinc-200">Built with Pride in Bharat</span>
              <span className="text-zinc-600">•</span>
              <span className="text-[#ffb84d]">Deployed Globally</span>
            </div>

            {/* Comprehensive Social Links (Mobile + Desktop) */}
            <div className="mt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-3">
                Official Channels
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://wa.me/919165100124"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Chat"
                  title="WhatsApp: +91 91651 00124"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/60 hover:text-[#25D366] hover:bg-[#25D366]/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <WhatsAppIcon className="size-[18px]" />
                </a>

                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MLHK Infotech on Instagram"
                  title="Instagram: @mlhkinfotech"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1306C]/60 hover:text-[#E1306C] hover:bg-[#E1306C]/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <InstagramIcon className="size-[18px]" />
                </a>

                <a
                  href={BRAND.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MLHK Infotech on GitHub"
                  title="GitHub: mlhkhariom"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white hover:bg-white/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <GithubIcon className="size-[18px]" />
                </a>

                <a
                  href={BRAND.founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Founder LinkedIn Profile"
                  title="LinkedIn: Hariom Vishwkarma (MLHK)"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A66C2]/60 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <LinkedInIcon className="size-[18px]" />
                </a>

                <a
                  href="https://x.com/mlhkinfotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MLHK Infotech on X"
                  title="X (Twitter): @mlhkinfotech"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white hover:bg-white/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <XIcon className="size-[17px]" />
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Headquarters Location"
                  title="Open in Google Maps"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] hover:bg-[#ff9f1c]/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                >
                  <MapPin className="size-[18px]" strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Column (lg:col-span-2) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Solutions
            </p>
            <ul className="space-y-2.5">
              {servicesLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch={true}
                    className="text-xs sm:text-sm text-zinc-400 transition-colors hover:text-[#ffb84d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column (lg:col-span-2) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch={true}
                    className="text-xs sm:text-sm text-zinc-400 transition-colors hover:text-[#ffb84d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & Resources (lg:col-span-2) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Portals
            </p>
            <ul className="space-y-2.5">
              {portalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch={true}
                    className="text-xs sm:text-sm text-zinc-400 transition-colors hover:text-[#ffb84d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Headquarters Column (lg:col-span-2) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Headquarters
            </p>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={`tel:${BRAND.phoneE164}`}
                  className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-[#ffb84d]"
                >
                  <Phone className="size-3.5 text-[#ff9f1c] shrink-0" strokeWidth={1.75} />
                  <span>{phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-[#ffb84d]"
                  title="Direct Inquiries"
                >
                  <Mail className="size-3.5 text-[#ff9f1c] shrink-0" strokeWidth={1.75} />
                  <span>{email}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="group inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-[#ffb84d]"
                  title="Client Helpdesk"
                >
                  <Mail className="size-3.5 text-zinc-500 shrink-0" strokeWidth={1.75} />
                  <span>{supportEmail}</span>
                </a>
              </li>

              <li className="pt-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-xs leading-relaxed text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="size-3.5 text-[#ff9f1c] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{address}</span>
                  </div>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#ffb84d] group-hover:underline">
                    Get Directions <ExternalLink className="size-3" />
                  </span>
                </a>
              </li>
            </ul>

            {/* Legal Links */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2.5">
                Legal &amp; Policies
              </p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <Link href="/terms-and-conditions" prefetch={true} className="transition-colors hover:text-[#ffb84d]">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" prefetch={true} className="transition-colors hover:text-[#ffb84d]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation-refund-policy" prefetch={true} className="transition-colors hover:text-[#ffb84d]">
                    Cancellation &amp; Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bottom Bar (Mobile + Desktop) */}
      <div className="relative border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-zinc-500 md:flex-row md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center md:text-left">
            <span>© {year} MLHK Infotech.</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span>Founded by <strong className="text-zinc-300 font-medium">{BRAND.founder}</strong></span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span className="text-zinc-500">Shajapur &amp; Indore, MP</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
              <span className="text-xs">🇮🇳</span>
              <span>Digital India</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Edge Global Network
            </span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffb84d] hover:underline"
            >
              @{BRAND.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
