import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Smartphone, BarChart3, Shield, Brain, Globe } from "lucide-react";

const services = [
  { icon: Code2, title: "Web Development", desc: "Custom websites, SaaS platforms & web apps" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Android & iOS apps built for scale" },
  { icon: BarChart3, title: "CRM / ERP", desc: "Enterprise systems for business automation" },
  { icon: Brain, title: "AI Automation", desc: "AI agents, chatbots & workflow automation" },
  { icon: Shield, title: "Cybersecurity", desc: "Network security & IT infrastructure" },
  { icon: Globe, title: "Digital Marketing", desc: "SEO, branding & digital growth" },
];

const brands = [
  { name: "Erotix Green Energy", sector: "Solar & Renewable Energy" },
  { name: "IKSC India", sector: "E-Commerce" },
  { name: "Red Xerox Studio", sector: "Creative & Design" },
  { name: "RX Media", sector: "Media & Content" },
  { name: "TET News", sector: "News & Journalism" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-500 text-white border-0">Est. April 2020 · Shajapur, MP</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enterprise-Grade<br />Digital Solutions
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            From custom software to AI automation — MLHK Infotech builds complete digital ecosystems for businesses and startups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="border border-white/40 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Do</h2>
            <p className="text-gray-500">End-to-end technology solutions under one roof</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
              All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["2020", "Founded"], ["50+", "Projects"], ["5+", "Brands"], ["24/7", "Support"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-blue-600">{val}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subsidiaries */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Brands</h2>
            <p className="text-gray-500">A growing ecosystem of ventures</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map(b => (
              <div key={b.name} className="bg-white border rounded-xl px-6 py-4 text-center hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900">{b.name}</p>
                <p className="text-xs text-gray-400 mt-1">{b.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Great?</h2>
          <p className="text-blue-100 mb-8">Let's discuss your project. We respond within 24 hours.</p>
          <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
