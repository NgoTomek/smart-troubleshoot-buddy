
export interface WorkflowValidationRule {
  id: string;
  description: string;
  validator: () => boolean | Promise<boolean>;
  errorMessage: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'skipped' | 'failed';
  estimatedTime: string;
  optional: boolean;
  requirements?: string[];
  validationRules?: WorkflowValidationRule[];
  category: 'analysis' | 'solution' | 'execution' | 'collaboration' | 'feedback';
}

export interface WorkflowAnalytics {
  totalSteps: number;
  completedSteps: number;
  skippedSteps: number;
  failedSteps: number;
  progressPercent: number;
  estimatedTimeRemaining: string;
  averageStepTime: number;
  bottleneckSteps: string[];
}
