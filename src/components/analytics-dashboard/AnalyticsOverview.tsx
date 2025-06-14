
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';
import { WorkflowAnalytics } from '@/hooks/useAdvancedWorkflowState';

interface AnalyticsOverviewProps {
  analytics: WorkflowAnalytics;
}

export const AnalyticsOverview = ({ analytics }: AnalyticsOverviewProps) => {
  const overviewMetrics = [
    {
      Icon: CheckCircle,
      label: 'Steps Completed',
      value: analytics.completedSteps,
      color: 'text-green-600',
    },
    {
      Icon: Clock,
      label: 'Avg Step Time',
      value: `${analytics.averageStepTime}s`,
      color: 'text-blue-600',
    },
    {
      Icon: Target,
      label: 'Progress',
      value: `${analytics.progressPercent}%`,
      color: 'text-purple-600',
    },
    {
      Icon: TrendingUp,
      label: 'Time Remaining',
      value: analytics.estimatedTimeRemaining,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {overviewMetrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <metric.Icon className={`w-5 h-5 ${metric.color}`} />
              <div>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
