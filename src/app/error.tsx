"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception safely to console
    console.error("[APPLICATION_RUNTIME_ERROR]", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050607] px-4 py-16 text-center">
      {/* Background radial ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#ff9f1c]/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-lg">
        {/* Status Pill */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-medium text-red-400">
          <ShieldAlert className="size-3.5" />
          <span>Execution Incident Recorded</span>
        </div>

        {/* Warning Icon Badge */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[#ff9f1c] shadow-[0_0_30px_rgba(255,159,28,0.15)]">
          <AlertTriangle className="size-8 stroke-[1.75]" />
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Unexpected Application Error
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          An unhandled exception interrupted this request. Our edge runtime has isolated the issue to protect system integrity.
        </p>

        {error.digest && (
          <div className="mt-4 inline-block rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-zinc-500">
            Digest Ref: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ffb84d] px-6 py-3 text-sm font-semibold text-[#0a0a0c] shadow-[0_12px_28px_-8px_rgba(255,159,28,0.45)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
          >
            <RefreshCw className="size-4" /> Try Again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] sm:w-auto"
          >
            <Home className="size-4" /> Return to Home
          </Link>
        </div>

        <p className="mt-10 text-xs text-zinc-600">
          MLHK Infotech Engineering • Continuous Observability & Edge Resilience
        </p>
      </div>
    </div>
  );
}
