import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MLHK Infotech", template: "%s | MLHK Infotech" },
  description: "Enterprise-grade IT & Digital Solutions — Web, Mobile, SaaS, CRM, ERP, AI Automation",
  metadataBase: new URL("https://mlhk.in"),
  openGraph: { siteName: "MLHK Infotech", locale: "en_IN", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
