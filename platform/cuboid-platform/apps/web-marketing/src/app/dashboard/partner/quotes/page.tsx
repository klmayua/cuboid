"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Send, Save, Copy, Shield, ArrowRight, TrendingUp, DollarSign, Clock, CheckCircle2, X, ChevronRight, Receipt } from "lucide-react";
import { LIVE_RATES } from "@/lib/dashboard-data";

const QUOTE_HISTORY = [
  { id: "Q-2847", customer: "Adebayo Logistics", pair: "USD/NGN", amount: "₦125M", rate: 1592, margin: "0.8%", status: "Sent", expiry: "4:30 PM" },
  { id: "Q-2846", customer: "Mansa Trading", pair: "EUR/NGN", amount: "₦89M", rate: 1731, margin: "1.1%", status: "Accepted", expiry: "3:15 PM" },
  { id: "Q-2845", customer: "Savannah Holdings", pair: "GBP/NGN", amount: "₦210M", rate: 2050, margin: "0.9%", status: "Sent", expiry: "5:00 PM" },
  { id: "Q-2844", customer: "Kijani Imports", pair: "USD/NGN", amount: "₦45M", rate: 1590, margin: "0.7%", status: "Draft", expiry: "-" },
  { id: "Q-2843", customer: "Coastal Freight", pair: "AED/NGN", amount: "₦67M", rate: 435, margin: "0.6%", status: "Expired", expiry: "1:00 PM" },
  { id: "Q-2842", customer: "Northern Agri", pair: "CAD/NGN", amount: "₦198M", rate: 1180, margin: "1.2%", status: "Accepted", expiry: "6:00 PM" },
];

const QUOTE_STEPS = ["Customer","Currency","Amount","Counterparty","Margin","Generate","Send"];

export default function QuoteCenter() {
  const [step, setStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedPair, setSelectedPair] = useState("USD/NGN");
  const [amount, setAmount] = useState("125000000");
  const [margin, setMargin] = useState("0.8");

  const selectedRate = LIVE_RATES.find(r => r.pair === selectedPair);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Quote Center</h1>
          <p className="text-[11px] text-[#64748B]">Generate and manage FX quotes</p>
        </div>
      </div>

      {/* Quote Builder */}
      <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">New Quote</h3>

        {/* Steps */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {QUOTE_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-shrink-0">
              <div className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap ${i+1 === step ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30" : i+1 < step ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" : "bg-[#0E1824] text-[#64748B] border border-white/[0.05]"}`}>
                {i+1 < step ? <CheckCircle2 size={12} className="inline mr-1" /> : null}
                {s}
              </div>
              {i < QUOTE_STEPS.length - 1 && <ChevronRight size={12} className="text-[#64748B] flex-shrink-0" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-[#64748B] font-medium uppercase mb-1 block">Customer</label>
              <select value={selectedCustomer} onChange={(e) => { setSelectedCustomer(e.target.value); setStep(2); }} className="w-full h-10 px-3 bg-[#07111A] border border-white/[0.06] rounded-lg text-xs text-white">
                <option value="">Select customer</option>
                <option>Adebayo Logistics</option><option>Mansa Trading</option><option>Savannah Holdings</option><option>Kijani Imports</option><option>Coastal Freight Ltd</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#64748B] font-medium uppercase mb-1 block">Currency Pair</label>
              <select value={selectedPair} onChange={(e) => { setSelectedPair(e.target.value); setStep(3); }} className="w-full h-10 px-3 bg-[#07111A] border border-white/[0.06] rounded-lg text-xs text-white">
                {LIVE_RATES.map(r => <option key={r.pair}>{r.pair}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#64748B] font-medium uppercase mb-1 block">Amount (NGN)</label>
              <input value={amount} onChange={(e) => { setAmount(e.target.value); setStep(4); }} className="w-full h-10 px-3 bg-[#07111A] border border-white/[0.06] rounded-lg text-xs text-white font-mono" />
            </div>
            <div>
              <label className="text-[10px] text-[#64748B] font-medium uppercase mb-1 block">Margin (%)</label>
              <input value={margin} onChange={(e) => { setMargin(e.target.value); setStep(5); }} className="w-full h-10 px-3 bg-[#07111A] border border-white/[0.06] rounded-lg text-xs text-white font-mono" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(7)} className="flex-1 py-2.5 bg-[#D4AF37] text-[#07111A] text-xs font-semibold rounded-lg hover:bg-[#F2D27B] transition-colors flex items-center justify-center gap-1.5">
                <Send size={13} />Send Quote
              </button>
              <button className="px-4 py-2.5 bg-white/[0.03] text-[#94A3B8] text-xs font-medium rounded-lg hover:bg-white/[0.06] transition-colors flex items-center gap-1.5">
                <Save size={13} />Draft
              </button>
            </div>
          </div>

          {/* Quote Preview */}
          <div className="p-4 rounded-xl bg-[#07111A] border border-white/[0.04]">
            <h4 className="text-[11px] font-semibold text-white mb-3">Quote Preview</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-[#64748B]">Customer</span><span className="text-white">{selectedCustomer || "—"}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Currency</span><span className="text-white font-mono">{selectedPair}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Amount</span><span className="text-white font-mono">₦{Number(amount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">FX Rate</span><span className="text-[#D4AF37] font-mono">{selectedRate ? `${selectedRate.sell}` : "—"}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Margin</span><span className="text-[#10B981]">{margin}%</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Settlement</span><span className="text-white">T+1</span></div>
              <div className="border-t border-white/[0.06] pt-2.5 mt-2.5">
                <div className="flex justify-between font-bold"><span className="text-white">Total</span><span className="text-[#D4AF37] font-mono">₦{((Number(amount) * (selectedRate?.sell || 1590)) / 1000000).toFixed(1)}M</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote History */}
      <div className="rounded-2xl bg-[#0E1824] border border-white/[0.05] overflow-hidden">
        <div className="p-4 border-b border-white/[0.05]"><h3 className="text-sm font-semibold text-white">Quote History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-white/[0.03] text-[#64748B]">{["ID","Customer","Pair","Amount","Rate","Margin","Status","Expiry",""].map(h=><th key={h} className="text-left px-3 py-2.5 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {QUOTE_HISTORY.map((q) => (
                <tr key={q.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <td className="px-3 py-2.5 text-[#D4AF37] font-mono text-[10px]">{q.id}</td>
                  <td className="px-3 py-2.5 text-white">{q.customer}</td>
                  <td className="px-3 py-2.5 text-white font-mono">{q.pair}</td>
                  <td className="px-3 py-2.5 text-white font-mono">{q.amount}</td>
                  <td className="px-3 py-2.5 text-[#94A3B8] font-mono">{q.rate}</td>
                  <td className="px-3 py-2.5 text-[#10B981]">{q.margin}</td>
                  <td className="px-3 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${q.status==="Accepted"?"bg-[#10B981]/10 text-[#10B981]":q.status==="Sent"?"bg-[#3B82F6]/10 text-[#3B82F6]":q.status==="Draft"?"bg-[#64748B]/10 text-[#64748B]":"bg-[#EF4444]/10 text-[#EF4444]"}`}>{q.status}</span></td>
                  <td className="px-3 py-2.5 text-[#64748B] text-[10px]">{q.expiry}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 rounded bg-white/[0.03] text-[#94A3B8] text-[9px] hover:text-white">View</button>
                      {q.status !== "Accepted" && <button className="px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-[9px]">Resend</button>}
                      {q.status === "Accepted" && <button className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] text-[9px]">Escrow</button>}
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
