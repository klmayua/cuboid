"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Users, Globe, DollarSign, TrendingUp, Activity, Building2, Server, Wifi, HardDrive, BarChart3 } from "lucide-react";
import { PLATFORM_METRICS, CORRIDOR_PERFORMANCE, PARTNERS } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #08040A 0%, #0D0812 40%, #0A0610 100%)" }}>
      {/* Admin Ops Header */}
      <div className="border-b border-white/[0.04] bg-[#08040A]/98 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield size={16} className="text-[#FF6B35]" />
            <span className="text-[11px] font-semibold text-[#FF6B35] tracking-widest uppercase">Platform Administration</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] text-[#10B981]">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#64748B] font-mono">
            <span>Uptime: 99.97%</span>
            <span>API: 142ms</span>
            <span>DB: 8ms</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Platform Volume (Today)", value: PLATFORM_METRICS.volume.today, sub: `${PLATFORM_METRICS.volume.week} this week`, icon: BarChart3, accent: "#3B82F6" },
            { label: "Revenue (Today)", value: PLATFORM_METRICS.revenue.today, sub: `${PLATFORM_METRICS.revenue.month} MTD`, icon: DollarSign, accent: "#10B981" },
            { label: "Active Organizations", value: PLATFORM_METRICS.organizations.active.toString(), sub: `${PLATFORM_METRICS.organizations.total} total`, icon: Building2, accent: "#D4AF37" },
            { label: "Active Users", value: PLATFORM_METRICS.users.active.toLocaleString(), sub: `${PLATFORM_METRICS.users.total.toLocaleString()} total`, icon: Users, accent: "#8B5CF6" },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#0D0812] border border-[#FF6B35]/[0.06]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} style={{ color: k.accent }} /><span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span></div>
              <p className="text-xl font-bold text-white font-mono">{k.value}</p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Ecosystem Map + Revenue */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl bg-[#0D0812] border border-[#FF6B35]/[0.06] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Ecosystem Health</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { country: "Nigeria", orgs: 186, users: 1420, status: "Healthy", color: "#10B981" },
                { country: "Kenya", orgs: 28, users: 210, status: "Healthy", color: "#10B981" },
                { country: "Ghana", orgs: 18, users: 145, status: "Degraded", color: "#D4AF37" },
                { country: "UK", orgs: 9, users: 42, status: "Healthy", color: "#10B981" },
                { country: "UAE", orgs: 6, users: 25, status: "Healthy", color: "#10B981" },
              ].map((c) => (
                <div key={c.country} className="p-3 rounded-xl bg-[#08040A] border border-white/[0.03]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">{c.country}</span>
                    <span className="text-[10px] font-medium" style={{ color: c.color }}>{c.status}</span>
                  </div>
                  <div className="text-[10px] text-[#64748B]">{c.orgs} orgs · {c.users} users</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D0812] border border-[#FF6B35]/[0.06] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Revenue Analytics</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs"><span className="text-[#94A3B8]">Spread Revenue</span><span className="text-white font-mono">₦628M</span></div>
              <div className="flex justify-between text-xs"><span className="text-[#94A3B8]">Subscription Revenue</span><span className="text-white font-mono">₦89M</span></div>
              <div className="flex justify-between text-xs"><span className="text-[#94A3B8]">Escrow Fees</span><span className="text-white font-mono">₦24M</span></div>
              <div className="flex justify-between text-xs"><span className="text-[#94A3B8]">API Access</span><span className="text-white font-mono">₦7M</span></div>
              <div className="border-t border-white/[0.04] pt-3 flex justify-between text-sm font-bold"><span className="text-white">Total MTD</span><span className="text-[#10B981] font-mono">₦748M</span></div>
            </div>
          </div>
        </div>

        {/* Corridor + System Health */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#0D0812] border border-[#FF6B35]/[0.06] overflow-hidden">
            <div className="p-4 border-b border-white/[0.04]"><h3 className="text-sm font-semibold text-white">Corridor Performance</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs"><thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["Corridor","Volume","Spread","Txns","Trend"].map(h=><th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>{CORRIDOR_PERFORMANCE.map(c=><tr key={c.corridor} className="border-b border-white/[0.02]"><td className="px-4 py-2.5 text-white font-medium">{c.corridor}</td><td className="px-4 py-2.5 text-white font-mono">{c.volume}</td><td className="px-4 py-2.5 text-[#94A3B8]">{c.avgSpread}</td><td className="px-4 py-2.5 text-[#94A3B8]">{c.transactions}</td><td className="px-4 py-2.5"><span className={c.trend==="up"?"text-[#10B981]":"text-[#EF4444]"}>{c.trend==="up"?"▲":"▼"}</span></td></tr>)}</tbody></table>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D0812] border border-[#FF6B35]/[0.06] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">System Health</h3>
            <div className="space-y-2">
              {[
                { svc: "API Gateway", status: "Healthy", latency: "42ms", uptime: "99.99%" },
                { svc: "Identity Service", status: "Healthy", latency: "18ms", uptime: "99.98%" },
                { svc: "Ledger Service", status: "Healthy", latency: "8ms", uptime: "99.99%" },
                { svc: "Settlement Engine", status: "Degraded", latency: "240ms", uptime: "99.82%" },
                { svc: "WhatsApp Gateway", status: "Healthy", latency: "310ms", uptime: "99.95%" },
                { svc: "Redis Cache", status: "Healthy", latency: "1ms", uptime: "100%" },
                { svc: "PostgreSQL", status: "Healthy", latency: "3ms", uptime: "100%" },
              ].map((s) => (
                <div key={s.svc} className="flex items-center justify-between p-2.5 rounded-xl bg-[#08040A] border border-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.status==="Healthy"?"bg-[#10B981]":"bg-[#D4AF37]"}`} />
                    <span className="text-xs text-white">{s.svc}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className="text-[#64748B]">{s.latency}</span>
                    <span className={s.uptime==="100%"?"text-[#10B981]":"text-[#94A3B8]"}>{s.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
