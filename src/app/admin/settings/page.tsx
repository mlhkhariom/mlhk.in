"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fields = [
    { key: "company_name", label: "Company Name" },
    { key: "contact_email", label: "Email" },
    { key: "contact_phone", label: "Phone" },
    { key: "contact_address", label: "Address" },
    { key: "gst_number", label: "GST Number" },
    { key: "site_name", label: "Site Name (shown in header)" },
    { key: "site_tagline", label: "Tagline" },
    { key: "footer_text", label: "Footer Text" },
  ];

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then(r => r.json())
      .then(data => {
        const map: Record<string, string> = {};
        if (Array.isArray(data)) data.forEach((r: { key: string; value: string }) => { map[r.key] = r.value; });
        else if (typeof data === "object") Object.assign(map, data);
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const entries = Object.entries(settings).filter(([, v]) => v !== "");
    await Promise.all(
      entries.map(([key, value]) =>
        fetch("/api/admin/site-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        })
      )
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="space-y-6">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
            <input
              value={settings[key] ?? ""}
              onChange={e => setSettings({ ...settings, [key]: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {saved && <p className="text-green-600 text-sm">✓ Settings saved!</p>}
      </div>
    </div>
  );
}
