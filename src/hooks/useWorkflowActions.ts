
import { useCallback } from 'react';
import { WorkflowStep } from '@/hooks/useAdvancedWorkflowState';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';

export const useWorkflowActions = ({
  advanceToStep,
  skipStep,
  addHistoryEntry,
  workflowSteps,
}: {
  advanceToStep: (stepId: string) => Promise<boolean>;
  skipStep: (stepId: string) => boolean;
  addHistoryEntry: (entry: Omit<HistoryEntry, 'timestamp'>) => void;
  workflowSteps: WorkflowStep[];
}) => {
  const handleStepAdvance = useCallback(async (stepId: string) => {
    const success = await advanceToStep(stepId);
    if (success) {
      
      const step = workflowSteps.find(s => s.id === stepId);
      if (step) {
        addHistoryEntry({
          stepId,
          stepTitle: step.title,
          status: 'completed',
          duration: 30000 // Mock duration
        });
      }
    }
    return success;
  }, [advanceToStep, addHistoryEntry, workflowSteps]);

  const handleStepSkip = useCallback((stepId: string) => {
    const success = skipStep(stepId);
    if (success) {
      const currentIndex = workflowSteps.findIndex(s => s.id === stepId);
      const nextStep = workflowSteps.find((step, index) => 
        index > currentIndex && step.status === 'pending'
      );
      if (nextStep) {
        advanceToStep(nextStep.id);
      }
    }
    return success;
  }, [skipStep, workflowSteps, advanceToStep]);

  return { handleStepAdvance, handleStepSkip };
};
