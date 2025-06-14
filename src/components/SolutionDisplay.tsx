
import React from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionList } from '@/components/SolutionList';
import { ProgressSummary } from '@/components/ProgressSummary';
import { SolutionInsights } from '@/components/SolutionInsights';
import { QuickActions } from '@/components/QuickActions';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { SessionExport } from '@/components/SessionExport';
import { SolutionCategories } from '@/components/SolutionCategories';
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
  // Create problem context from extracted text and additional context
  const problemContext = contextData?.additionalContext 
    ? `${extractedText} - ${contextData.additionalContext}`
    : extractedText;

  const {
    quickFeedback,
    completedSteps,
    showDetailedFeedback,
    submittedFeedback,
    handleQuickFeedback,
    toggleDetailedFeedback,
    handleFeedbackSubmitted,
    toggleStep
  } = useSolutionState(solutions, problemContext);

  return (
    <div className="space-y-6">
      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

      <AnalysisDashboard 
        solutions={solutions}
        extractedText={extractedText}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SolutionInsights 
          solutions={solutions}
          completedSteps={completedSteps}
          quickFeedback={quickFeedback}
        />
        
        <SolutionCategories solutions={solutions} />
      </div>

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
        problemContext={problemContext}
      />

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
    </div>
  );
};
