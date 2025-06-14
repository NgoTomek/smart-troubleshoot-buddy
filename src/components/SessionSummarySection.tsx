
import React from 'react';
import { ProgressSummary } from '@/components/ProgressSummary';
import { SessionExport } from '@/components/SessionExport';
import { Solution } from '@/types/solution';

interface SessionSummarySectionProps {
  solutions: Solution[];
  extractedText: string;
  contextData: any;
  completedSteps: { [key:string]: boolean };
  quickFeedback: { [key:number]: 'helpful' | 'not-helpful' | null };
  submittedFeedback: { [key:number]: boolean };
}

export const SessionSummarySection = ({
  solutions,
  extractedText,
  contextData,
  completedSteps,
  quickFeedback,
  submittedFeedback,
}: SessionSummarySectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ProgressSummary
        completedSteps={completedSteps}
        solutionsCount={solutions.length}
        submittedFeedback={submittedFeedback}
      />
      
      <SessionExport
        solutions={solutions}
        extractedText={extractedText}
        contextData={contextData}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
      />
    </div>
  );
};
