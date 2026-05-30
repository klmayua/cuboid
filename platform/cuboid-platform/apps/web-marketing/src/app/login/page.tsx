"use client";

import { CuboidLogo } from "@/components";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#07111A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CuboidLogo width={48} height={48} />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Welcome to CUBOID
        </h1>
        <p className="text-[#94A3B8] text-center mb-8 text-sm">
          Africa&apos;s verified exchange network
        </p>

        {/* Dashboard access */}
        <div className="space-y-3 mb-8">
          <a
            href="http://localhost:3000/signin"
            className="w-full py-3.5 bg-[#00A86B] text-[#07111A] font-semibold rounded-xl hover:bg-[#00c27d] transition-all flex items-center justify-center gap-2"
          >
            Access Dashboard
            <ArrowRight size={16} />
          </a>

          <a
            href="https://wa.me/2347067281296?text=Hello%20I%20would%20like%20a%20demo%20of%20Cuboid."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-transparent border border-white/[0.12] text-white font-medium rounded-xl hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} className="text-[#00A86B]" />
            Demo on WhatsApp
          </a>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1824] border border-white/[0.06]">
          <p className="text-xs text-[#94A3B8] text-center mb-2 font-medium">
            Demo Access Credentials
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Email</span>
              <span className="text-white font-mono">admin@cuboid.demo</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Password</span>
              <span className="text-white font-mono">Cuboid@2026</span>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-[#64748B]">
          Need access?{" "}
          <a
            href="https://wa.me/2347067281296?text=Hello%20I%20would%20like%20a%20demo%20of%20Cuboid."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1D9BF0] hover:text-white transition-colors"
          >
            Request on WhatsApp
          </a>
        </p>
      </div>
    </main>
  );
}
