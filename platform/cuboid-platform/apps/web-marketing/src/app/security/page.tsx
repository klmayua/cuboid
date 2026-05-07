'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Shield, Lock, FileText, Server, CheckCircle } from 'lucide-react';

const certifications = [
  { name: 'SOC 2 Type II', desc: 'Independently audited security controls' },
  { name: 'CBN Licensed', desc: 'Central Bank of Nigeria authorization' },
  { name: 'PCI DSS', desc: 'Payment card data security standard' },
  { name: 'ISO 27001', desc: 'Information security management' },
];

export default function SecurityPage() {
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
            <span className="text-caption text-[#5E8DFF] mb-4 block">SECURITY</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Bank-Grade Security</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Your money is protected by institutional-level security infrastructure.
            </p>
          </div>

          {/* Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <Shield className="w-10 h-10 text-[#5E8DFF] mx-auto mb-4" />
                <h3 className="text-[18px] font-semibold text-[#F5F7FF] mb-2">{cert.name}</h3>
                <p className="text-[13px] text-[#A7B3D0]">{cert.desc}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1200px] mx-auto">
            <div className="glass-card p-8">
              <Lock className="w-8 h-8 text-[#5E8DFF] mb-5" />
              <h2 className="text-h3 text-[#F5F7FF] mb-4">Encryption</h2>
              <ul className="space-y-4">
                {['AES-256 encryption at rest', 'TLS 1.3 for all data in transit', 'Hardware security modules for key management', 'End-to-end encryption for sensitive data'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#A7B3D0]">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <Server className="w-8 h-8 text-[#5E8DFF] mb-5" />
              <h2 className="text-h3 text-[#F5F7FF] mb-4">Infrastructure</h2>
              <ul className="space-y-4">
                {['SOC 2 Type II certified data centers', '99.999% uptime SLA', 'Multi-region redundancy', '24/7 infrastructure monitoring'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#A7B3D0]">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <FileText className="w-8 h-8 text-[#5E8DFF] mb-5" />
              <h2 className="text-h3 text-[#F5F7FF] mb-4">Compliance</h2>
              <ul className="space-y-4">
                {['KYC/AML verification for all users', 'Real-time transaction monitoring', 'Regulatory reporting automation', 'Audit-ready logging'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#A7B3D0]">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <Shield className="w-8 h-8 text-[#5E8DFF] mb-5" />
              <h2 className="text-h3 text-[#F5F7FF] mb-4">Insurance</h2>
              <ul className="space-y-4">
                {['Funds protected up to required limits', 'Cyber liability insurance', 'Fidelity bond coverage', 'Professional indemnity'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#A7B3D0]">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
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