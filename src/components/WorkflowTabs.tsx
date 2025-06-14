import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AnalyticsTabContent,
  CollaborationTabContent,
  HistoryTabContent,
  InsightsTabContent,
  NotificationsTabContent,
  TemplatesTabContent,
  WorkflowTabContent
} from './workflow-tabs';
import { WorkflowAnalytics, WorkflowStep } from '@/types/workflow';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';
import { Insight } from '@/components/workflow-tabs/InsightsTabContent';
import { Notification } from '@/components/workflow-tabs/NotificationsTabContent';
import { Preference } from '@/components/workflow-tabs/CollaborationTabContent';
import { WorkflowMetrics } from '@/lib/analytics';

interface WorkflowTabsProps {
    analytics: WorkflowAnalytics;
    currentStep: string;
    workflowSteps: WorkflowStep[];
    validationErrors: { [key: string]: string[] };
    handleStepSkip: (stepId: string) => boolean;
    handleStepAdvance: (stepId: string) => Promise<boolean>;
    onStepChange: (stepId: string) => void;
    handleQuickAction: (action: string) => void;
    validateStep: (stepId: string) => Promise<boolean>;
    insights: Insight[];
    onApplyInsight: (id: string) => void;
    stepHistory: HistoryEntry[];
    handleClearHistory: () => void;
    notifications: Notification[];
    handleNotificationDismiss: (id: string) => void;
    handleNotificationsDismissAll: () => void;
    onLoadTemplate: (template: any) => void;
    onSaveAsTemplate: (name: string, description: string) => void;
    onImportWorkflow: (workflow: any) => void;
    onImportProgress: (progress: any) => void;
    isCollaborationEnabled: boolean;
    onSyncStateChange: (isConnected: boolean) => void;
    onConflictResolution: (conflicts: any[]) => void;
    preferences: Preference[];
    onPreferenceChange: (id: string, value: any) => void;
    metrics: WorkflowMetrics;
    metricsTimeRange: '7d' | '30d' | '90d';
    setMetricsTimeRange: (timeRange: '7d' | '30d' | '90d') => void;
}

export const WorkflowTabs = (props: WorkflowTabsProps) => {
    const {
        analytics,
        currentStep,
        workflowSteps,
        validationErrors,
        handleStepSkip,
        handleStepAdvance,
        onStepChange,
        handleQuickAction,
        validateStep,
        insights,
        onApplyInsight,
        stepHistory,
        handleClearHistory,
        notifications,
        handleNotificationDismiss,
        handleNotificationsDismissAll,
        onLoadTemplate,
        onSaveAsTemplate,
        onImportWorkflow,
        onImportProgress,
        isCollaborationEnabled,
        onSyncStateChange,
        onConflictResolution,
        preferences,
        onPreferenceChange,
        metrics,
        metricsTimeRange,
        setMetricsTimeRange,
    } = props;

    return (
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
                onApplyInsight={onApplyInsight}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <HistoryTabContent
                history={stepHistory}
                onRevisitStep={onStepChange}
                onClearHistory={handleClearHistory}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTabContent
                notifications={notifications}
                onDismiss={handleNotificationDismiss}
                onDismissAll={handleNotificationsDismissAll}
              />
            </TabsContent>

            <TabsContent value="templates">
              <TemplatesTabContent
                workflowSteps={workflowSteps}
                analytics={analytics}
                onLoadTemplate={onLoadTemplate}
                onSaveAsTemplate={onSaveAsTemplate}
                onImportWorkflow={onImportWorkflow}
                onImportProgress={onImportProgress}
              />
            </TabsContent>

            <TabsContent value="collaboration">
              <CollaborationTabContent
                isCollaborationEnabled={isCollaborationEnabled}
                currentStep={currentStep}
                onSyncStateChange={onSyncStateChange}
                onConflictResolution={onConflictResolution}
                preferences={preferences}
                onPreferenceChange={onPreferenceChange}
              />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTabContent
                metrics={metrics}
                timeRange={metricsTimeRange}
                onTimeRangeChange={setMetricsTimeRange}
              />
            </TabsContent>
        </Tabs>
    );
};
