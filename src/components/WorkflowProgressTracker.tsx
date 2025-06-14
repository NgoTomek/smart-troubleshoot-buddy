
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  SkipForward,
  BarChart3
} from 'lucide-react';
import { WorkflowAnalytics } from '@/hooks/useAdvancedWorkflowState';

interface WorkflowProgressTrackerProps {
  analytics: WorkflowAnalytics;
  currentStep: string;
  onViewAnalytics?: () => void;
}

export const WorkflowProgressTracker = ({ 
  analytics, 
  currentStep, 
  onViewAnalytics 
}: WorkflowProgressTrackerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'skipped': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'skipped': return <SkipForward className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Workflow Progress</span>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            {analytics.progressPercent}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{analytics.completedSteps} of {analytics.totalSteps} steps</span>
          </div>
          <Progress value={analytics.progressPercent} className="h-3" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-lg font-bold text-green-600">
                {analytics.completedSteps}
              </span>
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <SkipForward className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-lg font-bold text-yellow-600">
                {analytics.skippedSteps}
              </span>
            </div>
            <p className="text-xs text-gray-600">Skipped</p>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <XCircle className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-lg font-bold text-red-600">
                {analytics.failedSteps}
              </span>
            </div>
            <p className="text-xs text-gray-600">Failed</p>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-lg font-bold text-blue-600">
                {analytics.estimatedTimeRemaining}
              </span>
            </div>
            <p className="text-xs text-gray-600">Remaining</p>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700">Performance Insights</h4>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm">Average Step Time</span>
            </div>
            <Badge variant="outline">
              {analytics.averageStepTime}s
            </Badge>
          </div>
          
          {analytics.bottleneckSteps.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Bottleneck Steps Detected
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analytics.bottleneckSteps.map((step, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-yellow-100 text-yellow-700">
                    {step}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-yellow-700 mt-2">
                These steps took longer than average. Consider optimizing them.
              </p>
            </div>
          )}
        </div>

        {/* Current Step Status */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-800">
              Currently Active: {currentStep}
            </span>
          </div>
          <p className="text-xs text-blue-700">
            Focus on completing this step to maintain momentum.
          </p>
        </div>

        {/* Analytics Button */}
        {onViewAnalytics && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewAnalytics}
            className="w-full"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Detailed Analytics
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
