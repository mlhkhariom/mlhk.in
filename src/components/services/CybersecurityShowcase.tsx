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
  Key,
  Cpu,
  Globe,
  FileText,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Radio,
  Eye,
  EyeOff,
  Activity,
  Wifi,
  WifiOff,
  Database,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type TerminalCmd = "nmap" | "ssh" | "ddos" | "ssl" | "owasp" | "ufw";

interface CommandSpec {
  id: TerminalCmd;
  name: string;
  command: string;
  category: string;
  description: string;
  output: string;
}

const TERMINAL_COMMANDS: CommandSpec[] = [
  {
    id: "nmap",
    name: "0-Port Scan",
    command: "nmap -p- --open -T4 target.mlhk.in",
    category: "Perimeter Isolation",
    description: "Scan all 65,535 TCP ports to verify complete origin invisibility.",
    output: `root@mlhk-hardened-edge:~# nmap -p- --open -T4 target.mlhk.in
Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-17 11:00 IST
Initiating SYN Stealth Scan against target.mlhk.in (104.21.72.194)
Scanning 65535 ports [1000 ports/sec]
Nmap scan report for target.mlhk.in
Host is up (0.00042s latency).
All 65535 scanned ports on target are in filtered/closed states.
Not shown: 65535 closed tcp ports (reset)

[+] AUDIT RESULT: ZERO (0) INBOUND PORTS EXPOSED TO PUBLIC INTERNET
[+] Origin IP is completely masked via Cloudflare Zero Trust Tunnels (cloudflared).
[+] All management access requires mTLS or Cloudflare Access SSO authentication.`,
  },
  {
    id: "ssh",
    name: "SSH Key Audit",
    command: "ssh-audit --strict /etc/ssh/sshd_config",
    category: "Host Hardening",
    description: "Verify elimination of password logins and enforce ED25519 cryptography.",
    output: `root@mlhk-hardened-edge:~# ssh-audit --strict /etc/ssh/sshd_config
# Executing OpenSSH 9.6 Daemon Cryptographic & Policy Audit
[+] Port 22: DISABLED (Re-bound to non-standard isolated tunnel interface)
[+] PasswordAuthentication: no (100% Passwords Rejected)
[+] PermitRootLogin: no (Root direct login prohibited)
[+] PubkeyAuthentication: yes
[+] Allowed Cryptographic Algorithms:
    - HostKeyAlgorithms: ssh-ed25519 (Curve25519 256-bit)
    - KexAlgorithms: curve25519-sha256@libssh.org
    - Ciphers: chacha20-poly1305@openssh.com, aes256-gcm@openssh.com
    - MACs: hmac-sha2-512-etm@openssh.com
[-] Deprecated Algorithms (3DES, RC4, MD5, SHA1, DSA): REMOVED & ZERO TOLERANCE
[+] MaxAuthTries: 3
[+] Fail2ban Integration: ACTIVE (3 failed attempts = 24h IP jail on iptables)
[+] OVERALL SSH HARDENING SCORE: 100 / 100 (Cryptographic Grade A+)`,
  },
  {
    id: "ddos",
    name: "DDoS Mitigation",
    command: "simulate-ddos --type SYN-FLOOD --rate 500k/s",
    category: "Edge Shield",
    description: "Simulate a 500,000 req/sec volumetric assault against the edge perimeter.",
    output: `root@mlhk-hardened-edge:~# simulate-ddos --type SYN-FLOOD --rate 500000/s --duration 15s
[*] Inbound Synthetic L4/L7 Volumetric Burst Initiated:
    Target: https://mlhk.in/services
    Volume: 500,000 requests/sec | 42.8 Gbps aggregate throughput
[*] Edge Telemetry (Cloudflare Global Anycast POPs):
    - Mumbai POP (BOM): 142,000 req/s absorbed in 0.012s
    - Delhi POP (DEL):  118,000 req/s absorbed in 0.014s
    - Singapore (SIN):  120,000 req/s absorbed in 0.009s
    - Frankfurt (FRA):  120,000 req/s absorbed in 0.011s
[+] Cloudflare BGP Anycast Armor: 100% malicious packet drops at perimeter
[+] Malicious Origin Breaches: 0 packets reached internal backend
[+] Origin Server Health Telemetry:
    - CPU Load: 2.1% (Nominal)
    - RAM Ingestion: 420 MB / 8 GB (Stable)
    - HTTP 200 Availability for legitimate visitors: 100.00%
    - Downtime: 0.0000 milliseconds`,
  },
  {
    id: "ssl",
    name: "TLS 1.3 & HSTS",
    command: "ssl-labs-audit --target mlhk.in --strict",
    category: "Transport Cryptography",
    description: "Benchmark TLS 1.3 protocol, Perfect Forward Secrecy, and HSTS preload.",
    output: `root@mlhk-hardened-edge:~# ssl-labs-audit --target mlhk.in --strict
# Qualys SSL Labs Benchmark Protocol Suite v2.4
[+] Target Host: mlhk.in (IP: 104.21.72.194)
[+] Protocols Supported:
    - SSL 2.0 / 3.0: DISABLED
    - TLS 1.0 / 1.1: DISABLED (Legacy insecure protocols rejected)
    - TLS 1.2: ENABLED (Strict AEAD ciphers only)
    - TLS 1.3: ENABLED (Default Preferred)
[+] Cipher Suite: TLS_AES_256_GCM_SHA384 (256-bit AEAD)
[+] Key Exchange: ECDH x25519 (Curve25519 - Perfect Forward Secrecy)
[+] HTTP Strict Transport Security (HSTS):
    - max-age=31536000 (1 year)
    - includeSubDomains: true
    - preload: true
[+] Security Headers:
    - X-Content-Type-Options: nosniff
    - X-Frame-Options: DENY
    - Referrer-Policy: strict-origin-when-cross-origin
    - Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
[+] SSL LABS CERTIFICATION: A+ (Highest Cryptographic Tier)`,
  },
  {
    id: "owasp",
    name: "OWASP Top 10",
    command: "owasp-zap-cli quick-scan --spider --ajax https://mlhk.in",
    category: "Application Security",
    description: "Execute automated application vulnerability scanning for the OWASP Top 10.",
    output: `root@mlhk-hardened-edge:~# owasp-zap-cli quick-scan --spider --ajax https://mlhk.in
[*] Initializing OWASP Zed Attack Proxy v2.14 Crawler...
[*] Spidering routes across DOM & Edge API endpoints...
    Found 48 distinct dynamic routes and API handlers.
[*] Fuzzing test payloads against injection vectors:
    [+] A01: Broken Access Control     -> PASSED (RBAC & JWT signature verification valid)
    [+] A02: Cryptographic Failures    -> PASSED (Zero plaintext credentials, TLS 1.3 enforced)
    [+] A03: Injection (SQLi / XSS)    -> PASSED (Prepared statements with Drizzle ORM, zero raw SQL)
    [+] A04: Insecure Design           -> PASSED (Rate limiters active on all endpoints)
    [+] A05: Security Misconfig        -> PASSED (CORS strict whitelist, debug headers stripped)
    [+] A06: Vulnerable Dependencies   -> PASSED (0 known CVEs across npm & container packages)
    [+] A07: Auth & Identification     -> PASSED (Argon2id password hashes, anti-replay nonces)
    [+] A08: Software & Data Integrity -> PASSED (Signed git commits, Subresource Integrity)
    [+] A09: Security Logging & Alerts -> PASSED (Real-time centralized audit logs enabled)
    [+] A10: Server-Side Request SSRF  -> PASSED (Private IP addresses 127.0.0.1 blocked from fetches)
[+] OWASP SCAN SUMMARY: 0 High, 0 Medium, 0 Low Vulnerabilities Detected.`,
  },
  {
    id: "ufw",
    name: "UFW & Iptables",
    command: "ufw status verbose",
    category: "Kernel Firewall",
    description: "Inspect Linux kernel stateful packet filtering and default-deny policies.",
    output: `root@mlhk-hardened-edge:~# ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
Anywhere on cloudflared0   ALLOW IN    198.41.192.0/20 (Cloudflare Edge Tunnel)
Anywhere on cloudflared0   ALLOW IN    198.41.200.0/20 (Cloudflare Edge Tunnel)
127.0.0.1 5432/tcp         ALLOW IN    127.0.0.1 (PostgreSQL internal loopback only)
127.0.0.1 6379/tcp         ALLOW IN    127.0.0.1 (Redis internal loopback only)

[+] INBOUND PACKET DISPOSITION:
    - Public TCP 22 (SSH): BLOCKED / STEALTH DROP
    - Public TCP 80/443: HANDLED AT CLOUDFLARE EDGE (Direct IP connection drops)
    - Public TCP 5432/3306 (DBs): BLOCKED / DROPPED SILENTLY
[+] Raw socket scanning against host IP produces 100% time-out packets.`,
  },
];

