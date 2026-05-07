'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, MapPin, ArrowRight } from 'lucide-react';

const jobs = [
  { title: 'Senior Backend Engineer', department: 'Engineering', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'DevOps Engineer', department: 'Infrastructure', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Compliance Officer', department: 'Compliance', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Solutions Architect', department: 'Solutions', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Product Designer', department: 'Design', location: 'Remote', type: 'Full-time' },
];

export default function CareersPage() {
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

          <div className="text-center mb-16">
            <span className="text-caption text-[#5E8DFF] mb-4 block">JOIN THE TEAM</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Careers</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Help us build the future of African financial infrastructure. We're looking for exceptional talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, i) => (
              <div key={i} className="glass-card p-6 hover:border-[#5E8DFF]/30 transition-all group">
                <span className="text-[12px] font-semibold text-[#5E8DFF] mb-2 block">{job.department}</span>
                <h3 className="text-[20px] font-semibold text-[#F5F7FF] mb-3">{job.title}</h3>
                <div className="flex items-center gap-4 text-[13px] text-[#A7B3D0] mb-5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span>{job.type}</span>
                </div>
                <button className="text-[14px] font-semibold text-[#5E8DFF] flex items-center gap-2 group-hover:gap-3 transition-all">
                  Apply now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
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