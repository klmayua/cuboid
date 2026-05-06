import { z } from 'zod';

export const WorkflowStatusSchema = z.enum(['PENDING', 'RUNNING', 'WAITING', 'COMPLETED', 'FAILED', 'CANCELLED', 'SUSPENDED']);
export type WorkflowStatus = z.infer<typeof WorkflowStatusSchema>;

export const StepStatusSchema = z.enum(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'SKIPPED', 'WAITING']);
export type StepStatus = z.infer<typeof StepStatusSchema>;

export const StepTypeSchema = z.enum(['ACTION', 'CONDITION', 'PARALLEL', 'WAIT', 'Approval', 'SUB_WORKFLOW']);
export type StepType = z.infer<typeof StepTypeSchema>;

export interface WorkflowStep {
  id: string;
  name: string;
  type: StepType;
  action?: string;
  condition?: string;
  nextStepId?: string;
  fallbackStepId?: string;
  timeout?: number;
  retryConfig?: { maxRetries: number; retryDelay: number };
  config?: Record<string, unknown>;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: number;
  steps: WorkflowStep[];
  initialStepId: string;
  timeout?: number;
  triggers: { event: string; condition?: string }[];
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: WorkflowStatus;
  currentStepId?: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  state: Record<string, unknown>;
  steps: { id: string; status: StepStatus; output?: unknown; error?: string; startedAt?: string; completedAt?: string }[];
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export const WORKFLOW_DEFINITIONS: Record<string, WorkflowDefinition> = {
  PAYOUT: {
    id: 'wf_payout',
    name: 'Payout Workflow',
    description: 'End-to-end payout processing workflow',
    version: 1,
    steps: [
      { id: 'init', name: 'Initialize', type: 'ACTION', action: 'init', nextStepId: 'validate' },
      { id: 'validate', name: 'Validate Request', type: 'ACTION', action: 'validate', nextStepId: 'quote' },
      { id: 'quote', name: 'Get Quote', type: 'ACTION', action: 'get_quote', nextStepId: 'compliance' },
      { id: 'compliance', name: 'Compliance Check', type: 'ACTION', action: 'compliance_check', nextStepId: 'trust' },
      { id: 'trust', name: 'Trust Evaluation', type: 'ACTION', action: 'trust_evaluate', nextStepId: 'funds_check' },
      { id: 'funds_check', name: 'Check Funds', type: 'CONDITION', condition: 'has_sufficient_funds', nextStepId: 'reserve', fallbackStepId: 'reject' },
      { id: 'reserve', name: 'Reserve Funds', type: 'ACTION', action: 'reserve_funds', nextStepId: 'initiate_settlement' },
      { id: 'initiate_settlement', name: 'Initiate Settlement', type: 'ACTION', action: 'initiate_settlement', nextStepId: 'confirm' },
      { id: 'confirm', name: 'Confirm Settlement', type: 'ACTION', action: 'confirm_settlement', nextStepId: 'complete' },
      { id: 'complete', name: 'Complete', type: 'ACTION', action: 'complete', nextStepId: undefined },
      { id: 'reject', name: 'Reject', type: 'ACTION', action: 'reject', nextStepId: undefined },
    ],
    initialStepId: 'init',
    triggers: [{ event: 'transaction.created' }],
  },
  COLLECTION: {
    id: 'wf_collection',
    name: 'Collection Workflow',
    description: 'End-to-end collection processing workflow',
    version: 1,
    steps: [
      { id: 'init', name: 'Initialize', type: 'ACTION', action: 'init_collection', nextStepId: 'validate' },
      { id: 'validate', name: 'Validate Request', type: 'ACTION', action: 'validate_collection', nextStepId: 'create_quote' },
      { id: 'create_quote', name: 'Create Quote', type: 'ACTION', action: 'create_quote', nextStepId: 'send_payment_link' },
      { id: 'send_payment_link', name: 'Send Payment Link', type: 'ACTION', action: 'send_payment_link', nextStepId: 'wait_payment' },
      { id: 'wait_payment', name: 'Wait for Payment', type: 'WAIT', timeout: 3600000, nextStepId: 'check_payment' },
      { id: 'check_payment', name: 'Check Payment', type: 'CONDITION', condition: 'payment_received', nextStepId: 'settle', fallbackStepId: 'expire' },
      { id: 'settle', name: 'Settle', type: 'ACTION', action: 'settle_collection', nextStepId: 'complete' },
      { id: 'expire', name: 'Expire', type: 'ACTION', action: 'expire_collection', nextStepId: undefined },
      { id: 'complete', name: 'Complete', type: 'ACTION', action: 'complete_collection', nextStepId: undefined },
    ],
    initialStepId: 'init',
    triggers: [{ event: 'collection.created' }],
  },
  ESCROW: {
    id: 'wf_escrow',
    name: 'Escrow Workflow',
    description: 'End-to-end escrow processing workflow',
    version: 1,
    steps: [
      { id: 'init', name: 'Initialize Escrow', type: 'ACTION', action: 'init_escrow', nextStepId: 'fund' },
      { id: 'fund', name: 'Fund Escrow', type: 'ACTION', action: 'fund_escrow', nextStepId: 'activate' },
      { id: 'activate', name: 'Activate Escrow', type: 'ACTION', action: 'activate_escrow', nextStepId: 'wait_milestone' },
      { id: 'wait_milestone', name: 'Wait for Milestone', type: 'WAIT', timeout: 86400000, nextStepId: 'check_milestones' },
      { id: 'check_milestones', name: 'Check Milestones', type: 'CONDITION', condition: 'all_milestones_met', nextStepId: 'release', fallbackStepId: 'wait_milestone' },
      { id: 'release', name: 'Release Funds', type: 'ACTION', action: 'release_escrow', nextStepId: 'complete' },
      { id: 'complete', name: 'Complete', type: 'ACTION', action: 'complete_escrow', nextStepId: undefined },
    ],
    initialStepId: 'init',
    triggers: [{ event: 'escrow.created' }],
  },
};

export class WorkflowService {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private actionHandlers: Map<string, (context: WorkflowContext) => Promise<unknown>> = new Map();

