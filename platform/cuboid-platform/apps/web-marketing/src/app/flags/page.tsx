"use client";

import { Navigation } from "@/components";

const flags = [
  { name: "new_settlement_flow", description: "Enable new settlement flow", enabled: true },
  { name: "rate_alerts", description: "Enable rate threshold alerts", enabled: true },
  { name: "auto_kyc", description: "Enable automatic KYC check", enabled: false }
];

export default function Flags() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Feature Flags</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Manage feature rollouts</p>
          <div className="space-y-2">
            {flags.map((f, i) => (
              <div key={i} className="glass-panel p-4 flex items-center justify-between">
                <div>
                  <span className="text-[rgba(255,255,255,0.96)] font-mono">{f.name}</span>
                  <p className="text-sm text-[rgba(255,255,255,0.62)]">{f.description}</p>
                </div>
                <span className={`text-sm ${f.enabled ? "text-[#71F8E4]" : "text-[rgba(255,255,255,0.62)]"}`}>{f.enabled ? "Enabled" : "Disabled"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}