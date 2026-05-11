'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Play, RotateCcw, CheckCircle, XCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

interface WorkflowJob {
  id: string;
  workflow: string;
  subjectType: string;
  subjectId: string;
  state: string;
  attempts: number;
  error: string | null;
  nextRetryAt: string | null;
  createdAt: string;
}

export default function OpsWhatsAppWorkflowsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [jobs, setJobs] = useState<WorkflowJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => { if (!orgId) return; loadJobs(); }, [orgId, filter]);

  async function loadJobs() {
    setLoading(true);
    try {
      const res = await fetch(`/api/ops/whatsapp?organizationId=${orgId}&action=workflows&limit=100`);
      const json = await res.json();
      if (json.success) setJobs(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function rerunWorkflow(jobId: string) {
    try {
      await fetch('/api/ops/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'rerunWorkflow', jobId }),
      });
      loadJobs();
    } catch { /* silent */ }
  }

  const filtered = jobs.filter((j) => filter === 'ALL' || j.state === filter);

  const stats = {
    pending: jobs.filter((j) => j.state === 'PENDING').length,
    running: jobs.filter((j) => j.state === 'RUNNING').length,
    completed: jobs.filter((j) => j.state === 'COMPLETED').length,
    failed: jobs.filter((j) => j.state === 'FAILED').length,
    retry: jobs.filter((j) => j.state === 'RETRY').length,
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Workflows</h1>
          <p className="text-[#7183A6]">Job queue and retry management.</p>
        </div>
        <div className="flex items-center gap-2">
          {['ALL', 'PENDING', 'RUNNING', 'RETRY', 'FAILED', 'COMPLETED'].map((s) => (
            <button 
              key={s} 
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s 
                  ? 'bg-brand-light-trust/20 text-brand-light-trust' 
                  : 'text-[#7183A6] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
          <p className="text-xl font-display text-white">{stats.pending}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Play className="w-4 h-4 text-semantic-info" /><span className="text-xs text-[#7183A6]">Running</span></div>
          <p className="text-xl font-display text-white">{stats.running}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><RotateCcw className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Retry</span></div>
          <p className="text-xl font-display text-white">{stats.retry}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Completed</span></div>
          <p className="text-xl font-display text-white">{stats.completed}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><XCircle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Failed</span></div>
          <p className="text-xl font-display text-white">{stats.failed}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <div className="space-y-2">
          {loading ? (
            <div className="space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No workflows</p></div>
          ) : (
            filtered.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    job.state === 'COMPLETED' ? 'bg-semantic-success' : 
                    job.state === 'FAILED' ? 'bg-semantic-danger' : 
                    job.state === 'RETRY' ? 'bg-semantic-warning' : 
                    job.state === 'RUNNING' ? 'bg-semantic-info' : 'bg-[#7183A6]'
                  }`} />
                  <div>
                    <p className="text-sm text-white font-medium">{job.workflow}</p>
                    <p className="text-xs text-[#7183A6]">{job.subjectType}: {job.subjectId}</p>
                    {job.error && <p className="text-xs text-semantic-danger mt-1">{job.error}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Attempts</p>
                    <p className="text-sm text-white">{job.attempts}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Created</p>
                    <p className="text-sm text-white">{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                  {job.state === 'FAILED' && (
                    <Button variant="ghost" size="sm" onClick={() => rerunWorkflow(job.id)}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}