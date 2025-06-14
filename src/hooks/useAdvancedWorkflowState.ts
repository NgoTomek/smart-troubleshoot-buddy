import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateWorkflowAnalytics } from '@/lib/analytics';

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

export interface WorkflowValidationRule {
  id: string;
  description: string;
  validator: () => boolean | Promise<boolean>;
  errorMessage: string;
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

export const useAdvancedWorkflowState = (initialStep: string = 'analyze') => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepStartTime, setStepStartTime] = useState<{ [key: string]: number }>({});
  const [stepDurations, setStepDurations] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'analyze',
      title: 'Problem Analysis',
      description: 'AI analyzes your issue and generates tailored solutions',
      status: initialStep === 'analyze' ? 'active' : 'completed',
      estimatedTime: '30s',
      optional: false,
      category: 'analysis',
      validationRules: [
        {
          id: 'problem-description',
          description: 'Problem description must be provided',
          validator: () => true, // This would check if problem description exists
          errorMessage: 'Please provide a detailed problem description'
        }
      ]
    },
    {
      id: 'solutions',
      title: 'Review Solutions',
      description: 'Examine AI-generated solutions and community recommendations',
      status: initialStep === 'solutions' ? 'active' : initialStep === 'analyze' ? 'pending' : 'completed',
      estimatedTime: '2-5 min',
      optional: false,
      category: 'solution',
      requirements: ['analyze'],
      validationRules: [
        {
          id: 'solutions-available',
          description: 'At least one solution must be available',
          validator: () => true, // This would check if solutions exist
          errorMessage: 'No solutions available. Please run analysis first.'
        }
      ]
    },
    {
      id: 'execute',
      title: 'Execute Steps',
      description: 'Follow step-by-step instructions to resolve your issue',
      status: initialStep === 'execute' ? 'active' : ['analyze', 'solutions'].includes(initialStep) ? 'pending' : 'completed',
      estimatedTime: '5-15 min',
      optional: false,
      category: 'execution',
      requirements: ['analyze', 'solutions'],
      validationRules: [
        {
          id: 'solution-selected',
          description: 'A solution must be selected for execution',
          validator: () => true, // This would check if a solution is selected
          errorMessage: 'Please select a solution to execute'
        }
      ]
    },
    {
      id: 'collaborate',
      title: 'Team Collaboration',
      description: 'Share with team members and get additional input',
      status: initialStep === 'collaborate' ? 'active' : 'pending',
      estimatedTime: '2-10 min',
      optional: true,
      category: 'collaboration'
    },
    {
      id: 'feedback',
      title: 'Provide Feedback',
      description: 'Rate solutions and help improve the AI recommendations',
      status: initialStep === 'feedback' ? 'active' : 'pending',
      estimatedTime: '1-2 min',
      optional: false,
      category: 'feedback',
      requirements: ['execute']
    }
  ]);

  const validateStep = useCallback(async (stepId: string): Promise<boolean> => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step?.validationRules) return true;

    const errors: string[] = [];
    
    for (const rule of step.validationRules) {
      try {
        const isValid = await rule.validator();
        if (!isValid) {
          errors.push(rule.errorMessage);
        }
      } catch (error) {
        errors.push(`Validation error: ${error}`);
      }
    }

    setValidationErrors(prev => ({ ...prev, [stepId]: errors }));
    return errors.length === 0;
  }, [workflowSteps]);

  const canAdvanceToStep = useCallback((stepId: string): boolean => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step?.requirements) return true;

    return step.requirements.every(reqId => {
      const reqStep = workflowSteps.find(s => s.id === reqId);
      return reqStep?.status === 'completed';
    });
  }, [workflowSteps]);

  const advanceToStep = useCallback(async (stepId: string, skipValidation = false) => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step) return false;

    // Check requirements
    if (!canAdvanceToStep(stepId)) {
      toast({
        title: "Cannot Advance",
        description: "Please complete the required previous steps first.",
        variant: "destructive",
        duration: 4000,
      });
      return false;
    }

    // Validate current step before advancing
    if (!skipValidation && currentStep !== stepId) {
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        toast({
          title: "Validation Failed",
          description: "Please fix the validation errors before proceeding.",
          variant: "destructive",
          duration: 4000,
        });
        return false;
      }
    }

    // Record step completion time
    if (stepStartTime[currentStep]) {
      const duration = Date.now() - stepStartTime[currentStep];
      setStepDurations(prev => ({ ...prev, [currentStep]: duration }));
    }

    // Update step statuses
    setWorkflowSteps(prev => prev.map(s => {
      if (s.id === currentStep && s.id !== stepId) {
        return { ...s, status: 'completed' as const };
      }
      if (s.id === stepId) {
        return { ...s, status: 'active' as const };
      }
      return s;
    }));

    setCurrentStep(stepId);
    setStepStartTime(prev => ({ ...prev, [stepId]: Date.now() }));

    toast({
      title: "Step Activated",
      description: `Now working on: ${step.title}`,
      duration: 3000,
    });

    return true;
  }, [currentStep, workflowSteps, canAdvanceToStep, validateStep, stepStartTime, toast]);

  const skipStep = useCallback((stepId: string) => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step?.optional) {
      toast({
        title: "Cannot Skip",
        description: "This step is required and cannot be skipped.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }

    setWorkflowSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status: 'skipped' as const } : s
    ));

    toast({
      title: "Step Skipped",
      description: `Skipped: ${step.title}`,
      duration: 2000,
    });

    return true;
  }, [workflowSteps, toast]);

  const markStepFailed = useCallback((stepId: string, reason?: string) => {
    setWorkflowSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status: 'failed' as const } : s
    ));

    toast({
      title: "Step Failed",
      description: reason || "The step could not be completed.",
      variant: "destructive",
      duration: 4000,
    });
  }, [toast]);

  const getAnalytics = useCallback((): WorkflowAnalytics => {
    return generateWorkflowAnalytics(workflowSteps, stepDurations);
  }, [workflowSteps, stepDurations]);

  return {
    workflowSteps,
    currentStep,
    validationErrors,
    stepDurations,
    advanceToStep,
    skipStep,
    markStepFailed,
    validateStep,
    canAdvanceToStep,
    getAnalytics
  };
};
