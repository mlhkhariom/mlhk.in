"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Terminal,
  Lock,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";

export function CybersecurityShowcase() {
  const [activeTest, setActiveTest] = useState<"ports" | "ssh" | "ddos" | "ssl">("ports");

  const TEST_OUTPUTS = {
    ports: `root@mlhk-hardened-edge:~# nmap -p- -T4 localhost
Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-15 19:10 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000042s latency).
All 65535 scanned ports on localhost are in ignored states.
Not shown: 65535 closed tcp ports (reset)

[+] ZERO INBOUND PORTS EXPOSED TO PUBLIC INTERNET
[+] All database & administrative traffic routed strictly via Cloudflare Zero Trust Tunnels (cloudflared).`,
    ssh: `root@mlhk-hardened-edge:~# ssh-audit --strict /etc/ssh/sshd_config
[+] PasswordAuthentication: DISABLED (Public Key Only)
[+] PermitRootLogin: NO (Unprivileged sudo only)
[+] Cryptographic Host Keys: ED25519 (Curve25519) Only
[+] Deprecated Ciphers (3DES, CBC, RC4): REMOVED
[+] MaxAuthTries: 3 (Fail2ban triggers 24-hour IP jail on failure)
[+] Overall SSH Hardening Score: 100/100 (Pass)`,
    ddos: `root@mlhk-hardened-edge:~# simulate-attack --type SYN-FLOOD --rate 100000/s
[*] Inbound Synthetic DDoS: 100,000 req/s detected at Edge POP
[+] Cloudflare Edge BGP Anycast Armor triggered in 0.018s
[+] 100% of malicious packets absorbed at perimeter data centers
[+] Origin Server Health:
    - CPU Utilization: 2.3% (Normal)
    - RAM Utilization: 412 MB / 8 GB (Stable)
    - Downtime: 0.000 seconds`,
    ssl: `root@mlhk-hardened-edge:~# openssl s_client -connect mlhk.in:443 -tls1_3
CONNECTED(00000003)
SSL-Session:
    Protocol  : TLSv1.3
    Cipher    : TLS_AES_256_GCM_SHA384
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    X-Content-Type-Options: nosniff
    Content-Security-Policy: default-src 'self'
[+] SSL Labs Benchmark Result: A+ (Peak Cryptographic Posture)`,
  };

  return (
    <div className="space-y-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <ShieldCheck className="size-3 text-emerald-400" />
                Infrastructure Hardening Console
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Linux Defense-in-Depth
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Zero-Trust Network Perimeter &amp; Attack Mitigation
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Run interactive security diagnostics on our hardened infrastructure standards: port scans,
              SSH key enforcement, DDoS absorption, and TLS 1.3 cryptographic ratings.
            </p>
          </div>

          {/* Test Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ports", label: "Port Scan (Nmap)" },
              { id: "ssh", label: "SSH Isolation" },
              { id: "ddos", label: "DDoS Simulation" },
              { id: "ssl", label: "TLS 1.3 / SSL" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTest(t.id as typeof activeTest)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTest === t.id
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Linux Terminal View */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#040608] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-zinc-300 font-mono">
                root@mlhk-hardened-edge:~# (Ubuntu 24.04 LTS Hardened)
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Lock className="size-3" /> Zero Trust Active
            </span>
          </div>

          <pre className="p-6 font-mono text-xs text-emerald-400/90 overflow-x-auto leading-relaxed">
            <code>{TEST_OUTPUTS[activeTest]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

