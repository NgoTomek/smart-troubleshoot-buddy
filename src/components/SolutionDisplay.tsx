
import React from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionList } from '@/components/SolutionList';
import { ProgressSummary } from '@/components/ProgressSummary';
import { SolutionInsights } from '@/components/SolutionInsights';
import { QuickActions } from '@/components/QuickActions';
import { useSolutionState } from '@/hooks/useSolutionState';

interface Solution {
  id: number;
  title: string;
  confidence: number;
  category: string;
  steps: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  successRate: number;
}

interface SolutionDisplayProps {
  solutions: Solution[];
  extractedText: string;
  contextData: any;
  onStartOver: () => void;
}

export const SolutionDisplay = ({ solutions, extractedText, contextData, onStartOver }: SolutionDisplayProps) => {
  const {
    quickFeedback,
    completedSteps,
    showDetailedFeedback,
    submittedFeedback,
    handleQuickFeedback,
    toggleDetailedFeedback,
    handleFeedbackSubmitted,
    toggleStep
  } = useSolutionState();

  return (
    <div className="space-y-6">
      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

      <SolutionInsights 
        solutions={solutions}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
      />

      <QuickActions />

      <SolutionList
        solutions={solutions}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
        showDetailedFeedback={showDetailedFeedback}
        submittedFeedback={submittedFeedback}
        onToggleStep={toggleStep}
        onQuickFeedback={handleQuickFeedback}
        onToggleDetailedFeedback={toggleDetailedFeedback}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />

      <ProgressSummary
        completedSteps={completedSteps}
        solutionsCount={solutions.length}
        submittedFeedback={submittedFeedback}
      />
    </div>
  );
};
