import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateWorkflowAnalytics } from '@/lib/analytics';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';
import { getInitialWorkflowSteps } from '@/config/workflowConfig';

export const useAdvancedWorkflowState = (initialStep: string = 'analyze') => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepStartTime, setStepStartTime] = useState<{ [key: string]: number }>({});
  const [stepDurations, setStepDurations] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(getInitialWorkflowSteps(initialStep));

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
