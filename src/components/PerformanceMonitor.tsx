
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Zap, 
  Clock, 
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Gauge
} from 'lucide-react';

interface PerformanceMetrics {
  responseTime: number;
  successRate: number;
  userSatisfaction: number;
  systemLoad: number;
  uptime: number;
  activeUsers: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    responseTime: 0.8,
    successRate: 0.94,
    userSatisfaction: 0.89,
    systemLoad: 0.32,
    uptime: 0.998,
    activeUsers: 247
  });

  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        responseTime: Math.max(0.1, prev.responseTime + (Math.random() - 0.5) * 0.2),
        successRate: Math.min(1, Math.max(0.8, prev.successRate + (Math.random() - 0.5) * 0.02)),
        userSatisfaction: Math.min(1, Math.max(0.7, prev.userSatisfaction + (Math.random() - 0.5) * 0.02)),
        systemLoad: Math.min(1, Math.max(0.1, prev.systemLoad + (Math.random() - 0.5) * 0.1)),
        uptime: Math.min(1, Math.max(0.95, prev.uptime + (Math.random() - 0.5) * 0.001)),
        activeUsers: Math.max(100, prev.activeUsers + Math.floor((Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const getStatusColor = (value: number, isInverted = false) => {
    const threshold = isInverted ? 0.7 : 0.8;
    if (isInverted) {
      return value < 0.3 ? 'text-green-600' : value < threshold ? 'text-yellow-600' : 'text-red-600';
    }
    return value > threshold ? 'text-green-600' : value > 0.6 ? 'text-yellow-600' : 'text-red-600';
  };

  const getStatusIcon = (value: number, isInverted = false) => {
    const threshold = isInverted ? 0.7 : 0.8;
    if (isInverted) {
      return value < 0.3 ? CheckCircle : value < threshold ? AlertCircle : AlertCircle;
    }
    return value > threshold ? CheckCircle : value > 0.6 ? AlertCircle : AlertCircle;
  };

  return (
    <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-600" />
            <span>Performance Monitor</span>
            <Badge variant={isRealTime ? 'default' : 'outline'} className="bg-cyan-100 text-cyan-700">
              {isRealTime ? 'Live' : 'Paused'}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsRealTime(!isRealTime)}
          >
            {isRealTime ? 'Pause' : 'Resume'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {metrics.responseTime.toFixed(1)}s
              </span>
            </div>
            <p className="text-xs text-blue-600">Response Time</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Target className={getStatusColor(metrics.successRate)} />
              <span className={`text-2xl font-bold ${getStatusColor(metrics.successRate)}`}>
                {Math.round(metrics.successRate * 100)}%
              </span>
            </div>
            <p className="text-xs text-green-600">Success Rate</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {metrics.activeUsers}
              </span>
            </div>
            <p className="text-xs text-purple-600">Active Users</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">User Satisfaction</span>
              <div className="flex items-center space-x-2">
                {React.createElement(getStatusIcon(metrics.userSatisfaction), { 
                  className: `w-4 h-4 ${getStatusColor(metrics.userSatisfaction)}` 
                })}
                <span className="font-medium">{Math.round(metrics.userSatisfaction * 100)}%</span>
              </div>
            </div>
            <Progress value={metrics.userSatisfaction * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">System Load</span>
              <div className="flex items-center space-x-2">
                {React.createElement(getStatusIcon(metrics.systemLoad, true), { 
                  className: `w-4 h-4 ${getStatusColor(metrics.systemLoad, true)}` 
                })}
                <span className="font-medium">{Math.round(metrics.systemLoad * 100)}%</span>
              </div>
            </div>
            <Progress value={metrics.systemLoad * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">System Uptime</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium">{(metrics.uptime * 100).toFixed(2)}%</span>
              </div>
            </div>
            <Progress value={metrics.uptime * 100} className="h-2" />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metrics.systemLoad > 0.8 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>High system load detected</span>
              </p>
            </div>
          )}
          
          {metrics.responseTime > 2.0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Response time above threshold</span>
              </p>
            </div>
          )}
          
          {metrics.successRate > 0.95 && metrics.systemLoad < 0.5 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>All systems operating optimally</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
