"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-600">MLHK Infotech</Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-blue-600 transition-colors">{l.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="hidden md:inline-flex bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
