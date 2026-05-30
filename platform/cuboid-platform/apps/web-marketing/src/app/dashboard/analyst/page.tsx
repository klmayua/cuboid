"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, BarChart3, Globe, Activity, DollarSign, Target, Shield, ArrowRight } from "lucide-react";
import { CORRIDOR_PERFORMANCE, BROKER_RANKINGS, BDC_RANKINGS, LIVE_RATES } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

export default function AnalystDashboard() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #080C14 0%, #0B101A 40%, #080D18 100%)" }}>
      {/* Analyst Header */}
      <div className="border-b border-white/[0.04] bg-[#080C14]/98 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#0EA5E9] tracking-widest uppercase">Market Intelligence</span>
          <div className="flex items-center gap-4 text-[10px] text-[#64748B] font-mono">
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
            <span>Data Sources: 14</span>
            <span className="text-[#10B981]">All Connected</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Daily Volume", value: "₦8.7B", sub: "+12% vs yesterday", icon: BarChart3, accent: "#0EA5E9", trend: "up" },
            { label: "Active Corridors", value: "43", sub: "6 corridors active", icon: Globe, accent: "#10B981", trend: "stable" },
            { label: "Liquidity Score", value: "87/100", sub: "Above threshold", icon: Activity, accent: "#D4AF37", trend: "up" },
            { label: "Revenue Trend", value: "+18% MoM", sub: "₦748M MTD", icon: TrendingUp, accent: "#8B5CF6", trend: "up" },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#0B101A] border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} style={{ color: k.accent }} /><span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span></div>
              <p className="text-xl font-bold text-white">{k.value}</p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Corridor Heatmap + Rate Board */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl bg-[#0B101A] border border-white/[0.04] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Corridor Heatmap</h3>
            <div className="space-y-2">
              {CORRIDOR_PERFORMANCE.map((c) => {
                const volNum = parseFloat(c.volume.replace(/[₦B,]/g, ""));
                const pct = Math.min((volNum / 3.5) * 100, 100);
                return (
                  <div key={c.corridor} className="flex items-center gap-3">
                    <span className="text-[11px] text-white w-20">{c.corridor}</span>
                    <div className="flex-1 h-6 rounded-full bg-[#080C14] overflow-hidden">
                      <div className="h-full rounded-full flex items-center px-2 text-[10px] font-bold" style={{ width: `${pct}%`, backgroundColor: c.trend === "up" ? "#0EA5E9" : c.trend === "down" ? "#EF4444" : "#64748B" }}>{c.volume}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0B101A] border border-white/[0.04] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">FX Trend Analysis</h3>
            <div className="space-y-3">
              {LIVE_RATES.slice(0, 4).map((r) => (
                <div key={r.pair} className="p-3 rounded-xl bg-[#080C14] border border-white/[0.02]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{r.pair}</span>
                    <span className="text-[11px] font-mono" style={{ color: r.trend === "up" ? "#10B981" : r.trend === "down" ? "#EF4444" : "#64748B" }}>{r.change}</span>
                  </div>
                  <div className="flex items-center gap-2 h-8">
                    {Array.from({ length: 20 }, (_, i) => {
                      const h = 40 + Math.sin(i * 0.8 + (r.trend === "up" ? 0 : 2)) * 30 + Math.random() * 10;
                      return <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: r.trend === "up" ? "#10B981" : r.trend === "down" ? "#EF4444" : "#3B82F6", opacity: 0.4 + (i / 30) }} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rankings */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#0B101A] border border-white/[0.04] overflow-hidden">
            <div className="p-4 border-b border-white/[0.04]"><h3 className="text-sm font-semibold text-white">Broker Rankings</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs"><thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["#","Broker","Volume","Deals","Satisfaction","Response"].map(h=><th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>{BROKER_RANKINGS.map((b,i)=><tr key={b.name} className="border-b border-white/[0.02] hover:bg-white/[0.01]"><td className="px-4 py-2.5 text-[#D4AF37] font-bold">{i+1}</td><td className="px-4 py-2.5 text-white font-medium">{b.name}</td><td className="px-4 py-2.5 text-white font-mono">{b.volume}</td><td className="px-4 py-2.5 text-[#94A3B8]">{b.deals}</td><td className="px-4 py-2.5"><span className={b.satisfaction>=95?"text-[#10B981]":"text-[#D4AF37]"}>{b.satisfaction}%</span></td><td className="px-4 py-2.5 text-[#64748B] font-mono">{b.responseTime}</td></tr>)}</tbody></table>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0B101A] border border-white/[0.04] overflow-hidden">
            <div className="p-4 border-b border-white/[0.04]"><h3 className="text-sm font-semibold text-white">BDC Rankings</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs"><thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["#","Desk","Location","Volume","Hours","Rating"].map(h=><th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>{BDC_RANKINGS.map((b,i)=><tr key={b.name} className="border-b border-white/[0.02] hover:bg-white/[0.01]"><td className="px-4 py-2.5 text-[#D4AF37] font-bold">{i+1}</td><td className="px-4 py-2.5 text-white font-medium">{b.name}</td><td className="px-4 py-2.5 text-[#94A3B8]">{b.location}</td><td className="px-4 py-2.5 text-white font-mono">{b.volume}</td><td className="px-4 py-2.5 text-[#94A3B8]">{b.hours}</td><td className="px-4 py-2.5 text-[#D4AF37]">{b.rating}</td></tr>)}</tbody></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
