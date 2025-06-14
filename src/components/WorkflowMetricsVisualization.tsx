
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Filter } from 'lucide-react';
import { WorkflowMetrics } from '@/lib/analytics';
import { CompletionTimeChart } from './metrics/CompletionTimeChart';
import { SuccessRateChart } from './metrics/SuccessRateChart';
import { PerformanceTrendChart } from './metrics/PerformanceTrendChart';
import { CollaborationChart } from './metrics/CollaborationChart';

interface WorkflowMetricsVisualizationProps {
  metrics: WorkflowMetrics;
  timeRange: '7d' | '30d' | '90d';
  onTimeRangeChange: (range: '7d' | '30d' | '90d') => void;
}

export const WorkflowMetricsVisualization = ({ 
  metrics, 
  timeRange, 
  onTimeRangeChange 
}: WorkflowMetricsVisualizationProps) => {

  const completionTimeData = (metrics.stepCompletionTimes || []).map(d => ({
    step: d.name,
    avgTime: d.time,
  }));

  const successRateData = (metrics.successRates || []).map(d => ({
    step: d.name,
    success: d.completed,
    failure: d.failed,
    skipped: d.skipped,
  }));

  const performanceData = (metrics.performanceTrends || []).map(d => ({
    date: d.date,
    completions: d.completions,
    avgTime: d.avgTime
  }));

  const collaborationData = metrics.collaborationData || [];

  return (
    <Card className="bg-indigo-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Workflow Metrics</span>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
              {timeRange} view
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            {['7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTimeRangeChange(range as '7d' | '30d' | '90d')}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="completion" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="completion">Completion Times</TabsTrigger>
            <TabsTrigger value="success">Success Rates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completion">
            <CompletionTimeChart data={completionTimeData} />
          </TabsContent>
          
          <TabsContent value="success">
            <SuccessRateChart data={successRateData} />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceTrendChart data={performanceData} />
          </TabsContent>
          
          <TabsContent value="collaboration">
            <CollaborationChart data={collaborationData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
