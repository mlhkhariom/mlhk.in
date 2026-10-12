import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import Link from "next/link";
import PortalNav from "./PortalNav";
import SignOutButton from "./SignOutButton";
import { BrandMark } from "@/components/brand/BrandMark";
import { ExternalLink } from "lucide-react";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/dashboard");

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 antialiased selection:bg-[#ff9f1c]/30 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#07080a]/80 px-4 md:px-8 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link href="/portal/dashboard" className="flex items-center gap-2.5 group">
            <BrandMark />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-[#ffb84d] transition-colors">
                MLHK Client Portal
              </span>
              <span className="text-[10px] tracking-widest text-[#ff9f1c] uppercase font-semibold">
                Client Workspace
              </span>
            </div>
          </Link>
          <PortalNav />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <ExternalLink className="size-3 text-[#ff9f1c]" />
            <span>Main Site</span>
          </Link>

          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-medium text-white">{session.user.name}</span>
            <span className="text-[11px] text-zinc-500">{session.user.email}</span>
          </div>

          <SignOutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
