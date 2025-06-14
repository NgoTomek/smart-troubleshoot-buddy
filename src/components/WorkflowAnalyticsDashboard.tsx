
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  SkipForward
} from 'lucide-react';
import { WorkflowAnalytics } from '@/hooks/useAdvancedWorkflowState';

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
      category: step?.category || 'unknown'
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
    completion: Math.round((data.completed / data.total) * 100)
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{analytics.completedSteps}</p>
                <p className="text-sm text-gray-600">Steps Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{analytics.averageStepTime}s</p>
                <p className="text-sm text-gray-600">Avg Step Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{analytics.progressPercent}%</p>
                <p className="text-sm text-gray-600">Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{analytics.estimatedTimeRemaining}</p>
                <p className="text-sm text-gray-600">Time Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step Duration Chart */}
        {stepDurationData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Step Duration Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stepDurationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value}s`, 'Duration']}
                    labelFormatter={(label) => `Step: ${label}`}
                  />
                  <Bar dataKey="duration" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Step Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {statusData.map((entry, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs"
                  style={{ borderColor: entry.color, color: entry.color }}
                >
                  {entry.name}: {entry.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Completion by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryChartData.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{category.name}</span>
                  <Badge variant="outline">
                    {category.completed}/{category.total} ({category.completion}%)
                  </Badge>
                </div>
                <Progress value={category.completion} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottlenecks */}
      {analytics.bottleneckSteps.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span>Identified Bottlenecks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-yellow-800 mb-3">
                These steps took significantly longer than average and may need optimization:
              </p>
              <div className="flex flex-wrap gap-2">
                {analytics.bottleneckSteps.map((step, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-yellow-100 text-yellow-800 border-yellow-300"
                  >
                    {step}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
