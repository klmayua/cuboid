"use client";

import { Navigation } from "@/components";

const insights = [
  { metric: "Volume Trend", value: "+24%", trend: "up" },
  { metric: "Corridor Efficiency", value: "98.2%", trend: "up" },
  { metric: "Settlement Speed", value: "4.2s", trend: "down" }
];

export default function Intelligence() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Intelligence Center</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Operational intelligence and analytics</p>
          <div className="grid grid-cols-12 gap-[32px]">
            {insights.map((i, idx) => (
              <div key={idx} className="col-span-4 glass-panel p-6">
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">{i.metric}</div>
                <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">{i.value}</div>
                <div className={`text-sm ${i.trend === "up" ? "text-[#71F8E4]" : "text-[#FFB4AB]"}`}>{i.trend === "up" ? "↑" : "↓"} vs last period</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}