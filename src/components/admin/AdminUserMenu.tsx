"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/client";
import { LogOut, User, Shield, ChevronDown, Check } from "lucide-react";

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
      : "Client";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 pr-3 text-left transition-colors hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff9f1c] to-[#c2410c] text-xs font-bold text-black shadow-[0_0_12px_rgba(255,159,28,0.25)]">
          {(user.name ?? user.email ?? "A").charAt(0).toUpperCase()}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-semibold leading-none text-white">
            {user.name ?? "Administrator"}
          </p>
          <span className="mt-0.5 inline-block text-[10px] text-[#ffb84d]">
            {roleLabel}
          </span>
        </div>
        <ChevronDown className="size-3 text-zinc-400" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-[#0d0f14] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="border-b border-white/5 px-3 py-2.5">
              <p className="text-xs font-semibold text-white">{user.name ?? "Admin"}</p>
              <p className="truncate text-[11px] text-zinc-400">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/20 bg-[#ff9f1c]/10 px-2 py-0.5 text-[10px] font-medium text-[#ffb84d]">
                <Shield className="size-3" />
                <span>{roleLabel}</span>
              </div>
            </div>

            <div className="mt-1 space-y-0.5">
              <button
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

