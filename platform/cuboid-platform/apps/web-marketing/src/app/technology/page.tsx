"use client";

import { Navigation } from "@/components";

export default function Technology() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <section className="pt-navbar">
        <div className="max-w-container mx-auto px-gutter pt-premium_section">
          <span className="badge-premium mb-lg block">TECHNOLOGY</span>
          <h1 className="font-section text-pure_white mb-lg">Built for institutional scale</h1>
          <p className="font-body text-silver_blue max-w-[32ch] mb-xxl">Enterprise-grade infrastructure for mission-critical operations.</p>
          
          <div className="grid grid-cols-2 gap-lg">
            {[
              { title: "Real-time Settlement", desc: "Sub-second settlement across all corridors." },
              { title: "API-First Architecture", desc: "RESTful APIs with 99.99% SLA." },
              { title: "Regulatory Integration", desc: "Direct integration with CBN, SEC." },
              { title: "Multi-currency Engine", desc: "40+ African currencies." },
            ].map((f, i) => (
              <div key={i} className="premium_panel rounded-card p-xl">
                <h3 className="font-card text-pure_white mb-3">{f.title}</h3>
                <p className="text-muted_slate text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}