"use client";

import { CuboidLogo } from "@/components";

const sessions = [
  { device: "Chrome on Windows", location: "Lagos, Nigeria", lastSeen: "Active now" },
  { device: "Safari on iPhone", location: "Lagos, Nigeria", lastSeen: "2 hours ago" }
];

export default function Session() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
        <div className="flex items-center gap-3 mb-8">
          <CuboidLogo />
          <span className="text-[rgba(255,255,255,0.96)] font-semibold text-xl">CUBOID</span>
        </div>
        <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-8">Session management</h1>
        <div className="space-y-4">
          {sessions.map((s, i) => (
            <div key={i} className="glass-panel p-6 flex items-center justify-between">
              <div>
                <div className="text-[rgba(255,255,255,0.96)] font-medium mb-1">{s.device}</div>
                <p className="text-sm text-[rgba(255,255,255,0.62)]">{s.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#71F8E4]">{s.lastSeen}</p>
                <button className="text-sm text-[#FFB4AB] hover:underline">Revoke</button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 h-[60px] px-8 bg-[#FFB4AB] text-[#060D20] rounded-[18px] font-semibold hover:opacity-90 transition-all">Sign out all other sessions</button>
      </div>
    </main>
  );
}