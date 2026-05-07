'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

const posts = [
  { 
    title: 'The Future of African FX Infrastructure', 
    excerpt: 'How modern technology is transforming cross-border payments across the continent.',
    date: 'January 15, 2024',
    category: 'Industry Insights'
  },
  { 
    title: 'Understanding BDC Networks in Nigeria', 
    excerpt: 'A deep dive into the Bureau De Change ecosystem and its role in financial inclusion.',
    date: 'January 8, 2024',
    category: 'Education'
  },
  { 
    title: 'CUBOID Achieves SOC 2 Type II Certification', 
    excerpt: 'We are proud to announce that our platform has received independent security verification.',
    date: 'December 20, 2023',
    category: 'Company News'
  },
  { 
    title: 'Real-Time Settlement: Technical Deep Dive', 
    excerpt: 'How our settlement engine processes millions in daily volume with sub-second latency.',
    date: 'December 12, 2023',
    category: 'Technology'
  },
];

export default function BlogPage() {
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
            <span className="text-caption text-[#5E8DFF] mb-4 block">BLOG</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Latest Updates</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Insights, news, and updates from the CUBOID team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
            {posts.map((post, i) => (
              <article key={i} className="glass-card overflow-hidden hover:border-[#5E8DFF]/30 transition-all group">
                <div className="h-[200px] bg-gradient-to-br from-[#121A33] to-[#0D1326] flex items-center justify-center">
                  <div className="text-[48px] opacity-20">{['📊', '💱', '🏆', '⚡'][i]}</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[12px] font-semibold text-[#5E8DFF]">{post.category}</span>
                    <span className="text-[12px] text-[#A7B3D0] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-[22px] font-bold text-[#F5F7FF] mb-3 group-hover:text-[#5E8DFF] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-[#A7B3D0] mb-5">{post.excerpt}</p>
                  <button className="text-[14px] font-semibold text-[#5E8DFF] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
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