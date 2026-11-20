import Link from "next/link";
import { ArrowLeft, Compass, Briefcase, MapPin, Mail, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050607] px-4 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9f1c]/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ffb84d]">
          404 · Page Not Found
        </p>

        <p className="mt-4 select-none bg-gradient-to-b from-white via-white/80 to-[#ff9f1c]/40 bg-clip-text font-display text-8xl font-black tracking-tighter text-transparent sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          This page doesn&apos;t exist on mlhk.in.
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          The URL may have moved or been mistyped. Jump directly to our services, transparent INR packages, case studies, or regional hubs below.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#ffb84d] sm:w-auto"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>

          <Link
            href="/solutions"
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] sm:w-auto"
          >
            <Layers className="size-4 text-[#ffb84d]" /> View Packages &amp; Pricing
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#08090c] p-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Explore MLHK Infotech
          </p>
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/services"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-white"
            >
              <Compass className="size-3.5 text-[#ff9f1c]" /> Services
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-white"
            >
              <Briefcase className="size-3.5 text-[#ff9f1c]" /> Case Studies
            </Link>
            <Link
              href="/locations"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-white"
            >
              <MapPin className="size-3.5 text-[#ff9f1c]" /> All-India Hubs
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-white"
            >
              <Mail className="size-3.5 text-[#ff9f1c]" /> Contact Desk
            </Link>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs text-zinc-400">
          MLHK Infotech · Shajapur &amp; Indore, MP, India
        </p>
      </div>
    </main>
  );
}
