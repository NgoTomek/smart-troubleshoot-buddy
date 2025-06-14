
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
import { CollaborationPanel } from '@/components/CollaborationPanel';
import { AIInsightsEngine } from '@/components/AIInsightsEngine';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { TroubleshootingWorkflow } from '@/components/TroubleshootingWorkflow';
import { SolutionQualityAssessment } from '@/components/SolutionQualityAssessment';
import { CollaborationNotifications } from '@/components/CollaborationNotifications';
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

  const [currentWorkflowStep, setCurrentWorkflowStep] = React.useState('solutions');
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

  const handleWorkflowStepChange = (stepId: string) => {
    setCurrentWorkflowStep(stepId);
    console.log('Workflow step changed to:', stepId);
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

      {/* Workflow and Quality Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TroubleshootingWorkflow
          currentStep={currentWorkflowStep}
          onStepChange={handleWorkflowStepChange}
          problemContext={problemContext}
        />
        
        <SolutionQualityAssessment
          solutions={solutions}
          userFeedback={quickFeedback}
          completedSteps={completedSteps}
        />
      </div>

      {/* Enhanced Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalysisDashboard 
          solutions={solutions}
          extractedText={extractedText}
        />
        
        <AIInsightsEngine
          problemContext={problemContext}
          solutions={solutions}
        />

        <PerformanceMonitor />
      </div>

      {/* Collaboration and Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CollaborationPanel
          problemContext={problemContext}
          onInviteTeam={handleInviteTeam}
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
