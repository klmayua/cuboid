"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Minus, Clock, Shield, Wallet,
  DollarSign, Users, ArrowRight, UserPlus, Receipt,
  ArrowLeftRight, Network, Activity, Star, AlertCircle,
  CheckCircle2, MessageCircle, Building2, Target, Send, Zap
} from "lucide-react";
import { LIVE_RATES, PARTNER_FX_REQUESTS, PARTNER_ESCROWS, PARTNER_PIPELINE, PARTNERS } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

const COUNTERPARTIES = [
  { name: "Atlantic Forex", trust: 94, liquidity: "₦890M", speed: "15min", success: "96%", currency: "EUR/NGN" },
  { name: "Capital Bridge FX", trust: 96, liquidity: "₦1.5B", speed: "8min", success: "98%", currency: "USD/NGN" },
  { name: "Prime Currency Desk", trust: 91, liquidity: "₦670M", speed: "22min", success: "92%", currency: "GBP/NGN" },
  { name: "EastGate FX", trust: 88, liquidity: "₦450M", speed: "18min", success: "89%", currency: "AED/NGN" },
];

const SETTLEMENTS = [
  { id: "STL-401", customer: "Adebayo Log.", amount: "₦125M", currency: "USD", status: "PAYMENT_SENT", deadline: "2h" },
  { id: "STL-402", customer: "Mansa Trading", amount: "₦89M", currency: "EUR", status: "AWAITING_CONFIRM", deadline: "5h" },
  { id: "STL-403", customer: "Savannah Hold.", amount: "₦210M", currency: "GBP", status: "FX_DELIVERY", deadline: "8h" },
  { id: "STL-404", customer: "Kijani Imports", amount: "₦45M", currency: "USD", status: "COMPLETE", deadline: "Done" },
  { id: "STL-405", customer: "Coastal Freight", amount: "₦67M", currency: "AED", status: "PAYMENT_SENT", deadline: "4h" },
  { id: "STL-406", customer: "Northern Agri", amount: "₦198M", currency: "CAD", status: "AWAITING_CONFIRM", deadline: "12h" },
];

const ACTIVITY_TIMELINE = [
  { text: "Customer Adebayo Logistics onboarded", time: "2m ago", type: "customer" },
  { text: "Quote Q-2847 generated for USD/NGN", time: "15m ago", type: "quote" },
  { text: "Quote Q-2847 accepted by customer", time: "18m ago", type: "quote" },
  { text: "Escrow ESC-1023 created for ₦125M", time: "22m ago", type: "escrow" },
  { text: "Escrow ESC-1023 funded by buyer", time: "35m ago", type: "escrow" },
  { text: "Settlement STL-404 completed", time: "1h ago", type: "settlement" },
  { text: "Wallet credited: ₦18.5M (spread)", time: "2h ago", type: "wallet" },
];

const typeStyles: Record<string, string> = {
  customer: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
  quote: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20",
  escrow: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
  settlement: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
  wallet: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
};

const statusStyles: Record<string, string> = {
  PAYMENT_SENT: "bg-[#3B82F6]/10 text-[#3B82F6]",
  AWAITING_CONFIRM: "bg-[#D4AF37]/10 text-[#D4AF37]",
  FX_DELIVERY: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  COMPLETE: "bg-[#10B981]/10 text-[#10B981]",
};

