import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Smartphone, BarChart3, Shield, Brain, Globe, Database, Palette } from "lucide-react";

export const metadata: Metadata = { title: "Services" };

const services = [
  { icon: Code2, title: "Web Development", desc: "Custom websites, dynamic web apps, SaaS platforms built with modern frameworks. Scalable, fast, and SEO-ready.", tags: ["Next.js", "React", "Node.js"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform Android & iOS apps with clean UI and robust backend integration.", tags: ["Android", "React Native", "Flutter"] },
  { icon: Database, title: "SaaS / ERP / CRM", desc: "End-to-end enterprise systems — inventory, billing, HR, client management, and more.", tags: ["Custom ERP", "CRM", "Automation"] },
  { icon: Brain, title: "AI & Automation", desc: "AI chatbots, virtual agents, workflow automation, and CIS benchmark audit scripts.", tags: ["IBM Watson", "Python AI", "Automation"] },
  { icon: Shield, title: "Cybersecurity", desc: "Network security audits, IT infrastructure hardening, and information protection protocols.", tags: ["CIS Benchmarks", "Linux", "Windows"] },
  { icon: Globe, title: "Digital Marketing", desc: "SEO, social media management, content strategy, and paid campaigns to grow your brand online.", tags: ["SEO", "Google Ads", "Social Media"] },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design for web and mobile — wireframes, prototypes, and pixel-perfect interfaces.", tags: ["Figma", "Branding", "Prototyping"] },
  { icon: BarChart3, title: "IT Consulting", desc: "Digital roadmap planning, cloud strategy, and technology advisory for businesses and startups.", tags: ["Cloud", "Strategy", "Architecture"] },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Complete technology solutions — from idea to deployment and beyond.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc, tags }) => (
          <Card key={title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-14">
        <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Discuss Your Project
        </Link>
      </div>
    </div>
  );
}
