import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MLHK Infotech — Enterprise IT & Digital Solutions", template: "%s | MLHK Infotech" },
  description: "Enterprise-grade IT & Digital Solutions — Web, Mobile, SaaS, CRM, ERP, AI Automation. Based in Shajapur, MP, India.",
  metadataBase: new URL("https://mlhk.in"),
  openGraph: {
    siteName: "MLHK Infotech",
    locale: "en_IN",
    type: "website",
    url: "https://mlhk.in",
  },
  twitter: { card: "summary_large_image", site: "@mlhkinfotech" },
  alternates: {
    canonical: "https://mlhk.in",
    types: { "application/rss+xml": "https://mlhk.in/feed.xml" },
  },
  robots: { index: true, follow: true },
  verification: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className={geist.className}>
        {children}
        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": ""}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
