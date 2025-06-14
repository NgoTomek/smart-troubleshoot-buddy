
import { useCallback } from 'react';
import { WorkflowStep } from '@/types/workflow';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';

export const useWorkflowActions = ({
  advanceToStep,
  skipStep,
  addHistoryEntry,
  workflowSteps,
  stepDurations,
}: {
  advanceToStep: (stepId: string, skipValidation?: boolean) => Promise<boolean>;
  skipStep: (stepId: string) => boolean;
  addHistoryEntry: (entry: Omit<HistoryEntry, 'timestamp'>) => void;
  workflowSteps: WorkflowStep[];
  stepDurations: { [key: string]: number };
}) => {
  const handleStepAdvance = useCallback(async (stepId: string) => {
    const currentIndex = workflowSteps.findIndex(s => s.id === stepId);
    const nextStep = workflowSteps.find((step, index) => 
      index > currentIndex && step.status === 'pending'
    );
    
    const targetStepId = nextStep ? nextStep.id : stepId;
    
    const success = await advanceToStep(targetStepId, !nextStep);
    if (success) {
      const step = workflowSteps.find(s => s.id === stepId);
      if (step) {
        addHistoryEntry({
          stepId,
          stepTitle: step.title,
          status: 'completed',
          duration: stepDurations[stepId] || 0
        });
      }
    }
    return success;
  }, [advanceToStep, addHistoryEntry, workflowSteps, stepDurations]);

  const handleStepSkip = useCallback((stepId: string) => {
    const success = skipStep(stepId);
    if (success) {
      const step = workflowSteps.find(s => s.id === stepId);
      if (step) {
          addHistoryEntry({
              stepId,
              stepTitle: step.title,
              status: 'skipped',
              duration: 0
          });
      }

      const currentIndex = workflowSteps.findIndex(s => s.id === stepId);
      const nextStep = workflowSteps.find((step, index) => 
        index > currentIndex && step.status === 'pending'
      );
      if (nextStep) {
        advanceToStep(nextStep.id);
      }
    }
    return success;
  }, [skipStep, workflowSteps, advanceToStep, addHistoryEntry]);

  return { handleStepAdvance, handleStepSkip };
};
