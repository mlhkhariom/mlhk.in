export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-white/[0.05]" />
          <div className="h-3 w-72 rounded-lg bg-white/[0.02]" />
        </div>
        <div className="h-9 w-32 rounded-xl bg-white/[0.05]" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#0c0d11]/60 p-5 space-y-3"
          >
            <div className="h-3 w-24 rounded bg-white/[0.05]" />
            <div className="h-7 w-32 rounded bg-white/[0.08]" />
            <div className="h-2 w-20 rounded bg-white/[0.03]" />
          </div>
        ))}
      </div>

      {/* Table Card Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-36 rounded bg-white/[0.05]" />
          <div className="h-8 w-48 rounded-xl bg-white/[0.03]" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-white/5 pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/[0.04]" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-40 rounded bg-white/[0.05]" />
                  <div className="h-2.5 w-24 rounded bg-white/[0.02]" />
                </div>
              </div>
              <div className="h-5 w-16 rounded-full bg-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

