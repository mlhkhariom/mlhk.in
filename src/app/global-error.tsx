"use client";

import { useEffect } from "react";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ROOT_GLOBAL_ERROR]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#050607] px-4 py-16 text-center font-sans text-white">
        <div className="relative mx-auto max-w-md">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400">
            Critical Root Failure
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            System Level Exception
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            The root rendering tree encountered an unrecoverable failure. You can attempt to refresh the session below.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-zinc-500">
              Ref: {error.digest}
            </p>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-[#ff9f1c] px-6 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
            >
              Restart Environment
            </button>
            <a
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Direct Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
