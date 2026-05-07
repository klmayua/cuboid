"use client";

import { Navigation } from "@/components";

export default function RegulatorReporting() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Reporting</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Generate regulatory reports</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.96)] mb-2">Monthly Report</h3>
              <button className="text-sm text-[#6B8CFF] hover:underline">Download</button>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.96)] mb-2">Quarterly Report</h3>
              <button className="text-sm text-[#6B8CFF] hover:underline">Download</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}