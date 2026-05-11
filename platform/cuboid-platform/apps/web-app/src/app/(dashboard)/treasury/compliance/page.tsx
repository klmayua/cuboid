'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Shield, RefreshCw, AlertTriangle, CheckCircle, FileText, Clock } from 'lucide-react';

export default function TreasuryCompliancePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [alerts, setAlerts] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadCompliance(); }, [orgId]);

  async function loadCompliance() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=compliance`);
      const json = await res.json();
      if (json.success) {
        setAlerts(json.alerts ?? []);
        setDocuments(json.documents ?? []);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const critical = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const warnings = alerts.filter((a) => a.severity === 'WARNING').length;
  const docsValid = documents.filter((d) => d.status === 'VALID').length;
  const docsExpiring = documents.filter((d) => d.status === 'EXPIRING').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Compliance</h1>
          <p className="text-[#7183A6]">Regulatory compliance, licenses, and alerts.</p>
        </div>
        <button onClick={loadCompliance} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-semantic-danger" />
            <span className="text-xs text-[#7183A6]">Critical</span>
          </div>
          <p className="text-xl font-display text-white">{critical}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Warnings</span>
          </div>
          <p className="text-xl font-display text-white">{warnings}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Valid Docs</span>
          </div>
          <p className="text-xl font-display text-white">{docsValid}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Expiring</span>
          </div>
          <p className="text-xl font-display text-white">{docsExpiring}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Compliance Alerts</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <Shield className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No compliance alerts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((a: any) => (
                <div key={a.id} className={`flex items-center justify-between p-3 rounded-xl ${a.severity === 'CRITICAL' ? 'bg-semantic-danger/10' : 'bg-semantic-warning/10'}`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 ${a.severity === 'CRITICAL' ? 'text-semantic-danger' : 'text-semantic-warning'}`} />
                    <div>
                      <p className="text-sm text-white">{a.title}</p>
                      <p className="text-xs text-[#7183A6]">{a.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${a.severity === 'CRITICAL' ? 'bg-semantic-danger/20 text-semantic-danger' : 'bg-semantic-warning/20 text-semantic-warning'}`}>{a.severity}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">License Documents</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No documents</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((d: any) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#7183A6]" />
                    <div>
                      <p className="text-sm text-white">{d.name}</p>
                      <p className="text-xs text-[#7183A6]">Expires {new Date(d.expiresAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${d.status === 'VALID' ? 'bg-semantic-success/10 text-semantic-success' : d.status === 'EXPIRING' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-semantic-danger/10 text-semantic-danger'}`}>{d.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}