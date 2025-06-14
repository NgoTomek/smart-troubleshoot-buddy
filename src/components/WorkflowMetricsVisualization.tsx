
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, Clock, Target, Activity } from 'lucide-react';

interface WorkflowMetricsVisualizationProps {
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

export const WorkflowMetricsVisualization = ({
  metrics,
  timeRange,
  onTimeRangeChange,
}: WorkflowMetricsVisualizationProps) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      default: return 'Last 7 Days';
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Workflow Analytics</h3>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTimeRangeChange(range)}
            >
              {getTimeRangeLabel(range)}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Completion Rate</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{metrics.completionRate}%</div>
            <Progress value={metrics.completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Avg Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatDuration(metrics.averageTime)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Active Steps</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {metrics.stepDistribution.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Efficiency</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((metrics.completionRate / 100) * (300000 / metrics.averageTime) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step Duration Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Step Duration Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis tickFormatter={(value) => formatDuration(value)} />
                <Tooltip 
                  formatter={(value: number) => [formatDuration(value), 'Duration']}
                  labelFormatter={(label) => `Step: ${label}`}
                />
                <Bar dataKey="duration" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Step Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Step Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.stepDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrics.stepDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="completions" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Completions"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Avg Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Efficiency Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fastest Step</span>
                  <Badge variant="outline">
                    {metrics.timelineData.length > 0 
                      ? metrics.timelineData.reduce((prev, current) => 
                          prev.duration < current.duration ? prev : current
                        ).step
                      : 'N/A'
                    }
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Slowest Step</span>
                  <Badge variant="outline">
                    {metrics.timelineData.length > 0 
                      ? metrics.timelineData.reduce((prev, current) => 
                          prev.duration > current.duration ? prev : current
                        ).step
                      : 'N/A'
                    }
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Recommendations</h4>
              <div className="space-y-2 text-sm text-gray-700">
                {metrics.completionRate < 80 && (
                  <p>• Consider simplifying steps with low completion rates</p>
                )}
                {metrics.averageTime > 300000 && (
                  <p>• Break down longer steps into smaller, manageable tasks</p>
                )}
                <p>• Review step dependencies to optimize workflow flow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
