"use client";

import { Navigation } from "@/components";

const settlements = [
  { id: "STL-001", corridor: "USD/NGN", amount: "$500,000", status: "settled", time: "2m ago" },
  { id: "STL-002", corridor: "GBP/NGN", amount: "£250,000", status: "pending", time: "5m ago" },
  { id: "STL-003", corridor: "EUR/NGN", amount: "€180,000", status: "settled", time: "12m ago" },
  { id: "STL-004", corridor: "USD/GHS", amount: "$75,000", status: "processing", time: "18m ago" }
];

export default function Settlements() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Settlement Center</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Track and manage settlements</p>
          <div className="glass-panel p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">ID</th>
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Corridor</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Amount</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Status</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Time</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((s, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.08)]">
                    <td className="py-4 text-[rgba(255,255,255,0.96)] font-mono">{s.id}</td>
                    <td className="py-4 text-[rgba(255,255,255,0.96)]">{s.corridor}</td>
                    <td className="py-4 text-right text-[rgba(255,255,255,0.82)]">{s.amount}</td>
                    <td className={`py-4 text-right ${s.status === "settled" ? "text-[#71F8E4]" : s.status === "pending" ? "text-[#E9C349]" : "text-[#6B8CFF]"}`}>{s.status}</td>
                    <td className="py-4 text-right text-[rgba(255,255,255,0.62)]">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}