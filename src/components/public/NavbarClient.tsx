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

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 px-3 pt-2.5 md:px-6 md:pt-3">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-2xl px-4 transition-[background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-16 md:gap-8",
          scrolled
            ? "border border-white/10 bg-[#050607]/85 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          aria-label={`${siteName} home`}
        >
          <BrandMark priority />
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2" aria-label="Primary">
          {items.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                prefetch={true}
                target={l.target}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-white" : "text-zinc-300 hover:text-white",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#ffb84d] to-[#ff9f1c] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            prefetch={true}
            className="group hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#ff9f1c] py-2 pl-4 pr-1.5 text-sm font-semibold text-black transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:bg-[#ffb84d] active:scale-[0.98] md:inline-flex"
          >
            <span>Start a project</span>
            <span className="flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl text-zinc-200 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#08090c]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
          open ? "max-h-[82vh] p-3 opacity-100" : "pointer-events-none max-h-0 p-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {items.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                prefetch={true}
                target={l.target}
                tabIndex={open ? 0 : -1}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-colors",
                  active
                    ? "bg-[#ff9f1c]/15 font-semibold text-[#ffb84d]"
                    : "text-zinc-200 hover:bg-white/5 hover:text-white",
                )}
              >
                <span>{l.label}</span>
                {active && <span className="text-xs font-medium text-[#ffb84d]">Active</span>}
              </Link>
            );
          })}
          <Link
            href="/blog"
            prefetch={true}
            tabIndex={open ? 0 : -1}
            className="flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span>Blog &amp; Guides</span>
          </Link>
          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href="/contact"
              prefetch={true}
              tabIndex={open ? 0 : -1}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#ff9f1c] px-4 py-3 text-center text-sm font-semibold text-black transition-transform active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/portal/dashboard"
              prefetch={false}
              tabIndex={open ? 0 : -1}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-center text-xs font-medium text-zinc-300 transition-colors hover:text-white"
            >
              <span>Client Portal</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
