'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, FileText, Plus, Search, Edit, Trash2, Eye, Calendar, User, MessageCircle } from 'lucide-react';

const posts = [
  { id: 1, title: 'Cuboid Launches in Kenya', slug: 'cuboid-launches-kenya', status: 'published', author: 'Sarah W.', date: '2024-12-01', views: 1250, category: 'Company News' },
  { id: 2, title: 'How to Find the Best Exchange Rates', slug: 'best-exchange-rates', status: 'published', author: 'David C.', date: '2024-11-28', views: 2340, category: 'Guides' },
  { id: 3, title: 'Security Updates and New Features', slug: 'security-updates-dec-2024', status: 'published', author: 'Security Team', date: '2024-11-25', views: 890, category: 'Product' },
  { id: 4, title: 'Partner BDC Network Expansion', slug: 'bdc-network-expansion', status: 'draft', author: 'Michael O.', date: '2024-11-20', views: 0, category: 'Company News' },
  { id: 5, title: 'Understanding Cross-Border Payments', slug: 'cross-border-payments-guide', status: 'published', author: 'Grace W.', date: '2024-11-15', views: 3450, category: 'Education' },
  { id: 6, title: 'Q4 2024 Financial Report', slug: 'q4-2024-report', status: 'draft', author: 'Finance Team', date: '2024-11-10', views: 0, category: 'Reports' },
];

const categories = ['All', 'Company News', 'Product', 'Guides', 'Education', 'Reports', 'Press'];

export default function BlogPage() {
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-white">Blog & Updates</h1>
              <p className="text-[#7183A6] mt-2">Latest news, guides, and insights from Cuboid</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none"
              />
            </div>
            <div className="flex gap-2">
              {categories.slice(0, 5).map((cat) => (
                <button key={cat} className={`px-4 py-2 rounded-xl text-sm ${cat === 'All' ? 'bg-[#5E8DFF] text-white' : 'glass text-[#7183A6]'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.filter(p => p.status === 'published').slice(0, 6).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5E8DFF] transition-colors">
                  <div className="flex items-center gap-2 text-xs text-[#7183A6] mb-3">
                    <span className="px-2 py-1 rounded-full bg-[#5E8DFF]/20 text-[#5E8DFF]">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5E8DFF] transition-colors">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-[#7183A6]">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-[#7183A6] mb-6">Get the latest updates and insights delivered to your inbox.</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              <button className="px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">Subscribe</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}