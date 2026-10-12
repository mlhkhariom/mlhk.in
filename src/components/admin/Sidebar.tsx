"use client";

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

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#07080a] text-zinc-300">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff9f1c] to-[#c2410c] text-black shadow-[0_0_18px_rgba(255,159,28,0.3)] transition-transform group-hover:scale-105">
            <Sparkles className="size-4 text-[#050607]" />
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-1">
              MLHK<span className="text-[#ff9f1c]">.</span>
            </span>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Control Console
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 text-xs font-medium">
        {nav.map((item, i) => {
          if (item.type === "group") {
            return (
              <p
                key={i}
                className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 first:pt-1"
              >
                {item.label}
              </p>
            );
          }

          const Icon = item.icon!;
          const active = path === item.href || (item.href !== "/admin/dashboard" && path?.startsWith(item.href!));

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-all ${
                active
                  ? "bg-[#ff9f1c]/10 text-[#ffb84d] font-semibold shadow-[inset_0_0_0_1px_rgba(255,159,28,0.25)]"
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
      <div className="border-t border-white/10 p-3 bg-white/[0.01]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Website
          </span>
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </aside>
  );
}
