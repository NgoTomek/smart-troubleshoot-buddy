
import React from 'react';
import { WorkflowStepHistory } from '@/components/WorkflowStepHistory';

export interface HistoryEntry {
  stepId: string;
  stepTitle: string;
  status: 'completed' | 'skipped' | 'failed';
  duration: number;
  timestamp: Date;
  notes?: string;
}

interface HistoryTabContentProps {
  history: HistoryEntry[];
  onRevisitStep: (stepId: string) => void;
  onClearHistory: () => void;
}

export const HistoryTabContent = ({
  history,
  onRevisitStep,
  onClearHistory,
}: HistoryTabContentProps) => {
  return (
    <WorkflowStepHistory
      history={history}
      onRevisitStep={onRevisitStep}
      onClearHistory={onClearHistory}
    />
  );
};
