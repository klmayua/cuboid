'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Globe, Shield, Users, TrendingUp, Award } from 'lucide-react';

const stats = [
  { label: 'Users', value: '25,000+' },
  { label: 'BDC Partners', value: '2,200+' },
  { label: 'Countries', value: '10+' },
  { label: 'Monthly Volume', value: '$850M+' },
];

const values = [
  { icon: Shield, title: 'Trust', desc: 'Every transaction is protected by institutional-grade security and compliance.' },
  { icon: Globe, title: 'Accessibility', desc: 'Making cross-border payments accessible to everyone, everywhere.' },
  { icon: TrendingUp, title: 'Innovation', desc: 'Constantly improving our technology to serve you better.' },
  { icon: Users, title: 'Community', desc: 'Building a network of trusted financial partners across Africa.' },
];

const team = [
  { name: 'David Chen', role: 'CEO', bio: 'Former Goldman Sachs, 15 years in fintech' },
  { name: 'Sarah Wanjiku', role: 'CTO', bio: 'Ex-Alibaba, distributed systems expert' },
  { name: 'Michael Okonkwo', role: 'COO', bio: 'Former Barclays, operational excellence' },
];

export default function AboutPage() {
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Cuboid</h1>
          <p className="text-xl text-[#7183A6] mb-12">
            Building the future of cross-border payments in Africa and beyond.
          </p>

          <div className="grid grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-[#7183A6]">{stat.label}</p>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-[#7183A6] leading-relaxed">
              Cuboid is transforming how money moves across borders in Africa. We connect individuals, 
              businesses, and financial institutions through a trusted network of verified BDCs, 
              banks, and money transfer operators. Our platform provides real-time rate comparison, 
              rate reservation, and instant settlement—making cross-border payments faster, cheaper, 
              and more transparent than ever before.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <value.icon className="w-8 h-8 text-[#5E8DFF] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-[#7183A6]">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Leadership</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center text-white text-xl font-bold mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-[#5E8DFF] text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-[#7183A6]">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="w-6 h-6 text-[#5E8DFF] mb-3" />
                <h3 className="text-white font-medium mb-1">Headquarters</h3>
                <p className="text-sm text-[#7183A6]">Nairobi, Kenya</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Mail className="w-6 h-6 text-[#5E8DFF] mb-3" />
                <h3 className="text-white font-medium mb-1">Email</h3>
                <p className="text-sm text-[#7183A6]">hello@cuboid.africa</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Phone className="w-6 h-6 text-[#5E8DFF] mb-3" />
                <h3 className="text-white font-medium mb-1">Phone</h3>
                <p className="text-sm text-[#7183A6]">+254 700 000 000</p>
              </div>
            </div>
          </section>
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