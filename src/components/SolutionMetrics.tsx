
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { Solution } from '@/types/solution';

interface SolutionMetricsProps {
  solutions: Solution[];
  completedSteps: { [key: string]: boolean };
}

export const SolutionMetrics = ({ solutions, completedSteps }: SolutionMetricsProps) => {
  const avgConfidence = solutions.reduce((acc, sol) => acc + sol.confidence, 0) / solutions.length;
  const avgSuccessRate = solutions.reduce((acc, sol) => acc + sol.successRate, 0) / solutions.length;
  
  const totalSteps = solutions.reduce((acc, sol) => acc + sol.steps.length, 0);
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  const metrics = [
    {
      title: 'Avg Confidence',
      value: `${Math.round(avgConfidence * 100)}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Success Rate',
      value: `${Math.round(avgSuccessRate * 100)}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Progress',
      value: `${completedCount}/${totalSteps}`,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-slate-600" />
          <span>Solution Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`p-3 rounded-lg ${metric.bgColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{metric.title}</p>
                  <p className={`text-lg font-semibold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="w-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          {solutions.map((solution) => (
            <Badge key={solution.id} variant="outline" className="text-xs">
              {solution.category}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
