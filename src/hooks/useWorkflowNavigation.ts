
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WorkflowStep } from '@/types/workflow';

export const useWorkflowNavigation = (
  workflowSteps: WorkflowStep[],
  canAdvanceToStep: (stepId: string) => boolean
) => {
  const { toast } = useToast();

  const navigateToStep = useCallback((stepId: string) => {
    const stepToNavigate = workflowSteps.find(s => s.id === stepId);
    if (stepToNavigate && (stepToNavigate.status !== 'pending' || canAdvanceToStep(stepId))) {
      return true;
    } else {
      toast({
        title: "Cannot Navigate",
        description: "Previous steps must be completed first.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  }, [workflowSteps, canAdvanceToStep, toast]);

  return { navigateToStep };
};
