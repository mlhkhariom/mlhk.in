"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ADMIN_PANEL_ERROR]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <AlertOctagon size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Admin Section Encountered an Error</h2>
        <p className="mt-2 text-sm text-gray-500">
          This panel component failed to render. Your session remains authenticated and intact.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-gray-400">
            Error digest: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            <RefreshCw size={15} /> Try Again
          </button>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <LayoutDashboard size={15} /> Dashboard Home
          </Link>
        </div>
      </div>
    </div>
  );
}

