
import React from 'react';
import { WorkflowInsights } from '@/components/WorkflowInsights';
import { WorkflowAnalytics } from '@/hooks/useAdvancedWorkflowState';

export interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'info';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface InsightsTabContentProps {
  insights: Insight[];
  currentStep: string;
  analytics: WorkflowAnalytics;
  onApplyInsight: (id: string) => void;
}

export const InsightsTabContent = ({ insights, currentStep, analytics, onApplyInsight }: InsightsTabContentProps) => {
  return (
    <WorkflowInsights
      insights={insights}
      currentStepId={currentStep}
      progressPercent={analytics.progressPercent}
      averageStepTime={analytics.averageStepTime}
      onApplyInsight={onApplyInsight}
    />
  );
};
