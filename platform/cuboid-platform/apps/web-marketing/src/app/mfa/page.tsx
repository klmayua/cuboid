"use client";

import { CuboidLogo } from "@/components";

export default function MFA() {
  return (
    <main className="min-h-screen bg-[#060D20] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <CuboidLogo width={64} height={64} />
        </div>
        <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] text-center mb-2">Two-factor authentication</h1>
        <p className="text-[rgba(255,255,255,0.62)] text-center mb-8">Enter the 6-digit code from your authenticator app</p>
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
            <input maxLength={1} className="h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] text-center text-[rgba(255,255,255,0.96)] text-xl" />
          </div>
          <button className="w-full h-[60px] bg-[#6B8CFF] text-white rounded-[18px] font-semibold hover:bg-[#5A7AE8] transition-all">Verify</button>
        </div>
        <p className="text-center mt-8 text-sm text-[rgba(255,255,255,0.62)]">
          <a href="/login" className="text-[#6B8CFF] hover:underline">Back to login</a>
        </p>
      </div>
    </main>
  );
}