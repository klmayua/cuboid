'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../../components/CuboidLogo';
import { ArrowLeft, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#05070D] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <CuboidLogo variant="full" mode="light" width={60} height={60} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-[#7183A6]">Join thousands of users using Cuboid</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input type="tel" placeholder="+254 700 000 000" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#7183A6] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input type="password" placeholder="Create a password" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded bg-white/5 border-white/20" />
              <span className="text-sm text-[#7183A6]">I agree to the <Link href="/terms" className="text-[#5E8DFF]">Terms of Service</Link> and <Link href="/privacy" className="text-[#5E8DFF]">Privacy Policy</Link></span>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium hover:shadow-xl transition-shadow">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7183A6]">Already have an account? <Link href="/auth/signin" className="text-[#5E8DFF]">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}