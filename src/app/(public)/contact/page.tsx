import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Have a project in mind? Let's talk. We respond within 24 hours.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-8">
          {[
            { icon: MapPin, label: "Address", value: "Near Hanuman Temple, Barnawad, Shajapur, MP" },
            { icon: Mail, label: "Email", value: "Mlhkinfotech@gmail.com" },
            { icon: Phone, label: "WhatsApp", value: "Available on WhatsApp" },
            { icon: Clock, label: "Support", value: "24/7 Technical Support" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm text-gray-700 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-2 bg-white border rounded-2xl p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
