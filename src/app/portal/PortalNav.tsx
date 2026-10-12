"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Receipt, Ticket } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/portal/projects", icon: FolderKanban },
  { label: "Invoices", href: "/portal/invoices", icon: Receipt },
  { label: "Tickets", href: "/portal/tickets", icon: Ticket },
];

export default function PortalNav({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname();

  if (mobile) {
    return (
      <nav className="flex items-center gap-1.5 min-w-max" aria-label="Mobile Portal Navigation">
        {links.map((l) => {
          const Icon = l.icon;
          const active = path === l.href;

          return (
            <Link
              key={l.href}
              href={l.href}
              prefetch={true}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "bg-[#ff9f1c]/15 text-[#ffb84d] font-semibold shadow-[inset_0_0_0_1px_rgba(255,159,28,0.3)]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon
                className={`size-3.5 shrink-0 ${active ? "text-[#ff9f1c]" : "text-zinc-500"}`}
                strokeWidth={1.75}
              />
              <span>{l.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-1.5" aria-label="Portal Navigation">
      {links.map((l) => {
        const Icon = l.icon;
        const active = path === l.href;

        return (
          <Link
            key={l.href}
            href={l.href}
            prefetch={true}
            className={`group inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              active
                ? "bg-[#ff9f1c]/10 text-[#ffb84d] font-semibold shadow-[inset_0_0_0_1px_rgba(255,159,28,0.25)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Icon
              className={`size-3.5 transition-colors ${
                active ? "text-[#ff9f1c]" : "text-zinc-500 group-hover:text-zinc-300"
              }`}
              strokeWidth={1.75}
            />
            <span>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
