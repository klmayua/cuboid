import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'workflow-service' });

export enum WorkflowStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
}

export enum StepStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  WAITING = 'WAITING',
}

export enum StepType {
  ACTION = 'ACTION',
  CONDITION = 'CONDITION',
  PARALLEL = 'PARALLEL',
  WAIT = 'WAIT',
  APPROVAL = 'APPROVAL',
  SUB_WORKFLOW = 'SUB_WORKFLOW',
}

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
  parallelSteps?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: number;
  steps: WorkflowStep[];
  initialStepId: string;
  timeout?: number;
  timeoutAction?: 'FAIL' | 'CONTINUE';
  triggers: { event: string; condition?: string }[];
}

export interface StepExecution {
  id: string;
  stepId: string;
  stepName: string;
  status: StepStatus;
  output?: unknown;
  error?: string;
  startedAt?: string;
  completedAt?: string;
  retries: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  definition?: WorkflowDefinition;
  status: WorkflowStatus;
  currentStepId?: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  state: Record<string, unknown>;
  steps: StepExecution[];
  startedAt: string;
  completedAt?: string;
  error?: string;
  timeoutAt?: string;
}

export interface WorkflowContext {
  execution: WorkflowExecution;
  step: WorkflowStep;
  getInput: () => Record<string, unknown>;
  getState: () => Record<string, unknown>;
  setState: (key: string, value: unknown) => void;
  getOutput: () => Record<string, unknown> | undefined;
}

const DEFAULT_WORKFLOWS: Record<string, WorkflowDefinition> = {
  PAYOUT: {
    id: 'wf_payout',
    name: 'Payout Workflow',
    description: 'End-to-end payout processing workflow',
    version: 1,
    steps: [
      { id: 'init', name: 'Initialize', type: StepType.ACTION, action: 'init', nextStepId: 'validate' },
      { id: 'validate', name: 'Validate Request', type: StepType.ACTION, action: 'validate', nextStepId: 'quote' },
      { id: 'quote', name: 'Get Quote', type: StepType.ACTION, action: 'get_quote', nextStepId: 'compliance' },
      { id: 'compliance', name: 'Compliance Check', type: StepType.ACTION, action: 'compliance_check', nextStepId: 'trust' },
      { id: 'trust', name: 'Trust Evaluation', type: StepType.ACTION, action: 'trust_evaluate', nextStepId: 'funds_check' },
      { id: 'funds_check', name: 'Check Funds', type: StepType.CONDITION, condition: 'has_sufficient_funds', nextStepId: 'reserve', fallbackStepId: 'reject' },
      { id: 'reserve', name: 'Reserve Funds', type: StepType.ACTION, action: 'reserve_funds', nextStepId: 'initiate_settlement' },
      { id: 'initiate_settlement', name: 'Initiate Settlement', type: StepType.ACTION, action: 'initiate_settlement', nextStepId: 'confirm' },
      { id: 'confirm', name: 'Confirm Settlement', type: StepType.ACTION, action: 'confirm_settlement', nextStepId: 'complete' },
      { id: 'complete', name: 'Complete', type: StepType.ACTION, action: 'complete', nextStepId: undefined },
      { id: 'reject', name: 'Reject', type: StepType.ACTION, action: 'reject', nextStepId: undefined },
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
      { id: 'init', name: 'Initialize', type: StepType.ACTION, action: 'init_collection', nextStepId: 'validate' },
      { id: 'validate', name: 'Validate Request', type: StepType.ACTION, action: 'validate_collection', nextStepId: 'create_quote' },
      { id: 'create_quote', name: 'Create Quote', type: StepType.ACTION, action: 'create_quote', nextStepId: 'send_link' },
      { id: 'send_link', name: 'Send Payment Link', type: StepType.ACTION, action: 'send_payment_link', nextStepId: 'wait' },
      { id: 'wait', name: 'Wait for Payment', type: StepType.WAIT, timeout: 3600000, nextStepId: 'check' },
      { id: 'check', name: 'Check Payment', type: StepType.CONDITION, condition: 'payment_received', nextStepId: 'settle', fallbackStepId: 'expire' },
      { id: 'settle', name: 'Settle', type: StepType.ACTION, action: 'settle_collection', nextStepId: 'complete' },
      { id: 'expire', name: 'Expire', type: StepType.ACTION, action: 'expire_collection', nextStepId: undefined },
      { id: 'complete', name: 'Complete', type: StepType.ACTION, action: 'complete_collection', nextStepId: undefined },
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
      { id: 'init', name: 'Initialize', type: StepType.ACTION, action: 'init_escrow', nextStepId: 'fund' },
      { id: 'fund', name: 'Fund Escrow', type: StepType.ACTION, action: 'fund_escrow', nextStepId: 'activate' },
      { id: 'activate', name: 'Activate Escrow', type: StepType.ACTION, action: 'activate_escrow', nextStepId: 'wait_milestone' },
      { id: 'wait_milestone', name: 'Wait for Milestone', type: StepType.WAIT, timeout: 86400000, nextStepId: 'check_milestones' },
      { id: 'check_milestones', name: 'Check Milestones', type: StepType.CONDITION, condition: 'all_milestones_met', nextStepId: 'release', fallbackStepId: 'wait_milestone' },
      { id: 'release', name: 'Release Funds', type: StepType.ACTION, action: 'release_escrow', nextStepId: 'complete' },
      { id: 'complete', name: 'Complete', type: StepType.ACTION, action: 'complete_escrow', nextStepId: undefined },
    ],
    initialStepId: 'init',
    triggers: [{ event: 'escrow.created' }],
  },
};

