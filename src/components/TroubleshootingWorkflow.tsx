import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Brain, History, Lightbulb, Bell, Settings, Share2, BarChart3 } from 'lucide-react';
import { useAdvancedWorkflowState, WorkflowStep } from '@/hooks/useAdvancedWorkflowState';
import { WorkflowBreadcrumbNav } from '@/components/WorkflowBreadcrumbNav';
import {
  AnalyticsTabContent,
  CollaborationTabContent,
  HistoryTabContent,
  InsightsTabContent,
  NotificationsTabContent,
  TemplatesTabContent,
  WorkflowTabContent
} from './workflow-tabs';
import { Insight } from './workflow-tabs/InsightsTabContent';
import { HistoryEntry } from './workflow-tabs/HistoryTabContent';
import { Notification } from './workflow-tabs/NotificationsTabContent';
import { Preference } from './workflow-tabs/CollaborationTabContent';

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
  const [stepHistory, setStepHistory] = useState<HistoryEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'tip',
      title: 'Consider automation',
      description: 'This step could be automated for faster completion',
      actionable: true,
      priority: 'medium'
    }
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([
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
  const [preferences, setPreferences] = useState<Preference[]>([
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
            
            <TabsContent value="workflow">
              <WorkflowTabContent
                analytics={analytics}
                currentStep={currentStep}
                workflowSteps={workflowSteps}
                validationErrors={validationErrors}
                handleStepSkip={handleStepSkip}
                handleStepAdvance={handleStepAdvance}
                onStepChange={onStepChange}
                handleQuickAction={handleQuickAction}
                validateStep={validateStep}
              />
            </TabsContent>
            
            <TabsContent value="insights">
              <InsightsTabContent
                insights={insights}
                currentStep={currentStep}
                analytics={analytics}
                onApplyInsight={(id) => console.log('Apply insight:', id)}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <HistoryTabContent
                history={stepHistory}
                onRevisitStep={onStepChange}
                onClearHistory={() => setStepHistory([])}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTabContent
                notifications={notifications}
                onDismiss={handleNotificationDismiss}
                onDismissAll={() => setNotifications([])}
              />
            </TabsContent>

            <TabsContent value="templates">
              <TemplatesTabContent
                workflowSteps={workflowSteps}
                analytics={analytics}
                onLoadTemplate={handleLoadTemplate}
                onSaveAsTemplate={handleSaveAsTemplate}
                onImportWorkflow={handleImportWorkflow}
                onImportProgress={handleImportProgress}
              />
            </TabsContent>

            <TabsContent value="collaboration">
              <CollaborationTabContent
                isCollaborationEnabled={isCollaborationEnabled}
                currentStep={currentStep}
                onSyncStateChange={handleSyncStateChange}
                onConflictResolution={handleConflictResolution}
                preferences={preferences}
                onPreferenceChange={handlePreferenceChange}
              />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTabContent
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
