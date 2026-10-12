"use client";

import { signOut } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
      title="Sign out of portal"
    >
      <LogOut className="size-3" strokeWidth={1.75} />
      <span>Sign Out</span>
    </button>
  );
}
