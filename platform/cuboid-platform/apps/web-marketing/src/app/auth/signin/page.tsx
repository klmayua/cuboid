'use client';

import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070D] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <CuboidLogo variant="full" mode="light" width={60} height={60} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-[#7183A6]">Sign in to continue to Cuboid</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7183A6]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-white/5 border-white/20" />
                <span className="text-sm text-[#7183A6]">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#5E8DFF]">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium hover:shadow-xl transition-shadow">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7183A6]">Don't have an account? <Link href="/auth/signup" className="text-[#5E8DFF]">Sign up</Link></p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-[#7183A6] text-center mb-4">Demo credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white/5">
                <p className="text-[#7183A6]">Customer:</p>
                <p className="text-white">demo@cuboid.africa</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <p className="text-[#7183A6]">Partner:</p>
                <p className="text-white">partner@cuboid.africa</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <p className="text-[#7183A6]">BDC:</p>
                <p className="text-white">bdc@cuboid.africa</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <p className="text-[#7183A6]">Admin:</p>
                <p className="text-white">admin@cuboid.africa</p>
              </div>
            </div>
            <p className="text-xs text-center text-[#7183A6] mt-2">Password for all: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}