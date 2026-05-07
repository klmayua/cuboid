"use client";

import { Navigation, Footer } from "@/components";

const certs = [
  { name: "CBN Licensed", desc: "Licensed by Central Bank of Nigeria" },
  { name: "SOC 2 Type II", desc: "Audited security controls" },
  { name: "ISO 27001", desc: "Information security management" },
  { name: "PCI DSS", desc: "Payment card data security" }
];

export default function Compliance() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">COMPLIANCE</div>
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] leading-[1.05] max-w-[20ch] mb-6">Regulatory-grade infrastructure</h1>
          <p className="text-[18px] text-[rgba(255,255,255,0.82)] max-w-[32ch] mb-16">Built to withstand the most rigorous regulatory scrutiny.</p>
          <div className="grid grid-cols-12 gap-[32px]">
            {certs.map((c, i) => (
              <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 glass-panel p-8">
                <div className="w-12 h-12 bg-[#6B8CFF] rounded-lg mb-4 flex items-center justify-center text-white font-bold">✓</div>
                <h3 className="text-xl font-semibold text-[rgba(255,255,255,0.96)] mb-3">{c.name}</h3>
                <p className="text-sm text-[rgba(255,255,255,0.62)]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}