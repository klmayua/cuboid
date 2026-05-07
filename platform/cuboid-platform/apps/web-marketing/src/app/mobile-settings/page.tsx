"use client";

import { CuboidLogo } from "@/components";

export default function MobileSettings() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <div className="p-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <CuboidLogo width={32} height={32} />
          <span className="text-lg font-semibold text-[rgba(255,255,255,0.96)]">Settings</span>
        </div>
        <div className="space-y-2">
          <div className="glass-panel p-4">
            <span className="text-[rgba(255,255,255,0.82)]">Profile</span>
          </div>
          <div className="glass-panel p-4">
            <span className="text-[rgba(255,255,255,0.82)]">Security</span>
          </div>
          <div className="glass-panel p-4">
            <span className="text-[rgba(255,255,255,0.82)]">Notifications</span>
          </div>
          <a href="/login" className="glass-panel p-4 block">
            <span className="text-[#FFB4AB]">Sign Out</span>
          </a>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1326] border-t border-[rgba(255,255,255,0.08)] p-4 flex justify-around">
        <a href="/mobile-dashboard" className="text-[rgba(255,255,255,0.62)] text-xs">Home</a>
        <a href="/mobile-settlements" className="text-[rgba(255,255,255,0.62)] text-xs">Settle</a>
        <a href="/mobile-wallet" className="text-[rgba(255,255,255,0.62)] text-xs">Wallet</a>
        <a href="/mobile-settings" className="text-[#6B8CFF] text-xs">Settings</a>
      </div>
    </main>
  );
}