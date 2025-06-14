
import React from 'react';
import { WorkflowInsights } from '@/components/WorkflowInsights';
import { WorkflowAnalytics } from '@/types/workflow';

export interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'optimization' | 'achievement';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface InsightsTabContentProps {
  insights: Insight[];
  currentStep: string;
  analytics: WorkflowAnalytics;
  onApplyInsight: (id: string) => void;
}

export const InsightsTabContent = ({
  insights,
  currentStep,
  analytics,
  onApplyInsight,
}: InsightsTabContentProps) => {
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
