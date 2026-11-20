"use client";

import { useState, useEffect } from "react";
import { Save, Check, Loader2, Settings } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields = [
    { key: "company_name", label: "Company Legal Name" },
    { key: "contact_email", label: "Primary Admin Contact Email" },
    { key: "contact_phone", label: "Official Support Contact" },
    { key: "contact_address", label: "Registered Headquarters Address" },
    { key: "gst_number", label: "GST Identification Number (GSTIN)" },
    { key: "site_name", label: "Platform Brand Name" },
    { key: "site_tagline", label: "Platform Brand Tagline" },
    { key: "footer_text", label: "Footer Copyright Declaration" },
  ];

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {};
        if (Array.isArray(data)) {
          data.forEach((r: { key: string; value: string }) => {
            map[r.key] = r.value;
          });
        } else if (typeof data === "object" && data !== null) {
          Object.assign(map, data);
        }
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const payload: Record<string, string> = {};
      for (const { key } of fields) {
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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            System &amp; Enterprise Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Configure system variables, tax IDs, and global legal references.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Saving...
            </>
          ) : saved ? (
            <>
              <Check size={14} strokeWidth={2.5} /> Saved!
            </>
          ) : (
            <>
              <Save size={14} strokeWidth={2.5} /> Save Settings
            </>
          )}
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <span className="flex size-7 items-center justify-center rounded-lg border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Settings size={14} />
          </span>
          <h2 className="font-display text-sm font-bold text-white">General Parameters</h2>
        </div>

        <div className="mt-5 space-y-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                {label}
              </label>
              <input
                value={settings[key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
