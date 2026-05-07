'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../../components/CuboidLogo';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[#0b1326]" 
        style={{backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(137, 206, 255, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(78, 222, 163, 0.03) 0%, transparent 40%)'}}>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-2 text-[#bec8d2] hover:text-[#dae2fd] mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="institutional-glass p-10 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#89ceff]/5 to-transparent opacity-50"></div>
          
          <div className="text-center mb-8 relative">
            <CuboidLogo variant="full" width={60} height={60} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#dae2fd] mb-2">Welcome Back</h2>
            <p className="text-[#bec8d2]">Sign in to continue to Cuboid FX</p>
          </div>

          <form className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bec8d2] hover:text-[#dae2fd]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-[#131b2e] border-white/20" />
                <span className="text-sm text-[#bec8d2]">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#89ceff] hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full py-4 rounded-lg font-bold transition-all bg-[#0ea5e9] text-[#00344d] hover:brightness-110 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center relative">
            <p className="text-sm text-[#bec8d2]">Don't have an account? <Link href="/auth/signup" className="text-[#89ceff] hover:underline">Sign up</Link></p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 relative">
            <p className="text-sm text-[#bec8d2] text-center mb-4">Demo credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[#131b2e]">
                <p className="text-[#bec8d2]">Customer:</p>
                <p className="text-[#dae2fd]">demo@cuboid.africa</p>
              </div>
              <div className="p-3 rounded-lg bg-[#131b2e]">
                <p className="text-[#bec8d2]">Partner:</p>
                <p className="text-[#dae2fd]">partner@cuboid.africa</p>
              </div>
              <div className="p-3 rounded-lg bg-[#131b2e]">
                <p className="text-[#bec8d2]">BDC:</p>
                <p className="text-[#dae2fd]">bdc@cuboid.africa</p>
              </div>
              <div className="p-3 rounded-lg bg-[#131b2e]">
                <p className="text-[#bec8d2]">Admin:</p>
                <p className="text-[#dae2fd]">admin@cuboid.africa</p>
              </div>
            </div>
            <p className="text-xs text-center text-[#bec8d2] mt-2">Password for all: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}