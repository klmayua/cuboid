"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet, Send, Clock, Shield, ArrowRight, TrendingUp, TrendingDown, DollarSign, Users, Star, MessageCircle } from "lucide-react";
import { CUSTOMERS, LIVE_RATES } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

const RECENT_REQUESTS = [
  { id: "REQ-001", currency: "USD", amount: "₦12.5M", status: "Matched", broker: "Zenith FX Partners", time: "10m ago" },
  { id: "REQ-002", currency: "EUR", amount: "₦8.9M", status: "Pending", broker: "Matching...", time: "25m ago" },
  { id: "REQ-003", currency: "GBP", amount: "₦21M", status: "Completed", broker: "Capital Bridge FX", time: "2h ago" },
  { id: "REQ-004", currency: "USD", amount: "₦4.5M", status: "Completed", broker: "Atlantic Forex", time: "5h ago" },
  { id: "REQ-005", currency: "AED", amount: "₦6.7M", status: "Quote Received", broker: "EastGate FX", time: "1h ago" },
];

const RECOMMENDED = [
  { name: "Zenith FX Partners", specialty: "USD/NGN", rating: 4.9, response: "<2min" },
  { name: "Capital Bridge FX", specialty: "GBP/NGN", rating: 4.8, response: "<2min" },
  { name: "Atlantic Forex", specialty: "EUR/NGN", rating: 4.7, response: "<3min" },
];

export default function CustomerDashboard() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0A0814 0%, #0F0D1A 40%, #0C0A16 100%)" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] bg-[#0A0814]/98 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-12 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#8B5CF6] tracking-widest uppercase">Customer Portal</span>
          <span className="text-[10px] text-[#64748B]">Welcome back</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-6">
        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.04) 100%)", border: "1px solid rgba(139,92,246,0.15)" }}>
          <h2 className="text-xl font-bold text-white mb-2">Need FX Today?</h2>
          <p className="text-sm text-[#94A3B8] mb-4">Get matched with verified brokers at live market rates</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#7C3AED] transition-all text-sm">
            <Send size={16} />
            Request Currency
            <ArrowRight size={16} />
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Wallet Balance", value: "₦18.5M", icon: Wallet, accent: "#8B5CF6" },
            { label: "Pending Requests", value: "3", icon: Clock, accent: "#D4AF37" },
            { label: "Completed Trades", value: "12", icon: TrendingUp, accent: "#10B981" },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#0F0D1A] border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} style={{ color: k.accent }} /><span className="text-[10px] text-[#64748B] font-medium">{k.label}</span></div>
              <p className="text-lg font-bold text-white">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Requests */}
        <div className="rounded-2xl bg-[#0F0D1A] border border-white/[0.04] overflow-hidden mb-6">
          <div className="p-4 border-b border-white/[0.04]"><h3 className="text-sm font-semibold text-white">Recent Requests</h3></div>
          <div className="divide-y divide-white/[0.03]">
            {RECENT_REQUESTS.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: r.status === "Completed" ? "rgba(16,185,129,0.1)" : r.status === "Matched" ? "rgba(59,130,246,0.1)" : "rgba(212,175,55,0.1)" }}>
                    <DollarSign size={14} style={{ color: r.status === "Completed" ? "#10B981" : r.status === "Matched" ? "#3B82F6" : "#D4AF37" }} />
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium">{r.currency} · {r.amount}</p>
                    <p className="text-[10px] text-[#64748B]">{r.broker} · {r.time}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.status==="Completed"?"bg-[#10B981]/10 text-[#10B981]":r.status==="Matched"?"bg-[#3B82F6]/10 text-[#3B82F6]":"bg-[#D4AF37]/10 text-[#D4AF37]"}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Brokers */}
        <div className="rounded-2xl bg-[#0F0D1A] border border-white/[0.04] p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Recommended Brokers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECOMMENDED.map((b) => (
              <div key={b.name} className="p-3 rounded-xl bg-[#0A0814] border border-white/[0.03]">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-[#8B5CF6]" />
                  <span className="text-xs font-semibold text-white">{b.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#64748B]">
                  <span>{b.specialty}</span>
                  <Star size={10} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37]">{b.rating}</span>
                  <span className="text-[#10B981]">{b.response}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
