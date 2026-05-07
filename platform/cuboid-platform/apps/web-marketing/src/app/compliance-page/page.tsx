"use client";

import { Navigation } from "@/components";

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <section className="pt-navbar">
        <div className="max-w-container mx-auto px-gutter pt-premium_section">
          <span className="badge-premium mb-lg block">COMPLIANCE</span>
          <h1 className="font-section text-pure_white mb-lg">Regulatory-grade infrastructure</h1>
          <p className="font-body text-silver_blue max-w-[32ch] mb-xxl">Built to withstand rigorous regulatory scrutiny.</p>
          <div className="grid grid-cols-4 gap-lg">
            {[{ n: "CBN Licensed", d: "Central Bank of Nigeria" }, { n: "SOC 2 Type II", d: "Security certified" }, { n: "ISO 27001", d: "Security management" }, { n: "PCI DSS", d: "Payment card security" }].map((c, i) => (
              <div key={i} className="premium_panel rounded-card p-xl text-center">
                <div className="badge-verified mb-3 inline-block">{c.n}</div>
                <p className="text-muted_slate text-xs">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}