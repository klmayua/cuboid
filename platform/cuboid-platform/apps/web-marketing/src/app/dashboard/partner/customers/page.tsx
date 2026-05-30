"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, ArrowRight, Building2, Phone, Mail, Shield, Star, Globe, TrendingUp, Clock, MessageCircle, FileText, Users } from "lucide-react";
import { CUSTOMERS } from "@/lib/dashboard-data";

const ALL_CUSTOMERS = [
  ...CUSTOMERS,
  { name: "Delta Mercantile", type: "Corporate", volume: "₦180M", location: "Warri", requests: 12 },
  { name: "Inland Freight Express", type: "SME", volume: "₦45M", location: "Abuja", requests: 5 },
  { name: "Atlantic Trading Co", type: "Enterprise", volume: "₦720M", location: "Lagos", requests: 38 },
  { name: "Cross River Exports", type: "SME", volume: "₦92M", location: "Calabar", requests: 7 },
  { name: "Plateau Minerals", type: "Corporate", volume: "₦410M", location: "Jos", requests: 19 },
  { name: "Lagos Bulk Traders", type: "Enterprise", volume: "₦1.1B", location: "Lagos", requests: 56 },
  { name: "Kaduna Textiles", type: "SME", volume: "₦68M", location: "Kaduna", requests: 4 },
  { name: "Enugu Agro Alliance", type: "Corporate", volume: "₦250M", location: "Enugu", requests: 14 },
];

export default function CustomerDirectory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = ALL_CUSTOMERS.filter(c =>
    (filter === "All" || c.type === filter || c.location === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Customer Directory</h1>
          <p className="text-[11px] text-[#64748B]">Manage your customer relationships</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white text-xs font-semibold rounded-xl hover:bg-[#2563EB] transition-colors">
          <Plus size={14} />Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-9 pl-9 pr-3 bg-[#0E1824] border border-white/[0.06] rounded-lg text-[12px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]/30"
          />
        </div>
        {["All","Corporate","Enterprise","SME","Lagos","Abuja","Nairobi","Accra","Kano"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${filter===f ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/20" : "bg-[#0E1824] text-[#64748B] border border-white/[0.04] hover:text-white"}`}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-white/[0.05] text-[#64748B]">{["Customer","Type","Country","Trust","Volume","Requests","Last Active",""].map(h=><th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.name} className="border-b border-white/[0.02] hover:bg-white/[0.01] cursor-pointer">
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[9px] font-medium ${c.type==="Enterprise"?"bg-[#8B5CF6]/10 text-[#8B5CF6]":c.type==="Corporate"?"bg-[#3B82F6]/10 text-[#3B82F6]":"bg-[#10B981]/10 text-[#10B981]"}`}>{c.type}</span></td>
                  <td className="px-4 py-3 text-[#94A3B8]">{c.location}</td>
                  <td className="px-4 py-3"><span className="text-[#10B981] font-medium">Verified</span></td>
                  <td className="px-4 py-3 text-white font-mono">{c.volume}</td>
                  <td className="px-4 py-3 text-[#94A3B8]">{c.requests}</td>
                  <td className="px-4 py-3 text-[#64748B] text-[10px]">Today</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] font-medium hover:bg-[#3B82F6]/20">View</button>
                      <button className="px-2 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-medium hover:bg-[#D4AF37]/20">Quote</button>
                      <button className="px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[9px] font-medium hover:bg-[#10B981]/20">Message</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
