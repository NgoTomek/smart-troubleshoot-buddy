
import React from 'react';
import { WorkflowMetricsVisualization } from '@/components/WorkflowMetricsVisualization';

interface AnalyticsTabContentProps {
  metrics: {
    completionRate: number;
    averageTime: number;
    stepDistribution: Array<{ name: string; value: number; color: string }>;
    timelineData: Array<{ step: string; duration: number; status: string }>;
    trends: Array<{ date: string; completions: number; avgTime: number }>;
  };
  timeRange: '7d' | '30d' | '90d';
  onTimeRangeChange: (range: '7d' | '30d' | '90d') => void;
}

export const AnalyticsTabContent = ({
  metrics,
  timeRange,
  onTimeRangeChange,
}: AnalyticsTabContentProps) => {
  return (
    <WorkflowMetricsVisualization
      metrics={metrics}
      timeRange={timeRange}
      onTimeRangeChange={onTimeRangeChange}
    />
  );
};
