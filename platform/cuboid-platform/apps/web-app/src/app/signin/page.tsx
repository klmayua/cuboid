'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { DemoAccessCards } from '@/components/auth/DemoAccessCards';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#05070D] px-4 pt-16 md:pt-20 pb-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <CuboidLogo variant="mark" mode="light" width={40} height={40} />
            <span className="text-xl font-semibold text-white">CUBOID</span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-2">Sign in to your account</h1>
          <p className="text-[#7183A6]">Access your dashboard and manage your operations.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50 focus:ring-1 focus:ring-[#5E8DFF]/20 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-12 pr-12 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50 focus:ring-1 focus:ring-[#5E8DFF]/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7183A6] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#7183A6] cursor-pointer">
              <input type="checkbox" className="rounded border-white/20 bg-white/[0.04] text-[#5E8DFF]" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[#5E8DFF] hover:text-white transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#0A2A66] to-[#123E91] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#5E8DFF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-[#7183A6] text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#5E8DFF] hover:text-white transition-colors">
            Sign up
          </Link>
        </p>
      </div>

      <div className="w-full max-w-5xl mt-10">
        <DemoAccessCards />
      </div>
    </div>
  );
}
