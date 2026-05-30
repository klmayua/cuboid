"use client";

import { useState } from "react";
import { Search, Filter, Star, Shield, TrendingUp, Clock, MessageCircle, ArrowRight, Building2, DollarSign } from "lucide-react";
import { PARTNERS } from "@/lib/dashboard-data";

const COUNTERPARTIES_ALL = [
  ...PARTNERS.map(p => ({ ...p, settlementSpeed: p.name.includes("Capital") ? "8min" : p.name.includes("Atlantic") ? "15min" : p.name.includes("Prime") ? "22min" : "18min", successRate: p.trust + "%", activeTrades: Math.floor(Math.random() * 50) + 10, currencies: ["USD/NGN","EUR/NGN","GBP/NGN"].slice(0, Math.floor(Math.random() * 3) + 1) })),
  { name: "Global FX Desk", location: "Lagos", volume: "₦920M", trust: 93, specialty: "USD/NGN", settlementSpeed: "10min", successRate: "95%", activeTrades: 34, currencies: ["USD/NGN","GBP/NGN"] },
  { name: "Abuja Currency Hub", location: "Abuja", volume: "₦560M", trust: 90, specialty: "EUR/NGN", settlementSpeed: "20min", successRate: "91%", activeTrades: 22, currencies: ["EUR/NGN"] },
  { name: "Swift FX Solutions", location: "Lagos", volume: "₦1.3B", trust: 97, specialty: "USD/NGN", settlementSpeed: "6min", successRate: "99%", activeTrades: 56, currencies: ["USD/NGN","AED/NGN","GBP/NGN"] },
];

export default function CounterpartyMarketplace() {
  const [search, setSearch] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("All");

  const filtered = COUNTERPARTIES_ALL.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (currencyFilter === "All" || c.currencies.some(cur => cur.includes(currencyFilter)))
  );

  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Counterparty Marketplace</h1>
        <p className="text-[11px] text-[#64748B]">Access verified counterparties for liquidity and trading</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search counterparties..." className="w-full h-9 pl-9 pr-3 bg-[#0E1824] border border-white/[0.06] rounded-lg text-[12px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#8B5CF6]/30" />
        </div>
        {["All","USD","EUR","GBP","AED"].map(f => (
          <button key={f} onClick={() => setCurrencyFilter(f)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${currencyFilter===f ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/20" : "bg-[#0E1824] text-[#64748B] border border-white/[0.04] hover:text-white"}`}>{f}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-[#0E1824] border border-white/[0.05] hover:border-[#8B5CF6]/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                <p className="text-[10px] text-[#64748B]">{c.location}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${c.trust >= 95 ? "bg-[#10B981]/10 text-[#10B981]" : c.trust >= 90 ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-[#EF4444]/10 text-[#EF4444]"}`}>{c.trust}%</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
              <div className="p-2 rounded-lg bg-[#07111A]"><span className="text-[#64748B]">Liquidity</span><p className="text-white font-mono mt-0.5">{c.volume}</p></div>
              <div className="p-2 rounded-lg bg-[#07111A]"><span className="text-[#64748B]">Speed</span><p className="text-[#10B981] font-mono mt-0.5">{c.settlementSpeed}</p></div>
              <div className="p-2 rounded-lg bg-[#07111A]"><span className="text-[#64748B]">Success</span><p className="text-white font-mono mt-0.5">{c.successRate}</p></div>
              <div className="p-2 rounded-lg bg-[#07111A]"><span className="text-[#64748B]">Trades</span><p className="text-white font-mono mt-0.5">{c.activeTrades}</p></div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {c.currencies.map(cur => (
                <span key={cur} className="px-1.5 py-0.5 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] text-[9px] font-medium">{cur}</span>
              ))}
            </div>

            <div className="flex gap-1.5">
              <button className="flex-1 py-1.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-medium hover:bg-[#8B5CF6]/20">Request Liquidity</button>
              <button className="px-3 py-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981] text-[10px] font-medium hover:bg-[#10B981]/20"><MessageCircle size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
