"use client";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

const SECTIONS = [
  {
    title: "General",
    fields: [
      { key: "site_name", label: "Site Name" },
      { key: "site_tagline", label: "Tagline" },
      { key: "site_logo", label: "Logo URL" },
      { key: "favicon", label: "Favicon URL" },
    ],
  },
  {
    title: "Contact Info",
    fields: [
      { key: "contact_email", label: "Email" },
      { key: "contact_phone", label: "Phone / WhatsApp" },
      { key: "contact_address", label: "Address" },
      { key: "contact_map", label: "Google Maps Embed URL" },
    ],
  },
  {
    title: "SEO",
    fields: [
      { key: "meta_title", label: "Default Meta Title" },
      { key: "meta_description", label: "Default Meta Description", type: "textarea" },
      { key: "og_image", label: "Default OG Image URL" },
      { key: "google_analytics", label: "Google Analytics ID" },
    ],
  },
  {
    title: "Social Links",
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
    title: "Appearance",
    fields: [
      { key: "primary_color", label: "Primary Color (hex)", type: "color" },
      { key: "footer_text", label: "Footer Copyright Text" },
      { key: "announcement_bar", label: "Announcement Bar Text (leave blank to hide)" },
    ],
  },
];

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings").then(r => r.json()).then((d: unknown) => setSettings(d as Record<string, string>));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/site-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <button onClick={save} disabled={saving}
          className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
          <Save size={15} /> {saved ? "Saved!" : saving ? "Saving..." : "Save All"}
        </button>
      </div>

      <div className="space-y-8">
        {SECTIONS.map(section => (
          <div key={section.title}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b">{section.title}</h2>
            <div className="space-y-3">
              {section.fields.map(f => (
                <div key={f.key} className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700 pt-2">{f.label}</label>
                  <div className="col-span-2">
                    {f.type === "textarea" ? (
                      <textarea rows={3} value={settings[f.key] ?? ""} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    ) : f.type === "color" ? (
                      <div className="flex items-center gap-3">
                        <input type="color" value={settings[f.key] ?? "#2563eb"} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                          className="w-10 h-10 rounded border cursor-pointer" />
                        <input value={settings[f.key] ?? ""} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                          className="border rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    ) : (
                      <input value={settings[f.key] ?? ""} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
