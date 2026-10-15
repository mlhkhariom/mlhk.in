"use client";

import { useState } from "react";
import {
  LifeBuoy,
  Activity,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Database,
  Clock,
  Play,
  Server,
} from "lucide-react";

export function SupportShowcase() {
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<number>(0);

  const testDisasterRecovery = () => {
    setIsRecovering(true);
    setRecoveryStep(1);

    setTimeout(() => setRecoveryStep(2), 600);
    setTimeout(() => setRecoveryStep(3), 1200);
    setTimeout(() => {
      setRecoveryStep(4);
      setIsRecovering(false);
    }, 1800);
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
                <Activity className="size-3 text-[#ff9f1c]" />
                24/7 Production Telemetry
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                99.9% Signed SLA
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Continuous Uptime Probes &amp; Disaster Recovery Simulator
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Interactive operations console. We probe your systems every 60 seconds from 6 global stations,
              perform weekly dependency patches, and maintain point-in-time disaster recovery snapshots.
            </p>
          </div>

          <button
            type="button"
            onClick={testDisasterRecovery}
            disabled={isRecovering}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] transition-all hover:bg-[#ff9f1c]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isRecovering ? (
              <>
                <RotateCcw className="size-3.5 animate-spin" />
                Simulating Disaster Recovery...
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                Test Disaster Recovery Snapshot
              </>
            )}
          </button>
        </div>

        {/* Global Probes & Recovery View */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* 6 Global Monitoring Stations */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d] block mb-2">
              Active Global Health Probes (Ping Interval: 60s)
            </span>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {[
                { location: "Mumbai Station", latency: "14ms", status: "Operational" },
                { location: "Delhi NCR Station", latency: "18ms", status: "Operational" },
                { location: "Bengaluru Station", latency: "21ms", status: "Operational" },
                { location: "London Station", latency: "42ms", status: "Operational" },
                { location: "Frankfurt Station", latency: "45ms", status: "Operational" },
                { location: "Singapore Station", latency: "28ms", status: "Operational" },
              ].map((probe) => (
                <div
                  key={probe.location}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="text-xs font-semibold text-white">{probe.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-emerald-400 block font-bold">
                      {probe.latency}
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase">{probe.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disaster Recovery Simulator Output */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06080b] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-semibold text-white">Disaster Recovery Protocol</span>
              <span className="text-[10px] font-mono text-zinc-400">RPO: &lt;1h • RTO: &lt;15m</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                {
                  step: 1,
                  label: "01. Anomaly Detection & Incident Isolation",
                  time: "0.02s",
                },
                {
                  step: 2,
                  label: "02. Fetch Encrypted Offsite Database Snapshot",
                  time: "1.2s",
                },
                {
                  step: 3,
                  label: "03. Point-in-Time Atomic Rollback Applied",
                  time: "14.2s",
                },
                {
                  step: 4,
                  label: "04. Multi-Region Health Check Passed (100% OK)",
                  time: "Ready",
                },
              ].map((rec) => {
                const isPassed = recoveryStep >= rec.step;
                return (
                  <div
                    key={rec.step}
                    className={`rounded-xl border p-2.5 flex items-center justify-between transition-colors ${
                      isPassed
                        ? "border-emerald-500/40 bg-emerald-500/10 text-white"
                        : "border-white/5 bg-white/[0.01] text-zinc-500"
                    }`}
                  >
                    <span className="text-[11px]">{rec.label}</span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      {isPassed ? rec.time : "Standby"}
                    </span>
                  </div>
                );
              })}
            </div>

            {recoveryStep === 4 && (
              <div className="rounded-xl border border-emerald-500/50 bg-emerald-500/15 p-3 text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="size-4" />
                Disaster Simulation Succeeded • 0 Data Loss
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
