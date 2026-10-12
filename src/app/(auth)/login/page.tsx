"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth/client";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn.email({
        email: form.email.trim(),
        password: form.password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid credentials. Please verify email and password.");
        setLoading(false);
      } else {
        const next = new URLSearchParams(window.location.search).get("next");
        router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin/dashboard");
      }
    } catch {
      setError("Network or authentication server error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff9f1c] to-[#c2410c] text-black shadow-[0_0_24px_rgba(255,159,28,0.35)]">
            <Sparkles className="size-5 text-[#050607]" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            MLHK<span className="text-[#ff9f1c]">.</span>
          </span>
        </Link>
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
          Sign In to Console
        </h1>
        <p className="mt-1.5 text-xs text-zinc-400">
          Secure control panel for admin & client operations
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] sm:p-8">
        {/* Subtle interior glow */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-32 rounded-full bg-[#ff9f1c]/10 blur-2xl" />

        <form onSubmit={handleSubmit} className="relative space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Work Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#ff9f1c]/60"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#ff9f1c]/60"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ffb84d] py-2.5 text-sm font-semibold text-[#0a0a0c] shadow-[0_12px_28px_-8px_rgba(255,159,28,0.45)] transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Alternative Links */}
      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-xs text-zinc-500">
        <p>
          Need a Client Portal account?{" "}
          <Link href="/register" className="font-medium text-[#ffb84d] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