export class WorkflowService {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private actionHandlers: Map<string, (context: WorkflowContext) => Promise<unknown>> = new Map();
  private eventHandlers: Map<string, ((execution: WorkflowExecution) => void)[]> = new Map();

  constructor() {
    Object.values(DEFAULT_WORKFLOWS).forEach(wf => this.register(wf));
  }

  async initialize(): Promise<void> {
    logger.info('Workflow service initialized');
  }

  register(workflow: WorkflowDefinition): void {
    this.workflows.set(workflow.id, workflow);
    logger.info({ workflowId: workflow.id, workflowName: workflow.name }, 'Workflow registered');
  }

  get(workflowId: string): WorkflowDefinition | undefined {
    return this.workflows.get(workflowId);
  }

  getAll(): WorkflowDefinition[] {
    return Array.from(this.workflows.values());
  }

  registerAction(action: string, handler: (context: WorkflowContext) => Promise<unknown>): void {
    this.actionHandlers.set(action, handler);
    logger.info({ action }, 'Action handler registered');
  }

  async start(workflowId: string, input: Record<string, unknown>): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const execution: WorkflowExecution = {
      id: `exec_${uuidv4()}`,
      workflowId,
      definition: workflow,
      status: WorkflowStatus.RUNNING,
      input,
      state: { ...input },
      steps: workflow.steps.map(s => ({
        id: s.id,
        stepId: s.id,
        stepName: s.name,
        status: StepStatus.PENDING,
        retries: 0,
      })),
      startedAt: new Date().toISOString(),
      timeoutAt: workflow.timeout 
        ? new Date(Date.now() + workflow.timeout).toISOString() 
        : undefined,
    };

    this.executions.set(execution.id, execution);
    
    logger.info({ executionId: execution.id, workflowId }, 'Workflow execution started');
    
    this.executeNextStep(execution);

