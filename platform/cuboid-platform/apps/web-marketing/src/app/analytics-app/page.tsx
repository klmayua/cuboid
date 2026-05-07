"use client";

import { Navigation } from "@/components";

export default function AnalyticsApp() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Analytics</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">View detailed analytics</p>
          <div className="glass-panel p-8">
            <div className="h-64 flex items-end gap-2 mb-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-[#6B8CFF] rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="text-center text-[rgba(255,255,255,0.62)]">Volume over time</p>
          </div>
        </div>
      </section>
    </main>
  );
}