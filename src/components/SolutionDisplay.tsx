
import React from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionManager } from '@/components/SolutionManager';
import { QuickActions } from '@/components/QuickActions';
import { SolutionQualityAssessment } from '@/components/SolutionQualityAssessment';
import { CollaborationNotifications } from '@/components/CollaborationNotifications';
import { SolutionMetrics } from '@/components/SolutionMetrics';
import { useSolutionState } from '@/hooks/useSolutionState';
import { WorkflowManager } from './WorkflowManager';
import { Solution } from '@/types/solution';
import { AnalyticsSection } from './AnalyticsSection';
import { DiagnosticAndCollaborationSection } from './DiagnosticAndCollaborationSection';
import { AdvancedSolutionsSection } from './AdvancedSolutionsSection';
import { SolutionOverviewSection } from './SolutionOverviewSection';
import { SessionSummarySection } from './SessionSummarySection';

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

  const [isCollaborationActive, setIsCollaborationActive] = React.useState(false);

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

  const handleInviteTeam = () => {
    setIsCollaborationActive(true);
    console.log('Inviting team members to collaboration session');
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Notifications - Fixed Position */}
      <CollaborationNotifications isCollaborationActive={isCollaborationActive} />

      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

      {/* Solution Metrics */}
      <SolutionMetrics solutions={solutions} completedSteps={completedSteps} />

      {/* Workflow and Quality Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkflowManager />
        
        <SolutionQualityAssessment
          solutions={solutions}
          userFeedback={quickFeedback}
          completedSteps={completedSteps}
        />
      </div>

      {/* Enhanced Analytics Row */}
      <AnalyticsSection
        solutions={solutions}
        extractedText={extractedText}
        problemContext={problemContext}
      />

      {/* Collaboration and Diagnostics */}
      <DiagnosticAndCollaborationSection
        problemContext={problemContext}
        problemText={extractedText}
        contextData={contextData}
        onInviteTeam={handleInviteTeam}
        onDiagnosticComplete={handleDiagnosticComplete}
      />

      <AdvancedSolutionsSection
        problemContext={problemContext}
        solutions={solutions}
        onRecommendationUpdate={handleRecommendationUpdate}
        onCommunitySolutionSelect={handleCommunitySolutionSelect}
        onEffectivenessUpdate={handleEffectivenessUpdate}
      />

      <SolutionOverviewSection
        solutions={solutions}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
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

      <SessionSummarySection
        solutions={solutions}
        extractedText={extractedText}
        contextData={contextData}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
        submittedFeedback={submittedFeedback}
      />
    </div>
  );
};
