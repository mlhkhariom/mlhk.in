"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth/client";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (res.error) {
        setError(res.error.message || "Registration failed. Please check your information.");
        setLoading(false);
      } else {
        router.push("/portal/dashboard");
      }
    } catch {
      setError("Server error during registration. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[440px]">
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
          Create Client Account
        </h1>
        <p className="mt-1.5 text-xs text-zinc-400">
          Access your project milestones, invoices, and support tickets
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 size-32 rounded-full bg-[#ff9f1c]/10 blur-2xl" />

        <form onSubmit={handleSubmit} className="relative space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                required
                autoComplete="name"
                placeholder="Hariom Vishwakarma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#ff9f1c]/60"
              />
            </div>
          </div>

          {/* Work Email */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="hariom@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#ff9f1c]/60"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
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
            <p className="mt-1 text-[11px] text-zinc-500">
              Must be at least 8 characters with letters and symbols.
            </p>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Alternative Link */}
      <div className="mt-6 text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[#ffb84d] hover:underline">
          Sign In here
        </Link>
      </div>
    </div>
  );
}
