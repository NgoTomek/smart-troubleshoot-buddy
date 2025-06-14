
import { useState, useCallback } from 'react';
import { WorkflowStep } from '@/types/workflow';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';
import { Notification } from '@/components/workflow-tabs/NotificationsTabContent';
import { Insight } from '@/components/workflow-tabs/InsightsTabContent';

export const useWorkflowTabsState = (workflowSteps: WorkflowStep[]) => {
  const [stepHistory, setStepHistory] = useState<HistoryEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState({
    autoAdvance: false,
    showHints: true,
    soundEnabled: false,
  });
  const [isCollaborationEnabled, setIsCollaborationEnabled] = useState(false);
  const [metricsTimeRange, setMetricsTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const addHistoryEntry = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      timestamp: new Date(),
    };
    setStepHistory(prev => [newEntry, ...prev]);
  }, []);

  const handleClearHistory = useCallback(() => {
    setStepHistory([]);
  }, []);

  const handleNotificationDismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleNotificationsDismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const handlePreferenceChange = useCallback((key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyInsight = useCallback((id: string) => {
    console.log('Applying insight:', id);
    // Remove the applied insight
    setInsights(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    console.log('Quick action:', action);
    
    // Add a notification for the action
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'info',
      title: 'Action Performed',
      message: `${action} action was executed successfully.`,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const handleLoadTemplate = useCallback((templateId: string) => {
    console.log('Loading template:', templateId);
  }, []);

  const handleSaveAsTemplate = useCallback((name: string, description: string) => {
    console.log('Saving as template:', { name, description });
  }, []);

  const handleImportWorkflow = useCallback((data: any) => {
    console.log('Importing workflow:', data);
  }, []);

  const handleImportProgress = useCallback((data: any) => {
    console.log('Importing progress:', data);
  }, []);

  const handleSyncStateChange = useCallback((enabled: boolean) => {
    setIsCollaborationEnabled(enabled);
  }, []);

  const handleConflictResolution = useCallback((resolution: any) => {
    console.log('Conflict resolution:', resolution);
  }, []);

  return {
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
  };
};
