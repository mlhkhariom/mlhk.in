import { getMenu, getSiteSettings } from "@/lib/site";
import Link from "next/link";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { BrandMark, BrandWordmark } from "@/components/brand/BrandMark";
import { BRAND } from "@/lib/brand";

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

export default async function Footer() {
  const [items, settings] = await Promise.all([getMenu("footer"), getSiteSettings()]);
  const instagram = settings.social_instagram || BRAND.instagramUrl;
  const email = settings.contact_email || BRAND.email;
  const phone = settings.contact_phone || BRAND.phoneDisplay;
  const address = settings.contact_address || BRAND.location;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050607] text-sm text-zinc-400">
      <OrganizationJsonLd />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-3xl rounded-full bg-[#ff9f1c]/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-16 md:grid-cols-12 md:px-6">
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-3">
            <BrandMark />
            <BrandWordmark />
          </div>
          <p className="mt-5 max-w-xs leading-relaxed text-zinc-400">
            Web, mobile, enterprise and AI systems, built for businesses that intend to grow.
          </p>
          <p className="mt-4 font-display text-xs tracking-[0.3em] text-brand">INNOVATE. INTEGRATE. ELEVATE.</p>
          <div className="mt-6 flex items-center gap-2">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MLHK Infotech on Instagram"
              className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
            >
              <InstagramIcon className="size-[18px]" />
            </a>
            <a
              href={BRAND.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MLHK Infotech on GitHub"
              className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
            >
              <GithubIcon className="size-[18px]" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">Company</p>
          <ul className="space-y-3">
            {items.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-[#ffb84d]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">Resources</p>
          <ul className="space-y-3">
            <li><Link href="/blog" className="transition-colors hover:text-[#ffb84d]">Blog</Link></li>
            <li><Link href="/portfolio" className="transition-colors hover:text-[#ffb84d]">Portfolio</Link></li>
            <li><Link href="/subsidiaries" className="transition-colors hover:text-[#ffb84d]">Our Brands</Link></li>
            <li><Link href="/feed.xml" className="transition-colors hover:text-[#ffb84d]">RSS Feed</Link></li>
            <li><Link href="/sitemap.xml" className="transition-colors hover:text-[#ffb84d]">Sitemap</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">Contact</p>
          <ul className="space-y-3">
            <li><a href={`mailto:${email}`} className="transition-colors hover:text-[#ffb84d]">{email}</a></li>
            <li><a href={`tel:${BRAND.phoneE164}`} className="transition-colors hover:text-[#ffb84d]">{phone}</a></li>
            <li className="leading-relaxed">{address}</li>
          </ul>
          <p className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">Legal</p>
          <ul className="space-y-3">
            <li><Link href="/privacy-policy" className="transition-colors hover:text-[#ffb84d]">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="transition-colors hover:text-[#ffb84d]">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-zinc-500 md:flex-row md:px-6">
          <p>{settings.footer_text ?? `© ${year} MLHK Infotech. Founded by ${BRAND.founder}.`}</p>
          <p>@{BRAND.instagramHandle}</p>
        </div>
      </div>
    </footer>
  );
}
