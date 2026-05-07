"use client";

import { CuboidLogo } from "@/components";

export default function MobileLogin() {
  return (
    <main className="min-h-screen bg-[#060D20] flex items-center justify-center p-6">
      <div className="w-full">
        <CuboidLogo width={48} height={48} className="mx-auto mb-8" />
        <h1 className="text-2xl font-bold text-[rgba(255,255,255,0.96)] text-center mb-2">Sign In</h1>
        <p className="text-[rgba(255,255,255,0.62)] text-center mb-8 text-sm">Mobile login</p>
        <input type="email" placeholder="Email" className="w-full h-12 bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 mb-4 text-[rgba(255,255,255,0.96)]" />
        <input type="password" placeholder="Password" className="w-full h-12 bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 mb-4 text-[rgba(255,255,255,0.96)]" />
        <button className="w-full h-12 bg-[#6B8CFF] text-white rounded-lg font-semibold">Sign In</button>
      </div>
    </main>
  );
}