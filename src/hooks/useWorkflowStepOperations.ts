
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WorkflowStep } from '@/types/workflow';

export const useWorkflowStepOperations = (
  workflowSteps: WorkflowStep[],
  setWorkflowSteps: (steps: WorkflowStep[] | ((prev: WorkflowStep[]) => WorkflowStep[])) => void
) => {
  const { toast } = useToast();

  const updateStepStatus = useCallback((stepId: string, status: WorkflowStep['status']) => {
    setWorkflowSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status } : s
    ));
  }, [setWorkflowSteps]);

  const canAdvanceToStep = useCallback((stepId: string): boolean => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step?.requirements) return true;

    return step.requirements.every(reqId => {
      const reqStep = workflowSteps.find(s => s.id === reqId);
      return reqStep?.status === 'completed';
    });
  }, [workflowSteps]);

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

    updateStepStatus(stepId, 'skipped');
    toast({
      title: "Step Skipped",
      description: `Skipped: ${step.title}`,
      duration: 2000,
    });

    return true;
  }, [workflowSteps, updateStepStatus, toast]);

  const markStepFailed = useCallback((stepId: string, reason?: string) => {
    updateStepStatus(stepId, 'failed');
    toast({
      title: "Step Failed",
      description: reason || "The step could not be completed.",
      variant: "destructive",
      duration: 4000,
    });
  }, [updateStepStatus, toast]);

  return {
    updateStepStatus,
    canAdvanceToStep,
    skipStep,
    markStepFailed,
  };
};
