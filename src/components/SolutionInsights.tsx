
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

interface SolutionInsightsProps {
  solutions: any[];
  completedSteps: {[key: string]: boolean};
  quickFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
}

export const SolutionInsights = ({ solutions, completedSteps, quickFeedback }: SolutionInsightsProps) => {
  const totalSteps = solutions.reduce((acc, solution) => acc + solution.steps.length, 0);
  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const completionRate = totalSteps > 0 ? (completedStepsCount / totalSteps) * 100 : 0;
  
  const helpfulFeedback = Object.values(quickFeedback).filter(feedback => feedback === 'helpful').length;
  const totalFeedback = Object.values(quickFeedback).filter(feedback => feedback !== null).length;
  
  const averageConfidence = solutions.reduce((acc, solution) => acc + solution.confidence, 0) / solutions.length;
  const averageSuccessRate = solutions.reduce((acc, solution) => acc + solution.successRate, 0) / solutions.length;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Solution Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {Math.round(averageConfidence * 100)}%
              </span>
            </div>
            <p className="text-sm text-blue-600">Avg Confidence</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {Math.round(averageSuccessRate * 100)}%
              </span>
            </div>
            <p className="text-sm text-green-600">Success Rate</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {Math.round(completionRate)}%
              </span>
            </div>
            <p className="text-sm text-purple-600">Progress</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">
                {totalFeedback > 0 ? Math.round((helpfulFeedback / totalFeedback) * 100) : 0}%
              </span>
            </div>
            <p className="text-sm text-orange-600">Helpful</p>
          </div>
        </div>
        
        {completionRate > 75 && (
          <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              🎉 Excellent progress! You're almost done solving this issue.
            </p>
          </div>
        )}
        
        {completionRate < 25 && solutions.length > 0 && (
          <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              💡 Pro tip: Start with the recommended solution for the best results!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
