"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark, BrandWordmark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

type MenuItem = { label: string; href: string; target?: string };

export default function NavbarClient({ items, siteName }: { items: MenuItem[]; siteName: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl px-4 transition-[background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          scrolled
            ? "border border-white/10 bg-black/70 shadow-[0_18px_50px_-20px_rgba(255,159,28,0.35)] backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteName} home`}>
          <BrandMark priority />
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {items.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                target={l.target}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-zinc-400 hover:text-white",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-amber-300 to-orange-500 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-[#ff9f1c] py-2 pl-4 pr-1.5 text-sm font-semibold text-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
          >
            Start a project
            <span className="flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
          {items.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              target={l.target}
              className="rounded-xl px-4 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-xl bg-[#ff9f1c] px-4 py-3 text-center text-sm font-semibold text-black"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
