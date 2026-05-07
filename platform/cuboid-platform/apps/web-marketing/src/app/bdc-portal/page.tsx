"use client";

import { Navigation } from "@/components";

export default function BDCPortal() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">BDC Portal</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Manage your BDC operations</p>
          <div className="grid grid-cols-4 gap-[32px]">
            <div className="glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">Today's Volume</div>
              <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">$245K</div>
            </div>
            <div className="glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">Transactions</div>
              <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">127</div>
            </div>
            <div className="glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">Pending</div>
              <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">8</div>
            </div>
            <div className="glass-panel p-6">
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">Rating</div>
              <div className="text-[48px] font-bold text-[#71F8E4]">4.8</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}