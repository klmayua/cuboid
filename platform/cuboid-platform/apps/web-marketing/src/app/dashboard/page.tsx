"use client";

import { Navigation } from "@/components";

const metrics = [
  { label: "Daily Volume", value: "$2.4B", change: "+12.4%" },
  { label: "Active Corridors", value: "847", change: "+24" },
  { label: "Settled Today", value: "18.2K", change: "+8.2%" },
  { label: "Pending Review", value: "12", change: "-3" }
];
const fxRates = [
  { pair: "USD/NGN", bid: "1517.50", ask: "1518.20", change: "+0.12%" },
  { pair: "GBP/NGN", bid: "1923.80", ask: "1925.00", change: "+0.08%" },
  { pair: "EUR/NGN", bid: "1645.25", ask: "1646.50", change: "-0.04%" },
  { pair: "USD/GHS", bid: "15.42", ask: "15.48", change: "+0.21%" },
  { pair: "USD/KES", bid: "150.25", ask: "150.75", change: "+0.15%" }
];
const activity = [
  { type: "settlement", message: "Settlement completed - USD/NGN", time: "2m ago", status: "success" },
  { type: "compliance", message: "KYC approved for Acme Corp", time: "15m ago", status: "success" },
  { type: "alert", message: "Rate threshold alert - GBP/NGN", time: "32m ago", status: "warning" }
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)]">Executive Dashboard</h1>
              <p className="text-[rgba(255,255,255,0.62)]">Welcome back</p>
            </div>
            <p className="text-[#71F8E4] text-sm">● Live</p>
          </div>
          <div className="grid grid-cols-12 gap-[32px] mb-8">
            {metrics.map((m, i) => (
              <div key={i} className="col-span-3 glass-panel p-6">
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">{m.label}</div>
                <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">{m.value}</div>
                <div className={`text-sm ${m.change.startsWith("+") ? "text-[#71F8E4]" : "text-[#FFB4AB]"}`}>{m.change}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-[32px]">
            <div className="col-span-8 glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">FX RATES</div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)]">
                    <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Pair</th>
                    <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Bid</th>
                    <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Ask</th>
                    <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {fxRates.map((r, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.08)]">
                      <td className="py-3 text-[rgba(255,255,255,0.96)] font-mono">{r.pair}</td>
                      <td className="py-3 text-right text-[rgba(255,255,255,0.82)] font-mono">{r.bid}</td>
                      <td className="py-3 text-right text-[rgba(255,255,255,0.82)] font-mono">{r.ask}</td>
                      <td className={`py-3 text-right ${r.change.startsWith("+") ? "text-[#71F8E4]" : "text-[#FFB4AB]"}`}>{r.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-4 glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">RECENT ACTIVITY</div>
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${a.status === "success" ? "bg-[#71F8E4]" : "bg-[#E9C349]"}`} />
                    <span className="text-sm text-[rgba(255,255,255,0.82)] flex-1">{a.message}</span>
                    <span className="text-xs text-[rgba(255,255,255,0.62)]">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}