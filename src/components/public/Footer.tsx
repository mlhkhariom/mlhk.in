import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-white font-bold text-lg mb-2">MLHK Infotech</p>
          <p className="text-xs leading-relaxed">Enterprise-grade IT & Digital Solutions. Barnawad, Shajapur, MP.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Services</p>
          {["Web Development", "Mobile Apps", "SaaS / ERP", "Digital Marketing", "AI Automation"].map(s => (
            <Link key={s} href="/services" className="block mb-1 hover:text-white transition-colors">{s}</Link>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Brands</p>
          {["Erotix Green Energy", "IKSC India", "Red Xerox Studio", "RX Media", "TET News"].map(b => (
            <p key={b} className="mb-1">{b}</p>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Company</p>
          {[["About", "/about"], ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([l, h]) => (
            <Link key={h} href={h} className="block mb-1 hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © {new Date().getFullYear()} MLHK Infotech. Founded by Hariom Vishwkarma.
      </div>
    </footer>
  );
}
