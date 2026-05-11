'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { MessageCircle, Users, Workflow, Clock, AlertTriangle, RefreshCw, ArrowRight, Send, Inbox, CheckCircle, XCircle } from 'lucide-react';

interface Conversation {
  id: string;
  state: string;
  assignedTo: string | null;
  workflow: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  whatsappPhone: string;
}

interface WorkflowJob {
  id: string;
  workflow: string;
  subjectType: string;
  subjectId: string;
  state: string;
  attempts: number;
  error: string | null;
  createdAt: string;
}

export default function OpsWhatsAppPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadData(); }, [orgId]);

  async function loadData() {
    setLoading(true);
    try {
      const [convRes, workflowRes] = await Promise.all([
        fetch(`/api/ops/whatsapp?organizationId=${orgId}&action=conversations`),
        fetch(`/api/ops/whatsapp?organizationId=${orgId}&action=workflows`),
      ]);
      const [convJson, workflowJson] = await Promise.all([convRes.json(), workflowRes.json()]);
      if (convJson.success) setConversations(convJson.data ?? []);
      if (workflowJson.success) setWorkflows(workflowJson.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const activeConvs = conversations.filter((c) => c.state === 'ACTIVE' || c.state === 'ASSIGNED');
  const pendingConvs = conversations.filter((c) => c.state === 'PENDING');
  const stuckWorkflows = workflows.filter((w) => w.state === 'FAILED' || (w.state === 'RETRY' && w.attempts >= 2));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">WhatsApp Orchestration</h1>
          <p className="text-[#7183A6]">Operational command rail for lead intake and workflows.</p>
        </div>
        <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><MessageCircle className="w-4 h-4 text-brand-light-trust" /><span className="text-xs text-[#7183A6]">Active</span></div>
          <p className="text-xl font-display text-white">{activeConvs.length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Inbox className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
          <p className="text-xl font-display text-white">{pendingConvs.length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Workflow className="w-4 h-4 text-semantic-info" /><span className="text-xs text-[#7183A6]">Running</span></div>
          <p className="text-xl font-display text-white">{workflows.filter((w) => w.state === 'RUNNING').length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Stuck</span></div>
          <p className="text-xl font-display text-white">{stuckWorkflows.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Active Conversations</h2>
            <Link href="/ops/whatsapp/conversations" className="text-sm text-brand-light-trust hover:text-white">View All</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No active conversations</p></div>
          ) : (
            <div className="space-y-2">
              {conversations.slice(0, 5).map((conv) => (
                <div key={conv.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${conv.state === 'ACTIVE' ? 'bg-semantic-success' : conv.state === 'ASSIGNED' ? 'bg-brand-light-trust' : 'bg-semantic-warning'}`} />
                    <div><p className="text-sm text-white font-medium">{conv.whatsappPhone}</p><p className="text-xs text-[#7183A6]">{conv.workflow || 'No workflow'}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg ${conv.state === 'COMPLETED' ? 'bg-semantic-success/10 text-semantic-success' : 'bg-white/10 text-[#7183A6]'}`}>{conv.state}</span>
                    <ArrowRight className="w-4 h-4 text-[#7183A6]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Workflow Queue</h2>
            <Link href="/ops/whatsapp/workflows" className="text-sm text-brand-light-trust hover:text-white">View All</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : workflows.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><Workflow className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No queued workflows</p></div>
          ) : (
            <div className="space-y-2">
              {workflows.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${job.state === 'COMPLETED' ? 'bg-semantic-success' : job.state === 'FAILED' ? 'bg-semantic-danger' : job.state === 'RETRY' ? 'bg-semantic-warning' : 'bg-brand-light-trust'}`} />
                    <div><p className="text-sm text-white font-medium">{job.workflow}</p><p className="text-xs text-[#7183A6]">{job.subjectType} · {job.subjectId?.slice(0,8)}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7183A6]">Attempts: {job.attempts}</span>
                    <XCircle className="w-4 h-4 text-semantic-danger" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}