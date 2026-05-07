"use client";

import { Navigation } from "@/components";

export default function Solutions() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <section className="pt-navbar">
        <div className="max-w-container mx-auto px-gutter pt-premium_section">
          <div className="grid grid-cols-12 gap-grid">
            <div className="col-span-12 lg:col-span-6">
              <span className="badge-premium mb-lg block">SOLUTIONS</span>
              <h1 className="font-section text-pure_white mb-lg">
                Institutional-grade infrastructure
              </h1>
              <p className="font-body text-silver_blue max-w-[32ch]">
                Purpose-built for African financial institutions requiring operational excellence, regulatory compliance, and enterprise reliability.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-lg mt-xxl">
            {[
              { icon: "💼", title: "Treasury Operations", desc: "Automated FX workflow management for corporate treasury." },
              { icon: "🏦", title: "Settlement Infrastructure", desc: "Real-time settlement across 40+ African currencies." },
              { icon: "📋", title: "Compliance Engine", desc: "Automated KYC, AML, and regulatory reporting." },
              { icon: "🌐", title: "Liquidity Networks", desc: "Access institutional liquidity pools." },
              { icon: "📊", title: "Analytics", desc: "Real-time intelligence and reporting." },
              { icon: "🔐", title: "Security", desc: "Bank-grade security with SOC 2 Type II." },
            ].map((item, i) => (
              <div key={i} className="premium_panel rounded-card p-xl hover:glow-blue transition-all cursor-pointer">
                <div className="text-3xl mb-lg">{item.icon}</div>
                <h3 className="font-card text-pure_white mb-3">{item.title}</h3>
                <p className="text-muted_slate text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}