'use client';

import Link from 'next/link';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card } from '@cuboid/design-system';
import { MessageCircle, Workflow, Settings, Play, Activity, Bell, HeartHandshake, Shield, Building, ArrowRight } from 'lucide-react';

export default function OpsIndexPage() {
  const routes = [
    { icon: MessageCircle, label: 'WhatsApp Orchestration', href: '/ops/whatsapp', desc: 'Conversations & workflows' },
    { icon: Workflow, label: 'Orchestration', href: '/ops/orchestration', desc: 'Cross-domain flows' },
  ];

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Operations</h1>
            <p className="text-[#7183A6]">System orchestration and monitoring.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Card variant="glass" className="p-6 hover:bg-white/[0.06] transition-colors cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-light-trust/10 flex items-center justify-center">
                    <route.icon className="w-6 h-6 text-brand-light-trust" />
                  </div>
                  <h2 className="text-lg font-medium text-white">{route.label}</h2>
                </div>
                <p className="text-sm text-[#7183A6]">{route.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-sm text-brand-light-trust">
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </CustomerAppLayout>
  );
}