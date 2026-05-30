"use client";

import { useState } from "react";
import { Shield, AlertCircle, Clock, CheckCircle2, TrendingUp, ArrowRight, DollarSign, FileText, MessageCircle, Upload, LockKeyhole, Unlock, Ban } from "lucide-react";

const ESCROWS_ALL = [
  { id: "ESC-1023", buyer: "Adebayo Logistics", seller: "Zenith FX Partners", amount: "₦125M", currency: "USD", status: "Active", funded: "100%", created: "2h ago", docs: 3 },
  { id: "ESC-1024", buyer: "Mansa Trading", seller: "Atlantic Forex", amount: "₦89M", currency: "EUR", status: "Awaiting Funding", funded: "0%", created: "30m ago", docs: 2 },
  { id: "ESC-1021", buyer: "Savannah Holdings", seller: "Capital Bridge FX", amount: "₦210M", currency: "GBP", status: "Verification", funded: "100%", created: "4h ago", docs: 5 },
  { id: "ESC-1025", buyer: "Kijani Imports", seller: "Prime Currency Desk", amount: "₦45M", currency: "USD", status: "Released", funded: "100%", created: "6h ago", docs: 4 },
  { id: "ESC-1020", buyer: "Coastal Freight", seller: "EastGate FX", amount: "₦67M", currency: "AED", status: "Dispute", funded: "100%", created: "1d ago", docs: 6 },
  { id: "ESC-1019", buyer: "Northern Agri", seller: "Zenith FX Partners", amount: "₦198M", currency: "CAD", status: "Settled", funded: "100%", created: "2d ago", docs: 5 },
  { id: "ESC-1026", buyer: "Delta Mercantile", seller: "Swift FX Solutions", amount: "₦85M", currency: "USD", status: "Active", funded: "60%", created: "1h ago", docs: 2 },
  { id: "ESC-1027", buyer: "Lagos Bulk Traders", seller: "Capital Bridge FX", amount: "₦310M", currency: "GBP", status: "Awaiting Funding", funded: "0%", created: "15m ago", docs: 1 },
];

const TABS = ["All","Active","Awaiting Funding","Verification","Released","Disputes","Settled"];

const statusColors: Record<string, string> = {
  "Active": "bg-[#3B82F6]/10 text-[#3B82F6]",
  "Awaiting Funding": "bg-[#D4AF37]/10 text-[#D4AF37]",
  "Verification": "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  "Released": "bg-[#10B981]/10 text-[#10B981]",
  "Dispute": "bg-[#EF4444]/10 text-[#EF4444]",
  "Settled": "bg-[#64748B]/10 text-[#64748B]",
};

export default function EscrowCenter() {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = tab === "All" ? ESCROWS_ALL : ESCROWS_ALL.filter(e => e.status === tab);
  const detail = ESCROWS_ALL.find(e => e.id === selected);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Escrow Center</h1>
          <p className="text-[11px] text-[#64748B]">Manage secured transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#10B981] text-white text-xs font-semibold rounded-xl hover:bg-[#059669] transition-colors">
          <Shield size={14} />Create Escrow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${tab===t ? "bg-white/[0.08] text-white" : "text-[#64748B] hover:text-white"}`}>{t}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Escrow list */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((e) => (
            <div
              key={e.id}
              onClick={() => setSelected(selected === e.id ? null : e.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selected === e.id ? "bg-[#0E1824] border-[#D4AF37]/30" : "bg-[#0E1824] border-white/[0.05] hover:border-white/[0.1]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#D4AF37]">{e.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${statusColors[e.status]}`}>{e.status}</span>
                </div>
                <span className="text-[10px] text-[#64748B]">{e.created}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div><span className="text-[#64748B]">Buyer: </span><span className="text-white">{e.buyer}</span></div>
                <div><span className="text-[#64748B]">Seller: </span><span className="text-[#94A3B8]">{e.seller}</span></div>
                <div><span className="text-[#64748B]">Amount: </span><span className="text-white font-mono">{e.amount}</span></div>
                <div><span className="text-[#64748B]">Funded: </span><span className={e.funded === "100%" ? "text-[#10B981]" : "text-[#D4AF37]"}>{e.funded}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {detail ? (
          <div className="rounded-2xl bg-[#0E1824] border border-[#D4AF37]/20 p-4">
            <h3 className="text-sm font-semibold text-white mb-4">{detail.id} Details</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111A]">
                <p className="text-[#64748B] mb-2">Parties</p>
                <p className="text-white">Buyer: {detail.buyer}</p>
                <p className="text-[#94A3B8]">Seller: {detail.seller}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#07111A]">
                <p className="text-[#64748B] mb-2">Transaction</p>
                <p className="text-white font-mono">{detail.amount} {detail.currency}</p>
                <p className="text-[#64748B] text-[10px]">Funding: {detail.funded}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#07111A]">
                <p className="text-[#64748B] mb-2">Documents ({detail.docs})</p>
                <p className="text-[10px] text-[#94A3B8]">Contract · Invoice · KYC</p>
              </div>

              {/* Timeline */}
              <div className="p-3 rounded-xl bg-[#07111A]">
                <p className="text-[10px] text-[#64748B] font-medium mb-2">Timeline</p>
                <div className="space-y-2">
                  {["Created","Funded","Under Review","Released"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 text-[10px]">
                      <div className={`w-1.5 h-1.5 rounded-full ${i <= 2 ? "bg-[#10B981]" : "bg-[#64748B]"}`} />
                      <span className={i <= 2 ? "text-white" : "text-[#64748B]"}>{s}</span>
                      <span className="text-[#64748B] ml-auto">{i === 0 ? detail.created : i === 1 ? "1h ago" : i === 2 ? "Pending" : "Awaiting"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 rounded-lg bg-[#10B981]/10 text-[#10B981] text-[11px] font-medium hover:bg-[#10B981]/20 flex items-center justify-center gap-1"><Upload size={12} />Upload Proof</button>
                <button className="py-2 px-3 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-[11px] font-medium hover:bg-[#EF4444]/20 flex items-center gap-1"><Ban size={12} />Dispute</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] p-4 flex items-center justify-center">
            <p className="text-[11px] text-[#64748B] text-center">Select an escrow to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
