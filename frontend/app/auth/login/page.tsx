"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");

    const data = await api.login(email, password);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      router.push("/");
    } else {
      setError("Incorrect email or password.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-red-500">
            🎬 CineVault
          </Link>
          <p className="text-gray-400 mt-2">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          {error && (
            <div className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-3 rounded-lg font-semibold transition mt-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-red-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}