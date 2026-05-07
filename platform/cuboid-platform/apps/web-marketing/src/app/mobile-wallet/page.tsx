"use client";

import { CuboidLogo } from "@/components";

const wallets = [
  { currency: "USD", balance: "12,450.00" },
  { currency: "NGN", balance: "18,968,750.00" }
];

export default function MobileWallet() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <div className="p-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <CuboidLogo width={32} height={32} />
          <span className="text-lg font-semibold text-[rgba(255,255,255,0.96)]">Wallet</span>
        </div>
        <div className="space-y-3">
          {wallets.map((w, i) => (
            <div key={i} className="glass-panel p-4">
              <div className="flex justify-between mb-2">
                <span className="text-[rgba(255,255,255,0.96)]">{w.currency}</span>
                <span className="text-xl font-bold text-[rgba(255,255,255,0.96)]">{w.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1326] border-t border-[rgba(255,255,255,0.08)] p-4 flex justify-around">
        <a href="/mobile-dashboard" className="text-[rgba(255,255,255,0.62)] text-xs">Home</a>
        <a href="/mobile-settlements" className="text-[rgba(255,255,255,0.62)] text-xs">Settle</a>
        <a href="/mobile-wallet" className="text-[#6B8CFF] text-xs">Wallet</a>
        <a href="/mobile-settings" className="text-[rgba(255,255,255,0.62)] text-xs">Settings</a>
      </div>
    </main>
  );
}