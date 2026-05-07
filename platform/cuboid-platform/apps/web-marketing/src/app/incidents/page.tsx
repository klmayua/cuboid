"use client";

import { Navigation } from "@/components";

const incidents = [
  { id: "INC-001", title: "Rate feed latency", severity: "low", status: "resolved", time: "2h ago" },
  { id: "INC-002", title: "API timeout", severity: "medium", status: "investigating", time: "30m ago" }
];

export default function Incidents() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Incident Center</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">View and manage incidents</p>
          <div className="space-y-2">
            {incidents.map((i, idx) => (
              <div key={idx} className="glass-panel p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[rgba(255,255,255,0.96)] font-mono">{i.id}</span>
                  <span className={`text-sm ${i.severity === "low" ? "text-[#71F8E4]" : "text-[#E9C349]"}`}>{i.severity}</span>
                </div>
                <p className="text-[rgba(255,255,255,0.82)]">{i.title}</p>
                <p className="text-sm text-[rgba(255,255,255,0.62)]">{i.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}