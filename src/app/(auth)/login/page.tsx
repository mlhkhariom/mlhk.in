"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth/client";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [canBootstrap, setCanBootstrap] = useState(false);
  const [checkingBootstrap, setCheckingBootstrap] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/bootstrap")
      .then((r) => (r.ok ? r.json() : { canBootstrap: false }))
      .then((d: unknown) => {
        const parsed = d as { canBootstrap?: boolean };
        setCanBootstrap(Boolean(parsed?.canBootstrap));
      })
      .catch(() => setCanBootstrap(false))
      .finally(() => setCheckingBootstrap(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (canBootstrap) {
        const res = await fetch("/api/auth/bootstrap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          setError(data.error || "Could not initialize admin console.");
          setLoading(false);
          return;
        }
        router.push("/admin/dashboard");
        router.refresh();
        return;
      }

      const res = await signIn.email({
        email: form.email.trim(),
        password: form.password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password.");
        setLoading(false);
      } else {
        const next = new URLSearchParams(window.location.search).get("next");
        const destination =
          next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin/dashboard";
        router.push(destination);
        router.refresh();
      }
    } catch {
      setError("Authentication server error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* Brand Header */}
      <div className="mb-7 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#ff9f1c] font-display text-base font-black text-[#07080a]">
            M
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            MLHK<span className="text-[#ff9f1c]">.</span>
          </span>
        </Link>
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
          {canBootstrap ? "Initialize Super Admin" : "Sign In to Console"}
        </h1>
        <p className="mt-1.5 text-xs text-zinc-400">
          {canBootstrap
            ? "First-run setup detected. Create the primary Super Admin account to lock this workspace."
            : "MLHK Infotech ERP, CRM & CMS Operations Console"}
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-7 shadow-2xl sm:p-8">
        {canBootstrap && (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-[#ff9f1c]/25 bg-[#ff9f1c]/10 p-3 text-xs text-amber-200">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
            <p className="leading-relaxed">
              This one-time setup automatically locks once your Super Admin account is created.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {canBootstrap && (
            <div>
              <label htmlFor="login-name" className="mb-1.5 block text-xs font-medium text-zinc-300">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="login-name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Hariom Vishwkarma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-zinc-300">
              Work Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="support@mlhk.in"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#07080a] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={canBootstrap ? 8 : 1}
                autoComplete={canBootstrap ? "new-password" : "current-password"}
                placeholder={canBootstrap ? "Minimum 8 characters" : "••••••••••••"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#07080a] py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || checkingBootstrap}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff9f1c] py-2.5 text-sm font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{canBootstrap ? "Creating Super Admin..." : "Authenticating..."}</span>
              </>
            ) : (
              <>
                <span>{canBootstrap ? "Create Super Admin & Enter" : "Sign In to Console"}</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Back to mlhk.in
        </Link>
        <span>·</span>
        <Link href="/register" className="text-[#ff9f1c] hover:underline">
          Client Portal Sign Up
        </Link>
      </div>
    </div>
  );
}
