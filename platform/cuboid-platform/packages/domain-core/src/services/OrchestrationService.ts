import { globalEventBus } from '../events';
import { auditLog } from './audit-service';
import { pglite } from '@cuboid/database';

export type OrchestrationState = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'COMPENSATED' | 'RETRY';

export interface OrchestrationFlow {
  id: string;
  name: string;
  state: OrchestrationState;
  context: Record<string, any>;
  steps: OrchestrationStep[];
  currentStep: number;
  attempts: number;
  maxAttempts: number;
  error: string | null;
  startedAt: Date;
  completedAt: Date | null;
  createdAt: Date;
}

export interface OrchestrationStep {
  name: string;
  action: string;
  compensate?: string;
  done: boolean;
  error?: string;
}

export class OrchestrationEngine {
  private flows: Map<string, OrchestrationFlow> = new Map();

  async startFlow(
    name: string,
    context: Record<string, any>,
    steps: { name: string; action: string; compensate?: string }[]
  ): Promise<string> {
    const flowId = `flow_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const flow: OrchestrationFlow = {
      id: flowId,
      name,
      state: 'RUNNING',
      context,
      steps: steps.map(s => ({ ...s, done: false })),
      currentStep: 0,
      attempts: 0,
      maxAttempts: 3,
      error: null,
      startedAt: new Date(),
      completedAt: null,
      createdAt: new Date(),
    };

    this.flows.set(flowId, flow);
    
    await pglite.query(
      `INSERT INTO workflow_jobs (id, organization_id, workflow, subject_type, subject_id, state, context)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [flowId, context.organizationId || 'system', name, 'FLOW', flowId, 'RUNNING', JSON.stringify(context)]
    );

    await globalEventBus.emit('FLOW_STARTED', { flowId, payload: { name, context } });
    