export default function PartnerTradingFloor() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="p-5 space-y-5">
      {/* HERO ACTION CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: UserPlus, title: "New Customer", desc: "Create profile", color: "#3B82F6", href: "/dashboard/partner/customers" },
          { icon: Receipt, title: "Create Quote", desc: "Generate FX quote", color: "#D4AF37", href: "/dashboard/partner/quotes" },
          { icon: ArrowLeftRight, title: "Request Liquidity", desc: "Source inventory", color: "#10B981", href: "/dashboard/partner/liquidity" },
          { icon: Network, title: "Find Counterparty", desc: "Search network", color: "#8B5CF6", href: "/dashboard/partner/counterparties" },
          { icon: Shield, title: "Create Escrow", desc: "Secure transaction", color: "#F59E0B", href: "/dashboard/partner/escrows" },
          { icon: Activity, title: "Track Settlement", desc: "Monitor payments", color: "#EF4444", href: "/dashboard/partner/settlements" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-4 rounded-2xl border hover:-translate-y-0.5 transition-all cursor-pointer"
              style={{ backgroundColor: `${card.color}08`, borderColor: `${card.color}20` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5" style={{ backgroundColor: `${card.color}15` }}>
                <Icon size={16} style={{ color: card.color }} />
              </div>
              <p className="text-xs font-semibold text-white">{card.title}</p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{card.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Available Liquidity", value: "₦4.8B", icon: Wallet, color: "#10B981" },
          { label: "Open Requests", value: "17", icon: Clock, color: "#D4AF37" },
          { label: "Quotes Sent Today", value: "42", icon: Send, color: "#3B82F6" },
          { label: "Active Escrows", value: "8", icon: Shield, color: "#8B5CF6" },
          { label: "Settlement Rate", value: "96%", icon: CheckCircle2, color: "#10B981" },
          { label: "Daily Spread Rev.", value: "₦2.4M", icon: DollarSign, color: "#D4AF37" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="p-3 rounded-2xl bg-[#0E1824] border border-white/[0.05] hover:border-white/[0.1] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={13} style={{ color: k.color }} />
                <span className="text-[9px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span>
              </div>
              <p className="text-lg font-bold text-white">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-5">
        {/* A: Incoming FX Requests (span 8) */}
        <div className="col-span-12 lg:col-span-8 rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
          <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Incoming FX Requests</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">17 Active</span>
              <Link href="/dashboard/partner/requests" className="text-[10px] text-[#D4AF37] hover:text-white">View All</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["ID","Customer","Currency","Amount","Destination","Req. Date","Trust","Time",""].map(h=><th key={h} className="text-left px-3 py-2.5 font-medium">{h}</th>)}</tr></thead>
              <tbody>
                {PARTNER_FX_REQUESTS.slice(0, 8).map((r) => (
                  <tr key={r.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] cursor-pointer">
                    <td className="px-3 py-2.5 text-[#D4AF37] font-mono text-[10px]">{r.id}</td>
                    <td className="px-3 py-2.5 text-white font-medium">{r.customer}</td>
                    <td className="px-3 py-2.5 text-white">{r.currency}</td>
                    <td className="px-3 py-2.5 text-white font-mono">{r.amount}</td>
                    <td className="px-3 py-2.5 text-[#94A3B8]">{r.location}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.time}</td>
                    <td className="px-3 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${r.urgency==="Critical"?"bg-[#EF4444]/10 text-[#EF4444]":r.urgency==="High"?"bg-[#D4AF37]/10 text-[#D4AF37]":"bg-[#64748B]/10 text-[#64748B]"}`}>High</span></td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.time}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[9px] font-medium hover:bg-[#10B981]/20">Quote</button>
                        <button className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] font-medium hover:bg-[#3B82F6]/20">Match</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* B: Live Rate Board (span 4) */}
        <div className="col-span-12 lg:col-span-4 rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
          <div className="p-4 border-b border-white/[0.05]">
            <h3 className="text-sm font-semibold text-white">Live Rate Board</h3>
          </div>
          <div className="p-4 space-y-2 font-mono">
            {LIVE_RATES.map((r) => {
              const Icon = r.trend === "up" ? TrendingUp : r.trend === "down" ? TrendingDown : Minus;
              const tc = r.trend === "up" ? "#10B981" : r.trend === "down" ? "#EF4444" : "#64748B";
              return (
                <div key={r.pair} className="flex items-center justify-between p-2.5 rounded-xl bg-[#07111A] border border-white/[0.03] hover:border-[#D4AF37]/20 cursor-pointer transition-colors">
                  <span className="text-xs font-bold text-white w-16">{r.pair}</span>
                  <div className="text-[10px]">
                    <div className="text-[#64748B]">B <span className="text-white">{r.buy.toLocaleString()}</span></div>
                    <div className="text-[#64748B]">S <span className="text-white">{r.sell.toLocaleString()}</span></div>
                  </div>
                  <span className="text-[10px] text-[#64748B]">{r.spread}bps</span>
                  <div className="flex items-center gap-1"><Icon size={12} style={{ color: tc }} /><span className="text-[10px] font-medium" style={{ color: tc }}>{r.change}</span></div>
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t border-white/[0.05]">
            <Link href="/dashboard/partner/quotes" className="w-full py-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] font-medium hover:bg-[#D4AF37]/20 transition-colors flex items-center justify-center gap-1">
              Generate Quote <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* C: Customer Pipeline (span 6) */}
        <div className="col-span-12 lg:col-span-6 rounded-2xl bg-[#0E1824] border border-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Customer Pipeline</h3>
          <div className="space-y-2">
            {PARTNER_PIPELINE.map((p) => (
              <div key={p.stage} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-[11px] text-[#94A3B8] w-20">{p.stage}</span>
                <div className="flex-1 h-6 rounded-full bg-[#07111A] overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end px-2 text-[10px] font-bold text-white" style={{ width: `${(p.count / 50) * 100}%`, backgroundColor: p.color, minWidth: p.count > 0 ? 30 : 0 }}>
                    {p.count > 5 ? p.count : ""}
                  </div>
                </div>
                <span className="text-[11px] text-white font-mono w-8 text-right">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* D: Active Escrows (span 6) */}
        <div className="col-span-12 lg:col-span-6 rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
          <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Active Escrows</h3>
            <Link href="/dashboard/partner/escrows" className="text-[10px] text-[#D4AF37]">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["ID","Buyer","Seller","Amount","Status","Created"].map(h=><th key={h} className="text-left px-3 py-2.5 font-medium">{h}</th>)}</tr></thead>
              <tbody>
                {PARTNER_ESCROWS.map((e) => {
                  const sc = e.status==="Active"?"bg-[#3B82F6]/10 text-[#3B82F6]":e.status==="Funding"?"bg-[#D4AF37]/10 text-[#D4AF37]":e.status==="Dispute"?"bg-[#EF4444]/10 text-[#EF4444]":"bg-[#10B981]/10 text-[#10B981]";
                  return (
                    <tr key={e.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] cursor-pointer">
                      <td className="px-3 py-2.5 text-[#D4AF37] font-mono text-[10px]">{e.id}</td>
                      <td className="px-3 py-2.5 text-white">{e.buyer}</td>
                      <td className="px-3 py-2.5 text-[#94A3B8]">{e.seller}</td>
                      <td className="px-3 py-2.5 text-white font-mono">{e.amount}</td>
                      <td className="px-3 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${sc}`}>{e.status}</span></td>
                      <td className="px-3 py-2.5 text-[#64748B] text-[10px]">2h ago</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* E: Settlement Tracker (span 8) */}
        <div className="col-span-12 lg:col-span-8 rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
          <div className="p-4 border-b border-white/[0.05]">
            <h3 className="text-sm font-semibold text-white">Settlement Tracker</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["Payment Sent","Awaiting Confirm","FX Delivery","Complete"].map((col, i) => (
                <div key={col} className="text-center">
                  <span className="text-[9px] text-[#64748B] font-medium uppercase">{col}</span>
                  <div className="h-1 rounded-full mt-1" style={{ backgroundColor: i===0?"#3B82F6":i===1?"#D4AF37":i===2?"#8B5CF6":"#10B981" }} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["PAYMENT_SENT","AWAITING_CONFIRM","FX_DELIVERY","COMPLETE"].map((status) => {
                const items = SETTLEMENTS.filter(s => s.status === status);
                return (
                  <div key={status} className="space-y-2">
                    {items.map((s) => (
                      <div key={s.id} className="p-2 rounded-lg bg-[#07111A] border border-white/[0.03] cursor-pointer hover:border-white/[0.08] transition-colors">
                        <p className="text-[10px] text-white font-medium truncate">{s.customer}</p>
                        <p className="text-[9px] text-[#D4AF37] font-mono">{s.amount}</p>
                        <p className="text-[8px] text-[#64748B]">{s.currency} · {s.deadline}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* F: Counterparty Snapshot (span 4) */}
        <div className="col-span-12 lg:col-span-4 rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
          <div className="p-4 border-b border-white/[0.05]">
            <h3 className="text-sm font-semibold text-white">Counterparty Market</h3>
          </div>
          <div className="p-4 space-y-2">
            {COUNTERPARTIES.map((c) => (
              <div key={c.name} className="p-3 rounded-xl bg-[#07111A] border border-white/[0.03] hover:border-[#D4AF37]/20 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-white">{c.name}</span>
                  <span className="text-[10px] text-[#10B981] font-medium">{c.trust}%</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#64748B]">
                  <span>{c.liquidity}</span>
                  <span>{c.speed}</span>
                  <span>{c.success}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <button className="px-2 py-0.5 rounded text-[9px] font-medium bg-[#3B82F6]/10 text-[#3B82F6]">Request Quote</button>
                  <button className="px-2 py-0.5 rounded text-[9px] font-medium bg-[#10B981]/10 text-[#10B981]">Message</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/[0.05]">
            <Link href="/dashboard/partner/counterparties" className="w-full py-2 rounded-lg bg-white/[0.03] text-[11px] text-[#94A3B8] font-medium hover:bg-white/[0.06] transition-colors flex items-center justify-center">
              View Marketplace <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* G: Activity Timeline (span 12) */}
        <div className="col-span-12 rounded-2xl bg-[#0E1824] border border-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Activity Timeline</h3>
          <div className="space-y-0">
            {ACTIVITY_TIMELINE.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 relative">
                {i < ACTIVITY_TIMELINE.length - 1 && (
                  <div className="absolute left-[7px] top-6 bottom-0 w-px bg-white/[0.06]" />
                )}
                <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5 ${typeStyles[a.type]}`} />
                <div className="flex-1">
                  <p className="text-[11px] text-white">{a.text}</p>
                  <p className="text-[9px] text-[#64748B] mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
