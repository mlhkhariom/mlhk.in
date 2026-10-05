"use client";
import { signOut } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      className="text-xs text-gray-500 hover:text-red-600"
    >
      Sign Out
    </button>
  );
}
