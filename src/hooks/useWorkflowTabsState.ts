
import { useState, useCallback } from 'react';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';
import { Insight } from '@/components/workflow-tabs/InsightsTabContent';
import { Notification } from '@/components/workflow-tabs/NotificationsTabContent';
import { Preference } from '@/components/workflow-tabs/CollaborationTabContent';
import { WorkflowStep } from '@/hooks/useAdvancedWorkflowState';

export const useWorkflowTabsState = (workflowSteps: WorkflowStep[]) => {
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

    const [isCollaborationEnabled, setIsCollaborationEnabled] = useState(false);
    const [metricsTimeRange, setMetricsTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

    const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, []);

    const handleNotificationDismiss = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const handleNotificationsDismissAll = useCallback(() => {
        setNotifications([]);
    }, []);
    
    const addHistoryEntry = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
        const newEntry: HistoryEntry = {
            ...entry,
            timestamp: new Date(),
        };
        setStepHistory(prev => [...prev, newEntry]);
    }, []);

    const handleClearHistory = useCallback(() => {
        setStepHistory([]);
    }, []);

    const handlePreferenceChange = useCallback((id: string, value: any) => {
        setPreferences(prev => prev.map(p =>
            p.id === id ? { ...p, value } : p
        ));
    }, []);
    
    const handleApplyInsight = useCallback((id: string) => {
        console.log('Apply insight:', id);
        addNotification({
            type: 'info',
            title: 'Insight Applied',
            message: `Insight with id ${id} has been applied.`,
            actionable: false,
            autoHide: true,
            duration: 3000
        });
    }, [addNotification]);
    
    const handleQuickAction = useCallback((action: string) => {
        console.log('Quick action:', action);
        if (action === 'enable-collaboration') {
          setIsCollaborationEnabled(true);
        }
        addNotification({
          type: 'info',
          title: 'Action executed',
          message: `Quick action "${action}" has been executed`,
          actionable: false,
          autoHide: true
        });
    }, [addNotification]);

    const handleLoadTemplate = useCallback((template: any) => {
        console.log('Loading template:', template);
        handleQuickAction('template-loaded');
    }, [handleQuickAction]);

    const handleSaveAsTemplate = useCallback((name: string, description: string) => {
        console.log('Saving template:', { name, description, workflow: workflowSteps });
        handleQuickAction('template-saved');
    }, [handleQuickAction, workflowSteps]);

    const handleImportWorkflow = useCallback((workflow: any) => {
        console.log('Importing workflow:', workflow);
        handleQuickAction('workflow-imported');
    }, [handleQuickAction]);

    const handleImportProgress = useCallback((progress: any) => {
        console.log('Importing progress:', progress);
    }, []);

    const handleSyncStateChange = useCallback((isConnected: boolean) => {
        console.log('Sync state changed:', isConnected);
        setIsCollaborationEnabled(isConnected);
    }, []);

    const handleConflictResolution = useCallback((conflicts: any[]) => {
        console.log('Resolving conflicts:', conflicts);
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
