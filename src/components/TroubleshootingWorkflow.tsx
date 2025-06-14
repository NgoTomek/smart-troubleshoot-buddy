import React, { useState } from 'react';
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
import { WorkflowOnboarding } from './WorkflowOnboarding';
import { EnhancedStepIndicator } from './EnhancedStepIndicator';
import { WorkflowSearchFilter } from './WorkflowSearchFilter';
import { ContextualHelp } from './ContextualHelp';
import { EnhancedActionPanel } from './EnhancedActionPanel';

interface TroubleshootingWorkflowProps {
  workflowSteps: WorkflowStep[];
  currentStep: string;
  onNavigate: (stepId: string) => void;
  validationErrors: { [key: string]: string[] };
  advanceToStep: (stepId: string, skipValidation?: boolean) => Promise<boolean>;
  skipStep: (stepId: string) => boolean;
  validateStep: (stepId: string) => Promise<boolean>;
  getAnalytics: () => WorkflowAnalytics;
  stepDurations: { [key: string]: number };
}

export const TroubleshootingWorkflow = ({ 
  currentStep, 
  onNavigate, 
  workflowSteps,
  validationErrors,
  advanceToStep,
  skipStep,
  validateStep,
  getAnalytics,
  stepDurations,
}: TroubleshootingWorkflowProps) => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [filteredSteps, setFilteredSteps] = useState(workflowSteps);
  const [searchTerm, setSearchTerm] = useState('');
  const [helpStepId, setHelpStepId] = useState<string | null>(null);
  const [validationProgress, setValidationProgress] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [lastActionResult, setLastActionResult] = useState<'success' | 'error' | 'warning' | null>(null);

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

  const handleSaveTemplate = (name: string) => {
    handleSaveAsTemplate(name, '');
  };

  const handleStartWorkflow = () => {
    setShowOnboarding(false);
  };

  const handleValidateStep = async () => {
    setIsValidating(true);
    setValidationProgress(0);
    
    // Simulate validation progress
    const interval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 300);

    try {
      const result = await validateStep(currentStep);
      setLastActionResult(result ? 'success' : 'error');
    } catch (error) {
      setLastActionResult('error');
    } finally {
      setIsValidating(false);
      setTimeout(() => setLastActionResult(null), 5000);
    }
  };

  const handleAdvanceStep = async () => {
    try {
      const success = await handleStepAdvance(currentStep);
      setLastActionResult(success ? 'success' : 'error');
    } catch (error) {
      setLastActionResult('error');
    }
  };

  const currentStepData = workflowSteps.find(s => s.id === currentStep);
  const currentStepIndex = workflowSteps.findIndex(s => s.id === currentStep);

  if (showOnboarding) {
    return (
      <WorkflowOnboarding 
        onStart={handleStartWorkflow}
        onDismiss={() => setShowOnboarding(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Smart Troubleshooting Workflow</span>
            </div>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
              {analytics.progressPercent}% Complete
            </Badge>
          </CardTitle>
          <p className="text-sm text-indigo-700">
            AI-powered step-by-step troubleshooting with intelligent validation and insights.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <WorkflowBreadcrumbNav
            steps={workflowSteps}
            currentStepId={currentStep}
            onStepClick={onNavigate}
            onPrevious={() => {
              const currentIndex = workflowSteps.findIndex(s => s.id === currentStep);
              if (currentIndex > 0) {
                onNavigate(workflowSteps[currentIndex - 1].id);
              }
            }}
            onNext={() => {
              const currentIndex = workflowSteps.findIndex(s => s.id === currentStep);
              if (currentIndex < workflowSteps.length - 1) {
                onNavigate(workflowSteps[currentIndex + 1].id);
              }
            }}
          />
          
          <Separator />

          {/* Search and Filter */}
          <WorkflowSearchFilter
            steps={workflowSteps}
            onFilteredSteps={setFilteredSteps}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <Separator />

          {/* Enhanced Step Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center space-x-2">
                <span>Workflow Steps</span>
                <Badge variant="outline">{filteredSteps.length} of {workflowSteps.length}</Badge>
              </h3>
              
              <div className="space-y-3">
                {filteredSteps.map((step, index) => (
                  <EnhancedStepIndicator
                    key={step.id}
                    step={step}
                    isActive={step.id === currentStep}
                    isCompleted={step.status === 'completed'}
                    stepNumber={workflowSteps.findIndex(s => s.id === step.id) + 1}
                    totalSteps={workflowSteps.length}
                    onStepClick={() => onNavigate(step.id)}
                    onHelp={() => setHelpStepId(step.id)}
                    estimatedTime={step.estimatedTime}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Enhanced Action Panel */}
              <EnhancedActionPanel
                currentStepId={currentStep}
                currentStepTitle={currentStepData?.title || ''}
                canAdvance={currentStepData?.status === 'active'}
                canSkip={currentStepData?.optional || false}
                isValidating={isValidating}
                validationProgress={validationProgress}
                onAdvance={handleAdvanceStep}
                onSkip={() => handleStepSkip(currentStep)}
                onRestart={() => onNavigate('analyze')}
                onHelp={() => setHelpStepId(currentStep)}
                onValidate={handleValidateStep}
                estimatedTime={currentStepData?.estimatedTime}
                lastActionResult={lastActionResult}
              />

              {/* Contextual Help */}
              {helpStepId && (
                <div className="relative">
                  <ContextualHelp
                    stepId={helpStepId}
                    stepTitle={workflowSteps.find(s => s.id === helpStepId)?.title || ''}
                    onClose={() => setHelpStepId(null)}
                  />
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <WorkflowTabs
            analytics={analytics}
            currentStep={currentStep}
            workflowSteps={workflowSteps}
            validationErrors={validationErrors}
            handleStepSkip={handleStepSkip}
            handleStepAdvance={handleStepAdvance}
            onNavigate={onNavigate}
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
            onSaveAsTemplate={handleSaveTemplate}
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
          
          <AIAssistant onQuickAction={handleQuickAction} />
        </CardContent>
      </Card>
    </div>
  );
};
