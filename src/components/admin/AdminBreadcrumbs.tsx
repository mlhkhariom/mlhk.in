"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  admin: "Console",
  dashboard: "Dashboard",
  crm: "CRM",
  leads: "Leads",
  clients: "Clients",
  followups: "Follow-ups",
  erp: "ERP",
  projects: "Projects",
  invoices: "Invoices",
  new: "New Invoice",
  expenses: "Expenses",
  tickets: "Support Desk",
  cms: "CMS",
  posts: "Blog Posts",
  pages: "Pages",
  services: "Services",
  portfolio: "Portfolio",
  testimonials: "Testimonials",
  subsidiaries: "Subsidiaries",
  media: "Media Library",
  menus: "Menus",
  settings: "Settings",
};

const SECTION_FALLBACK_HREF: Record<string, string> = {
  admin: "/admin/dashboard",
  crm: "/admin/crm/leads",
  erp: "/admin/erp/projects",
  cms: "/admin/cms/posts",
};

export default function AdminBreadcrumbs() {
  const pathname = usePathname() || "/admin/dashboard";
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, idx) => {
    const rawHref = "/" + segments.slice(0, idx + 1).join("/");
    const href = SECTION_FALLBACK_HREF[seg] && idx < segments.length - 1 ? SECTION_FALLBACK_HREF[seg] : rawHref;
    const isUuidLike = seg.length > 20 || /^[0-9a-f-]{8,}$/i.test(seg);
    const label = LABELS[seg] ?? (isUuidLike ? `Record #${seg.slice(0, 8)}` : seg.charAt(0).toUpperCase() + seg.slice(1));
    return { label, href, isLast: idx === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-xs text-zinc-400 md:flex">
      {crumbs.map((c, idx) => (
        <span key={`${c.href}-${idx}`} className="flex items-center gap-1.5">
          {idx > 0 && <ChevronRight className="size-3 text-zinc-600" aria-hidden="true" />}
          {c.isLast ? (
            <span className="font-medium text-zinc-100">{c.label}</span>
          ) : (
            <Link href={c.href} className="transition-colors hover:text-zinc-200">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
