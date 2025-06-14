
import React from 'react';
import { WorkflowNotifications } from '@/components/WorkflowNotifications';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    handler: () => void;
  };
}

interface NotificationsTabContentProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}

export const NotificationsTabContent = ({
  notifications,
  onDismiss,
  onDismissAll,
}: NotificationsTabContentProps) => {
  return (
    <WorkflowNotifications
      notifications={notifications}
      onDismiss={onDismiss}
      onDismissAll={onDismissAll}
    />
  );
};
