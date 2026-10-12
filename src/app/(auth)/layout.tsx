import Link from "next/link";
import { ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#050607] text-zinc-100 antialiased selection:bg-[#ff9f1c]/30 selection:text-white">
      {/* Ambient background lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-[#ff9f1c]/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-10 h-[400px] w-[400px] rounded-full bg-[#ffb84d]/5 blur-[130px]"
      />

      {/* Top Bar with Brand Link */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to MLHK Infotech</span>
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400">
          <ShieldCheck className="size-3.5 text-[#ff9f1c]" />
          <span>Encrypted Gateway</span>
        </div>
      </header>

      {/* Main Form Centerpiece */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 px-6 py-5 text-center text-xs text-zinc-600 sm:flex-row sm:px-10">
        <p>© {new Date().getFullYear()} MLHK Infotech Systems. All rights reserved.</p>
        <div className="flex items-center gap-4 text-zinc-500">
          <Link href="/services" className="transition-colors hover:text-zinc-300">Services</Link>
          <span>•</span>
          <Link href="/portfolio" className="transition-colors hover:text-zinc-300">Portfolio</Link>
          <span>•</span>
          <Link href="/contact" className="transition-colors hover:text-zinc-300">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
