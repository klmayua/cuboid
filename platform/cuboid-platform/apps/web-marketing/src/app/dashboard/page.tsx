"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CuboidLogo } from "@/components";
import { Shield, Users, BarChart3, Building2, Briefcase, Wallet, Landmark, MessageCircle, LogOut } from "lucide-react";

const DEMO_CREDENTIALS = [
  { role: "Super Admin", email: "admin@cuboid.demo", accent: "#FF6B35", icon: Shield },
  { role: "Operations", email: "ops@cuboid.demo", accent: "#6366F1", icon: Users },
  { role: "Analyst", email: "analyst@cuboid.demo", accent: "#0EA5E9", icon: BarChart3 },
  { role: "Partner", email: "partner@cuboid.demo", accent: "#10B981", icon: Building2 },
  { role: "Broker", email: "demo+broker@cuboid.app", accent: "#3B82F6", icon: Briefcase },
  { role: "BDC Operator", email: "demo+bdc@cuboid.app", accent: "#10B981", icon: Building2 },
  { role: "Treasury", email: "demo+treasury@cuboid.app", accent: "#D4AF37", icon: Landmark },
  { role: "Customer", email: "demo+customer@cuboid.app", accent: "#8B5CF6", icon: Wallet },
  { role: "Ops Control", email: "demo+ops@cuboid.app", accent: "#EF4444", icon: Shield },
];

const quickStats = [
  { label: "Daily Volume", value: "₦2.4B", trend: "+12%" },
  { label: "Active Desks", value: "247", trend: "+8" },
  { label: "Corridors", value: "43", trend: "Stable" },
  { label: "Live Rates", value: "1,250", trend: "✓" },
];

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
}

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sessionRole = getCookie("cuboid-demo-role");
    const sessionEmail = getCookie("cuboid-demo-email");
    if (!sessionRole) {
      router.replace("/signin");
      return;
    }
    setRole(sessionRole);
    setEmail(sessionEmail || "demo@cuboid.app");
  }, [router]);

  const handleSignOut = () => {
    document.cookie = "cuboid-demo-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    document.cookie = "cuboid-demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    document.cookie = "cuboid-demo-email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    router.replace("/signin");
  };

  const roleConfig = DEMO_CREDENTIALS.find((c) => c.role === role);
  const RoleIcon = roleConfig?.icon || Shield;

  return (
    <main className="min-h-screen bg-[#07111A]">
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: "rgba(7,17,26,0.94)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <CuboidLogo width={28} height={28} />
            <span className="text-sm font-bold text-white">CUBOID</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#94A3B8] hidden sm:inline">{email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${roleConfig?.accent || "#D4AF37"}20` }}
            >
              <RoleIcon size={20} style={{ color: roleConfig?.accent || "#D4AF37" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome, {role}</h1>
              <p className="text-xs text-[#94A3B8]">Demo preview session</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-[#0E1824] border border-white/[0.06]"
            >
              <p className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[11px] text-[#00A86B] mt-0.5">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Role cards */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-white mb-4">Available Workspaces</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DEMO_CREDENTIALS.map((cred) => {
              const Icon = cred.icon;
              return (
                <button
                  key={cred.email}
                  onClick={() => {
                    document.cookie = `cuboid-demo-session=true; path=/; SameSite=Lax`;
                    document.cookie = `cuboid-demo-role=${cred.role}; path=/; SameSite=Lax`;
                    document.cookie = `cuboid-demo-email=${cred.email}; path=/; SameSite=Lax`;
                    window.location.reload();
                  }}
                  className={`p-4 rounded-2xl border transition-all text-left ${
                    role === cred.role
                      ? "border-[#D4AF37]/[0.35] bg-[#D4AF37]/[0.04]"
                      : "border-white/[0.06] bg-[#0E1824] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${cred.accent}18` }}
                    >
                      <Icon size={14} style={{ color: cred.accent }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white truncate">{cred.role}</p>
                      <p className="text-[10px] text-[#64748B] truncate font-mono">{cred.email}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-2xl bg-[#0E1824] border border-white/[0.06]">
          <p className="text-sm text-[#94A3B8] text-center mb-3">
            This is a demo preview. For full platform access:
          </p>
          <a
            href="https://wa.me/2347067281296?text=Hello%20I%20would%20like%20full%20access%20to%20Cuboid."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#00A86B] text-[#07111A] font-semibold rounded-xl hover:bg-[#00c27d] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={16} />
            Request Full Access on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
