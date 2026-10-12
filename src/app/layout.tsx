import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavigationProgressBar } from "@/components/ui/NavigationProgressBar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "900"] });

export const metadata: Metadata = {
  title: { default: "MLHK Infotech | Web, Mobile, AI and Enterprise Software", template: "%s | MLHK Infotech" },
  description:
    "MLHK Infotech builds web platforms, mobile apps, CRM and ERP systems, and AI automation. Innovate. Integrate. Elevate. Based in Shajapur, MP, India.",
  metadataBase: new URL("https://mlhk.in"),
  applicationName: "MLHK Infotech",
  icons: {
    icon: [{ url: "/brand/mark.png", type: "image/png" }],
    apple: [{ url: "/brand/mark.png" }],
  },
  openGraph: {
    siteName: "MLHK Infotech",
    locale: "en_IN",
    type: "website",
    url: "https://mlhk.in",
    images: [{ url: "/brand/logo-full.png", width: 1536, height: 1024, alt: "MLHK Infotech" }],
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
  themeColor: "#050607",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`dark ${geist.variable} ${unbounded.variable}`}>
      <body className="font-sans bg-[#050607] text-zinc-100 antialiased">
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
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
