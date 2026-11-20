"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type LucideIcon,
  LayoutDashboard,
  FileText,
  Image,
  Users,
  UserCheck,
  FolderKanban,
  Receipt,
  Ticket,
  Settings,
  ChevronRight,
  Building2,
  Sparkles,
  ExternalLink,
  Layers,
  Sliders,
  DollarSign,
  MessageSquareQuote,
  MenuSquare,
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

  { label: "Content & CMS", type: "group" },
  { label: "Blog Posts", href: "/admin/cms/posts", icon: FileText },
  { label: "Pages", href: "/admin/cms/pages", icon: Layers },
  { label: "Services", href: "/admin/cms/services", icon: Sliders },
  { label: "Portfolio", href: "/admin/cms/portfolio", icon: FolderKanban },
  { label: "Testimonials", href: "/admin/cms/testimonials", icon: MessageSquareQuote },
  { label: "Subsidiaries", href: "/admin/cms/subsidiaries", icon: Building2 },
  { label: "Media Library", href: "/admin/cms/media", icon: Image },
  { label: "Menus", href: "/admin/cms/menus", icon: MenuSquare },
  { label: "Site Settings", href: "/admin/cms/settings", icon: Settings },

  { label: "CRM & Sales", type: "group" },
  { label: "Leads", href: "/admin/crm/leads", icon: Users },
  { label: "Clients", href: "/admin/crm/clients", icon: UserCheck },
  { label: "Follow-ups", href: "/admin/crm/followups", icon: UserCheck },

  { label: "ERP & Operations", type: "group" },
  { label: "Projects", href: "/admin/erp/projects", icon: FolderKanban },
  { label: "Invoices", href: "/admin/erp/invoices", icon: Receipt },
  { label: "Expenses", href: "/admin/erp/expenses", icon: DollarSign },
  { label: "Support Tickets", href: "/admin/erp/tickets", icon: Ticket },

  { label: "System", type: "group" },
  { label: "Admin Settings", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();

  return (
    <>
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <Link href="/admin/dashboard" onClick={onNavigate} className="group flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff9f1c] to-[#c2410c] text-black shadow-[0_0_18px_rgba(255,159,28,0.3)] transition-transform group-hover:scale-105">
            <Sparkles className="size-4 text-[#050607]" />
          </div>
          <div>
            <span className="flex items-center gap-1 font-display text-sm font-bold tracking-tight text-white">
              MLHK<span className="text-[#ff9f1c]">.</span>
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Control Console
            </p>
          </div>
        </Link>
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close navigation menu"
            className="flex size-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 text-xs font-medium" aria-label="Admin Navigation">
        {nav.map((item, i) => {
          if (item.type === "group") {
            return (
              <p
                key={i}
                className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 first:pt-1"
              >
                {item.label}
              </p>
            );
          }

          const Icon = item.icon!;
          const active = path === item.href || (item.href !== "/admin/dashboard" && path?.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href!}
              prefetch={false}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                active
                  ? "bg-[#ff9f1c]/10 font-semibold text-[#ffb84d] shadow-[inset_0_0_0_1px_rgba(255,159,28,0.25)]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
              }`}
            >
              <Icon
                className={`size-4 transition-colors ${
                  active ? "text-[#ff9f1c]" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {active && <ChevronRight className="ml-auto size-3 text-[#ff9f1c]/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 bg-white/[0.01] p-3">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <span>Live Website</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#07080a] text-zinc-300 lg:flex">
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
        className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/10"
      >
        <Menu className="size-5" />
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
