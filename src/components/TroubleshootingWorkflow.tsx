import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Target } from 'lucide-react';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';
import { useWorkflowTabsState } from '@/hooks/useWorkflowTabsState';
import { WorkflowBreadcrumbNav } from '@/components/WorkflowBreadcrumbNav';
import { generateWorkflowMetrics } from '@/lib/analytics';
import { WorkflowTabs } from './WorkflowTabs';
import { AIAssistant } from './AIAssistant';
import { useWorkflowActions } from '@/hooks/useWorkflowActions';

interface TroubleshootingWorkflowProps {
  workflowSteps: WorkflowStep[];
  currentStep: string;
  onStepChange: (stepId: string) => void;
  validationErrors: { [key: string]: string[] };
  advanceToStep: (stepId: string, skipValidation?: boolean) => Promise<boolean>;
  skipStep: (stepId: string) => boolean;
  validateStep: (stepId: string) => Promise<boolean>;
  getAnalytics: () => WorkflowAnalytics;
  stepDurations: { [key: string]: number };
}

export const TroubleshootingWorkflow = ({ 
  currentStep, 
  onStepChange, 
  workflowSteps,
  validationErrors,
  advanceToStep,
  skipStep,
  validateStep,
  getAnalytics,
  stepDurations,
}: TroubleshootingWorkflowProps) => {

  const {
    stepHistory,
    insights,
    notifications,
    preferences,
    isCollaborationEnabled,
    metricsTimeRange,
    setMetricsTimeRange,
    addHistoryEntry,
    handleClearHistory,
    handleNotificationDismiss,
    handleNotificationsDismissAll,
    handlePreferenceChange,
    handleApplyInsight,
    handleQuickAction,
    handleLoadTemplate,
    handleSaveAsTemplate,
    handleImportWorkflow,
    handleImportProgress,
    handleSyncStateChange,
    handleConflictResolution,
  } = useWorkflowTabsState(workflowSteps);

  const analytics = getAnalytics();
  const metrics = generateWorkflowMetrics(stepHistory, workflowSteps, metricsTimeRange);

  const { handleStepAdvance, handleStepSkip } = useWorkflowActions({
    advanceToStep,
    skipStep,
    addHistoryEntry,
    workflowSteps,
    stepDurations,
  });

  return (
    <div className="space-y-6">
      {/* Main Workflow Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Advanced Troubleshooting Workflow</span>
            </div>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
              {analytics.progressPercent}% Complete
            </Badge>
          </CardTitle>
          <p className="text-sm text-indigo-700">
            Follow this intelligent workflow to systematically resolve your issue with validation and insights.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Enhanced Navigation */}
          <WorkflowBreadcrumbNav
            steps={workflowSteps}
            currentStepId={currentStep}
            onStepClick={onStepChange}
            onPrevious={() => {
              const currentIndex = workflowSteps.findIndex(s => s.id === currentStep);
              if (currentIndex > 0) {
                onStepChange(workflowSteps[currentIndex - 1].id);
              }
            }}
            onNext={() => {
              const currentIndex = workflowSteps.findIndex(s => s.id === currentStep);
              if (currentIndex < workflowSteps.length - 1) {
                onStepChange(workflowSteps[currentIndex + 1].id);
              }
            }}
          />
          
          <Separator />
          
          {/* Enhanced Tabbed Interface */}
          <WorkflowTabs
            analytics={analytics}
            currentStep={currentStep}
            workflowSteps={workflowSteps}
            validationErrors={validationErrors}
            handleStepSkip={handleStepSkip}
            handleStepAdvance={handleStepAdvance}
            onStepChange={onStepChange}
            handleQuickAction={handleQuickAction}
            validateStep={validateStep}
            insights={insights}
            onApplyInsight={handleApplyInsight}
            stepHistory={stepHistory}
            handleClearHistory={handleClearHistory}
            notifications={notifications}
            handleNotificationDismiss={handleNotificationDismiss}
            handleNotificationsDismissAll={handleNotificationsDismissAll}
            onLoadTemplate={handleLoadTemplate}
            onSaveAsTemplate={handleSaveAsTemplate}
            onImportWorkflow={handleImportWorkflow}
            onImportProgress={handleImportProgress}
            isCollaborationEnabled={isCollaborationEnabled}
            onSyncStateChange={handleSyncStateChange}
            onConflictResolution={handleConflictResolution}
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            metrics={metrics}
            metricsTimeRange={metricsTimeRange}
            setMetricsTimeRange={setMetricsTimeRange}
          />
          
          <Separator />
          
          {/* AI Assistant */}
          <AIAssistant onQuickAction={handleQuickAction} />
        </CardContent>
      </Card>
    </div>
  );
};
