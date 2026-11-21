"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/client";
import { LogOut, ShieldCheck, ChevronDown, Settings } from "lucide-react";

interface Props {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function AdminUserMenu({ user }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut();
      router.push("/login");
    } catch {
      window.location.href = "/login";
    }
  }

  const roleLabel =
    user.role === "super_admin"
      ? "Super Admin"
      : user.role === "admin"
        ? "Admin"
        : user.role === "manager"
          ? "Manager"
          : user.role === "employee"
            ? "Team Member"
            : "Client";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-9 items-center gap-2.5 rounded-lg border border-white/10 bg-[#0d0f14] px-2 pr-2.5 text-left transition-colors hover:border-white/20"
      >
        <div className="flex size-6 items-center justify-center rounded-md bg-[#ff9f1c] text-[11px] font-bold text-[#07080a]">
          {(user.name ?? user.email ?? "A").charAt(0).toUpperCase()}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-medium leading-none text-zinc-100">
            {user.name ?? "Administrator"}
          </p>
          <p className="mt-0.5 text-[10px] leading-none text-zinc-500">{roleLabel}</p>
        </div>
        <ChevronDown className="size-3.5 text-zinc-500" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-white/10 bg-[#0d0f14] p-1.5 shadow-2xl"
          >
            <div className="border-b border-white/10 px-3 py-2.5">
              <p className="text-xs font-semibold text-white">{user.name ?? "Admin"}</p>
              <p className="mt-0.5 truncate text-[11px] text-zinc-400">{user.email}</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#ff9f1c]">
                <ShieldCheck className="size-3" />
                <span>{roleLabel}</span>
              </p>
            </div>

            <div className="mt-1 space-y-0.5">
              <Link
                href="/admin/settings"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <Settings className="size-3.5 text-zinc-500" />
                <span>Team &amp; System Settings</span>
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
              >
                <LogOut className="size-3.5" />
                <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
