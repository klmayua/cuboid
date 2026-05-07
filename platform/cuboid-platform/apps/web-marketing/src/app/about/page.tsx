'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <nav className="h-[88px] glass border-b border-white/[0.06] sticky top-0 z-50">
        <div className="h-full container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#5E8DFF] flex items-center justify-center">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
            <div>
              <span className="text-caption text-[#5E8DFF] mb-4 block">ABOUT US</span>
              <h1 className="text-h1 text-[#F5F7FF] mb-6">Building African Financial Infrastructure</h1>
              <p className="text-body-lg text-[#A7B3D0] mb-8 opacity-85">
                CUBOID is a continental liquidity network connecting banks, Bureau De Change (BDC) operators, 
                and enterprise treasury operations across Africa. We provide institutional-grade FX infrastructure 
                with real-time settlement, regulatory compliance, and treasury intelligence.
              </p>
              <p className="text-body-lg text-[#A7B3D0] opacity-85 mb-10">
                Founded by veterans from global financial institutions, we understand the unique challenges 
                of African FX markets. Our mission is to modernize continental liquidity infrastructure while 
                maintaining the highest standards of compliance and security.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[36px] font-bold text-[#5E8DFF]">$14B+</p>
                  <p className="text-[14px] text-[#A7B3D0]">Verified Assets</p>
                </div>
                <div>
                  <p className="text-[36px] font-bold text-[#5E8DFF]">1,200+</p>
                  <p className="text-[14px] text-[#A7B3D0]">Active Nodes</p>
                </div>
                <div>
                  <p className="text-[36px] font-bold text-[#5E8DFF]">47</p>
                  <p className="text-[14px] text-[#A7B3D0]">Corridors</p>
                </div>
                <div>
                  <p className="text-[36px] font-bold text-[#5E8DFF]">99.999%</p>
                  <p className="text-[14px] text-[#A7B3D0]">Uptime</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-h4 text-[#F5F7FF] mb-6">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-[#5E8DFF]" />
                  <div>
                    <p className="text-[14px] font-medium text-[#F5F7FF]">Headquarters</p>
                    <p className="text-[14px] text-[#A7B3D0]">Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#5E8DFF]" />
                  <div>
                    <p className="text-[14px] font-medium text-[#F5F7FF]">Email</p>
                    <p className="text-[14px] text-[#A7B3D0]">institutional@cuboid.africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#5E8DFF]" />
                  <div>
                    <p className="text-[14px] font-medium text-[#F5F7FF]">Phone</p>
                    <p className="text-[14px] text-[#A7B3D0]">+234 800 CUBOID</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-[#5E8DFF]" />
                  <div>
                    <p className="text-[14px] font-medium text-[#F5F7FF]">Website</p>
                    <p className="text-[14px] text-[#A7B3D0]">www.cuboid.africa</p>
                  </div>
                </div>
              </div>
            </div>
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