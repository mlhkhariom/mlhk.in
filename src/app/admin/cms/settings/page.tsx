"use client";

import { useEffect, useState } from "react";
import { Save, Check, Loader2, Sparkles, Sliders } from "lucide-react";

const SECTIONS = [
  {
    title: "Homepage Branding",
    fields: [
      { key: "hero_title", label: "Hero Title" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "cta_title", label: "CTA Section Title" },
      { key: "cta_subtitle", label: "CTA Subtitle" },
      { key: "announcement_bar", label: "Announcement Bar (blank = hidden)" },
    ],
  },
  {
    title: "Brand Identity",
    fields: [
      { key: "site_name", label: "Site Name" },
      { key: "site_tagline", label: "Tagline" },
      { key: "site_logo", label: "Logo URL" },
      { key: "favicon", label: "Favicon URL" },
    ],
  },
  {
    title: "Official Contact",
    fields: [
      { key: "contact_email", label: "Email" },
      { key: "contact_phone", label: "Phone / WhatsApp" },
      { key: "contact_address", label: "Address" },
      { key: "contact_map", label: "Google Maps Embed URL" },
    ],
  },
  {
    title: "Search & Metadata (SEO)",
    fields: [
      { key: "meta_title", label: "Default Meta Title" },
      { key: "meta_description", label: "Default Meta Description", type: "textarea" },
      { key: "og_image", label: "Default OpenGraph Image URL" },
      { key: "google_analytics", label: "Google Analytics / Tag ID" },
    ],
  },
  {
    title: "Social Platforms",
    fields: [
      { key: "social_facebook", label: "Facebook URL" },
      { key: "social_instagram", label: "Instagram URL" },
      { key: "social_twitter", label: "Twitter / X URL" },
      { key: "social_linkedin", label: "LinkedIn URL" },
      { key: "social_youtube", label: "YouTube URL" },
      { key: "social_whatsapp", label: "WhatsApp Number" },
    ],
  },
  {
    title: "Theme Accents",
    fields: [
      { key: "primary_color", label: "Primary Accent Hex", type: "color" },
      { key: "footer_text", label: "Footer Copyright Notice" },
    ],
  },
];

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => r.json())
      .then((d: unknown) => setSettings(d && typeof d === "object" ? (d as Record<string, string>) : {}))
      .catch(() => {});
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Global Site Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Configure site metadata, contacts, social links, and brand colors.
          </p>
        </div>

        <button
          onClick={save}
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

      {/* Settings Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="flex size-6 items-center justify-center rounded-lg border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
                <Sliders size={12} />
              </span>
              <h2 className="font-display text-sm font-bold text-white">
                {section.title}
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              {section.fields.map((f) => (
                <div key={f.key} className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                  <label className="text-xs font-medium text-zinc-300">
                    {f.label}
                  </label>
                  <div className="sm:col-span-2">
                    {f.type === "textarea" ? (
                      <textarea
                        rows={2}
                        value={settings[f.key] ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                        }
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
                      />
                    ) : f.type === "color" ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings[f.key] ?? "#ff9f1c"}
                          onChange={(e) =>
                            setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                          }
                          className="size-8 cursor-pointer rounded-lg border border-white/15 bg-transparent p-0.5"
                        />
                        <input
                          value={settings[f.key] ?? "#ff9f1c"}
                          onChange={(e) =>
                            setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                          }
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none"
                        />
                      </div>
                    ) : (
                      <input
                        value={settings[f.key] ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
