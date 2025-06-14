
import React from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionManager } from '@/components/SolutionManager';
import { QuickActions } from '@/components/QuickActions';
import { SolutionQualityAssessment } from '@/components/SolutionQualityAssessment';
import { SolutionMetrics } from '@/components/SolutionMetrics';
import { useSolutionState } from '@/hooks/useSolutionState';
import { SmartDiagnostics } from './SmartDiagnostics';
import { Solution } from '@/types/solution';

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

  const handleDiagnosticComplete = (results: any) => {
    console.log('Diagnostic results:', results);
  };

  return (
    <div className="space-y-6">
      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

      {/* Solution Metrics Overview */}
      <SolutionMetrics solutions={solutions} completedSteps={completedSteps} />

      {/* Smart Diagnostics - Main Diagnostic Feature */}
      <SmartDiagnostics
        problemText={extractedText}
        contextData={contextData}
        onDiagnosticComplete={handleDiagnosticComplete}
      />

      {/* Quality Assessment */}
      <SolutionQualityAssessment
        solutions={solutions}
        userFeedback={quickFeedback}
        completedSteps={completedSteps}
      />

      {/* Quick Actions for Common Fixes */}
      <QuickActions />

      {/* Main Solution Manager */}
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
    </div>
  );
};
