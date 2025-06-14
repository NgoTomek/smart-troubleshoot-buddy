import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Users,
  Filter
} from 'lucide-react';
import { WorkflowMetrics } from '@/lib/analytics';

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

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes('Time') ? formatTime(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          
          <TabsContent value="completion" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h4 className="font-medium">Average Step Completion Times</h4>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis tickFormatter={formatTime} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgTime" fill="#3B82F6" name="Avg Time" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-indigo-600">
                  {completionTimeData.length > 0 ? formatTime(completionTimeData.reduce((acc, item) => acc + item.avgTime, 0) / completionTimeData.length) : 'N/A'}
                </div>
                <div className="text-xs text-slate-600">Avg Step Time</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-green-600">
                  {completionTimeData.length > 0 ? formatTime(Math.min(...completionTimeData.map(item => item.avgTime))) : 'N/A'}
                </div>
                <div className="text-xs text-slate-600">Fastest Step</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-red-600">
                  {completionTimeData.length > 0 ? formatTime(Math.max(...completionTimeData.map(item => item.avgTime))) : 'N/A'}
                </div>
                <div className="text-xs text-slate-600">Slowest Step</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="success" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-4 h-4 text-indigo-600" />
              <h4 className="font-medium">Step Success Rates</h4>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={successRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="success" stackId="a" fill="#10B981" name="Completed" />
                  <Bar dataKey="skipped" stackId="a" fill="#F59E0B" name="Skipped" />
                  <Bar dataKey="failure" stackId="a" fill="#EF4444" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h4 className="font-medium">Performance Trends</h4>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="completions" name="Completions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-blue-600">
                  {performanceData.length > 0 ? `${Math.round(performanceData.reduce((acc, item) => acc + item.completions, 0) / performanceData.length)}` : 'N/A'}
                </div>
                <div className="text-xs text-slate-600">Avg Daily Completions</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-green-600">
                  {performanceData.length > 0 ? `${Math.max(...performanceData.map(item => item.completions))}` : 'N/A'}
                </div>
                <div className="text-xs text-slate-600">Peak Completions</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-orange-600">
                  {performanceData.reduce((acc, item) => acc + item.completions, 0)}
                </div>
                <div className="text-xs text-slate-600">Total Completions</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaboration" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-4 h-4 text-indigo-600" />
              <h4 className="font-medium">Collaboration Activity</h4>
            </div>
            
            <div className="h-64">
              {collaborationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collaborationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="collaborators" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  No collaboration data available for the selected time range.
                </div>
              )}
            </div>
            
            {collaborationData.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(collaborationData.reduce((acc, item) => acc + item.collaborators, 0) / collaborationData.length)}
                  </div>
                  <div className="text-xs text-slate-600">Avg Daily Collaborators</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-green-600">
                    {collaborationData.reduce((acc, item) => acc + item.sessions, 0)}
                  </div>
                  <div className="text-xs text-slate-600">Total Sessions</div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
