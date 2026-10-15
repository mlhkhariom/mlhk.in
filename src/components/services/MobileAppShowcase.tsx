"use client";

import { useState } from "react";
import {
  Smartphone,
  Wifi,
  WifiOff,
  ScanBarcode,
  Fingerprint,
  Cpu,
  Layers,
  Battery,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  QrCode,
} from "lucide-react";

export function MobileAppShowcase() {
  const [activeScreen, setActiveScreen] = useState<"offline" | "scanner" | "biometric" | "profiler">("offline");
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [offlineCount, setOfflineCount] = useState(3);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(true);

  const toggleOffline = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    if (!nextState) {
      // Reconnected!
      setSyncStatus("syncing");
      setTimeout(() => {
        setSyncStatus("synced");
        setOfflineCount(0);
        setTimeout(() => setSyncStatus("idle"), 2500);
      }, 1000);
    }
  };

  const simulateScan = () => {
    setScannedResult(null);
    setTimeout(() => {
      setScannedResult("MLHK-PKG-98214-MP");
    }, 800);
  };

  return (
    <div className="space-y-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Smartphone className="size-3 text-[#ff9f1c]" />
                Native Android Laboratory
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Pure Java &amp; Jetpack
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Native Hardware Integration &amp; Offline Sync Engine
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Test how our native mobile apps handle real-world stress: zero internet signal, physical
              barcode camera feeds, and hardware biometric authentication.
            </p>
          </div>

          {/* Interactive Screen Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "offline", label: "Offline Sync" },
              { id: "scanner", label: "CameraX Scanner" },
              { id: "biometric", label: "Biometric Auth" },
              { id: "profiler", label: "RAM & FPS Profiler" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScreen(s.id as typeof activeScreen)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  activeScreen === s.id
                    ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Device Simulator Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* Phone Device Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[310px] rounded-[3rem] border-[6px] border-zinc-800 bg-[#090b0e] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              {/* Dynamic Island / Speaker Notch */}
              <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-black flex items-center justify-center">
                <span className="size-2 rounded-full bg-zinc-900 mr-2" />
                <span className="size-1.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-3 text-[10px] font-mono text-zinc-400 mb-2">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  {isOffline ? (
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <WifiOff className="size-3" /> No Net
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Wifi className="size-3" /> 5G
                    </span>
                  )}
                  <Battery className="size-3.5" />
                </div>
              </div>

              {/* Screen Inner Viewport */}
              <div className="min-h-[380px] rounded-[2rem] border border-white/5 bg-[#050607] p-5 flex flex-col justify-between">
                {/* SCREEN 1: OFFLINE SYNC */}
                {activeScreen === "offline" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-semibold text-white">Field Operations</span>
                      <span className="text-[10px] font-mono text-zinc-500">Room SQLite</span>
                    </div>

                    <div
                      className={`rounded-xl border p-3.5 transition-colors ${
                        isOffline
                          ? "border-amber-500/30 bg-amber-500/10"
                          : "border-emerald-500/30 bg-emerald-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isOffline ? (
                          <WifiOff className="size-4 text-amber-400" />
                        ) : (
                          <Wifi className="size-4 text-emerald-400" />
                        )}
                        <span className="text-xs font-semibold text-white">
                          {isOffline ? "Offline Mode Active" : "Online & Synchronized"}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                        {isOffline
                          ? "Signal lost. All client records and inspections are queuing in local SQLite storage."
                          : "Connected to central Cloudflare API. Background WorkManager is active."}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs space-y-2">
                      <div className="flex justify-between text-zinc-400">
                        <span>Queued Local Records:</span>
                        <span className="font-mono font-bold text-white">{offlineCount} Pending</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Database Engine:</span>
                        <span className="font-mono text-zinc-200">Android Room (SQLite)</span>
                      </div>
                    </div>

                    {syncStatus === "syncing" && (
                      <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-2.5 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2">
                        <RefreshCw className="size-3.5 animate-spin" />
                        Delta Syncing 3 records...
                      </div>
                    )}

                    {syncStatus === "synced" && (
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-400" />
                        Sync Complete in 140ms!
                      </div>
                    )}
                  </div>
                )}

                {/* SCREEN 2: SCANNER */}
                {activeScreen === "scanner" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-semibold text-white">CameraX Hardware</span>
                      <span className="text-[10px] font-mono text-[#ffb84d]">60 FPS</span>
                    </div>

                    <div className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-950/20 p-4 flex flex-col items-center justify-center overflow-hidden">
                      <QrCode className="size-20 text-cyan-400/80" />
                      {/* Animated Laser Beam */}
                      <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                        Decoded Barcode:
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {scannedResult || "Scanning viewfinder..."}
                      </span>
                    </div>
                  </div>
                )}

                {/* SCREEN 3: BIOMETRIC AUTH */}
                {activeScreen === "biometric" && (
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-semibold text-white">BiometricPrompt</span>
                      <span className="text-[10px] font-mono text-emerald-400">Hardware Level</span>
                    </div>

                    <div className="py-6 flex flex-col items-center">
                      <div className="flex size-16 items-center justify-center rounded-full border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 text-[#ffb84d]">
                        <Fingerprint className="size-8" />
                      </div>
                      <span className="mt-3 text-xs font-semibold text-white">
                        Biometric Authenticated
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-0.5">
                        Hardware KeyStore Validated
                      </span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 text-left font-mono text-[9px] text-zinc-400">
                      <code>Bearer eyJhbGciOiJIUzI1NiIsIn...</code>
                    </div>
                  </div>
                )}

                {/* SCREEN 4: RAM & PROFILER */}
                {activeScreen === "profiler" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-semibold text-white">Android Profiler</span>
                      <span className="text-[10px] font-mono text-emerald-400">Target SDK 35</span>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">MLHK Native Java:</span>
                        <span className="font-mono font-bold text-emerald-400">38 MB RAM</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-zinc-500">
                        <span>Frame Rate:</span>
                        <span className="font-mono text-white">60.0 FPS Locked</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Generic Webview:</span>
                        <span className="font-mono font-bold text-rose-400">240 MB RAM</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-zinc-500">
                        <span>Frame Rate:</span>
                        <span className="font-mono text-zinc-400">32–44 FPS (Drops)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom App Bar */}
                <div className="mt-4 pt-2 border-t border-white/5 flex justify-around text-zinc-500">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/40" />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Controller Rail */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                Simulator Controls
              </p>
              <h4 className="mt-2 font-display text-xl font-bold text-white">
                Simulate Field Conditions
              </h4>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Test the mobile app by toggling network signal drops or triggering the hardware
                camera scanner.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={toggleOffline}
                className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  {isOffline ? (
                    <WifiOff className="size-4 text-amber-400" />
                  ) : (
                    <Wifi className="size-4 text-emerald-400" />
                  )}
                  <span>Toggle Signal Dropout (Airplane Mode)</span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-mono ${
                    isOffline ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {isOffline ? "CURRENT: OFFLINE" : "CURRENT: ONLINE"}
                </span>
              </button>

              <button
                type="button"
                onClick={simulateScan}
                className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <ScanBarcode className="size-4 text-cyan-400" />
                  <span>Simulate Barcode / QR Scan Trigger</span>
                </div>
                <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                  TRIGGER SCAN
                </span>
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs space-y-2.5">
              <span className="font-semibold text-white block">Native Android Specs:</span>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Built with Java and Android Jetpack. Uses Room SQLite for local database persistence
                with automatic background WorkManager sync. Compliant with Google Play 64-bit architecture
                and Target SDK 35.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