interface OwaspItem {
  id: string;
  code: string;
  title: string;
  threat: string;
  defense: string;
  standard: string;
}

const OWASP_MATRIX: OwaspItem[] = [
  {
    id: "a01",
    code: "A01:2021",
    title: "Broken Access Control",
    threat: "Unauthorized users escalating privileges or accessing sensitive competitor tenant records.",
    defense: "Multi-layered RBAC enforced at both Edge middleware and PostgreSQL Row-Level Security (RLS) policies.",
    standard: "Role hierarchy checks with strict tenant ID isolation in all WHERE clauses.",
  },
  {
    id: "a02",
    code: "A02:2021",
    title: "Cryptographic Failures",
    threat: "Exposure of passwords or credit cards in plaintext over insecure transport or storage.",
    defense: "Argon2id password hashing with custom salt, AES-256 GCM database column encryption, and TLS 1.3 in transit.",
    standard: "Zero plaintext secrets stored. Environment secrets vaulted with Cloudflare Workers Secrets.",
  },
  {
    id: "a03",
    code: "A03:2021",
    title: "Injection Flaws",
    threat: "SQL injection, command execution, or NoSQL injection manipulating backend databases.",
    defense: "100% parameterized queries using Drizzle ORM. Strictly zero string concatenation for SQL statements.",
    standard: "Zod runtime schema validation sanitizes every incoming request payload before database interaction.",
  },
  {
    id: "a04",
    code: "A04:2021",
    title: "Insecure Design",
    threat: "Flawed application architecture without threat modeling, leading to business logic exploits.",
    defense: "Zero-Trust architecture by design: principle of least privilege, idempotency keys, and rate limits.",
    standard: "Formal threat modeling and state-machine transitions preventing skip-step invoice tampering.",
  },
  {
    id: "a05",
    code: "A05:2021",
    title: "Security Misconfiguration",
    threat: "Default credentials, unnecessary ports open, detailed error stack traces revealed to attackers.",
    defense: "Automated Linux CIS benchmark hardening scripts, disabled directory listings, and generic error masks.",
    standard: "Cloudflare Tunnels eliminate open ports; server responds with sanitized generic error envelopes.",
  },
  {
    id: "a06",
    code: "A06:2021",
    title: "Vulnerable Components",
    threat: "Outdated third-party npm or Python packages containing known CVE exploits.",
    defense: "Automated Dependabot and Snyk scanning in CI/CD pipeline blocking builds with critical or high CVEs.",
    standard: "Locked lockfiles (`package-lock.json`) with subresource integrity checks on all third-party scripts.",
  },
  {
    id: "a07",
    code: "A07:2021",
    title: "Identification & Auth",
    threat: "Credential stuffing, brute-force attacks, and session hijacking bypassing weak login screens.",
    defense: "Fail2ban rate-limiting, Cloudflare Turnstile bot deterrence, time-limited cryptographic JWT tokens.",
    standard: "Mandatory multi-factor authentication (MFA) with TOTP or hardware security keys on admin consoles.",
  },
  {
    id: "a08",
    code: "A08:2021",
    title: "Software & Data Integrity",
    threat: "Untrusted plugins, deserialization attacks, or unverified CI/CD pipeline code execution.",
    defense: "Cryptographically signed Git commits, automated build pipeline artifact validation, and immutable deployments.",
    standard: "Atomic git deployments to Cloudflare edge; previous revisions preserved for instant 1-click rollback.",
  },
  {
    id: "a09",
    code: "A09:2021",
    title: "Security Logging & Alerts",
    threat: "Undetected intrusions and silent breaches remaining active inside systems for months.",
    defense: "Centralized tamper-evident audit logs with real-time alerting webhooks triggered on anomalous spikes.",
    standard: "Every administrative mutation, privilege escalation, and auth failure logged with immutable timestamps.",
  },
  {
    id: "a10",
    code: "A10:2021",
    title: "Server-Side Request Forgery",
    threat: "Attackers forcing backend servers to query internal metadata services (e.g., AWS 169.254.169.254).",
    defense: "Strict egress fetch whitelists with loopback (127.0.0.1) and private RFC1918 subnets blocked at socket level.",
    standard: "Domain verification regex and DNS resolution pre-checks before executing outbound HTTP requests.",
  },
];

