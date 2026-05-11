'use client';

import { useEffect, useState } from 'react';
import { Card } from '@cuboid/design-system';
import { Play, RotateCcw, CheckCircle, XCircle, AlertTriangle, Clock, Activity, ArrowRight, RefreshCw } from 'lucide-react';

interface FlowRun {
  id: string;
  name: string;
  state: string;
  context: Record<string, any>;
  currentStep: number;
  totalSteps: number;
  attempts: number;
  error: string | null;
  startedAt: string;
  completedAt: string | null;
}

export default function OpsOrchestrationPage() {
  const [flows, setFlows] = useState<FlowRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadFlows(); }, []);

  async function loadFlows() {
    setLoading(true);
    try {
      const res = await fetch('/api/ops/orchestration');
      const json = await res.json();
      if (json.success) setFlows(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function retryFlow(flowId: string) {
    try {
      await fetch('/api/ops/orchestration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'retryFlow', flowId }),
      });
      loadFlows();
    } catch { /* silent */ }
  }

  async function replayFlow(flowId: string) {
    try {
      await fetch('/api/ops/orchestration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'replayFlow', flowId }),
      });
      loadFlows();
    } catch { /* silent */ }
  }

  const active = flows.filter((f) => f.state === 'RUNNING').length;
  const pending = flows.filter((f) => f.state === 'PENDING').length;
  const completed = flows.filter((f) => f.state === 'COMPLETED').length;
  const failed = flows.filter((f) => f.state === 'FAILED').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Orchestration</h1>
          <p className="text-[#7183A6]">Cross-domain workflow management.</p>
        </div>
        <button onClick={loadFlows} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-semantic-info" /><span className="text-xs text-[#7183A6]">Running</span></div>
          <p className="text-xl font-display text-white">{active}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
          <p className="text-xl font-display text-white">{pending}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Completed</span></div>
          <p className="text-xl font-display text-white">{completed}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><XCircle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Failed</span></div>
          <p className="text-xl font-display text-white">{failed}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Active Flows</h2>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : flows.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><Play className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No active flows</p></div>
        ) : (
          <div className="space-y-2">
            {flows.map((flow) => (
              <div key={flow.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${flow.state === 'COMPLETED' ? 'bg-semantic-success/10' : flow.state === 'FAILED' ? 'bg-semantic-danger/10' : flow.state === 'RETRY' ? 'bg-semantic-warning/10' : 'bg-brand-light-trust/10'}`}>
                    {flow.state === 'COMPLETED' ? <CheckCircle className="w-5 h-5 text-semantic-success" /> : flow.state === 'FAILED' ? <XCircle className="w-5 h-5 text-semantic-danger" /> : <Activity className="w-5 h-5 text-brand-light-trust" />}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{flow.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#7183A6]">
                      <span>Step {flow.currentStep}/{flow.totalSteps}</span>
                      <span>·</span>
                      <span>Attempts: {flow.attempts}</span>
                      {flow.startedAt && <span>·</span>}
                      {flow.startedAt && <span>{new Date(flow.startedAt).toLocaleString()}</span>}
                    </div>
                    {flow.error && <p className="text-xs text-semantic-danger mt-1">{flow.error}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-lg ${flow.state === 'COMPLETED' ? 'bg-semantic-success/10 text-semantic-success' : flow.state === 'FAILED' ? 'bg-semantic-danger/10 text-semantic-danger' : flow.state === 'RETRY' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-brand-light-trust/10 text-brand-light-trust'}`}>{flow.state}</span>
                  {flow.state === 'FAILED' && <button onClick={() => replayFlow(flow.id)} className="p-2 rounded-lg hover:bg-white/[0.06]"><RotateCcw className="w-4 h-4" /></button>}
                  {flow.state === 'RETRY' && <button onClick={() => retryFlow(flow.id)} className="p-2 rounded-lg hover:bg-white/[0.06]"><Play className="w-4 h-4" /></button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}