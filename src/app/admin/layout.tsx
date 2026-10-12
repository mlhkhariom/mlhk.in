import AdminSidebar from "@/components/admin/Sidebar";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import Link from "next/link";
import { ExternalLink, Activity } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders, ADMIN_ROLES } from "@/lib/auth/session";

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
    <div className="flex h-screen bg-[#07080a] text-zinc-100 overflow-hidden antialiased selection:bg-[#ff9f1c]/30 selection:text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#07080a]/80 px-6 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <AdminSearch />
          </div>

          <div className="flex items-center gap-3.5">
            {/* Telemetry pill */}
            <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloudflare D1 • Active</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <ExternalLink className="size-3 text-[#ff9f1c]" />
              <span>View Site</span>
            </Link>

            {/* User Dropdown */}
            <AdminUserMenu user={session.user} />
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#07080a] px-6 py-8 md:px-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