  constructor() {
    Object.values(WORKFLOW_DEFINITIONS).forEach(wf => this.register(wf));
  }

  register(workflow: WorkflowDefinition): void {
    this.workflows.set(workflow.id, workflow);
  }

  getWorkflow(workflowId: string): WorkflowDefinition | undefined {
    return this.workflows.get(workflowId);
  }

  registerAction(action: string, handler: (context: WorkflowContext) => Promise<unknown>): void {
    this.actionHandlers.set(action, handler);
  }

  async start(workflowId: string, input: Record<string, unknown>): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const execution: WorkflowExecution = {
      id: `exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      workflowId,
      status: 'RUNNING',
      input,
      state: { ...input },
      steps: workflow.steps.map(s => ({ id: s.id, status: 'PENDING' })),
      startedAt: new Date().toISOString(),
    };

    this.executions.set(execution.id, execution);
    this.executeNextStep(execution);

    return execution;
  }

  private async executeNextStep(execution: WorkflowExecution): Promise<void> {
    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) return;

    const currentStepId = execution.currentStepId ?? workflow.initialStepId;
    const currentStep = workflow.steps.find(s => s.id === currentStepId);

    if (!currentStep) {
      await this.fail(execution.id, 'Step not found');
      return;
    }

    const stepIndex = execution.steps.findIndex(s => s.id === currentStep.id);
    execution.steps[stepIndex].status = 'RUNNING';
    execution.steps[stepIndex].startedAt = new Date().toISOString();
    execution.currentStepId = currentStep.id;

    try {
      if (currentStep.type === 'CONDITION' && currentStep.condition) {
        const result = this.evaluateCondition(currentStep.condition, execution.state);
        const nextStepId = result ? currentStep.nextStepId : currentStep.fallbackStepId;
        
        execution.steps[stepIndex].status = 'COMPLETED';
        execution.steps[stepIndex].completedAt = new Date().toISOString();
        
        if (nextStepId) {
          execution.currentStepId = nextStepId;
          setTimeout(() => this.executeNextStep(execution), 0);
        } else {
          await this.complete(execution.id);
        }
      } else if (currentStep.type === 'WAIT') {
        execution.status = 'WAITING';
        execution.steps[stepIndex].status = 'WAITING';
        
        if (currentStep.timeout) {
          setTimeout(async () => {
            execution.status = 'RUNNING';
            execution.steps[stepIndex].status = 'COMPLETED';
            execution.steps[stepIndex].completedAt = new Date().toISOString();
            
            if (currentStep.nextStepId) {
              execution.currentStepId = currentStep.nextStepId;
              await this.executeNextStep(execution);
            } else {
              await this.complete(execution.id);
            }
          }, currentStep.timeout);
        }
      } else if (currentStep.action) {
        const handler = this.actionHandlers.get(currentStep.action);
        
        if (handler) {
          const context = new WorkflowContext(execution, currentStep);
          const output = await handler(context);
          execution.state = { ...execution.state, ...(output as Record<string, unknown>) };
          execution.steps[stepIndex].output = output;
        }

        execution.steps[stepIndex].status = 'COMPLETED';
        execution.steps[stepIndex].completedAt = new Date().toISOString();

        if (currentStep.nextStepId) {
          execution.currentStepId = currentStep.nextStepId;
          setTimeout(() => this.executeNextStep(execution), 0);
        } else {
          await this.complete(execution.id);
        }
      }
    } catch (error) {
      if (currentStep.retryConfig && currentStep.retryConfig.maxRetries > 0) {
        const stepExecution = execution.steps[stepIndex];
        const retryCount = (stepExecution.output as { retryCount?: number })?.retryCount ?? 0;
        
        if (retryCount < currentStep.retryConfig.maxRetries) {
          setTimeout(() => this.executeNextStep(execution), currentStep.retryConfig!.retryDelay);
          return;
        }
      }

      await this.fail(execution.id, String(error));
    }
  }

  private evaluateCondition(condition: string, state: Record<string, unknown>): boolean {
    switch (condition) {
      case 'has_sufficient_funds':
        return (state.availableBalance as number) >= (state.requiredAmount as number);
      case 'payment_received':
        return (state.paymentStatus as string) === 'RECEIVED';
      case 'all_milestones_met':
        return (state.fulfilledMilestones as number) >= (state.totalMilestones as number);
      default:
        return true;
    }
  }

  async complete(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    execution.status = 'COMPLETED';
    execution.completedAt = new Date().toISOString();
  }

  async fail(executionId: string, error: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    execution.status = 'FAILED';
    execution.error = error;
    execution.completedAt = new Date().toISOString();
  }

  async cancel(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    execution.status = 'CANCELLED';
    execution.completedAt = new Date().toISOString();
  }

  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  getExecutionsByWorkflow(workflowId: string): WorkflowExecution[] {
    return Array.from(this.executions.values()).filter(e => e.workflowId === workflowId);
  }

  getRunningExecutions(): WorkflowExecution[] {
    return Array.from(this.executions.values()).filter(e => e.status === 'RUNNING' || e.status === 'WAITING');
  }
}

export class WorkflowContext {
  constructor(
    public readonly execution: WorkflowExecution,
    public readonly step: WorkflowStep
  ) {}

  getInput(): Record<string, unknown> {
    return this.execution.input;
  }

  getState(): Record<string, unknown> {
    return this.execution.state;
  }

  setState(key: string, value: unknown): void {
    this.execution.state[key] = value;
  }

  getOutput(): Record<string, unknown> | undefined {
    return this.execution.output;
  }
}

export const workflowService = new WorkflowService();