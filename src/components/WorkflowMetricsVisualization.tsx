
import React, { useState } from 'react';
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
  PieChart,
  Pie,
  Cell,
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
  Calendar,
  Filter
} from 'lucide-react';

interface WorkflowMetrics {
  stepCompletionTimes: { step: string; time: number; }[];
  successRates: { step: string; success: number; failure: number; }[];
  collaborationData: { day: string; collaborators: number; }[];
  performanceTrends: { date: string; efficiency: number; }[];
}

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
  const [selectedMetric, setSelectedMetric] = useState('completion');

  // Sample data - in real app this would come from props
  const completionTimeData = [
    { step: 'Analyze', avgTime: 45, sessions: 23 },
    { step: 'Solutions', avgTime: 120, sessions: 19 },
    { step: 'Execute', avgTime: 300, sessions: 15 },
    { step: 'Collaborate', avgTime: 180, sessions: 8 },
    { step: 'Feedback', avgTime: 60, sessions: 12 }
  ];

  const successRateData = [
    { step: 'Analyze', success: 95, failure: 5 },
    { step: 'Solutions', success: 88, failure: 12 },
    { step: 'Execute', success: 76, failure: 24 },
    { step: 'Collaborate', success: 82, failure: 18 },
    { step: 'Feedback', success: 92, failure: 8 }
  ];

  const performanceData = [
    { date: '2024-06-08', efficiency: 85, sessions: 12 },
    { date: '2024-06-09', efficiency: 78, sessions: 15 },
    { date: '2024-06-10', efficiency: 92, sessions: 18 },
    { date: '2024-06-11', efficiency: 88, sessions: 14 },
    { date: '2024-06-12', efficiency: 96, sessions: 20 },
    { date: '2024-06-13', efficiency: 91, sessions: 16 },
    { date: '2024-06-14', efficiency: 89, sessions: 19 }
  ];

  const collaborationData = [
    { day: 'Mon', collaborators: 4, sessions: 8 },
    { day: 'Tue', collaborators: 6, sessions: 12 },
    { day: 'Wed', collaborators: 8, sessions: 15 },
    { day: 'Thu', collaborators: 5, sessions: 10 },
    { day: 'Fri', collaborators: 7, sessions: 14 },
    { day: 'Sat', collaborators: 3, sessions: 5 },
    { day: 'Sun', collaborators: 2, sessions: 3 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

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
                  <Bar dataKey="avgTime" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-indigo-600">
                  {formatTime(completionTimeData.reduce((acc, item) => acc + item.avgTime, 0) / completionTimeData.length)}
                </div>
                <div className="text-xs text-slate-600">Avg Total Time</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-green-600">
                  {formatTime(Math.min(...completionTimeData.map(item => item.avgTime)))}
                </div>
                <div className="text-xs text-slate-600">Fastest Step</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-red-600">
                  {formatTime(Math.max(...completionTimeData.map(item => item.avgTime)))}
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
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="success" stackId="a" fill="#10B981" />
                  <Bar dataKey="failure" stackId="a" fill="#EF4444" />
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
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="efficiency" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(performanceData.reduce((acc, item) => acc + item.efficiency, 0) / performanceData.length)}%
                </div>
                <div className="text-xs text-slate-600">Avg Efficiency</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-green-600">
                  {Math.max(...performanceData.map(item => item.efficiency))}%
                </div>
                <div className="text-xs text-slate-600">Peak Efficiency</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-bold text-orange-600">
                  {performanceData.reduce((acc, item) => acc + item.sessions, 0)}
                </div>
                <div className="text-xs text-slate-600">Total Sessions</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaboration" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-4 h-4 text-indigo-600" />
              <h4 className="font-medium">Collaboration Activity</h4>
            </div>
            
            <div className="h-64">
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
            </div>
            
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
