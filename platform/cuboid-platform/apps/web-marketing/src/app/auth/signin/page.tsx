'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-8">
      <div className="w-full max-w-[520px]">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#A7B3D0] hover:text-[#F5F7FF] mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="glass-card p-10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-[16px] bg-[#5E8DFF]/20 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#5E8DFF"/>
                <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="2"/>
              </svg>
            </div>
            <h1 className="text-[36px] font-bold text-[#F5F7FF] mb-2">Welcome back</h1>
            <p className="text-[15px] text-[#A7B3D0]">Sign in to your institutional account</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Email address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
                <input 
                  type="email" 
                  placeholder="institution@company.com" 
                  className="input pl-14"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••••••" 
                  className="input pl-14 pr-14"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-[6px] bg-[#121A33] border border-white/[0.1] accent-[#5E8DFF]" />
                <span className="text-[14px] text-[#A7B3D0]">Remember this device</span>
              </label>
              <Link href="/auth/forgot-password" className="text-[14px] text-[#5E8DFF] hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign in
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[#A7B3D0]">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#5E8DFF] font-semibold hover:underline">
                Request access
              </Link>
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <p className="text-[12px] text-[#A7B3D0] text-center mb-4">Demo credentials</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[12px] bg-[#0D1326]/80 border border-white/[0.04]">
                <p className="text-[11px] text-[#A7B3D0] mb-1">Administrator</p>
                <p className="text-[13px] font-mono text-[#F5F7FF]">admin@cuboid.africa</p>
              </div>
              <div className="p-4 rounded-[12px] bg-[#0D1326]/80 border border-white/[0.04]">
                <p className="text-[11px] text-[#A7B3D0] mb-1">Treasury Manager</p>
                <p className="text-[13px] font-mono text-[#F5F7FF]">treasury@cuboid.africa</p>
              </div>
            </div>
            <p className="text-[11px] text-[#A7B3D0] text-center mt-3">Password for all accounts: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}