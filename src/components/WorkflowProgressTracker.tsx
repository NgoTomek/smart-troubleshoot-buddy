
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';
import { WorkflowAnalytics } from '@/types/workflow';

interface WorkflowProgressTrackerProps {
  analytics: WorkflowAnalytics;
  currentStep: string;
}

export const WorkflowProgressTracker = ({ analytics, currentStep }: WorkflowProgressTrackerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Progress Overview</span>
          <Badge variant="outline">
            {analytics.progressPercent}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={analytics.progressPercent} className="w-full" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm">
              {analytics.completedSteps} of {analytics.totalSteps} steps
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm">
              Avg: {Math.round(analytics.averageStepTime / 1000)}s per step
            </span>
          </div>
        </div>
        
        <div className="text-sm text-slate-600">
          Current Step: <span className="font-medium">{currentStep}</span>
        </div>
      </CardContent>
    </Card>
  );
};
