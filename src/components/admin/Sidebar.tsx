"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type LucideIcon,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  UserCheck,
  CalendarClock,
  FolderKanban,
  Receipt,
  Ticket,
  Settings,
  Building2,
  ExternalLink,
  Layers,
  Sliders,
  IndianRupee,
  MessageSquareQuote,
  MenuSquare,
  Briefcase,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  type?: "group";
};

const nav: NavItem[] = [
  { label: "Overview", type: "group" },
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },

  { label: "CRM & Sales", type: "group" },
  { label: "Leads Pipeline", href: "/admin/crm/leads", icon: Users },
  { label: "Clients", href: "/admin/crm/clients", icon: UserCheck },
  { label: "Follow-ups", href: "/admin/crm/followups", icon: CalendarClock },

  { label: "ERP & Operations", type: "group" },
  { label: "Projects & Kanban", href: "/admin/erp/projects", icon: FolderKanban },
  { label: "GST Invoices", href: "/admin/erp/invoices", icon: Receipt },
  { label: "Expenses", href: "/admin/erp/expenses", icon: IndianRupee },
  { label: "Support Desk", href: "/admin/erp/tickets", icon: Ticket },

  { label: "Content & CMS", type: "group" },
  { label: "Blog Posts", href: "/admin/cms/posts", icon: FileText },
  { label: "Pages", href: "/admin/cms/pages", icon: Layers },
  { label: "Services", href: "/admin/cms/services", icon: Sliders },
  { label: "Portfolio", href: "/admin/cms/portfolio", icon: Briefcase },
  { label: "Testimonials", href: "/admin/cms/testimonials", icon: MessageSquareQuote },
  { label: "Subsidiaries", href: "/admin/cms/subsidiaries", icon: Building2 },
  { label: "Media Library", href: "/admin/cms/media", icon: ImageIcon },
  { label: "Navigation Menus", href: "/admin/cms/menus", icon: MenuSquare },
  { label: "Site Identity", href: "/admin/cms/settings", icon: Settings },

  { label: "System", type: "group" },
  { label: "Team & Security", href: "/admin/settings", icon: ShieldCheck },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();

  return (
    <>
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <Link href="/admin/dashboard" onClick={onNavigate} className="group flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#ff9f1c] font-display text-sm font-black tracking-tight text-[#07080a] transition-transform group-hover:scale-105">
            M
          </div>
          <div className="leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-white">
              MLHK<span className="text-[#ff9f1c]">.</span>
            </span>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
              ERP · CRM · CMS
            </p>
          </div>
        </Link>
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close navigation menu"
            className="flex size-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav
        className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 text-[13px] font-medium"
        aria-label="Admin Navigation"
      >
        {nav.map((item, i) => {
          if (item.type === "group") {
            return (
              <p
                key={i}
                className="px-3 pb-1.5 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 first:pt-1"
              >
                {item.label}
              </p>
            );
          }

          const Icon = item.icon!;
          const active =
            path === item.href ||
            (item.href !== "/admin/dashboard" && path?.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href!}
              prefetch={false}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors ${
                active
                  ? "bg-white/[0.06] font-semibold text-white"
                  : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-100"
              }`}
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[#ff9f1c]"
                />
              )}
              <Icon
                className={`size-4 shrink-0 transition-colors ${
                  active ? "text-[#ff9f1c]" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Link */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
        >
          <span>mlhk.in Live Site</span>
          <ExternalLink className="size-3.5 text-zinc-500" />
        </Link>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#07080a] text-zinc-300 lg:flex print:hidden">
      <SidebarContent />
    </aside>
  );
}

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d0f14] text-zinc-200 hover:bg-white/[0.06]"
      >
        <Menu className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r border-white/10 bg-[#07080a] text-zinc-300 shadow-2xl">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </div>
  );
}
