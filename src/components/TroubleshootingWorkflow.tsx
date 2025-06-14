import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Target, Brain } from 'lucide-react';
import { useAdvancedWorkflowState } from '@/hooks/useAdvancedWorkflowState';
import { useWorkflowTabsState } from '@/hooks/useWorkflowTabsState';
import { WorkflowBreadcrumbNav } from '@/components/WorkflowBreadcrumbNav';
import { generateWorkflowMetrics } from '@/lib/analytics';
import { WorkflowTabs } from './WorkflowTabs';

interface TroubleshootingWorkflowProps {
  currentStep: string;
  onStepChange: (stepId: string) => void;
  problemContext: string;
}

export const TroubleshootingWorkflow = ({ 
  currentStep, 
  onStepChange, 
  problemContext 
}: TroubleshootingWorkflowProps) => {
  const {
    workflowSteps,
    validationErrors,
    advanceToStep,
    skipStep,
    validateStep,
    getAnalytics
  } = useAdvancedWorkflowState(currentStep);

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

  const handleStepAdvance = async (stepId: string) => {
    const success = await advanceToStep(stepId);
    if (success) {
      onStepChange(stepId);
      
      const step = workflowSteps.find(s => s.id === stepId);
      if (step) {
        addHistoryEntry({
          stepId,
          stepTitle: step.title,
          status: 'completed',
          duration: 30000 // Mock duration
        });
      }
    }
    return success;
  };

  const handleStepSkip = (stepId: string) => {
    const success = skipStep(stepId);
    if (success) {
      const currentIndex = workflowSteps.findIndex(s => s.id === stepId);
      const nextStep = workflowSteps.find((step, index) => 
        index > currentIndex && step.status === 'pending'
      );
      if (nextStep) {
        onStepChange(nextStep.id);
      }
    }
    return success;
  };

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
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-3">
              Need help with any step? Our AI assistant provides contextual guidance.
            </p>
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('ai-assistance')}>
              <Brain className="w-4 h-4 mr-2" />
              Get AI Assistance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
