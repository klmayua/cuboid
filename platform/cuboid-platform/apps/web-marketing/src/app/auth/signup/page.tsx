'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../../components/CuboidLogo';
import { ArrowLeft, Mail, Lock, User, Phone, Shield, Zap } from 'lucide-react';

export default function SignupPage() {
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
            <h2 className="text-2xl font-bold text-[#dae2fd] mb-2">Create Account</h2>
            <p className="text-[#bec8d2]">Join thousands of users using Cuboid FX</p>
          </div>

          <form className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input type="tel" placeholder="+254 700 000 000" className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#bec8d2] uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bec8d2]" />
                <input type="password" placeholder="Create a password" className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none transition-colors" />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded bg-[#131b2e] border-white/20" />
              <span className="text-sm text-[#bec8d2]">I agree to the <Link href="/terms" className="text-[#89ceff] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#89ceff] hover:underline">Privacy Policy</Link></span>
            </div>
            <button type="submit" className="w-full py-4 rounded-lg font-bold transition-all bg-[#0ea5e9] text-[#00344d] hover:brightness-110 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center relative">
            <p className="text-sm text-[#bec8d2]">Already have an account? <Link href="/auth/signin" className="text-[#89ceff] hover:underline">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}