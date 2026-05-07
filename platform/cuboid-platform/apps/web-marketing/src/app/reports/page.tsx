"use client";

import { Navigation } from "@/components";

export default function Reports() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Reports</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Generate and download reports</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.96)] mb-2">Monthly Statement</h3>
              <p className="text-sm text-[rgba(255,255,255,0.62)] mb-4">Download your monthly account statement</p>
              <button className="text-sm text-[#6B8CFF] hover:underline">Download</button>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.96)] mb-2">Transaction History</h3>
              <p className="text-sm text-[rgba(255,255,255,0.62)] mb-4">Full transaction log</p>
              <button className="text-sm text-[#6B8CFF] hover:underline">Download</button>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.96)] mb-2">Compliance Report</h3>
              <p className="text-sm text-[rgba(255,255,255,0.62)] mb-4">Regulatory compliance summary</p>
              <button className="text-sm text-[#6B8CFF] hover:underline">Download</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}