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
  Zap,
  AlertTriangle,
  Globe,
  RefreshCw,
  Sliders,
  Calendar,
  Check,
  ExternalLink,
  FileText,
  Layers,
  ArrowRight,
  Lock,
  Radio,
  Sparkles,
} from "lucide-react";

interface ProbeNode {
  location: string;
  region: string;
  baseLatency: number;
  currentLatency: number;
  status: "Operational" | "Degraded" | "Checking";
  httpCode: number;
}

const INITIAL_PROBES: ProbeNode[] = [
  { location: "Mumbai POP", region: "India Central (BOM)", baseLatency: 14, currentLatency: 14, status: "Operational", httpCode: 200 },
  { location: "Delhi NCR POP", region: "India North (DEL)", baseLatency: 18, currentLatency: 18, status: "Operational", httpCode: 200 },
  { location: "Bengaluru POP", region: "India South (BLR)", baseLatency: 21, currentLatency: 21, status: "Operational", httpCode: 200 },
  { location: "Singapore POP", region: "Asia Pacific (SIN)", baseLatency: 28, currentLatency: 28, status: "Operational", httpCode: 200 },
  { location: "Frankfurt POP", region: "Europe Central (FRA)", baseLatency: 45, currentLatency: 45, status: "Operational", httpCode: 200 },
  { location: "London POP", region: "Europe West (LHR)", baseLatency: 48, currentLatency: 48, status: "Operational", httpCode: 200 },
];

