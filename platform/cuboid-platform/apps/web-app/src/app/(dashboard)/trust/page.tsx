'use client';

import { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText,
  Phone,
  Mail,
  ShieldCheck,
  User,
  Building2,
  TrendingUp,
  Activity
} from 'lucide-react';

const trustFactors = [
  { name: 'Identity Verification', score: 100, status: 'VERIFIED', icon: User },
  { name: 'KYC Completion', score: 100, status: 'VERIFIED', icon: FileText },
  { name: 'Device Trust', score: 95, status: 'VERIFIED', icon: ShieldCheck },
  { name: 'Transaction History', score: 88, status: 'GOOD', icon: Activity },
  { name: 'Account Age', score: 75, status: 'FAIR', icon: Clock },
  { name: 'Partner Reference', score: 0, status: 'NOT_APPLICABLE', icon: Building2 },
];

const recentActivity = [
  { type: 'VERIFICATION', message: 'Identity document verified', date: '2024-01-20' },
  { type: 'LOGIN', message: 'Login from Nairobi, KE', date: '2024-01-19' },
  { type: 'TRANSACTION', message: 'KES 50,000 payout completed', date: '2024-01-18' },
  { type: 'VERIFICATION', message: 'Phone number verified', date: '2024-01-15' },
  { type: 'LIMIT', message: 'Daily limit increased to KES 100,000', date: '2024-01-10' },
];

export default function TrustPage() {
  const overallScore = 93;
  const trustLevel = 'HIGH';
  
  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Trust Center</h1>
          <p className="text-[#7183A6]">Monitor your account trust score and verification status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Trust Score Card */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#7183A6] text-sm mb-1">Overall Trust Score</p>
                <h2 className="text-5xl font-bold text-white">{overallScore}</h2>
              </div>
              <div className={`px-4 py-2 rounded-full ${
                trustLevel === 'HIGH' ? 'bg-green-500/20 text-green-500' : 
                trustLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {trustLevel}
              </div>
            </div>
            
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-[#5E8DFF] to-[#4A7AE8] rounded-full transition-all"
                style={{ width: `${overallScore}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-[#7183A6] text-sm mb-1">Daily Limit</p>
                <p className="text-2xl font-bold text-white">KES 100K</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-[#7183A6] text-sm mb-1">Monthly Limit</p>
                <p className="text-2xl font-bold text-white">KES 500K</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-[#7183A6] text-sm mb-1">Single Transfer</p>
                <p className="text-2xl font-bold text-white">KES 50K</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#7183A6] text-sm">Email</span>
                  <span className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7183A6] text-sm">Phone</span>
                  <span className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7183A6] text-sm">Identity</span>
                  <span className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7183A6] text-sm">MFA</span>
                  <span className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" /> Enabled
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 text-[#7183A6] hover:bg-white/10 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">Contact Support</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 text-[#7183A6] hover:bg-white/10 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Email Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Factors */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Trust Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustFactors.map(factor => (
              <div key={factor.name} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    factor.status === 'VERIFIED' ? 'bg-green-500/20' : factor.status === 'GOOD' ? 'bg-[#5E8DFF]/20' : 'bg-yellow-500/20'
                  }`}>
                    <factor.icon className={`w-5 h-5 ${
                      factor.status === 'VERIFIED' ? 'text-green-500' : factor.status === 'GOOD' ? 'text-[#5E8DFF]' : 'text-yellow-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{factor.name}</h4>
                    <span className={`text-xs ${
                      factor.status === 'VERIFIED' ? 'text-green-500' : factor.status === 'GOOD' ? 'text-[#5E8DFF]' : 'text-yellow-500'
                    }`}>{factor.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        factor.score >= 90 ? 'bg-green-500' : factor.score >= 70 ? 'bg-[#5E8DFF]' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <span className="text-white font-medium">{factor.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Trust Activity</h3>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0">
                <div className={`p-2 rounded-lg ${
                  item.type === 'VERIFICATION' ? 'bg-green-500/20' : 
                  item.type === 'LIMIT' ? 'bg-[#5E8DFF]/20' : 'bg-white/10'
                }`}>
                  {item.type === 'VERIFICATION' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                   item.type === 'LIMIT' ? <TrendingUp className="w-4 h-4 text-[#5E8DFF]" /> :
                   <Activity className="w-4 h-4 text-[#7183A6]" />}
                </div>
                <div className="flex-1">
                  <p className="text-white">{item.message}</p>
                </div>
                <span className="text-[#7183A6] text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}