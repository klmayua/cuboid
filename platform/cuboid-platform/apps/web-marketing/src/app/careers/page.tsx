'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, MapPin, Briefcase, DollarSign, Globe, ArrowRight, Heart, Zap, Users } from 'lucide-react';

const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', desc: 'Market-leading compensation' },
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
  { icon: Zap, title: 'Remote First', desc: 'Work from anywhere' },
  { icon: Users, title: 'Growth', desc: 'Career development programs' },
];

const jobs = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', location: 'Nairobi, Kenya', type: 'Full-time' },
  { title: 'Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Manager', dept: 'Product', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'DevOps Engineer', dept: 'Infrastructure', location: 'Remote', type: 'Full-time' },
  { title: 'Compliance Officer', dept: 'Risk & Compliance', location: 'Nairobi, Kenya', type: 'Full-time' },
  { title: 'Customer Success Manager', dept: 'Operations', location: 'Accra, Ghana', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#05070D]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" width={32} height={32} />
              <span className="text-xl font-semibold text-white">CUBOID</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-sm text-[#7183A6] hover:text-white">Sign in</Link>
              <Link href="/auth/signup" className="text-sm bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white px-4 py-2 rounded-xl font-medium">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Team</h1>
            <p className="text-xl text-[#7183A6] max-w-2xl mx-auto">
              Help us build the future of cross-border payments in Africa. We're looking for passionate people to join our mission.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <benefit.icon className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
                <h3 className="text-white font-medium">{benefit.title}</h3>
                <p className="text-sm text-[#7183A6]">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#5E8DFF] transition-colors">
                  <div>
                    <h3 className="text-white font-medium">{job.title}</h3>
                    <p className="text-sm text-[#7183A6]">{job.dept} • {job.location}</p>
                  </div>
                  <span className="text-xs text-[#5E8DFF] px-3 py-1 rounded-full bg-[#5E8DFF]/20">{job.type}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Don't see the right role?</h2>
            <p className="text-[#7183A6] mb-6">We're always looking for talented people. Send us your resume.</p>
            <a href="mailto:careers@cuboid.africa" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">
              Email Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}