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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080a]/85 backdrop-blur-md">
        <div className="flex h-14 sm:h-16 shrink-0 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/portal/dashboard" className="flex items-center gap-2.5 group shrink-0">
              <BrandMark className="size-8 sm:size-10" />
              <div className="flex flex-col">
                <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-[#ffb84d] transition-colors">
                  MLHK <span className="hidden xs:inline">Client</span> Portal
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#ff9f1c] uppercase font-semibold">
                  Workspace
                </span>
              </div>
            </Link>
            <PortalNav />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              title="View Public Site"
            >
              <ExternalLink className="size-3 text-[#ff9f1c]" />
              <span className="hidden sm:inline">Main Site</span>
            </Link>

            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-medium text-white max-w-[140px] truncate">{session.user.name}</span>
              <span className="text-[10px] text-zinc-500 max-w-[140px] truncate">{session.user.email}</span>
            </div>

            <SignOutButton />
          </div>
        </div>

        {/* Mobile Navigation Tab Bar (visible < lg) */}
        <div className="lg:hidden border-t border-white/5 bg-[#050607]/95 px-4 py-2 backdrop-blur-md overflow-x-auto scrollbar-none overscroll-x-contain">
          <div className="mx-auto flex max-w-6xl items-center">
            <PortalNav mobile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
