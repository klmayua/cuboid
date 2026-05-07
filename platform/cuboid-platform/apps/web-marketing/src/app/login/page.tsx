"use client";

import { CuboidLogo } from "@/components";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#060D20] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <CuboidLogo width={64} height={64} />
        </div>
        <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] text-center mb-2">Welcome back</h1>
        <p className="text-[rgba(255,255,255,0.62)] text-center mb-8">Sign in to your CUBOID account</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 text-[rgba(255,255,255,0.96)]" />
          <input type="password" placeholder="Password" className="w-full h-[60px] bg-[#131B2E] border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 text-[rgba(255,255,255,0.96)]" />
          <button className="w-full h-[60px] bg-[#6B8CFF] text-white rounded-[18px] font-semibold hover:bg-[#5A7AE8] transition-all">Sign In</button>
        </div>
        <p className="text-center mt-8 text-sm text-[rgba(255,255,255,0.62)]">
          Don't have an account? <a href="/signup" className="text-[#6B8CFF] hover:underline">Request access</a>
        </p>
      </div>
    </main>
  );
}