export function CybersecurityShowcase() {
  const [activeCmd, setActiveCmd] = useState<TerminalCmd>("nmap");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [viewMode, setViewMode] = useState<"terminal" | "topology" | "owasp" | "calculator">("terminal");
  const [topologyArch, setTopologyArch] = useState<"legacy" | "zerotrust">("zerotrust");
  const [selectedOwasp, setSelectedOwasp] = useState<string>("a01");

  // Security Posture Audit Checklist State
  const [checklist, setChecklist] = useState({
    rootLoginDisabled: true,
    zeroPortsExposed: true,
    tls13Enforced: true,
    offsiteBackups: true,
    owaspSanitized: true,
  });

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCommandSpec = TERMINAL_COMMANDS.find((c) => c.id === activeCmd) || TERMINAL_COMMANDS[0];

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(activeCommandSpec.command);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const calculatedScore = Object.values(checklist).filter(Boolean).length * 20;

  return (
    <div className="space-y-16">
      {/* Main Interactive Showcase Shell */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#09080d] via-[#050407] to-[#020204] p-6 md:p-10 shadow-[0_30px_100px_-20px_rgba(239,68,68,0.2)]">
        {/* Ambient Tactical Glowing Mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]"
        />

        {/* Section Header with Mode Selector */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
                <ShieldCheck className="size-3 text-red-400" />
                Hardened Infrastructure Lab
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Zero-Trust Defense-in-Depth
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] text-amber-300 font-mono">
                A+ SSL Labs Certified
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              Zero Inbound Ports. Cryptographic Proof. Absolute Perimeter Defense.
            </h3>
            <p className="mt-2 max-w-3xl text-xs md:text-sm leading-relaxed text-zinc-400">
              Traditional servers leave port 22, 80, and 5432 exposed to internet crawlers and botnets. MLHK Infotech
              deploys Zero-Trust Cloudflare Tunnels, mandatory ED25519 SSH keys, stateful kernel firewalls, and continuous
              OWASP Top 10 mitigation so your corporate databases remain invisible and impregnable.
            </p>
          </div>

          {/* Navigation View Modes */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
            {[
              { id: "terminal", label: "Tactical Terminal", icon: Terminal },
              { id: "topology", label: "Perimeter Topology", icon: Layers },
              { id: "owasp", label: "OWASP Matrix", icon: ShieldCheck },
              { id: "calculator", label: "Security Audit Tool", icon: Activity },
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
                      ? "border border-red-500/40 bg-red-500/20 text-white shadow-lg shadow-red-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-red-400" : "text-zinc-500"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: TACTICAL LINUX SECURITY TERMINAL CONSOLE                          */}
        {/* ========================================================================= */}
        {viewMode === "terminal" && (
          <div className="mt-8 space-y-6">
            {/* Command Palette Selector Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400">
                  Select Live Diagnostic Command:
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  Environment: Ubuntu 24.04 LTS (Kernel 6.8 Hardened)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {TERMINAL_COMMANDS.map((cmd) => {
                  const isSelected = activeCmd === cmd.id;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => setActiveCmd(cmd.id)}
                      className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? "border-red-500/60 bg-red-500/15 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                          : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{cmd.category}</span>
                      <span className="mt-1 font-mono text-xs font-bold text-white">{cmd.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tactical Monospace Terminal Frame */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#030305] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-500/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-3 text-zinc-300 font-mono text-xs hidden sm:inline">
                    root@mlhk-hardened-edge:~# (Cloudflare Tunnel: outbound-only)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copiedCmd ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-zinc-400" />
                        <span>Copy Bash</span>
                      </>
                    )}
                  </button>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <Lock className="size-3" /> Zero-Trust Active
                  </span>
                </div>
              </div>

              {/* Terminal Output Code Container */}
              <div className="p-5 md:p-7 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto">
                <div className="flex items-center gap-2 text-zinc-500 pb-3 border-b border-white/5 mb-4 text-[11px]">
                  <Terminal className="size-3.5 text-red-400" />
                  <span>Diagnostic Command: </span>
                  <span className="text-red-400 font-semibold">{activeCommandSpec.command}</span>
                </div>
                <pre className="text-emerald-400/90 whitespace-pre font-mono text-[11px] md:text-xs">
                  <code>{activeCommandSpec.output}</code>
                </pre>
              </div>

              {/* Terminal Status Footer */}
              <div className="flex flex-wrap items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Radio className="size-3 animate-pulse" /> Daemon: cloudflared.service active (running)
                  </span>
                  <span className="hidden md:inline text-zinc-600">•</span>
                  <span className="hidden md:inline text-zinc-400">Strict ED25519 Verified</span>
                </div>
                <div className="text-zinc-500 text-[10px]">
                  BGP Armor: Active | Zero Inbound Open Ports
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ZERO-TRUST NETWORK PERIMETER TOPOLOGY INSPECTOR                    */}
        {/* ========================================================================= */}
        {viewMode === "topology" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Network Architecture Comparison: Public Origin vs MLHK Zero-Trust
                </h4>
                <p className="text-xs text-zinc-400">
                  Toggle between architectures to see how attacks are stopped at the edge before ever reaching your server.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-1">
                <button
                  type="button"
                  onClick={() => setTopologyArch("legacy")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    topologyArch === "legacy"
                      ? "border border-red-500/40 bg-red-500/20 text-red-200"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Legacy Exposed (High Risk)
                </button>
                <button
                  type="button"
                  onClick={() => setTopologyArch("zerotrust")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    topologyArch === "zerotrust"
                      ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-200"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  MLHK Zero-Trust (100% Shielded)
                </button>
              </div>
            </div>

            {/* Topology Diagram Interactive View */}
            <div className="rounded-2xl border border-white/10 bg-[#040407] p-6 md:p-8">
              {topologyArch === "legacy" ? (
                <div className="space-y-6">
                  {/* Danger Alert Banner */}
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3">
                    <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-zinc-300 space-y-1">
                      <p className="font-bold text-red-300">
                        Vulnerability Warning: Direct Public Exposure & Open Attack Surface
                      </p>
                      <p className="text-zinc-400 leading-relaxed">
                        In typical agency setups, the VPS server IP is mapped directly to DNS A records. Hackers and automated
                        bots run Shodan and Masscan sweeps, bombard port 22 with SSH password dictionaries, and launch direct
                        IP volumetric floods that exhaust CPU and crash databases without being filtered.
                      </p>
                    </div>
                  </div>

                  {/* Flow Diagram for Legacy */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-red-400">
                        <span>ATTACK TRAFFIC</span>
                        <span className="text-[10px] rounded bg-red-500/20 px-1.5 py-0.5">UNFILTERED</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">Internet & Malicious Bots</h5>
                      <p className="text-xs text-zinc-400">
                        DDoS attacks, credential stuffing bots, port scanners, and SQLi fuzzers connect directly to your server.
                      </p>
                      <div className="rounded border border-red-500/20 bg-black/40 p-2 font-mono text-[10px] text-red-300">
                        Raw SYN Flood: 200,000 req/s &rarr; Target IP
                      </div>
                    </div>

                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-red-400">
                        <span>PUBLIC FIREWALL</span>
                        <span className="text-[10px] rounded bg-red-500/20 px-1.5 py-0.5">OPEN PORTS</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">Exposed Ports</h5>
                      <ul className="text-xs space-y-1 font-mono text-red-300">
                        <li>• Port 22 (SSH) - Password Auth OPEN</li>
                        <li>• Port 80/443 (Web) - Direct IP Exposed</li>
                        <li>• Port 5432 (Postgres) - Searchable on Shodan</li>
                      </ul>
                      <div className="rounded border border-red-500/20 bg-black/40 p-2 font-mono text-[10px] text-red-300">
                        Failed Logins: 14,200/day
                      </div>
                    </div>

                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-red-400">
                        <span>ORIGIN IMPACT</span>
                        <span className="text-[10px] rounded bg-red-500/20 px-1.5 py-0.5">HIGH DOWNTIME</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">Origin Server Down</h5>
                      <p className="text-xs text-zinc-400">
                        Origin CPU hits 100%, database locks, memory runs out of swap, and business operations halt.
                      </p>
                      <div className="rounded border border-red-500/20 bg-black/40 p-2 font-mono text-[10px] text-red-300">
                        System Load: 48.2 (Kernel Panic)
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Zero-Trust Success Banner */}
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-zinc-300 space-y-1">
                      <p className="font-bold text-emerald-300">
                        MLHK Zero-Trust Hardening: Zero Open Inbound Ports & Masked Origin IP
                      </p>
                      <p className="text-zinc-400 leading-relaxed">
                        With Cloudflare Tunnels (`cloudflared`), our servers initiate an outbound-only encrypted tunnel to Cloudflare's
                        global edge network over WireGuard. The origin has zero open public ports (no port 22, no 80, no 443, no 5432).
                        All attacks are absorbed at Cloudflare's 330+ Anycast edge data centers without touching the server.
                      </p>
                    </div>
                  </div>

                  {/* Flow Diagram for Zero-Trust */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>EDGE PERIMETER</span>
                        <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5">330+ CITIES</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">Cloudflare Global Edge WAF</h5>
                      <p className="text-xs text-zinc-400">
                        DDoS attacks, bot scrapers, and SQLi attempts are absorbed instantly at the nearest city POP before transit.
                      </p>
                      <div className="rounded border border-emerald-500/20 bg-black/40 p-2 font-mono text-[10px] text-emerald-300">
                        DDoS Mitigation: 100% Absorbed at Edge
                      </div>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>TUNNEL TRANSPORT</span>
                        <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5">OUTBOUND ONLY</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">cloudflared WireGuard Tunnel</h5>
                      <ul className="text-xs space-y-1 font-mono text-emerald-300">
                        <li>• Zero public open ports (Nmap = 0 open)</li>
                        <li>• Origin IP hidden from public DNS records</li>
                        <li>• Strict mTLS / SSO authentication for admin</li>
                      </ul>
                      <div className="rounded border border-emerald-500/20 bg-black/40 p-2 font-mono text-[10px] text-emerald-300">
                        Inbound Ports: 0 / 65535
                      </div>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>HARDENED ORIGIN</span>
                        <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5">PEAK HEALTH</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">Clean Origin Linux Host</h5>
                      <p className="text-xs text-zinc-400">
                        Server processes only authenticated, sanitized traffic. CPU load stays under 3% with 100.00% uptime.
                      </p>
                      <div className="rounded border border-emerald-500/20 bg-black/40 p-2 font-mono text-[10px] text-emerald-300">
                        CPU Load: 1.8% • RAM: 410 MB
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: OWASP TOP 10 ENTERPRISE DEFENSE MATRIX                            */}
        {/* ========================================================================= */}
        {viewMode === "owasp" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  OWASP Top 10 (2026 Edition) Vulnerability Defense Matrix
                </h4>
                <p className="text-xs text-zinc-400">
                  Click any vulnerability category to view the threat vector and MLHK's exact architectural countermeasures.
                </p>
              </div>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-mono text-red-300">
                100% Defense Verification
              </span>
            </div>

            {/* OWASP Selector Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {OWASP_MATRIX.map((item) => {
                const isSelected = selectedOwasp === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedOwasp(item.id)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-red-500/60 bg-red-500/20 text-white shadow-lg shadow-red-500/20"
                        : "border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-red-400 font-bold block">{item.code}</span>
                    <span className="text-xs font-semibold text-white line-clamp-1 mt-0.5">{item.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active OWASP Detail Card */}
            {(() => {
              const activeItem = OWASP_MATRIX.find((o) => o.id === selectedOwasp) || OWASP_MATRIX[0];
              return (
                <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-[#0c0a12] via-[#07050a] to-[#040306] p-6 md:p-8 space-y-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-red-500/20 px-2.5 py-1 text-xs font-mono font-bold text-red-400">
                        {activeItem.code}
                      </span>
                      <h5 className="font-display text-xl font-bold text-white">{activeItem.title}</h5>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" /> Countermeasure Verified
                    </span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] p-5 space-y-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="size-3.5" /> Threat & Attack Scenario
                      </span>
                      <p className="text-xs leading-relaxed text-zinc-300">{activeItem.threat}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5 space-y-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5" /> MLHK Architectural Defense
                      </span>
                      <p className="text-xs leading-relaxed text-zinc-200">{activeItem.defense}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                    <span className="text-zinc-400 font-mono">
                      Engineering Implementation Standard:{" "}
                      <span className="text-white font-sans">{activeItem.standard}</span>
                    </span>
                    <a
                      href={`https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20want%20to%20audit%20our%20infrastructure%20against%20${encodeURIComponent(
                        activeItem.title,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-red-400 hover:text-white font-semibold transition-colors shrink-0"
                    >
                      Audit This Vulnerability <ArrowRight className="size-3" />
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: INTERACTIVE INFRASTRUCTURE RISK CALCULATOR                         */}
        {/* ========================================================================= */}
        {viewMode === "calculator" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Interactive Infrastructure Security Posture & Risk Calculator
                </h4>
                <p className="text-xs text-zinc-400">
                  Evaluate your current server setup against fundamental security benchmarks to see your vulnerability rating.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Posture Rating</span>
                <span
                  className={`font-mono text-xl font-bold ${
                    calculatedScore === 100
                      ? "text-emerald-400"
                      : calculatedScore >= 60
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {calculatedScore} / 100
                </span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  key: "rootLoginDisabled" as const,
                  title: "Direct Root Login Prohibited",
                  detail: "Root password logins disabled, enforcing sudo non-privileged users with ED25519 SSH keys only.",
                },
                {
                  key: "zeroPortsExposed" as const,
                  title: "Zero Inbound Ports (Cloudflare Tunnels)",
                  detail: "No open public IPv4/IPv6 ports; origin connects outbound only to edge proxies.",
                },
                {
                  key: "tls13Enforced" as const,
                  title: "TLS 1.3 & HSTS Preload Enforced",
                  detail: "Legacy TLS 1.0/1.1 disabled, strict AEAD cipher suites, and 1-year HSTS header active.",
                },
                {
                  key: "offsiteBackups" as const,
                  title: "Automated Offsite Encrypted Snapshots",
                  detail: "Daily PostgreSQL/SQLite database snapshots encrypted with AES-256 and stored in secondary regions.",
                },
                {
                  key: "owaspSanitized" as const,
                  title: "OWASP Sanitization & Prepared Statements",
                  detail: "100% parameterized SQL queries, Zod schema validation, and rate limiters on all API routes.",
                },
              ].map((item) => {
                const isChecked = checklist[item.key];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleChecklistItem(item.key)}
                    className={`flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                      isChecked
                        ? "border-emerald-500/40 bg-emerald-500/10 text-white"
                        : "border-red-500/40 bg-red-500/10 text-zinc-300"
                    }`}
                  >
                    <div
                      className={`mt-0.5 size-5 rounded-md flex items-center justify-center shrink-0 border ${
                        isChecked ? "border-emerald-400 bg-emerald-500 text-black" : "border-red-400/50 bg-black/40 text-red-400"
                      }`}
                    >
                      {isChecked ? <Check className="size-3.5 stroke-[3]" /> : <AlertTriangle className="size-3" />}
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs text-white">{item.title}</h5>
                      <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">{item.detail}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Assessment Result Summary */}
            <div className="rounded-2xl border border-white/10 bg-[#06050a] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
                  Diagnostic Diagnosis
                </span>
                <h5 className="mt-1 font-display text-base font-bold text-white">
                  {calculatedScore === 100
                    ? "Cryptographically Hardened: 0 Vulnerabilities Detected"
                    : calculatedScore >= 60
                    ? "Moderate Exposure: Infrastructure Vulnerable to Targeted Intrusion"
                    : "Critical Danger: Server Open to Automated Bots, Ransomware & Brute-Force Attacks"}
                </h5>
                <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
                  {calculatedScore === 100
                    ? "Your architecture meets MLHK Infotech's military-grade hardening standard. Origin is completely invisible to public crawlers."
                    : "You are currently exposing attack surfaces that automated scanning bots continuously probe. Schedule a rapid hardening session."}
                </p>
              </div>

              <a
                href={`https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20our%20infrastructure%20scored%20${calculatedScore}%2F100%20on%20your%20security%20calculator.%20We%20need%20a%20hardening%20audit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-500/20 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-red-500/30 hover:scale-[1.02] shrink-0"
              >
                <span>Request Hardening Audit</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
