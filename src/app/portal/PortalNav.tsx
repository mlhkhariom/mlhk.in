"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Projects", href: "/portal/projects" },
  { label: "Invoices", href: "/portal/invoices" },
  { label: "Tickets", href: "/portal/tickets" },
];

export default function PortalNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-4 text-sm">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={path === l.href ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-900"}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
