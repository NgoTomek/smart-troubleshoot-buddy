
import React from 'react';
import { WorkflowMetricsVisualization } from '@/components/WorkflowMetricsVisualization';

interface AnalyticsTabContentProps {
  metrics: any;
  timeRange: '7d' | '30d' | '90d';
  onTimeRangeChange: (timeRange: '7d' | '30d' | '90d') => void;
}

export const AnalyticsTabContent = ({ metrics, timeRange, onTimeRangeChange }: AnalyticsTabContentProps) => {
  return (
    <WorkflowMetricsVisualization
      metrics={metrics}
      timeRange={timeRange}
      onTimeRangeChange={onTimeRangeChange}
    />
  );
};
