"use client";

import Link from "next/link";
import { useState, useEffect, useDeferredValue } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

type MenuItem = { label: string; href: string; target?: string };

export default function NavbarClient({ items, siteName }: { items: MenuItem[]; siteName: string }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const deferredItems = useDeferredValue(items);

  useEffect(() => {
    setMounted(true);
    // sync with system on first paint
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(sys);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark, mounted]);

  const toggleTheme = () => setDark((d) => !d);

  const navClasses =
    "sticky top-0 z-50 bg-zinc-950/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60";

  return (
    <header className={navClasses}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-white">
          {siteName}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {deferredItems.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target={l.target}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          )}
          <Link
            href="/contact"
            className="hidden md:inline-flex bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            Get Started
          </Link>
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-4 py-4 flex flex-col gap-4">
          {deferredItems.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target={l.target}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full text-center hover:bg-blue-500 transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
