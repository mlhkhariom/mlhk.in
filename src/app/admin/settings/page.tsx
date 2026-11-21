"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Check,
  Loader2,
  ShieldCheck,
  Building2,
  Users,
  AlertCircle,
  Lock,
} from "lucide-react";
import { ALLOWED_ADMIN_ROLES } from "@/lib/erp-utils";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  activeSessions: number;
  createdAt: string | number | null;
};

type UsersPayload = {
  currentUserId: string | null;
  currentUserRole: string | null;
  users: TeamMember[];
};

const COMPANY_FIELDS = [
  { key: "company_name", label: "Company Legal Name", placeholder: "MLHK Infotech" },
  { key: "gst_number", label: "GST Identification Number (GSTIN)", placeholder: "23CHLPV2868R1CJ" },
  { key: "udyam_number", label: "Udyam MSME Registration", placeholder: "UDYAM-MP-44-0005223" },
  { key: "contact_email", label: "Primary Official Email", placeholder: "support@mlhk.in" },
  { key: "contact_phone", label: "Official Support Phone", placeholder: "+91 91651 00124" },
  { key: "contact_address", label: "Registered Headquarters Address", placeholder: "Shajapur & Indore, Madhya Pradesh" },
  { key: "site_name", label: "Platform Brand Name", placeholder: "MLHK Infotech" },
  { key: "footer_text", label: "Footer Copyright Declaration", placeholder: "© MLHK Infotech. All rights reserved." },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<"company" | "team">("company");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [team, setTeam] = useState<UsersPayload | null>(null);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [teamFeedback, setTeamFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (typeof data === "object" && data !== null) {
          setSettings(data as Record<string, string>);
        }
      })
      .catch(() => {});
  }, []);

  const loadTeam = async () => {
    setLoadingTeam(true);
    setTeamFeedback(null);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Only administrators can view team roles.");
      }
      const d = (await res.json()) as UsersPayload;
      setTeam(d);
    } catch (err) {
      setTeamFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Could not load team accounts.",
      });
    } finally {
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    if (tab === "team" && !team) {
      loadTeam();
    }
  }, [tab, team]);

  async function handleSaveCompany() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const payload: Record<string, string> = {};
      for (const { key } of COMPANY_FIELDS) {
        if (typeof settings[key] === "string") {
          payload[key] = settings[key].trim();
        }
      }
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || "Failed to save settings");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  async function changeRole(userId: string, role: string) {
    setUpdatingUserId(userId);
    setTeamFeedback(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role }),
      });
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(d.error || "Role update rejected");
      }
      setTeam((prev) =>
        prev
          ? {
              ...prev,
              users: prev.users.map((u) => (u.id === userId ? { ...u, role } : u)),
            }
          : prev
      );
      setTeamFeedback({ type: "ok", text: "Team member role updated." });
    } catch (err) {
      setTeamFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to update role",
      });
    } finally {
      setUpdatingUserId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            System · Administration &amp; Security
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Team &amp; System Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage legal billing credentials, team access roles, and active admin sessions.
          </p>
        </div>

        {tab === "company" && (
          <button
            type="button"
            onClick={handleSaveCompany}
            disabled={saving}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : saved ? (
              <>
                <Check size={14} strokeWidth={2.5} />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save size={14} strokeWidth={2.5} />
                <span>Save Profile</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Console Tabs */}
      <div className="inline-flex rounded-xl border border-white/10 bg-[#0d0f14] p-1 text-xs">
        <button
          type="button"
          onClick={() => setTab("company")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
            tab === "company" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Building2 className="size-3.5" />
          <span>Company &amp; Tax Profile</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("team")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
            tab === "team" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Users className="size-3.5" />
          <span>Team &amp; Access Control</span>
        </button>
      </div>

      {tab === "company" ? (
        <>
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
            >
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-6">
            <h2 className="border-b border-white/10 pb-3.5 font-display text-sm font-bold text-white">
              Enterprise &amp; Tax Parameters
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMPANY_FIELDS.map(({ key, label, placeholder }) => {
                const inputId = `sys-setting-${key}`;
                return (
                  <div key={key}>
                    <label
                      htmlFor={inputId}
                      className="mb-1.5 block text-xs font-medium text-zinc-300"
                    >
                      {label}
                    </label>
                    <input
                      id={inputId}
                      placeholder={placeholder}
                      value={settings[key] ?? ""}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-5">
          {teamFeedback && (
            <div
              role="alert"
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs ${
                teamFeedback.type === "ok"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              {teamFeedback.type === "ok" ? (
                <Check className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              <span>{teamFeedback.text}</span>
            </div>
          )}

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-sm font-semibold text-white">Team Accounts &amp; Roles</h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                Assign least-privilege roles. Self-demotion and removing the final Super Admin are blocked automatically.
              </p>
            </div>

            {loadingTeam ? (
              <div className="flex h-36 items-center justify-center">
                <Loader2 className="size-5 animate-spin text-[#ff9f1c]" />
              </div>
            ) : !team ? (
              <p className="p-8 text-center text-xs text-zinc-500">
                Administrator permissions are required to manage team accounts.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      <th className="px-5 py-3">Member</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3 text-right">Active Sessions</th>
                      <th className="px-5 py-3 text-right">Access Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {team.users.map((u) => {
                      const isSelf = u.id === team.currentUserId;
                      const disabled =
                        isSelf ||
                        updatingUserId === u.id ||
                        (team.currentUserRole !== "super_admin" && u.role === "super_admin");

                      return (
                        <tr key={u.id} className="hover:bg-white/[0.02]">
                          <td className="px-5 py-3.5 font-medium text-white">
                            {u.name}
                            {isSelf && (
                              <span className="ml-2 font-mono text-[10px] text-[#ff9f1c]">
                                (You)
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-[11px] text-zinc-400">
                            {u.email}
                          </td>
                          <td className="px-5 py-3.5 text-right font-mono tabular-nums text-zinc-300">
                            {u.activeSessions}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <select
                              aria-label={`Role for ${u.name}`}
                              disabled={disabled}
                              value={u.role ?? "client"}
                              onChange={(e) => changeRole(u.id, e.target.value)}
                              className="rounded-lg border border-white/10 bg-[#07080a] px-2.5 py-1 text-xs capitalize text-white outline-none focus:border-[#ff9f1c] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {ALLOWED_ADMIN_ROLES.map((r) => (
                                <option
                                  key={r}
                                  value={r}
                                  disabled={r === "super_admin" && team.currentUserRole !== "super_admin"}
                                >
                                  {r.replace("_", " ")}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Active Security Policies */}
          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#ff9f1c]" />
              <h3 className="text-sm font-semibold text-white">Console Security Safeguards</h3>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#07080a] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                  <Lock className="size-3.5 text-emerald-400" />
                  Server-Side Role Checks
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  Every admin route verifies the signed HttpOnly session cookie and user role before touching D1.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#07080a] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                  <Lock className="size-3.5 text-emerald-400" />
                  Origin Protection
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  All state-changing admin API requests validate trusted origin headers to block cross-site submissions.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#07080a] p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                  <Lock className="size-3.5 text-emerald-400" />
                  Locked First-Run Setup
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  The initial Super Admin bootstrap automatically disables permanently once an admin account exists.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
