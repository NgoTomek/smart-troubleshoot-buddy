
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowTabContent } from '@/components/workflow-tabs/WorkflowTabContent';
import { InsightsTabContent } from '@/components/workflow-tabs/InsightsTabContent';
import { HistoryTabContent } from '@/components/workflow-tabs/HistoryTabContent';
import { NotificationsTabContent } from '@/components/workflow-tabs/NotificationsTabContent';
import { AnalyticsTabContent } from '@/components/workflow-tabs/AnalyticsTabContent';
import { WorkflowAnalytics, WorkflowStep } from '@/types/workflow';

interface WorkflowTabsProps {
  analytics: WorkflowAnalytics;
  currentStep: string;
  workflowSteps: WorkflowStep[];
  validationErrors: { [key: string]: string[] };
  handleStepSkip: (stepId: string) => boolean;
  handleStepAdvance: (stepId: string) => Promise<boolean>;
  onNavigate: (stepId: string) => void;
  handleQuickAction: (action: string) => void;
  validateStep: (stepId: string) => Promise<boolean>;
  insights: any[];
  onApplyInsight: (id: string) => void;
  stepHistory: any[];
  handleClearHistory: () => void;
  notifications: any[];
  handleNotificationDismiss: (id: string) => void;
  handleNotificationsDismissAll: () => void;
  onLoadTemplate: (templateId: string) => void;
  onSaveAsTemplate: (name: string) => void;
  onImportWorkflow: (data: any) => void;
  onImportProgress: (data: any) => void;
  isCollaborationEnabled: boolean;
  onSyncStateChange: (enabled: boolean) => void;
  onConflictResolution: (resolution: any) => void;
  preferences: any;
  onPreferenceChange: (key: string, value: any) => void;
  metrics: any;
  metricsTimeRange: '7d' | '30d' | '90d';
  setMetricsTimeRange: (timeRange: '7d' | '30d' | '90d') => void;
}

export const WorkflowTabs = ({
  analytics,
  currentStep,
  workflowSteps,
  validationErrors,
  handleStepSkip,
  handleStepAdvance,
  onNavigate,
  handleQuickAction,
  validateStep,
  insights,
  onApplyInsight,
  stepHistory,
  handleClearHistory,
  notifications,
  handleNotificationDismiss,
  handleNotificationsDismissAll,
  metrics,
  metricsTimeRange,
  setMetricsTimeRange,
}: WorkflowTabsProps) => {
  return (
    <Tabs defaultValue="workflow" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="workflow">Workflow</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="workflow" className="mt-4">
        <WorkflowTabContent
          analytics={analytics}
          currentStep={currentStep}
          workflowSteps={workflowSteps}
          validationErrors={validationErrors}
          handleStepSkip={handleStepSkip}
          handleStepAdvance={handleStepAdvance}
          onNavigate={onNavigate}
          handleQuickAction={handleQuickAction}
          validateStep={validateStep}
        />
      </TabsContent>
      
      <TabsContent value="insights" className="mt-4">
        <InsightsTabContent
          insights={insights}
          currentStep={currentStep}
          analytics={analytics}
          onApplyInsight={onApplyInsight}
        />
      </TabsContent>
      
      <TabsContent value="history" className="mt-4">
        <HistoryTabContent
          history={stepHistory}
          onRevisitStep={onNavigate}
          onClearHistory={handleClearHistory}
        />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-4">
        <NotificationsTabContent
          notifications={notifications}
          onDismiss={handleNotificationDismiss}
          onDismissAll={handleNotificationsDismissAll}
        />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsTabContent
          metrics={metrics}
          timeRange={metricsTimeRange}
          onTimeRangeChange={setMetricsTimeRange}
        />
      </TabsContent>
    </Tabs>
  );
};
