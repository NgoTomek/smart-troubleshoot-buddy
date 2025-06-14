
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateWorkflowAnalytics } from '@/lib/analytics';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';
import { getInitialWorkflowSteps } from '@/config/workflowConfig';
import { useWorkflowValidation } from './useWorkflowValidation';
import { useWorkflowTimers } from './useWorkflowTimers';

export type { WorkflowStep, WorkflowAnalytics };

export const useAdvancedWorkflowState = (initialStep: string = 'analyze') => {
  const { toast } = useToast();
  const [activeStepId, setActiveStepId] = useState(initialStep);
  const [viewedStepId, setViewedStepId] = useState(initialStep);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(getInitialWorkflowSteps(initialStep));
  
  const { validationErrors, validateStep } = useWorkflowValidation(workflowSteps);
  const { stepDurations, startStepTimer, endStepTimer } = useWorkflowTimers();

  useEffect(() => {
    startStepTimer(initialStep);
  }, [initialStep, startStepTimer]);

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
    if (activeStepId !== stepId && !canAdvanceToStep(stepId)) {
      toast({
        title: "Cannot Advance",
        description: "Please complete the required previous steps first.",
        variant: "destructive",
        duration: 4000,
      });
      return false;
    }

    // Validate current step before advancing
    if (!skipValidation && activeStepId !== stepId) {
      const isValid = await validateStep(activeStepId);
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
    endStepTimer(activeStepId);

    // Update step statuses
    setWorkflowSteps(prev => prev.map(s => {
      if (s.id === activeStepId) {
        return { ...s, status: 'completed' as const };
      }
      if (s.id === stepId && activeStepId !== stepId) {
        return { ...s, status: 'active' as const };
      }
      return s;
    }));

    if (activeStepId !== stepId) {
      setActiveStepId(stepId);
      setViewedStepId(stepId);
      startStepTimer(stepId);

      toast({
        title: "Step Activated",
        description: `Now working on: ${step.title}`,
        duration: 3000,
      });
    } else {
       toast({
        title: "Workflow Complete!",
        description: "You have completed all the steps.",
        duration: 4000
      });
    }

    return true;
  }, [activeStepId, workflowSteps, canAdvanceToStep, validateStep, toast, endStepTimer, startStepTimer]);

  const navigateToStep = useCallback((stepId: string) => {
    const stepToNavigate = workflowSteps.find(s => s.id === stepId);
    if (stepToNavigate && (stepToNavigate.status !== 'pending' || canAdvanceToStep(stepId))) {
      setViewedStepId(stepId);
    } else {
        toast({
            title: "Cannot Navigate",
            description: "Previous steps must be completed first.",
            variant: "destructive",
            duration: 3000,
        });
    }
  }, [workflowSteps, canAdvanceToStep, toast]);

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
    activeStepId,
    viewedStepId,
    validationErrors,
    stepDurations,
    advanceToStep,
    skipStep,
    markStepFailed,
    validateStep,
    canAdvanceToStep,
    getAnalytics,
    navigateToStep,
  };
};
