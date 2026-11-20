import type { Metadata } from "next";
import AdminSidebar, { AdminMobileNav } from "@/components/admin/Sidebar";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders, ADMIN_ROLES } from "@/lib/auth/session";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Authoritative guard for the whole admin panel.
  const session = await getSessionFromHeaders(await headers());

  if (!session) redirect("/login");

  const role = session.user.role;
  if (!role || !ADMIN_ROLES.includes(role)) {
    // Authenticated but not an admin (e.g. a client) — the portal is where they belong.
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#07080a] text-zinc-100 antialiased selection:bg-[#ff9f1c]/30 selection:text-white">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#07080a]/80 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <AdminMobileNav />
            <AdminSearch />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white sm:inline-flex"
            >
              <ExternalLink className="size-3 text-[#ff9f1c]" />
              <span>View Site</span>
            </Link>

            {/* User Dropdown */}
            <AdminUserMenu user={session.user} />
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#07080a] px-4 py-6 md:px-10 md:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
