"use client";

import { Navigation } from "@/components";

export default function Liquidity() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Liquidity</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">View liquidity pools</p>
          <div className="glass-panel p-6">
            <p className="text-[rgba(255,255,255,0.62)]">Active liquidity pools: 5</p>
          </div>
        </div>
      </section>
    </main>
  );
}