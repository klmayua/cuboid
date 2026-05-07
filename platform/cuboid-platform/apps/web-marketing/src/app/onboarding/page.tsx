"use client";

import { CuboidLogo } from "@/components";

const steps = [
  { num: "01", title: "Organization Details", desc: "Verify your organization details" },
  { num: "02", title: "Team Members", desc: "Invite your team" },
  { num: "03", title: "Compliance", desc: "Complete compliance setup" }
];

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
        <div className="grid grid-cols-12 gap-[32px]">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <CuboidLogo />
              <span className="text-[rgba(255,255,255,0.96)] font-semibold text-xl">CUBOID</span>
            </div>
            <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-8">Get started</h1>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className={`glass-panel p-4 ${i === 0 ? "border-[#6B8CFF]" : ""}`}>
                  <div className="text-[12px] font-semibold text-[#6B8CFF] mb-2">{s.num}</div>
                  <div className="text-[rgba(255,255,255,0.96)] font-medium">{s.title}</div>
                  <p className="text-sm text-[rgba(255,255,255,0.62)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="glass-panel p-8">
              <h2 className="text-xl font-semibold text-[rgba(255,255,255,0.96)] mb-6">Organization Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Organization name" className="col-span-2 h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 text-[rgba(255,255,255,0.96)]" />
                <input placeholder="RC Number" className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 text-[rgba(255,255,255,0.96)]" />
                <input placeholder="Tax ID" className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 text-[rgba(255,255,255,0.96)]" />
                <button className="col-span-2 h-[60px] bg-[#6B8CFF] text-white rounded-[18px] font-semibold hover:bg-[#5A7AE8] transition-all">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}