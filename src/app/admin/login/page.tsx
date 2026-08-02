"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/authClient";
import { FiLock, FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#070a12] p-6 overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

      <form
        onSubmit={handleSubmit}
        className="glass-card relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/15 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-2xl"
      >
        <div className="text-center space-y-3">
          {/* ABD Logo with Link to Homepage */}
          <Link
            href="/"
            title="Return to Public Homepage"
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-white/15 p-2 shadow-xl hover:scale-105 transition"
          >
            {/* eslint-disable-next-html-element-suppress */}
            <img src="/logoABD.png" alt="ABD Logo" className="h-full w-full object-contain" />
          </Link>

          <div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Sign in to manage your portfolio content</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-slate-400 text-base" />
              <input
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-slate-400 text-base" />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 font-medium text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="glass-button-primary flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-900/40 disabled:opacity-60 transition"
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <FiArrowRight className="text-base" />
            </>
          )}
        </button>

        {/* Homepage Navigation Link */}
        <div className="pt-2 text-center border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition"
          >
            <FiArrowLeft className="text-sm" /> Back to Public Portfolio
          </Link>
        </div>
      </form>
    </div>
  );
}
