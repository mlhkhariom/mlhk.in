"use client";

import { useEffect, useState } from "react";
import { Save, Check, Loader2, AlertCircle } from "lucide-react";

const SECTIONS = [
  {
    id: "homepage",
    title: "Homepage & Hero",
    fields: [
      { key: "hero_title", label: "Hero Title" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "cta_title", label: "CTA Section Title" },
      { key: "cta_subtitle", label: "CTA Subtitle" },
      { key: "announcement_bar", label: "Announcement Bar (leave blank to hide)" },
    ],
  },
  {
    id: "brand",
    title: "Brand Identity",
    fields: [
      { key: "site_name", label: "Site Name" },
      { key: "site_tagline", label: "Tagline" },
      { key: "site_logo", label: "Logo URL" },
      { key: "favicon", label: "Favicon URL" },
      { key: "primary_color", label: "Primary Accent Hex", type: "color" },
      { key: "footer_text", label: "Footer Copyright Notice" },
    ],
  },
  {
    id: "contact",
    title: "Official Contact",
    fields: [
      { key: "contact_email", label: "Contact Email" },
      { key: "contact_phone", label: "Phone / WhatsApp" },
      { key: "contact_address", label: "Office Address" },
      { key: "contact_map", label: "Google Maps Embed URL" },
    ],
  },
  {
    id: "seo",
    title: "SEO & Analytics",
    fields: [
      { key: "meta_title", label: "Default Meta Title" },
      { key: "meta_description", label: "Default Meta Description", type: "textarea" },
      { key: "og_image", label: "Default OpenGraph Image URL" },
      { key: "google_analytics", label: "Google Analytics / Tag ID" },
    ],
  },
  {
    id: "social",
    title: "Social Profiles",
    fields: [
      { key: "social_facebook", label: "Facebook URL" },
      { key: "social_instagram", label: "Instagram URL" },
      { key: "social_twitter", label: "Twitter / X URL" },
      { key: "social_linkedin", label: "LinkedIn URL" },
      { key: "social_youtube", label: "YouTube URL" },
      { key: "social_whatsapp", label: "WhatsApp Number" },
    ],
  },
];

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d: unknown) =>
        setSettings(d && typeof d === "object" ? (d as Record<string, string>) : {})
      )
      .catch(() => {});
  }, []);

  async function save() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to save site settings");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  const currentSection = SECTIONS.find((s) => s.id === activeTab) ?? SECTIONS[0];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CMS · Site Identity &amp; SEO
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Site Identity Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Configure homepage copy, SEO metadata, official contacts, and social links stored in D1.
          </p>
        </div>

        <button
          type="button"
          onClick={save}
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
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#0d0f14] p-1">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setActiveTab(sec.id)}
            className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
              activeTab === sec.id
                ? "bg-white/10 font-semibold text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Active Section Card */}
      <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-6">
        <h2 className="border-b border-white/10 pb-3.5 font-display text-sm font-bold text-white">
          {currentSection.title}
        </h2>

        <div className="mt-5 space-y-4">
          {currentSection.fields.map((f) => {
            const inputId = `site-setting-${f.key}`;
            return (
              <div key={f.key} className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                <label htmlFor={inputId} className="text-xs font-medium text-zinc-300">
                  {f.label}
                </label>
                <div className="sm:col-span-2">
                  {f.type === "textarea" ? (
                    <textarea
                      id={inputId}
                      rows={3}
                      value={settings[f.key] ?? ""}
                      onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                    />
                  ) : f.type === "color" ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        aria-label={f.label}
                        value={settings[f.key] || "#ff9f1c"}
                        onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                        className="size-9 cursor-pointer rounded-lg border border-white/15 bg-transparent p-0.5"
                      />
                      <input
                        id={inputId}
                        value={settings[f.key] ?? "#ff9f1c"}
                        onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                        className="flex-1 rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
                      />
                    </div>
                  ) : (
                    <input
                      id={inputId}
                      value={settings[f.key] ?? ""}
                      onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
