"use client";

import { Navigation } from "@/components";

export default function About() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <section className="pt-navbar">
        <div className="max-w-container mx-auto px-gutter pt-premium_section">
          <span className="badge-premium mb-lg block">ABOUT</span>
          <h1 className="font-section text-pure_white mb-lg">Africa's institutional financial operating system</h1>
          <p className="font-body text-silver_blue max-w-[32ch] mb-xxl">We build infrastructure powering African institutional finance.</p>
          <div className="grid grid-cols-4 gap-lg">
            {[{ v: "$2.4B+", l: "Daily Volume" }, { v: "40+", l: "Currencies" }, { v: "847", l: "Active Corridors" }, { v: "99.99%", l: "Uptime SLA" }].map((s, i) => (
              <div key={i} className="premium_panel rounded-card p-xl text-center">
                <div className="font-metric text-gold_soft mb-2">{s.v}</div>
                <div className="text-muted_slate text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}