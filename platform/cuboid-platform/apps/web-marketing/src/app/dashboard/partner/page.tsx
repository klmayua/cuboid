"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Minus, Zap, Users, Shield, Wallet, Clock, AlertTriangle, ArrowRight, MessageCircle, FileText, Building2, BarChart3, Send, X, Check } from "lucide-react";
import { LIVE_RATES, PARTNER_FX_REQUESTS, PARTNER_ESCROWS, PARTNER_PIPELINE } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

export default function PartnerDashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");
  useEffect(() => { const r = getCookie("cuboid-demo-role"); if (!r) router.replace("/signin"); else setRole(r); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #050D16 0%, #07111A 40%, #0A1826 100%)" }}>
      {/* Trading Floor Header */}
      <div className="border-b border-white/[0.05] bg-[#060E18]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold text-[#D4AF37] tracking-widest uppercase">Partner Trading Floor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] text-[#64748B]">Live</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#64748B]">
            <span>{new Date().toLocaleTimeString()}</span>
            <span>Lagos (GMT+1)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Available Liquidity", value: "₦4.8B", accent: "#10B981", icon: Wallet },
            { label: "Open Requests", value: "17", accent: "#D4AF37", icon: Clock },
            { label: "Quotes Sent Today", value: "42", accent: "#3B82F6", icon: Send },
            { label: "Daily Spread Earned", value: "₦2.4M", accent: "#8B5CF6", icon: TrendingUp },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#0E1824] border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} style={{ color: k.accent }} /><span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span></div>
              <p className="text-xl font-bold text-white">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* FX Request Feed */}
          <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
            <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Incoming FX Requests</h3>
              <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">Live Feed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["Request ID","Currency","Amount","Customer","Location","Time",""].map(h => <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>
                  {PARTNER_FX_REQUESTS.map((r) => (
                    <tr key={r.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="px-4 py-2.5 text-[#D4AF37] font-mono text-[10px]">{r.id}</td>
                      <td className="px-4 py-2.5 text-white font-medium">{r.currency}</td>
                      <td className="px-4 py-2.5 text-white font-mono">{r.amount}</td>
                      <td className="px-4 py-2.5 text-[#94A3B8]">{r.customer}</td>
                      <td className="px-4 py-2.5 text-[#64748B]">{r.location}</td>
                      <td className="px-4 py-2.5 text-[#64748B]">{r.time}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <button className="px-2 py-1 rounded-lg bg-[#10B981]/10 text-[#10B981] text-[10px] font-medium hover:bg-[#10B981]/20 transition-colors">Quote</button>
                          <button className="px-2 py-1 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-medium hover:bg-[#EF4444]/20 transition-colors">Ignore</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Rate Board */}
          <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
            <div className="p-4 border-b border-white/[0.05]"><h3 className="text-sm font-semibold text-white">Live Rate Board</h3></div>
            <div className="p-4 space-y-3">
              {LIVE_RATES.map((r) => {
                const Icon = r.trend === "up" ? TrendingUp : r.trend === "down" ? TrendingDown : Minus;
                const tc = r.trend === "up" ? "#10B981" : r.trend === "down" ? "#EF4444" : "#64748B";
                return (
                  <div key={r.pair} className="flex items-center justify-between p-3 rounded-xl bg-[#07111A] border border-white/[0.03]">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white w-20">{r.pair}</span>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-[#94A3B8]">B <span className="text-white font-mono">{r.buy.toLocaleString()}</span></span>
                        <span className="text-[#94A3B8]">S <span className="text-white font-mono">{r.sell.toLocaleString()}</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#64748B] font-mono">{r.spread}bps</span>
                      <Icon size={14} style={{ color: tc }} />
                      <span className="text-[11px] font-medium" style={{ color: tc }}>{r.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pipeline */}
          <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Customer Pipeline</h3>
            <div className="space-y-2">
              {PARTNER_PIPELINE.map((p) => (
                <div key={p.stage} className="flex items-center gap-3">
                  <span className="text-[11px] text-[#94A3B8] w-24">{p.stage}</span>
                  <div className="flex-1 h-5 rounded-full bg-[#07111A] overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(p.count / 50) * 100}%`, backgroundColor: p.color, minWidth: p.count > 0 ? 8 : 0 }} />
                  </div>
                  <span className="text-[11px] text-white font-mono w-8 text-right">{p.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Escrows */}
          <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
            <div className="p-4 border-b border-white/[0.05]"><h3 className="text-sm font-semibold text-white">Active Escrows</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["Escrow ID","Buyer","Seller","Amount","Status"].map(h => <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>
                  {PARTNER_ESCROWS.map((e) => (
                    <tr key={e.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="px-4 py-2.5 text-[#D4AF37] font-mono text-[10px]">{e.id}</td>
                      <td className="px-4 py-2.5 text-white">{e.buyer}</td>
                      <td className="px-4 py-2.5 text-[#94A3B8]">{e.seller}</td>
                      <td className="px-4 py-2.5 text-white font-mono">{e.amount}</td>
                      <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${e.status==="Active"?"bg-[#3B82F6]/10 text-[#3B82F6]":e.status==="Funding"?"bg-[#D4AF37]/10 text-[#D4AF37]":e.status==="Dispute"?"bg-[#EF4444]/10 text-[#EF4444]":"bg-[#10B981]/10 text-[#10B981]"}`}>{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-1.5 rounded-2xl bg-[#0E1824]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          {[
            { label: "Request Liquidity", icon: Wallet, color: "#3B82F6" },
            { label: "Generate Quote", icon: FileText, color: "#D4AF37" },
            { label: "Create Escrow", icon: Shield, color: "#10B981" },
          ].map((a) => (
            <button key={a.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-xs font-medium text-white">
              <a.icon size={14} style={{ color: a.color }} />
              <span className="hidden sm:inline">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