export function SupportShowcase() {
  const [viewMode, setViewMode] = useState<"telemetry" | "recovery" | "calculator" | "runbook">("telemetry");

  // Global Telemetry Probes State
  const [probes, setProbes] = useState<ProbeNode[]>(INITIAL_PROBES);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string>("Just now");

  // Disaster Recovery Simulator State
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<number>(0);
  const [recoveryLogs, setRecoveryLogs] = useState<string[]>([]);

  // SLA Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1000000); // INR 10 Lakh
  const [selectedSla, setSelectedSla] = useState<"99.0" | "99.5" | "99.9" | "99.99">("99.9");

  // Runbook step selector
  const [activeRunbookStep, setActiveRunbookStep] = useState<number>(1);

  // Ping Probes Function
  const handlePingProbes = () => {
    setIsPinging(true);
    setTimeout(() => {
      setProbes((prev) =>
        prev.map((p) => {
          const jitter = Math.floor(Math.random() * 5) - 2; // -2 to +2 ms
          const newLatency = Math.max(8, p.baseLatency + jitter);
          return {
            ...p,
            currentLatency: newLatency,
            status: "Operational",
          };
        }),
      );
      setLastPingTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setIsPinging(false);
    }, 700);
  };

  // Disaster Recovery Simulation Function
  const testDisasterRecovery = () => {
    setIsRecovering(true);
    setRecoveryStep(1);
    setRecoveryLogs([
      "[*] [00:00.02] Catastrophic primary region outage detected by multi-region synthetic probe.",
      "[*] [00:00.05] Automatic incident failover protocol triggered. Primary origin unhooked.",
    ]);

    setTimeout(() => {
      setRecoveryStep(2);
      setRecoveryLogs((prev) => [
        ...prev,
        "[+] [00:01.20] Fetching latest AES-256 encrypted PostgreSQL WAL snapshot from secondary region.",
        "[+] [00:02.10] Checksum integrity verified: SHA-256 8e91d... matches cryptographic manifest.",
      ]);
    }, 700);

    setTimeout(() => {
      setRecoveryStep(3);
      setRecoveryLogs((prev) => [
        ...prev,
        "[+] [00:08.40] Spin up replacement standby node in failover region.",
        "[+] [00:14.20] Applied point-in-time database WAL segments: 0 transactions lost (RPO < 1m).",
      ]);
    }, 1500);

    setTimeout(() => {
      setRecoveryStep(4);
      setRecoveryLogs((prev) => [
        ...prev,
        "[+] [00:18.50] Cloudflare Anycast DNS routes updated to healthy standby edge cluster.",
        "[+] [00:20.10] 6/6 global probes reporting HTTP 200 OK. System restored with 100% data integrity.",
      ]);
      setIsRecovering(false);
    }, 2400);
  };

  // Calculate Downtime & Financial Loss
  const SLA_DETAILS = {
    "99.0": { label: "99.0% (Generic Hosting)", annualDowntimeHours: 87.6, description: "3 days 15 hours of outage per year" },
    "99.5": { label: "99.5% (Standard Retainer)", annualDowntimeHours: 43.8, description: "1 day 19 hours of outage per year" },
    "99.9": { label: "99.9% (MLHK SLA Guarantee)", annualDowntimeHours: 8.76, description: "Under 43 minutes per month" },
    "99.99": { label: "99.99% (High-Availability Cluster)", annualDowntimeHours: 0.88, description: "Under 5 minutes of outage per year" },
  };

  const currentSlaInfo = SLA_DETAILS[selectedSla];
  const hourlyRevenueLoss = monthlyRevenue / (30 * 24);
  const annualLoss = Math.round(hourlyRevenueLoss * currentSlaInfo.annualDowntimeHours);
  const mlhkLoss = Math.round(hourlyRevenueLoss * SLA_DETAILS["99.9"].annualDowntimeHours);
  const savedDifference = Math.max(0, annualLoss - mlhkLoss);

  return (
    <div className="space-y-16">
      {/* Main Interactive Showcase Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#03131c] via-[#020b12] to-[#010408] p-6 md:p-10 shadow-[0_30px_100px_-20px_rgba(0,229,255,0.2)]">
        {/* Ambient Teal & Emerald Mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]"
        />

        {/* Section Header with Mode Selector */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <Activity className="size-3 text-cyan-400" />
                24/7 Production Telemetry Control Room
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                99.9% Signed SLA Guarantee
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-400 font-mono">
                RTO &lt;15m • RPO &lt;1h
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              Proactive Telemetry, Zero Downtime &amp; Instant Disaster Recovery.
            </h3>
            <p className="mt-2 max-w-3xl text-xs md:text-sm leading-relaxed text-zinc-400">
              Launching software is day one; continuous reliability requires dedicated engineering stewardship. We monitor
              your infrastructure every 60 seconds from 6 global stations, maintain encrypted point-in-time database snapshots,
              and apply staging-tested dependency patches so your revenue never stops flowing.
            </p>
          </div>

          {/* Navigation View Modes */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
            {[
              { id: "telemetry", label: "Global Telemetry", icon: Globe },
              { id: "recovery", label: "Disaster Failover", icon: RotateCcw },
              { id: "calculator", label: "SLA Loss Tool", icon: Sliders },
              { id: "runbook", label: "DevOps Runbook", icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewMode(tab.id as typeof viewMode)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "border border-cyan-500/40 bg-cyan-500/20 text-white shadow-lg shadow-cyan-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: GLOBAL MULTI-REGION TELEMETRY PROBES & RADAR                      */}
        {/* ========================================================================= */}
        {viewMode === "telemetry" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Active Multi-Region Synthetic Health Probes
                </h4>
                <p className="text-xs text-zinc-400">
                  Simultaneous synthetic HTTP/HTTPS pings across 6 global edge nodes. Last verified:{" "}
                  <span className="text-cyan-400 font-mono">{lastPingTime}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePingProbes}
                disabled={isPinging}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`size-3.5 ${isPinging ? "animate-spin text-cyan-400" : ""}`} />
                {isPinging ? "Querying Global Nodes..." : "Ping All Global Nodes Now"}
              </button>
            </div>

            {/* Global Probes Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {probes.map((probe) => (
                <div
                  key={probe.location}
                  className="rounded-2xl border border-white/10 bg-[#04121a]/80 p-4 transition-all hover:border-cyan-500/30 hover:bg-[#061824]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] inline-block animate-pulse" />
                      <span className="font-display text-sm font-bold text-white">{probe.location}</span>
                    </div>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-bold">
                      HTTP {probe.httpCode}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-zinc-400">{probe.region}</p>

                  <div className="mt-4 flex items-end justify-between border-t border-white/5 pt-3">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">
                        Latency (TTFB)
                      </span>
                      <span className="font-mono text-base font-bold text-cyan-300">
                        {probe.currentLatency} ms
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> {probe.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Realtime Telemetry Architecture Specs */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Ping Frequency</span>
                <p className="font-bold text-sm text-white">60-Second Autonomous Heartbeat</p>
                <p className="text-[11px] text-zinc-400">
                  Continuous synthetic probes execute automated curl/GET checks on critical endpoints.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">On-Call Escalation</span>
                <p className="font-bold text-sm text-white">Sub-15 Minute Senior Alert</p>
                <p className="text-[11px] text-zinc-400">
                  Consecutive failure triggers automated WhatsApp, Telegram, and phone alert to lead engineers.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">SSL Pre-Expiration</span>
                <p className="font-bold text-sm text-white">30-Day Automated Early Warning</p>
                <p className="text-[11px] text-zinc-400">
                  TLS certificates, domain registrations, and API token expiration tracked proactively.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: 4-STAGE DISASTER RECOVERY & POINT-IN-TIME ROLLBACK                */}
        {/* ========================================================================= */}
        {viewMode === "recovery" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Automated Disaster Recovery &amp; Point-in-Time Snapshot Simulator
                </h4>
                <p className="text-xs text-zinc-400">
                  Simulate a complete primary datacenter failure and watch our automated rollback protocol restore services.
                </p>
              </div>

              <button
                type="button"
                onClick={testDisasterRecovery}
                disabled={isRecovering}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-5 py-2.5 text-xs font-bold text-cyan-300 transition-all hover:bg-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0"
              >
                {isRecovering ? (
                  <>
                    <RotateCcw className="size-3.5 animate-spin text-cyan-400" />
                    Executing Automated Failover...
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 fill-current" />
                    Test Disaster Recovery Failover
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Recovery Visual Pipeline */}
            <div className="grid gap-4 md:grid-cols-4">
              {[
                {
                  step: 1,
                  title: "Anomaly Isolation",
                  time: "0.02s",
                  desc: "Multi-region probes detect primary failure; traffic quarantined immediately.",
                },
                {
                  step: 2,
                  title: "Snapshot Fetch",
                  time: "1.2s",
                  desc: "Retrieve AES-256 encrypted WAL snapshot from secondary region bucket.",
                },
                {
                  step: 3,
                  title: "Atomic Rollback",
                  time: "14.2s",
                  desc: "Standby database restored to exact microsecond before crash (RPO < 1m).",
                },
                {
                  step: 4,
                  title: "DNS Edge Reroute",
                  time: "Ready",
                  desc: "Cloudflare Anycast edge points 100% of traffic to healthy standby cluster.",
                },
              ].map((rec) => {
                const isPassed = recoveryStep >= rec.step;
                const isCurrent = recoveryStep === rec.step;
                return (
                  <div
                    key={rec.step}
                    className={`rounded-2xl border p-5 transition-all ${
                      isPassed
                        ? "border-emerald-500/50 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/10"
                        : isCurrent
                        ? "border-cyan-500/50 bg-cyan-500/10 text-white animate-pulse"
                        : "border-white/5 bg-white/[0.02] text-zinc-500"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isPassed ? "text-emerald-400 font-bold" : "text-zinc-500"}>
                        STAGE 0{rec.step}
                      </span>
                      <span className={`text-[11px] ${isPassed ? "text-emerald-300" : "text-zinc-600"}`}>
                        {isPassed ? rec.time : "Standby"}
                      </span>
                    </div>

                    <h5 className="mt-3 font-display text-sm font-bold text-white">{rec.title}</h5>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">{rec.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Console Log Terminal Output */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#020508] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Radio className="size-3 animate-pulse" /> Failover Execution Telemetry Stream
                </span>
                <span className="text-[10px] text-zinc-500">RTO: &lt;15m SLA Guaranteed</span>
              </div>

              <div className="mt-4 font-mono text-xs space-y-1.5 text-zinc-300">
                {recoveryLogs.length === 0 ? (
                  <p className="text-zinc-600 italic">
                    Press "Test Disaster Recovery Failover" above to simulate an automated multi-region rollback drill.
                  </p>
                ) : (
                  recoveryLogs.map((log, idx) => (
                    <p
                      key={idx}
                      className={
                        log.startsWith("[+]")
                          ? "text-emerald-400"
                          : log.startsWith("[*]")
                          ? "text-amber-400"
                          : "text-zinc-400"
                      }
                    >
                      {log}
                    </p>
                  ))
                )}
              </div>

              {recoveryStep === 4 && (
                <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
                  <CheckCircle2 className="size-4" />
                  Disaster Failover Succeeded in Under 21 Seconds • Zero Data Loss Certified
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SLA & FINANCIAL DOWNTIME LOSS CALCULATOR                          */}
        {/* ========================================================================= */}
        {viewMode === "calculator" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Interactive Uptime SLA &amp; Revenue Risk Calculator
                </h4>
                <p className="text-xs text-zinc-400">
                  See the hidden cost of downtime: calculate how much revenue you protect by upgrading from generic hosting to MLHK 99.9% SLA.
                </p>
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono text-cyan-300">
                Signed SLA Legal Guarantee
              </span>
            </div>

            {/* Slider and Tier Controls */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Monthly Revenue Input */}
              <div className="rounded-2xl border border-white/10 bg-[#04121a] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Monthly Online Revenue:
                  </span>
                  <span className="font-mono text-lg font-bold text-cyan-300">
                    ₹{monthlyRevenue.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={100000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>₹1 Lakh/mo</span>
                  <span>₹50 Lakh/mo</span>
                  <span>₹1 Crore/mo</span>
                </div>
              </div>

              {/* SLA Tier Selector */}
              <div className="rounded-2xl border border-white/10 bg-[#04121a] p-6 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                  Select Comparison SLA Tier:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(SLA_DETAILS) as Array<keyof typeof SLA_DETAILS>).map((tierKey) => {
                    const tier = SLA_DETAILS[tierKey];
                    const isSelected = selectedSla === tierKey;
                    return (
                      <button
                        key={tierKey}
                        type="button"
                        onClick={() => setSelectedSla(tierKey)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          isSelected
                            ? "border-cyan-500/60 bg-cyan-500/20 text-white shadow-md shadow-cyan-500/20"
                            : "border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-cyan-300 block">{tierKey}%</span>
                        <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">{tier.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Financial Impact Comparison Card */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#061824] via-[#04111c] to-[#02090e] p-6 md:p-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Current Downtime Risk</span>
                  <span className="mt-1 font-mono text-xl font-bold text-red-400 block">
                    {currentSlaInfo.annualDowntimeHours.toFixed(1)} hrs/yr
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">
                    Financial loss: ~₹{annualLoss.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block">MLHK 99.9% Protection</span>
                  <span className="mt-1 font-mono text-xl font-bold text-emerald-300 block">
                    &lt;8.7 hrs/yr
                  </span>
                  <span className="text-[11px] text-zinc-300 mt-1 block">
                    Mitigated loss: ~₹{mlhkLoss.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/15 p-4">
                  <span className="text-[10px] font-mono uppercase text-cyan-300 block">Revenue Protected</span>
                  <span className="mt-1 font-mono text-xl font-bold text-white block">
                    ₹{savedDifference.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] text-cyan-200 mt-1 block">Saved in preventable losses</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                  MLHK Infotech signs legal SLA commitments backed by billing credits. If our uptime drops below 99.9% in any calendar month, you receive proportional service fee rebates automatically.
                </p>

                <a
                  href={`https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20we%20want%20to%20secure%20a%2099.9%25%20SLA%20maintenance%20agreement%20for%20our%20platform.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-cyan-500/20 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-cyan-500/30 hover:scale-[1.02] shrink-0"
                >
                  <span>Lock In 99.9% SLA Agreement</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: DEVOPS MAINTENANCE RUNBOOK & STAGING GATE                         */}
        {/* ========================================================================= */}
        {viewMode === "runbook" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Zero-Downtime Safe Deployment &amp; Maintenance Runbook
                </h4>
                <p className="text-xs text-zinc-400">
                  How MLHK Infotech deploys updates, applies security patches, and validates builds without breaking live production.
                </p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono text-emerald-400">
                Atomic Blue-Green Releases
              </span>
            </div>

            {/* Runbook Step Selector */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { step: 1, title: "01. Dependency Audit", badge: "CI/CD Gate" },
                { step: 2, title: "02. Staging Sandbox", badge: "Isolated DB" },
                { step: 3, title: "03. Atomic Cutover", badge: "Zero-Downtime" },
                { step: 4, title: "04. Post-Deploy Smoke", badge: "Instant Rollback" },
              ].map((s) => {
                const isSelected = activeRunbookStep === s.step;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveRunbookStep(s.step)}
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-cyan-500/60 bg-cyan-500/20 text-white shadow-md shadow-cyan-500/20"
                        : "border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">{s.badge}</span>
                    <span className="font-display text-xs font-bold text-white block mt-1">{s.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Runbook Step Content */}
            {(() => {
              const RUNBOOK_CONTENT = [
                {
                  step: 1,
                  title: "Automated Dependency Vulnerability & Security Auditing",
                  specs: [
                    "Dependabot and npm audit run on every pull request to identify known CVEs.",
                    "TypeScript strict compiler verification blocks type violations and undefined references.",
                    "Environment secrets validated with schema guards to prevent missing runtime configurations.",
                  ],
                  tool: "GitHub Actions + Trivy Vulnerability Scanner",
                },
                {
                  step: 2,
                  title: "Isolated Staging Deployment & Regression Testing",
                  specs: [
                    "Ephemeral staging preview environments deployed on pull request branches.",
                    "Automated database schema migration dry-runs against sanitized staging clones.",
                    "End-to-end synthetic user flows tested to ensure critical checkout and lead forms succeed.",
                  ],
                  tool: "Cloudflare Preview Deployments + Drizzle Migrations",
                },
                {
                  step: 3,
                  title: "Atomic Blue-Green Cutover with Zero Traffic Disruption",
                  specs: [
                    "New application bundle warmed up across 330+ edge data centers before routing traffic.",
                    "Zero cold-starts; instantaneous cutover takes place at the edge DNS routing layer.",
                    "Legacy sessions drain gracefully without interrupting active shopping carts or submissions.",
                  ],
                  tool: "Cloudflare Edge Routing + OpenNext Standby Workers",
                },
                {
                  step: 4,
                  title: "Continuous Post-Deployment Telemetry Smoke Tests & 1-Click Rollback",
                  specs: [
                    "Synthetic health checks run across all 6 global monitoring stations immediately post-release.",
                    "Error tracking monitors for abnormal 5xx spikes or JavaScript runtime exceptions.",
                    "Automated 1-click atomic rollback to previous git commit if error threshold exceeds 0.01%.",
                  ],
                  tool: "Sentry Error Telemetry + Cloudflare Instant Rollback",
                },
              ];
              const active = RUNBOOK_CONTENT[activeRunbookStep - 1] || RUNBOOK_CONTENT[0];
              return (
                <div className="rounded-2xl border border-cyan-500/30 bg-[#031018] p-6 md:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
                    <h5 className="font-display text-lg font-bold text-white">{active.title}</h5>
                    <span className="text-[11px] font-mono text-cyan-300">Tool: {active.tool}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-zinc-300">
                    {active.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
