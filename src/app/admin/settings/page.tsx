export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="space-y-6">
        {[
          { label: "Company Name", value: "MLHK Infotech" },
          { label: "Email", value: "Mlhkinfotech@gmail.com" },
          { label: "Phone", value: "" },
          { label: "Address", value: "Near Hanuman Temple, Barnawad, Shajapur, MP" },
          { label: "GST Number", value: "" },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
            <input defaultValue={value} className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
        <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700">Save Settings</button>
      </div>
    </div>
  );
}
