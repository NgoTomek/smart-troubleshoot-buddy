
import React from 'react';
import { WorkflowAnalytics } from '@/types/workflow';
import { AnalyticsOverview } from './analytics-dashboard/AnalyticsOverview';
import { CurrentStepDurationChart } from './analytics-dashboard/CurrentStepDurationChart';
import { StatusDistributionChart } from './analytics-dashboard/StatusDistributionChart';
import { CategoryCompletion } from './analytics-dashboard/CategoryCompletion';
import { Bottlenecks } from './analytics-dashboard/Bottlenecks';

interface WorkflowAnalyticsDashboardProps {
  analytics: WorkflowAnalytics;
  stepDurations: { [key: string]: number };
  workflowSteps: Array<{
    id: string;
    title: string;
    status: string;
    category: string;
  }>;
}

export const WorkflowAnalyticsDashboard = ({ 
  analytics, 
  stepDurations, 
  workflowSteps 
}: WorkflowAnalyticsDashboardProps) => {
  // Prepare data for charts
  const stepDurationData = Object.entries(stepDurations).map(([stepId, duration]) => {
    const step = workflowSteps.find(s => s.id === stepId);
    return {
      name: step?.title || stepId,
      duration: Math.round(duration / 1000), // Convert to seconds
    };
  });

  const statusData = [
    { name: 'Completed', value: analytics.completedSteps, color: '#10b981' },
    { name: 'Skipped', value: analytics.skippedSteps, color: '#f59e0b' },
    { name: 'Failed', value: analytics.failedSteps, color: '#ef4444' },
    { name: 'Pending', value: analytics.totalSteps - analytics.completedSteps - analytics.skippedSteps - analytics.failedSteps, color: '#6b7280' }
  ].filter(item => item.value > 0);

  const categoryData = workflowSteps.reduce((acc, step) => {
    const category = step.category;
    if (!acc[category]) {
      acc[category] = { completed: 0, total: 0 };
    }
    acc[category].total++;
    if (step.status === 'completed') {
      acc[category].completed++;
    }
    return acc;
  }, {} as { [key: string]: { completed: number; total: number } });

  const categoryChartData = Object.entries(categoryData).map(([category, data]) => ({
    name: category,
    completed: data.completed,
    total: data.total,
    completion: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
  }));

  return (
    <div className="space-y-6">
      <AnalyticsOverview analytics={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CurrentStepDurationChart data={stepDurationData} />
        <StatusDistributionChart data={statusData} />
      </div>

      <CategoryCompletion data={categoryChartData} />
      
      <Bottlenecks steps={analytics.bottleneckSteps} />
    </div>
  );
};
