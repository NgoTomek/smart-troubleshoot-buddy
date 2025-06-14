
import React from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionManager } from '@/components/SolutionManager';
import { ProgressSummary } from '@/components/ProgressSummary';
import { SolutionInsights } from '@/components/SolutionInsights';
import { QuickActions } from '@/components/QuickActions';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { SessionExport } from '@/components/SessionExport';
import { SolutionCategories } from '@/components/SolutionCategories';
import { SolutionRecommendationEngine } from '@/components/SolutionRecommendationEngine';
import { SmartDiagnostics } from '@/components/SmartDiagnostics';
import { CommunitySolutions } from '@/components/CommunitySolutions';
import { SolutionEffectivenessTracker } from '@/components/SolutionEffectivenessTracker';
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

  const handleRecommendationUpdate = (recommendations: any[]) => {
    console.log('Updated recommendations:', recommendations);
  };

  const handleDiagnosticComplete = (results: any) => {
    console.log('Diagnostic results:', results);
  };

  const handleCommunitySolutionSelect = (solution: any) => {
    console.log('Selected community solution:', solution);
  };

  const handleEffectivenessUpdate = (data: any[]) => {
    console.log('Effectiveness data updated:', data);
  };

  return (
    <div className="space-y-6">
      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisDashboard 
          solutions={solutions}
          extractedText={extractedText}
        />
        
        <SmartDiagnostics
          problemText={extractedText}
          contextData={contextData}
          onDiagnosticComplete={handleDiagnosticComplete}
        />
      </div>

      <SolutionRecommendationEngine
        currentProblem={problemContext}
        onRecommendationUpdate={handleRecommendationUpdate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SolutionInsights 
          solutions={solutions}
          completedSteps={completedSteps}
          quickFeedback={quickFeedback}
        />
        
        <SolutionCategories solutions={solutions} />
      </div>

      <CommunitySolutions
        problemCategory={solutions[0]?.category || 'General'}
        onSolutionSelect={handleCommunitySolutionSelect}
      />

      <QuickActions />

      <SolutionManager
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

      <SolutionEffectivenessTracker
        solutions={solutions}
        onEffectivenessUpdate={handleEffectivenessUpdate}
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
