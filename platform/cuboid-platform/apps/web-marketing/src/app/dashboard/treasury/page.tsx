"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, TrendingUp, TrendingDown, Shield, Wallet, DollarSign, Activity, ArrowRight, Database, Globe } from "lucide-react";
import { TREASURY_LIQUIDITY, CORRIDOR_PERFORMANCE, LIVE_RATES } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

export default function TreasuryDashboard() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0A0A14 0%, #0D0D1A 40%, #0A0F18 100%)" }}>
      {/* Bloomberg-style Header */}
      <div className="border-b border-white/[0.04] bg-[#0A0A14]/98 backdrop-blur-xl sticky top-0 z-40 font-mono">
        <div className="max-w-7xl mx-auto px-5 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px]">
            <span className="text-[#D4AF37] font-bold">CUBOID TREASURY</span>
            <span className="text-[#64748B]">|</span>
            <span className="text-[#94A3B8]">NGN/USD <span className="text-[#10B981]">1592.5</span> <span className="text-[#10B981] text-[10px]">+8.3</span></span>
            <span className="text-[#94A3B8]">NGN/EUR <span className="text-[#EF4444]">1731.2</span> <span className="text-[#EF4444] text-[10px]">-3.1</span></span>
            <span className="text-[#94A3B8]">NGN/GBP <span className="text-[#10B981]">2050.8</span> <span className="text-[#10B981] text-[10px]">+14.2</span></span>
          </div>
          <span className="text-[10px] text-[#64748B]">{new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Assets", value: "₦6.8B", sub: "+2.4% MTD", icon: Database, accent: "#3B82F6" },
            { label: "Available Liquidity", value: "₦4.0B", sub: "8 currencies", icon: Wallet, accent: "#10B981" },
            { label: "FX Exposure", value: "₦2.1B", sub: "32% hedged", icon: Shield, accent: "#D4AF37" },
            { label: "Risk Score", value: "82/100", sub: "Low risk", icon: Activity, accent: "#8B5CF6" },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#0D0D1A] border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} style={{ color: k.accent }} /><span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span></div>
              <p className="text-xl font-bold text-white font-mono">{k.value}</p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Liquidity Heatmap */}
        <div className="mb-6">
          <div className="rounded-2xl bg-[#0D0D1A] border border-white/[0.04] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Liquidity Heatmap</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(TREASURY_LIQUIDITY).map(([currency, data]) => (
                <div key={currency} className="p-3 rounded-xl bg-[#0A0A14] border border-white/[0.02]">
                  <span className="text-xs font-bold text-white uppercase">{currency}</span>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-[10px]"><span className="text-[#64748B]">Available</span><span className="text-[#10B981] font-mono">{data.available}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-[#64748B]">Committed</span><span className="text-[#D4AF37] font-mono">{data.committed}</span></div>
                    <div className="h-2 rounded-full bg-[#0D0D1A] mt-1 overflow-hidden flex">
                      <div className="h-full bg-[#10B981]" style={{ width: "55%" }} />
                      <div className="h-full bg-[#D4AF37]/30" style={{ width: "25%" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corridor Performance */}
        <div className="rounded-2xl bg-[#0D0D1A] border border-white/[0.04] overflow-hidden">
          <div className="p-4 border-b border-white/[0.04]"><h3 className="text-sm font-semibold text-white">Corridor Performance</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["Corridor","Volume","Avg Spread","Transactions","Trend"].map(h => <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
              <tbody>
                {CORRIDOR_PERFORMANCE.map((c) => (
                  <tr key={c.corridor} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                    <td className="px-4 py-2.5 text-white font-medium">{c.corridor}</td>
                    <td className="px-4 py-2.5 text-white">{c.volume}</td>
                    <td className="px-4 py-2.5 text-[#94A3B8]">{c.avgSpread}</td>
                    <td className="px-4 py-2.5 text-[#94A3B8]">{c.transactions.toLocaleString()}</td>
                    <td className="px-4 py-2.5"><span className={c.trend==="up"?"text-[#10B981]":c.trend==="down"?"text-[#EF4444]":"text-[#64748B]"}>{c.trend==="up"?"▲":c.trend==="down"?"▼":"─"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forecast section */}
        <div className="mt-6 rounded-2xl bg-[#0D0D1A] border border-white/[0.04] p-4">
          <h3 className="text-sm font-semibold text-white mb-3">30-Day Liquidity Forecast</h3>
          <div className="flex items-end gap-1 h-32">
            {Array.from({ length: 30 }, (_, i) => {
              const h = 30 + Math.sin(i * 0.5) * 25 + Math.random() * 15;
              return <div key={i} className="flex-1 rounded-t-sm bg-[#3B82F6]/30 hover:bg-[#3B82F6]/50 transition-colors" style={{ height: `${h}%` }} title={`Day ${i+1}`} />;
            })}
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-[#64748B]">
            <span>Today</span><span>+1wk</span><span>+2wk</span><span>+3wk</span><span>+4wk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
