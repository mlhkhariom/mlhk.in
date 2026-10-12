import Link from "next/link";
import { ArrowLeft, Compass, Briefcase, FileText, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050607] px-4 py-20 text-center">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#ff9f1c]/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-[#ffb84d]/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-xl">
        {/* Gateway Tag */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
          <span className="size-1.5 rounded-full bg-[#ff9f1c] animate-pulse" />
          404 • Resource Not Located
        </div>

        {/* 404 Large Display */}
        <p className="font-display text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#ff9f1c]/40 sm:text-9xl select-none">
          404
        </p>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          These Coordinates Lead Nowhere.
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The requested route or asset has either migrated, been archived, or never existed in the MLHK registry.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ffb84d] px-6 py-3 text-sm font-semibold text-[#0a0a0c] shadow-[0_12px_28px_-8px_rgba(255,159,28,0.45)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
          >
            <ArrowLeft className="size-4" /> Back to Safety
          </Link>

          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] sm:w-auto"
          >
            <Compass className="size-4 text-[#ffb84d]" /> Explore Capabilities
          </Link>
        </div>

        {/* Alternative Discovery Links */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Or Navigate Directly To
          </p>
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-[#ff9f1c]/40 hover:text-white"
            >
              <Briefcase className="size-3 text-[#ff9f1c]" /> Selected Work
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-[#ff9f1c]/40 hover:text-white"
            >
              <FileText className="size-3 text-[#ff9f1c]" /> Insights & Tech Blog
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-[#ff9f1c]/40 hover:text-white"
            >
              <Mail className="size-3 text-[#ff9f1c]" /> Contact Desk
            </Link>
          </div>
        </div>

        <p className="mt-12 text-[11px] text-zinc-600 font-mono">
          MLHK Infotech Systems • Shajapur, MP, India
        </p>
      </div>
    </main>
  );
}
