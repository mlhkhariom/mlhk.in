export default function RootLoading() {
  return (
    <div className="relative min-h-[60vh] w-full flex items-center justify-center px-4 py-24">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#ff9f1c]/10 blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Glowing loader spark */}
        <div className="relative flex size-12 items-center justify-center">
          <div className="absolute size-full animate-ping rounded-full bg-[#ff9f1c]/20 duration-1000" />
          <div className="size-8 rounded-full border-2 border-white/10 border-t-[#ff9f1c] animate-spin" />
          <div className="absolute size-2 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
        </div>

        <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400">
          Loading MLHK
        </p>
      </div>
    </div>
  );
}

