'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, Shield, Lock, FileCheck, Server, Globe, Award, CheckCircle } from 'lucide-react';

const certifications = [
  { name: 'SOC 2 Type II', desc: 'Independently audited security controls' },
  { name: 'PCI DSS', desc: 'Payment card industry data security standard' },
  { name: 'ISO 27001', desc: 'Information security management system' },
];

const features = [
  { icon: Shield, title: 'Fraud Protection', desc: 'AI-powered fraud detection monitors every transaction in real-time.' },
  { icon: Lock, title: 'Encryption', desc: 'All data encrypted at rest and in transit using AES-256.' },
  { icon: FileCheck, title: 'KYC/AML Compliance', desc: 'Built-in compliance workflows for regulatory requirements.' },
  { icon: Server, title: 'Secure Infrastructure', desc: 'Hosted in SOC-compliant data centers with 99.99% uptime.' },
  { icon: Globe, title: 'Partner Verification', desc: 'Every BDC and partner undergoes rigorous verification.' },
  { icon: Award, title: 'Fund Insurance', desc: 'Customer funds protected up to regulatory limits.' },
];

export default function SecurityPage() {
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
            <Shield className="w-16 h-16 text-[#5E8DFF] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Security</h1>
            <p className="text-xl text-[#7183A6] max-w-2xl mx-auto">
              Your trust is our foundation. We employ bank-grade security measures to protect your money and data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Award className="w-10 h-10 text-[#5E8DFF] mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">{cert.name}</h3>
                <p className="text-sm text-[#7183A6]">{cert.desc}</p>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Security Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <feature.icon className="w-8 h-8 text-[#5E8DFF] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#7183A6]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 rounded-2xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
            <h2 className="text-2xl font-bold text-white mb-4">Report a Security Issue</h2>
            <p className="text-[#7183A6] mb-6">If you've discovered a security vulnerability, please let us know immediately.</p>
            <a href="mailto:security@cuboid.africa" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">
              Contact Security Team
            </a>
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