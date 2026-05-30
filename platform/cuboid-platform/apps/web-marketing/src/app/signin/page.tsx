"use client";

import { useState } from "react";
import { CuboidLogo } from "@/components";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const DEMO_CREDENTIALS = [
  { role: "Super Admin", email: "admin@cuboid.demo", password: "Cuboid@2026" },
  { role: "Operations", email: "ops@cuboid.demo", password: "Cuboid@2026" },
  { role: "Analyst", email: "analyst@cuboid.demo", password: "Cuboid@2026" },
  { role: "Partner", email: "partner@cuboid.demo", password: "Cuboid@2026" },
  { role: "Broker", email: "demo+broker@cuboid.app", password: "Cuboid@2026" },
  { role: "BDC Operator", email: "demo+bdc@cuboid.app", password: "Cuboid@2026" },
  { role: "Treasury", email: "demo+treasury@cuboid.app", password: "Cuboid@2026" },
  { role: "Customer", email: "demo+customer@cuboid.app", password: "Cuboid@2026" },
  { role: "Ops Control", email: "demo+ops@cuboid.app", password: "Cuboid@2026" },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );

    if (match) {
      setLoading(true);
      document.cookie = `cuboid-demo-session=true; path=/; SameSite=Lax`;
      document.cookie = `cuboid-demo-role=${match.role}; path=/; SameSite=Lax`;
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    } else {
      setError("Invalid credentials. Use one of the demo accounts below.");
    }
  };

  return (
    <main className="min-h-screen bg-[#07111A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CuboidLogo width={48} height={48} />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Sign in to CUBOID
        </h1>
        <p className="text-[#94A3B8] text-center mb-8 text-sm">
          Enter demo credentials to preview the platform
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={loading}
              className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#5E8DFF]/50 focus:ring-1 focus:ring-[#5E8DFF]/20 transition-colors disabled:opacity-50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
              className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#5E8DFF]/50 focus:ring-1 focus:ring-[#5E8DFF]/20 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#00A86B] text-[#07111A] font-semibold rounded-xl hover:bg-[#00c27d] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-xs text-[#64748B] text-center font-medium mb-4">
            ALL PASSWORDS: Cuboid@2026
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_CREDENTIALS.slice(0, 8).map((cred) => (
              <button
                key={cred.email}
                type="button"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword(cred.password);
                  setError("");
                }}
                className="text-left p-2.5 rounded-xl bg-[#0E1824] border border-white/[0.06] hover:border-[#D4AF37]/[0.25] transition-all"
              >
                <p className="text-xs font-medium text-white truncate">
                  {cred.role}
                </p>
                <p className="text-[10px] text-[#64748B] truncate font-mono">
                  {cred.email}
                </p>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-[#64748B]">
          Need access?{" "}
          <a
            href="https://wa.me/2347067281296?text=Hello%20I%20would%20like%20a%20demo%20of%20Cuboid."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1D9BF0] hover:text-white transition-colors"
          >
            <MessageCircle size={12} className="inline mr-1" />
            Request on WhatsApp
          </a>
        </p>
      </div>
    </main>
  );
}
