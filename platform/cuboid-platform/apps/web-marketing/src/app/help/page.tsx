'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Search, Mail, Book, MessageCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <nav className="h-[88px] glass border-b border-white/[0.06] sticky top-0 z-50">
        <div className="h-full container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#5E8DFF] flex items-items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#050816"/>
                <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#F5F7FF]">CUBOID</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/auth/signin" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] hidden lg:block">Sign in</Link>
            <Link href="/auth/signup" className="btn btn-primary h-[44px] px-5 text-[14px]">Get Access</Link>
          </div>
        </div>
      </nav>

      <main className="pt-[88px] pb-[140px]">
        <div className="container-main">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#A7B3D0] hover:text-[#F5F7FF] mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="text-center mb-16">
            <span className="text-caption text-[#5E8DFF] mb-4 block">SUPPORT</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">How can we help?</h1>
          </div>

          {/* Search */}
          <div className="max-w-[600px] mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B3D0]" />
              <input type="text" placeholder="Search for help..." className="input pl-14 text-lg" />
            </div>
          </div>

          {/* Help Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            <Link href="/faq" className="glass-card p-8 text-center hover:border-[#5E8DFF]/30 transition-all group">
              <Book className="w-10 h-10 text-[#5E8DFF] mx-auto mb-4" />
              <h3 className="text-h4 text-[#F5F7FF] mb-2">FAQ</h3>
              <p className="text-[14px] text-[#A7B3D0]">Answers to common questions</p>
            </Link>
            <Link href="#" className="glass-card p-8 text-center hover:border-[#5E8DFF]/30 transition-all group">
              <Mail className="w-10 h-10 text-[#5E8DFF] mx-auto mb-4" />
              <h3 className="text-h4 text-[#F5F7FF] mb-2">Email Support</h3>
              <p className="text-[14px] text-[#A7B3D0]">support@cuboid.africa</p>
            </Link>
            <Link href="#" className="glass-card p-8 text-center hover:border-[#5E8DFF]/30 transition-all group">
              <MessageCircle className="w-10 h-10 text-[#5E8DFF] mx-auto mb-4" />
              <h3 className="text-h4 text-[#F5F7FF] mb-2">Live Chat</h3>
              <p className="text-[14px] text-[#A7B3D0]">24/7 assistance</p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-white/[0.06]">
        <div className="container-main">
          <p className="text-[13px] text-[#A7B3D0] text-center">© 2024 CUBOID. Institutional Financial Infrastructure.</p>
        </div>
      </footer>
    </div>
  );
}