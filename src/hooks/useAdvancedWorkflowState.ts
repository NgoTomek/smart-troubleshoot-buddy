
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateWorkflowAnalytics } from '@/lib/analytics';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';
import { getInitialWorkflowSteps } from '@/config/workflowConfig';
import { useWorkflowValidationSimple } from './useWorkflowValidationSimple';
import { useWorkflowTimers } from './useWorkflowTimers';
import { useWorkflowNavigation } from './useWorkflowNavigation';
import { useWorkflowStepOperations } from './useWorkflowStepOperations';

export type { WorkflowStep, WorkflowAnalytics };

export const useAdvancedWorkflowState = (initialStep: string = 'analyze') => {
  const { toast } = useToast();
  const [activeStepId, setActiveStepId] = useState(initialStep);
  const [viewedStepId, setViewedStepId] = useState(initialStep);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(getInitialWorkflowSteps(initialStep));
  
  const { validationErrors, validateStep } = useWorkflowValidationSimple();
  const { stepDurations, startStepTimer, endStepTimer } = useWorkflowTimers();
  const { updateStepStatus, canAdvanceToStep, skipStep, markStepFailed } = useWorkflowStepOperations(workflowSteps, setWorkflowSteps);

  const { navigateToStep: canNavigateToStep } = useWorkflowNavigation(workflowSteps, canAdvanceToStep);

  const navigateToStep = useCallback((stepId: string) => {
    if (canNavigateToStep(stepId)) {
      setViewedStepId(stepId);
    }
  }, [canNavigateToStep]);

  useEffect(() => {
    startStepTimer(initialStep);
  }, [initialStep, startStepTimer]);

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
    if (activeStepId !== stepId) {
      updateStepStatus(activeStepId, 'completed');
      updateStepStatus(stepId, 'active');
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
  }, [activeStepId, workflowSteps, canAdvanceToStep, validateStep, toast, endStepTimer, startStepTimer, updateStepStatus]);

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
