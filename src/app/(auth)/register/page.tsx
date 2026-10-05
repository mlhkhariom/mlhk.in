"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth/client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (res.error) {
      setError(res.error.message ?? "Registration failed. Please try again.");
      setLoading(false);
    } else {
      router.push("/portal/dashboard");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">MLHK Infotech</Link>
        <p className="text-gray-500 text-sm mt-2">Create your Client Account</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Full Name</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="border rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="border rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Password</label>
            <input type="password" required minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="border rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
