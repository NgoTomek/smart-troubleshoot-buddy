
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap
} from 'lucide-react';

interface QualityMetric {
  name: string;
  score: number;
  description: string;
  weight: number;
  icon: React.ElementType;
}

interface SolutionQualityAssessmentProps {
  solutions: any[];
  userFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
  completedSteps: {[key: string]: boolean};
}

export const SolutionQualityAssessment = ({ 
  solutions, 
  userFeedback, 
  completedSteps 
}: SolutionQualityAssessmentProps) => {
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([]);
  const [overallQualityScore, setOverallQualityScore] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  useEffect(() => {
    calculateQualityMetrics();
  }, [solutions, userFeedback, completedSteps]);

  const calculateQualityMetrics = () => {
    const metrics: QualityMetric[] = [
      {
        name: 'Solution Accuracy',
        score: calculateAccuracyScore(),
        description: 'How well solutions match the problem context',
        weight: 0.3,
        icon: Target
      },
      {
        name: 'User Satisfaction',
        score: calculateSatisfactionScore(),
        description: 'Based on user feedback and ratings',
        weight: 0.25,
        icon: Star
      },
      {
        name: 'Completion Rate',
        score: calculateCompletionScore(),
        description: 'Percentage of steps successfully completed',
        weight: 0.2,
        icon: CheckCircle
      },
      {
        name: 'Efficiency',
        score: calculateEfficiencyScore(),
        description: 'Time to resolution vs. estimated time',
        weight: 0.15,
        icon: Clock
      },
      {
        name: 'Community Trust',
        score: calculateCommunityScore(),
        description: 'Based on solution success rates and votes',
        weight: 0.1,
        icon: Users
      }
    ];

    setQualityMetrics(metrics);
    
    const weightedScore = metrics.reduce((acc, metric) => 
      acc + (metric.score * metric.weight), 0
    );
    
    setOverallQualityScore(Math.round(weightedScore));
    setAssessmentComplete(true);
  };

  const calculateAccuracyScore = () => {
    if (solutions.length === 0) return 0;
    
    const avgConfidence = solutions.reduce((acc, sol) => acc + sol.confidence, 0) / solutions.length;
    return Math.round(avgConfidence * 100);
  };

  const calculateSatisfactionScore = () => {
    const feedbackEntries = Object.values(userFeedback).filter(f => f !== null);
    if (feedbackEntries.length === 0) return 50; // neutral default
    
    const helpfulCount = feedbackEntries.filter(f => f === 'helpful').length;
    return Math.round((helpfulCount / feedbackEntries.length) * 100);
  };

  const calculateCompletionScore = () => {
    const totalSteps = solutions.reduce((acc, solution) => acc + solution.steps.length, 0);
    if (totalSteps === 0) return 0;
    
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const calculateEfficiencyScore = () => {
    // Simulate efficiency based on solution difficulty and success rate
    if (solutions.length === 0) return 0;
    
    const avgSuccessRate = solutions.reduce((acc, sol) => acc + sol.successRate, 0) / solutions.length;
    const difficultyPenalty = solutions.filter(sol => sol.difficulty === 'Hard').length * 0.1;
    
    return Math.max(0, Math.round((avgSuccessRate * 100) - (difficultyPenalty * 100)));
  };

  const calculateCommunityScore = () => {
    if (solutions.length === 0) return 0;
    
    const avgSuccessRate = solutions.reduce((acc, sol) => acc + sol.successRate, 0) / solutions.length;
    return Math.round(avgSuccessRate * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertTriangle;
    return AlertTriangle;
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span>Solution Quality Assessment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className={`${getScoreColor(overallQualityScore)} border-current`}
            >
              {overallQualityScore}/100
            </Badge>
            {React.createElement(getScoreIcon(overallQualityScore), { 
              className: `w-5 h-5 ${getScoreColor(overallQualityScore)}` 
            })}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-emerald-700">
            {overallQualityScore}%
          </div>
          <p className="text-sm text-emerald-600">Overall Quality Score</p>
          <Progress value={overallQualityScore} className="h-3" />
        </div>

        <Separator />

        {/* Quality Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span>Quality Breakdown</span>
          </h4>
          
          {qualityMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-slate-900">
                      {metric.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(metric.weight * 100)}% weight
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-slate-600">{metric.description}</p>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span>Improvement Recommendations</span>
          </h4>
          
          <div className="space-y-2">
            {overallQualityScore < 80 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Try completing more solution steps to improve your success rate
                </p>
              </div>
            )}
            
            {calculateSatisfactionScore() < 70 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  🤝 Consider exploring community solutions for alternative approaches
                </p>
              </div>
            )}
            
            {calculateCompletionScore() < 50 && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800">
                  🎯 Focus on completing the current solution steps before trying new ones
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Detailed Report
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
