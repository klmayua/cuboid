"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, TrendingUp, Clock, Shield, DollarSign, Check, X, Eye, ArrowRight, Database, FileCheck, AlertTriangle, Building2 } from "lucide-react";
import { BDC_INVENTORY, BROKER_REQUESTS, COMPLIANCE_TASKS } from "@/lib/dashboard-data";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

export default function BdcDashboard() {
  const router = useRouter();
  useEffect(() => { if (!getCookie("cuboid-demo-role")) router.replace("/signin"); }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #04100A 0%, #071712 40%, #06110E 100%)" }}>
      {/* Inventory Center Header */}
      <div className="border-b border-[#10B981]/[0.08] bg-[#04100A]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold text-[#10B981] tracking-widest uppercase">BDC Inventory Center</span>
            <span className="text-[10px] text-[#64748B]">Desk: Allen Avenue, Lagos</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
            <span>Open: 7AM-7PM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* Inventory Hero Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {BDC_INVENTORY.map((inv) => (
            <div key={inv.currency} className="p-4 rounded-2xl bg-[#061A12] border border-[#10B981]/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white">{inv.currency}</span>
                <span className="text-[10px] text-[#10B981] font-medium bg-[#10B981]/10 px-1.5 py-0.5 rounded">Live</span>
              </div>
              <p className="text-xs text-[#64748B] mb-1">Available: <span className="text-white font-mono">{inv.available.toLocaleString()}</span></p>
              <p className="text-xs text-[#64748B] mb-1">Reserved: <span className="text-[#D4AF37] font-mono">{inv.reserved.toLocaleString()}</span></p>
              <p className="text-[10px] text-[#94A3B8]">Rate: ₦{inv.rate.toLocaleString()}</p>
              <p className="text-[11px] font-semibold text-white mt-1">{inv.value}</p>
            </div>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Available Inventory", value: "₦3.8B", icon: Database },
            { label: "Open Broker Requests", value: "12", icon: Clock },
            { label: "Trades Executed Today", value: "28", icon: TrendingUp },
            { label: "Daily Revenue", value: "₦4.2M", icon: DollarSign },
          ].map((k) => (
            <div key={k.label} className="p-4 rounded-2xl bg-[#061A12] border border-[#10B981]/[0.08]">
              <div className="flex items-center gap-2 mb-2"><k.icon size={14} className="text-[#10B981]" /><span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">{k.label}</span></div>
              <p className="text-xl font-bold text-white">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          {/* Broker Demand Feed */}
          <div className="lg:col-span-3 rounded-2xl bg-[#061A12] border border-[#10B981]/[0.08] overflow-hidden">
            <div className="p-4 border-b border-[#10B981]/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Broker Demand Feed</h3>
              <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">12 Active</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["Broker","Currency","Amount","Required By","Trust","Location",""].map(h => <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>
                  {BROKER_REQUESTS.map((r, i) => (
                    <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="px-4 py-2.5 text-white font-medium">{r.broker}</td>
                      <td className="px-4 py-2.5 text-[#10B981] font-medium">{r.currency}</td>
                      <td className="px-4 py-2.5 text-white font-mono">{r.amount}</td>
                      <td className="px-4 py-2.5 text-[#D4AF37]">{r.requiredBy}</td>
                      <td className="px-4 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${r.trust>=95?"bg-[#10B981]/10 text-[#10B981]":r.trust>=90?"bg-[#D4AF37]/10 text-[#D4AF37]":"bg-[#EF4444]/10 text-[#EF4444]"}`}>{r.trust}%</span></td>
                      <td className="px-4 py-2.5 text-[#64748B]">{r.location}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <button className="px-2 py-1 rounded-lg bg-[#10B981]/10 text-[#10B981] text-[10px] font-medium hover:bg-[#10B981]/20">Accept</button>
                          <button className="px-2 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-medium hover:bg-[#D4AF37]/20">Counter</button>
                          <button className="px-2 py-1 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-medium hover:bg-[#EF4444]/20">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Tasks */}
          <div className="lg:col-span-2 rounded-2xl bg-[#061A12] border border-[#10B981]/[0.08] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Compliance Tasks</h3>
              <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">5 Pending</span>
            </div>
            <div className="space-y-2">
              {COMPLIANCE_TASKS.map((t) => (
                <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#04100A] border border-white/[0.03]">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${t.priority==="Critical"?"bg-[#EF4444]":t.priority==="High"?"bg-[#D4AF37]":"bg-[#3B82F6]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium">{t.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#64748B]">{t.deadline}</span>
                      <span className={`text-[10px] font-medium ${t.status==="Pending"?"text-[#D4AF37]":t.status==="In Progress"?"text-[#3B82F6]":"text-[#64748B]"}`}>{t.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Level Bars */}
        <div className="rounded-2xl bg-[#061A12] border border-[#10B981]/[0.08] p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Inventory Levels</h3>
          <div className="space-y-3">
            {BDC_INVENTORY.map((inv) => {
              const total = inv.available + inv.reserved;
              const pct = Math.round((inv.available / total) * 100);
              return (
                <div key={inv.currency} className="flex items-center gap-3">
                  <span className="text-[11px] text-white font-medium w-10">{inv.currency}</span>
                  <div className="flex-1 h-6 rounded-full bg-[#04100A] overflow-hidden flex">
                    <div className="h-full bg-[#10B981] flex items-center justify-end px-2 text-[10px] font-bold text-white" style={{ width: `${pct}%`, minWidth: pct > 10 ? 40 : 0 }}>{pct}%</div>
                    <div className="h-full bg-[#D4AF37]/20 flex items-center px-2 text-[10px] text-[#D4AF37]" style={{ width: `${100 - pct}%` }}>reserved</div>
                  </div>
                  <span className="text-[10px] text-[#64748B] w-16 text-right font-mono">{inv.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
