"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Image, Users, UserCheck,
  FolderKanban, Receipt, Ticket, Settings, ChevronRight, Building2
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "CMS", type: "group" },
  { label: "Blog Posts", href: "/admin/cms/posts", icon: FileText },
  { label: "Pages", href: "/admin/cms/pages", icon: FileText },
  { label: "Services", href: "/admin/cms/services", icon: FileText },
  { label: "Portfolio", href: "/admin/cms/portfolio", icon: Image },
  { label: "Testimonials", href: "/admin/cms/testimonials", icon: Image },
  { label: "Subsidiaries", href: "/admin/cms/subsidiaries", icon: Building2 },
  { label: "Media", href: "/admin/cms/media", icon: Image },
  { label: "Menus", href: "/admin/cms/menus", icon: Settings },
  { label: "Site Settings", href: "/admin/cms/settings", icon: Settings },
  { label: "CRM", type: "group" },
  { label: "Leads", href: "/admin/crm/leads", icon: Users },
  { label: "Clients", href: "/admin/crm/clients", icon: UserCheck },
  { label: "Follow-ups", href: "/admin/crm/followups", icon: UserCheck },
  { label: "ERP", type: "group" },
  { label: "Projects", href: "/admin/erp/projects", icon: FolderKanban },
  { label: "Invoices", href: "/admin/erp/invoices", icon: Receipt },
  { label: "Tickets", href: "/admin/erp/tickets", icon: Ticket },
  { label: "Other", type: "group" },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const path = usePathname();
  return (
    <aside className="w-56 shrink-0 bg-gray-900 text-gray-300 min-h-screen flex flex-col">
      <div className="px-4 py-5 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Building2 size={20} className="text-blue-400" />
          <span className="font-bold text-white text-sm">MLHK Admin</span>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item, i) => {
          if (item.type === "group") return (
            <p key={i} className="text-xs text-gray-500 uppercase tracking-wider px-2 pt-4 pb-1">{item.label}</p>
          );
          const Icon = item.icon!;
          const active = path === item.href;
          return (
            <Link key={item.href} href={item.href!}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-white"}`}>
              <Icon size={16} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
        <Link href="/" className="hover:text-white transition-colors">← View Site</Link>
      </div>
    </aside>
  );
}
