"use client";

import { Navigation, Footer } from "@/components";

export default function Developers() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">
            DEVELOPERS
          </div>
          <h1 className="text-[40px] font-bold text-white leading-[1.05] max-w-[20ch] mb-6">
            Build with CUBOID
          </h1>
          <p className="text-[18px] text-gray-400 max-w-[32ch] mb-16">
            Powerful APIs for institutional FX operations.
          </p>
          <div className="grid grid-cols-12 gap-[32px]">
            <div className="col-span-12 lg:col-span-8 glass-panel p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Quickstart</h3>
              <pre className="bg-[#060D20] p-4 rounded-lg text-sm text-gray-400 overflow-x-auto font-mono">
curl -X POST https://api.cuboid.technology/v1/quote
              </pre>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="glass-panel p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Endpoints</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>/v1/quote</li>
                  <li>/v1/settle</li>
                  <li>/v1/rates</li>
                  <li>/v1/compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}