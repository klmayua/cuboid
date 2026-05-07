'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

export default function SignupPage() {
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
            <h1 className="text-[36px] font-bold text-[#F5F7FF] mb-2">Create account</h1>
            <p className="text-[15px] text-[#A7B3D0]">Request institutional access</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Full name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="input pl-14"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Work email</label>
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
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Phone number</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
                <input 
                  type="tel" 
                  placeholder="+234 800 000 0000" 
                  className="input pl-14"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
                <input 
                  type="password" 
                  placeholder="Create a strong password" 
                  className="input pl-14"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" className="w-5 h-5 mt-0.5 rounded-[6px] bg-[#121A33] border border-white/[0.1] accent-[#5E8DFF]" />
              <span className="text-[13px] text-[#A7B3D0]">
                I agree to the{' '}
                <Link href="/terms" className="text-[#5E8DFF] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#5E8DFF] hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Request Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[#A7B3D0]">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#5E8DFF] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}