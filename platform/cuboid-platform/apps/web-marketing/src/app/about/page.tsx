"use client";

import { Navigation, Footer } from "@/components";

export default function About() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">
            ABOUT
          </div>
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] leading-[1.05] max-w-[20ch] mb-6">
            Africa's institutional financial operating system
          </h1>
          <p className="text-[18px] text-[rgba(255,255,255,0.82)] max-w-[32ch] mb-16">
            We build the infrastructure that powers African institutional finance.
          </p>
          <div className="grid grid-cols-12 gap-[32px]">
            {[
              { value: "$2.4B+", label: "Daily Volume" },
              { value: "40+", label: "Currencies" },
              { value: "847", label: "Active Corridors" },
              { value: "99.99%", label: "Uptime SLA" },
            ].map((s, i) => (
              <div
                key={i}
                className="col-span-6 md:col-span-3 glass-panel p-8 text-center"
              >
                <div className="text-[48px] font-bold text-[#6B8CFF] mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.62)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}