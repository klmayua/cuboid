"use client";

import { CuboidLogo } from "@/components";

const alerts = [
  { message: "Rate threshold reached", time: "5m ago", type: "warning" },
  { message: "Settlement completed", time: "15m ago", type: "success" }
];

export default function MobileAlerts() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <div className="p-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <CuboidLogo width={32} height={32} />
          <span className="text-lg font-semibold text-[rgba(255,255,255,0.96)]">Alerts</span>
        </div>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="glass-panel p-4 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${a.type === "warning" ? "bg-[#E9C349]" : "bg-[#71F8E4]"}`} />
              <div className="flex-1">
                <p className="text-[rgba(255,255,255,0.82)]">{a.message}</p>
                <p className="text-xs text-[rgba(255,255,255,0.62)]">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1326] border-t border-[rgba(255,255,255,0.08)] p-4 flex justify-around">
        <a href="/mobile-dashboard" className="text-[rgba(255,255,255,0.62)] text-xs">Home</a>
        <a href="/mobile-settlements" className="text-[rgba(255,255,255,0.62)] text-xs">Settle</a>
        <a href="/mobile-wallet" className="text-[rgba(255,255,255,0.62)] text-xs">Wallet</a>
        <a href="/mobile-settings" className="text-[rgba(255,255,255,0.62)] text-xs">Settings</a>
      </div>
    </main>
  );
}