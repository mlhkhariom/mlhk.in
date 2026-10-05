import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import Link from "next/link";
import PortalNav from "./PortalNav";
import SignOutButton from "./SignOutButton";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/portal/dashboard" className="font-bold text-blue-600">MLHK Portal</Link>
          <PortalNav />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{session.user.name}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}