    return execution;
  }

  private async executeNextStep(execution: WorkflowExecution): Promise<void> {
    const workflow = execution.definition;
    if (!workflow) return;

    const currentStepId = execution.currentStepId ?? workflow.initialStepId;
    const currentStep = workflow.steps.find(s => s.id === currentStepId);

    if (!currentStep) {
      await this.fail(execution.id, 'Step not found in workflow definition');
      return;
    }

    const stepIndex = execution.steps.findIndex(s => s.stepId === currentStep.id);
    if (stepIndex === -1) {
      await this.fail(execution.id, 'Step execution not found');
      return;
    }

    execution.steps[stepIndex].status = StepStatus.RUNNING;
    execution.steps[stepIndex].startedAt = new Date().toISOString();
    execution.currentStepId = currentStep.id;

    try {
      if (currentStep.type === StepType.CONDITION && currentStep.condition) {
        const result = this.evaluateCondition(currentStep.condition, execution.state);
        const nextStepId = result ? currentStep.nextStepId : currentStep.fallbackStepId;
        
        execution.steps[stepIndex].status = StepStatus.COMPLETED;
        execution.steps[stepIndex].completedAt = new Date().toISOString();
        
        if (nextStepId) {
          execution.currentStepId = nextStepId;
          setTimeout(() => this.executeNextStep(execution), 0);
        } else {
          await this.complete(execution.id);
        }
      } 
      else if (currentStep.type === StepType.WAIT) {
        execution.status = WorkflowStatus.WAITING;
        execution.steps[stepIndex].status = StepStatus.WAITING;
        
        if (currentStep.timeout) {
          setTimeout(async () => {
            execution.status = WorkflowStatus.RUNNING;
            execution.steps[stepIndex].status = StepStatus.COMPLETED;
            execution.steps[stepIndex].completedAt = new Date().toISOString();
            
            if (currentStep.nextStepId) {
              execution.currentStepId = currentStep.nextStepId;
              await this.executeNextStep(execution);
            } else {
              await this.complete(execution.id);
            }
          }, currentStep.timeout);
        }
      } 
      else if (currentStep.action) {
        const handler = this.actionHandlers.get(currentStep.action);
        
        if (handler) {
          const context = this.createContext(execution, currentStep);
          const output = await handler(context);
          execution.state = { ...execution.state, ...(output as Record<string, unknown>?) };
          execution.steps[stepIndex].output = output;
        }

        execution.steps[stepIndex].status = StepStatus.COMPLETED;
        execution.steps[stepIndex].completedAt = new Date().toISOString();

        if (currentStep.nextStepId) {
          execution.currentStepId = currentStep.nextStepId;
          setTimeout(() => this.executeNextStep(execution), 0);
        } else {
          await this.complete(execution.id);
        }
      }
      else {
        execution.steps[stepIndex].status = StepStatus.COMPLETED;
        execution.currentStepId = currentStep.nextStepId;
        if (currentStep.nextStepId) {
          setTimeout(() => this.executeNextStep(execution), 0);
        } else {
          await this.complete(execution.id);
        }
      }
    } catch (error) {
      const errorMsg = String(error);
      
      if (currentStep.retryConfig && currentStep.retryConfig.maxRetries > 0) {
        const stepExec = execution.steps[stepIndex];
        
        if (stepExec.retries < currentStep.retryConfig.maxRetries) {
          stepExec.retries++;
          logger.warn({ executionId: execution.id, stepId: currentStep.id, retry: stepExec.retries }, 'Retrying step');
          setTimeout(() => this.executeNextStep(execution), currentStep.retryConfig!.retryDelay);
          return;
        }
      }

      execution.steps[stepIndex].status = StepStatus.FAILED;
      execution.steps[stepIndex].error = errorMsg;
      await this.fail(execution.id, errorMsg);
    }
  }

  private createContext(execution: WorkflowExecution, step: WorkflowStep): WorkflowContext {
    return {
      execution,
      step,
      getInput: () => execution.input,
      getState: () => execution.state,
      setState: (key: string, value: unknown) => {
        execution.state[key] = value;
      },
      getOutput: () => execution.output,
    };
  }

  private evaluateCondition(condition: string, state: Record<string, unknown>): boolean {
    switch (condition) {
      case 'has_sufficient_funds':
        return (state.availableBalance as number) >= (state.requiredAmount as number);
      case 'payment_received':
        return (state.paymentStatus as string) === 'RECEIVED';
      case 'all_milestones_met':
        return (state.fulfilledMilestones as number) >= (state.totalMilestones as number);
      case 'amount_below_limit':
        return (state.amount as number) <= (state.limit as number);
      case 'compliance_passed':
        return (state.complianceStatus as string) === 'PASS';
      default:
        logger.warn({ condition }, 'Unknown condition, returning false');
        return false;
    }
  }

  async complete(executionId: string, output?: Record<string, unknown>): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    execution.status = WorkflowStatus.COMPLETED;
    execution.completedAt = new Date().toISOString();
    execution.output = output;

    logger.info({ executionId, workflowId: execution.workflowId }, 'Workflow completed');
    
    const handlers = this.eventHandlers.get('completed') ?? [];
    handlers.forEach(handler => handler(execution));
  }

  async fail(executionId: string, error: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    execution.status = WorkflowStatus.FAILED;
    execution.error = error;
    execution.completedAt = new Date().toISOString();

    logger.error({ executionId, error }, 'Workflow failed');
    
    const handlers = this.eventHandlers.get('failed') ?? [];
    handlers.forEach(handler => handler(execution));
  }

  async cancel(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    if (execution.status === WorkflowStatus.RUNNING || execution.status === WorkflowStatus.WAITING) {
      execution.status = WorkflowStatus.CANCELLED;
      execution.completedAt = new Date().toISOString();
      
      logger.info({ executionId }, 'Workflow cancelled');
    }
  }

  async suspend(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution || execution.status !== WorkflowStatus.RUNNING) return;
    
    execution.status = WorkflowStatus.SUSPENDED;
    logger.info({ executionId }, 'Workflow suspended');
  }

  async resume(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution || execution.status !== WorkflowStatus.SUSPENDED) return;
    
    execution.status = WorkflowStatus.RUNNING;
    await this.executeNextStep(execution);
  }

  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  getByWorkflow(workflowId: string): WorkflowExecution[] {
    return Array.from(this.executions.values()).filter(e => e.workflowId === workflowId);
  }

  getRunning(): WorkflowExecution[] {
    return Array.from(this.executions.values()).filter(
      e => e.status === WorkflowStatus.RUNNING || e.status === WorkflowStatus.WAITING
    );
  }

  onEvent(event: string, handler: (execution: WorkflowExecution) => void): () => void {
    const handlers = this.eventHandlers.get(event) ?? [];
    handlers.push(handler);
    this.eventHandlers.set(event, handlers);

    return () => {
      const h = this.eventHandlers.get(event);
      if (h) {
        const index = h.indexOf(handler);
        if (index >= 0) h.splice(index, 1);
      }
    };
  }

  getStats(): {
    totalWorkflows: number;
    activeExecutions: number;
    completedToday: number;
    failedToday: number;
    byWorkflow: Record<string, { active: number; completed: number; failed: number }>;
  } {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    
    let active = 0, completedToday = 0, failedToday = 0;
    const byWorkflow: Record<string, { active: number; completed: number; failed: number }> = {};

    for (const execution of this.executions.values()) {
      const wfStats = byWorkflow[execution.workflowId] ?? { active: 0, completed: 0, failed: 0 };
      
      if (execution.status === WorkflowStatus.RUNNING || execution.status === WorkflowStatus.WAITING) {
        active++;
        wfStats.active++;
      }
      
      if (execution.completedAt && execution.completedAt >= todayStart) {
        if (execution.status === WorkflowStatus.COMPLETED) {
          completedToday++;
          wfStats.completed++;
        }
        if (execution.status === WorkflowStatus.FAILED) {
          failedToday++;
          wfStats.failed++;
        }
      }
      
      byWorkflow[execution.workflowId] = wfStats;
    }

    return {
      totalWorkflows: this.workflows.size,
      activeExecutions: active,
      completedToday,
      failedToday,
      byWorkflow,
    };
  }
}

export const workflowService = new WorkflowService();

if (require.main === module) {
  (async () => {
    await workflowService.initialize();
    logger.info('Workflow service running');
  })();
}