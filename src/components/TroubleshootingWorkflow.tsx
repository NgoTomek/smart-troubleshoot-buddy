import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Brain, History, Lightbulb, Bell, Settings, Share2, BarChart3 } from 'lucide-react';
import { useAdvancedWorkflowState } from '@/hooks/useAdvancedWorkflowState';
import { WorkflowProgressTracker } from '@/components/WorkflowProgressTracker';
import { WorkflowStepValidator } from '@/components/WorkflowStepValidator';
import { WorkflowStepTimer } from '@/components/WorkflowStepTimer';
import { WorkflowBreadcrumbNav } from '@/components/WorkflowBreadcrumbNav';
import { WorkflowQuickActions } from '@/components/WorkflowQuickActions';
import { WorkflowStepHistory } from '@/components/WorkflowStepHistory';
import { WorkflowInsights } from '@/components/WorkflowInsights';
import { WorkflowNotifications } from '@/components/WorkflowNotifications';
import { WorkflowPreferences } from '@/components/WorkflowPreferences';
import { WorkflowTemplateManager } from '@/components/WorkflowTemplateManager';
import { WorkflowStateSync } from '@/components/WorkflowStateSync';
import { WorkflowExportImport } from '@/components/WorkflowExportImport';
import { WorkflowMetricsVisualization } from '@/components/WorkflowMetricsVisualization';

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

  // New state for additional features
  const [stepHistory, setStepHistory] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([
    {
      id: '1',
      type: 'tip',
      title: 'Consider automation',
      description: 'This step could be automated for faster completion',
      actionable: true,
      priority: 'medium'
    }
  ]);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: '1',
      type: 'info',
      title: 'Step completed',
      message: 'Analysis step completed successfully',
      timestamp: new Date(),
      actionable: false,
      autoHide: true
    }
  ]);
  const [preferences, setPreferences] = useState<any[]>([
    {
      id: 'auto_advance',
      category: 'automation',
      label: 'Auto-advance steps',
      description: 'Automatically move to next step when current step is completed',
      type: 'boolean',
      value: false
    },
    {
      id: 'notification_sound',
      category: 'notifications',
      label: 'Sound notifications',
      description: 'Play sound when notifications appear',
      type: 'boolean',
      value: true
    }
  ]);

  // New state for enhanced features
  const [isCollaborationEnabled, setIsCollaborationEnabled] = useState(false);
  const [metricsTimeRange, setMetricsTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const analytics = getAnalytics();

  const handleStepAdvance = async (stepId: string) => {
    const success = await advanceToStep(stepId);
    if (success) {
      onStepChange(stepId);
      
      // Add to history
      const step = workflowSteps.find(s => s.id === stepId);
      if (step) {
        setStepHistory(prev => [...prev, {
          stepId,
          stepTitle: step.title,
          status: 'completed',
          timestamp: new Date(),
          duration: 30000 // Mock duration
        }]);
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

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    if (action === 'enable-collaboration') {
      setIsCollaborationEnabled(true);
    }
    setNotifications(prev => [...prev, {
      id: Date.now().toString(),
      type: 'info',
      title: 'Action executed',
      message: `Quick action "${action}" has been executed`,
      timestamp: new Date(),
      actionable: false,
      autoHide: true
    }]);
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handlePreferenceChange = (id: string, value: any) => {
    setPreferences(prev => prev.map(p => 
      p.id === id ? { ...p, value } : p
    ));
  };

  // New handlers for enhanced features
  const handleLoadTemplate = (template: any) => {
    console.log('Loading template:', template);
    handleQuickAction('template-loaded');
  };

  const handleSaveAsTemplate = (name: string, description: string) => {
    console.log('Saving template:', { name, description, workflow: workflowSteps });
    handleQuickAction('template-saved');
  };

  const handleImportWorkflow = (workflow: any) => {
    console.log('Importing workflow:', workflow);
    handleQuickAction('workflow-imported');
  };

  const handleImportProgress = (progress: any) => {
    console.log('Importing progress:', progress);
  };

  const handleSyncStateChange = (isConnected: boolean) => {
    console.log('Sync state changed:', isConnected);
  };

  const handleConflictResolution = (conflicts: any[]) => {
    console.log('Resolving conflicts:', conflicts);
  };

  const mockMetrics = {
    stepCompletionTimes: [],
    successRates: [],
    collaborationData: [],
    performanceTrends: []
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
          <Tabs defaultValue="workflow" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="notifications">Updates</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="collaboration">Sync</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workflow" className="space-y-4">
              {/* Progress Tracker */}
              <WorkflowProgressTracker 
                analytics={analytics}
                currentStep={currentStep}
              />
              
              {/* Quick Actions */}
              <WorkflowQuickActions
                currentStepId={currentStep}
                canSkipCurrentStep={workflowSteps.find(s => s.id === currentStep)?.optional || false}
                canMarkComplete={true}
                onSkipStep={() => handleStepSkip(currentStep)}
                onMarkComplete={() => handleStepAdvance(currentStep)}
                onRestart={() => onStepChange('analyze')}
                onGetHelp={() => handleQuickAction('get-help')}
                onShareWorkflow={() => handleQuickAction('share')}
                onExportProgress={() => handleQuickAction('export')}
                onViewDocumentation={() => handleQuickAction('docs')}
              />
              
              {/* Workflow Steps */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-800">Workflow Steps</h3>
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="space-y-2">
                    <WorkflowStepValidator
                      step={step}
                      validationErrors={validationErrors[step.id]}
                      onValidate={validateStep}
                      onAdvance={handleStepAdvance}
                      onSkip={step.optional ? handleStepSkip : undefined}
                    />
                    
                    {step.status === 'active' && (
                      <WorkflowStepTimer
                        stepId={step.id}
                        stepTitle={step.title}
                        isActive={true}
                        onTimeUpdate={(stepId, time) => console.log('Time update:', stepId, time)}
                      />
                    )}
                    
                    {index < workflowSteps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-px h-4 bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <WorkflowInsights
                insights={insights}
                currentStepId={currentStep}
                progressPercent={analytics.progressPercent}
                averageStepTime={analytics.averageStepTime}
                onApplyInsight={(id) => console.log('Apply insight:', id)}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <WorkflowStepHistory
                history={stepHistory}
                onRevisitStep={onStepChange}
                onClearHistory={() => setStepHistory([])}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <WorkflowNotifications
                notifications={notifications}
                onDismiss={handleNotificationDismiss}
                onDismissAll={() => setNotifications([])}
              />
            </TabsContent>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WorkflowTemplateManager
                  currentWorkflow={workflowSteps}
                  onLoadTemplate={handleLoadTemplate}
                  onSaveAsTemplate={handleSaveAsTemplate}
                />
                
                <WorkflowExportImport
                  currentWorkflow={workflowSteps}
                  currentProgress={analytics}
                  onImportWorkflow={handleImportWorkflow}
                  onImportProgress={handleImportProgress}
                />
              </div>
            </TabsContent>

            <TabsContent value="collaboration">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WorkflowStateSync
                  isCollaborationEnabled={isCollaborationEnabled}
                  currentStepId={currentStep}
                  onSyncStateChange={handleSyncStateChange}
                  onConflictResolution={handleConflictResolution}
                />
                
                <WorkflowPreferences
                  preferences={preferences}
                  onPreferenceChange={handlePreferenceChange}
                  onSavePreferences={() => console.log('Save preferences')}
                  onResetToDefaults={() => console.log('Reset preferences')}
                  hasUnsavedChanges={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <WorkflowMetricsVisualization
                metrics={mockMetrics}
                timeRange={metricsTimeRange}
                onTimeRangeChange={setMetricsTimeRange}
              />
            </TabsContent>
          </Tabs>
          
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