    return flowId;
  }

  async executeNextStep(flowId: string): Promise<void> {
    const flow = this.flows.get(flowId);
    if (!flow || flow.state !== 'RUNNING') return;

    const step = flow.steps[flow.currentStep];
    if (!step) {
      await this.completeFlow(flowId);
      return;
    }

    try {
      const action = step.action;
      const context = flow.context;
      
      switch (action) {
        case 'RESERVE_WALLET':
          await pglite.query('UPDATE wallets SET available_balance = available_balance - $2, updated_at = NOW() WHERE id = $1', [context.fromWalletId, context.amount]);
          await globalEventBus.emit('WALLET_RESERVED', { flowId, payload: { walletId: context.fromWalletId, amount: context.amount } });
          break;

        case 'CREATE_ESCROW':
          const escrow = await pglite.query('INSERT INTO escrows (organization_id, quote_match_id, amount, currency) VALUES ($1, $2, $3, $4) RETURNING *', [context.organizationId, context.quoteMatchId, context.amount, context.currency]).then(r => r.rows[0]);
          context.escrowId = escrow.id;
          await globalEventBus.emit('ESCROW_CREATED', { flowId, payload: { escrowId: escrow.id } });
          break;

        case 'FUND_ESCROW':
          await pglite.query('UPDATE escrows SET status = $2 WHERE id = $1', [context.escrowId, 'LOCKED']);
          await globalEventBus.emit('ESCROW_LOCKED', { flowId, payload: { escrowId: context.escrowId } });
          break;

        case 'NOTIFY_BDC':
          await globalEventBus.emit('BDC_ASSIGNED', { flowId, payload: { deskId: context.deskId, dealId: context.dealId } });
          break;

        case 'NOTIFY_BROKER':
          await globalEventBus.emit('BROKER_LEAD_ASSIGNED', { flowId, payload: { leadId: context.leadId } });
          break;

        case 'NOTIFY_CUSTOMER':
          await globalEventBus.emit('NOTIFICATION_SENT', { flowId, payload: { userId: context.userId, type: 'QUOTE_UPDATE' } });
          break;

        case 'UPDATE_TRUST':
          await globalEventBus.emit('TRUST_SCORE_UPDATED', { flowId, payload: { userId: context.userId, delta: 5 } });
          break;

        case 'AUDIT':
          await auditLog({ actorId: context.actorId, action: context.actionType, organizationId: context.organizationId, metadata: { flowId, step: step.name } });
          break;
      }

      step.done = true;
      flow.currentStep++;
      
      await pglite.query('UPDATE workflow_jobs SET context = $2 WHERE id = $1', [flowId, JSON.stringify(flow)]);

      if (flow.currentStep >= flow.steps.length) {
        await this.completeFlow(flowId);
      } else {
        await globalEventBus.emit('FLOW_STEP_COMPLETED', { flowId, payload: { step: step.name, progress: flow.currentStep / flow.steps.length } });
      }
    } catch (err) {
      await this.failFlow(flowId, (err as Error).message);
    }
  }

  async completeFlow(flowId: string): Promise<void> {
    const flow = this.flows.get(flowId);
    if (!flow) return;

    flow.state = 'COMPLETED';
    flow.completedAt = new Date();
    flow.steps.forEach(s => s.done = true);

    await pglite.query('UPDATE workflow_jobs SET state = $2, completed_at = NOW() WHERE id = $1', [flowId, 'COMPLETED']);
    await globalEventBus.emit('FLOW_COMPLETED', { flowId, payload: { name: flow.name, context: flow.context } });
  }

  async failFlow(flowId: string, error: string): Promise<void> {
    const flow = this.flows.get(flowId);
    if (!flow) return;

    flow.attempts++;
    flow.error = error;

    if (flow.attempts >= flow.maxAttempts) {
      flow.state = 'FAILED';
      flow.steps[flow.currentStep].error = error;
      
      await pglite.query('UPDATE workflow_jobs SET state = $2, error = $3, attempts = $4 WHERE id = $1', [flowId, 'FAILED', error, flow.attempts]);
      await globalEventBus.emit('FLOW_FAILED', { flowId, payload: { name: flow.name, error } });
    } else {
      const retryAt = new Date(Date.now() + flow.attempts * 60000);
      flow.state = 'RETRY';
      
      await pglite.query('UPDATE workflow_jobs SET state = $2, error = $3, attempts = $4, next_retry_at = $5 WHERE id = $1', [flowId, 'RETRY', error, flow.attempts, retryAt]);
      await globalEventBus.emit('FLOW_RETRY', { flowId, payload: { attempt: flow.attempts, retryAt } });
    }

    await this.compensate(flowId);
  }

  async compensate(flowId: string): Promise<void> {
    const flow = this.flows.get(flowId);
    if (!flow) return;

    for (let i = flow.currentStep - 1; i >= 0; i--) {
      const step = flow.steps[i];
      if (step.compensate) {
        try {
          switch (step.compensate) {
            case 'RELEASE_WALLET':
              await pglite.query('UPDATE wallets SET available_balance = available_balance + $2, updated_at = NOW() WHERE id = $1', [flow.context.fromWalletId, flow.context.amount]);
              break;
          }
          step.done = false;
        } catch { /* compensation failure - log but continue */
        }
      }
    }

    flow.state = 'COMPENSATED';
    await pglite.query('UPDATE workflow_jobs SET state = $2 WHERE id = $1', [flowId, 'COMPENSATED']);
    await globalEventBus.emit('FLOW_COMPENSATED', { flowId, payload: { name: flow.name } });
  }

  async getFlow(flowId: string): Promise<OrchestrationFlow | undefined> {
    return this.flows.get(flowId);
  }

  async getActiveFlows(organizationId: string): Promise<OrchestrationFlow[]> {
    const flows: OrchestrationFlow[] = [];
    for (const [id, flow] of this.flows) {
      if (flow.state === 'RUNNING' || flow.state === 'RETRY') {
        flows.push(flow);
      }
    }
    return flows;
  }
}

export const orchestrationEngine = new OrchestrationEngine();