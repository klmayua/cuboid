"use client";

import { Navigation, Footer } from "@/components";

const solutions = [
  { title: "Treasury Operations", desc: "Automated FX workflow management for corporate treasury teams.", icon: "💼" },
  { title: "Settlement Infrastructure", desc: "Real-time settlement across 40+ African currencies.", icon: "🏦" },
  { title: "Compliance Engine", desc: "Automated KYC, AML, and regulatory reporting.", icon: "📋" },
  { title: "Liquidity Networks", desc: "Access institutional liquidity pools.", icon: "🌐" }
];

export default function Solutions() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">SOLUTIONS</div>
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] leading-[1.05] max-w-[20ch] mb-6">Institutional-grade infrastructure for Africa</h1>
          <p className="text-[18px] text-[rgba(255,255,255,0.82)] max-w-[32ch] mb-16">Purpose-built for financial institutions that require operational excellence, regulatory compliance, and enterprise reliability.</p>
          <div className="grid grid-cols-12 gap-[32px]">
            {solutions.map((s, i) => (
              <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 glass-panel p-8">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold text-[rgba(255,255,255,0.96)] mb-3">{s.title}</h3>
                <p className="text-sm text-[rgba(255,255,255,0.62)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}