
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Users,
  AlertCircle,
  RefreshCw,
  Award
} from 'lucide-react';

interface EffectivenessData {
  solutionId: number;
  title: string;
  category: string;
  totalAttempts: number;
  successfulAttempts: number;
  averageTimeToResolve: number;
  userSatisfactionScore: number;
  difficultyRating: number;
  lastUpdated: string;
  trendDirection: 'up' | 'down' | 'stable';
  feedbackCount: number;
}

interface SolutionEffectivenessTrackerProps {
  solutions: any[];
  onEffectivenessUpdate: (data: EffectivenessData[]) => void;
}

export const SolutionEffectivenessTracker = ({ 
  solutions, 
  onEffectivenessUpdate 
}: SolutionEffectivenessTrackerProps) => {
  const [effectivenessData, setEffectivenessData] = useState<EffectivenessData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [overallMetrics, setOverallMetrics] = useState({
    averageSuccessRate: 0.82,
    totalResolutions: 1247,
    averageSatisfaction: 4.3,
    improvementTrend: 0.12
  });

  const generateEffectivenessData = () => {
    const data: EffectivenessData[] = solutions.map((solution, index) => ({
      solutionId: solution.id,
      title: solution.title,
      category: solution.category,
      totalAttempts: Math.floor(Math.random() * 200) + 50,
      successfulAttempts: Math.floor(Math.random() * 150) + 40,
      averageTimeToResolve: Math.floor(Math.random() * 15) + 3,
      userSatisfactionScore: Math.random() * 2 + 3, // 3-5 scale
      difficultyRating: Math.random() * 3 + 1, // 1-4 scale
      lastUpdated: `${Math.floor(Math.random() * 24)} hours ago`,
      trendDirection: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      feedbackCount: Math.floor(Math.random() * 50) + 10
    }));

    setEffectivenessData(data);
    onEffectivenessUpdate(data);
  };

  const updateEffectivenessData = async () => {
    setIsUpdating(true);
    setTimeout(() => {
      generateEffectivenessData();
      setIsUpdating(false);
    }, 2000);
  };

  useEffect(() => {
    if (solutions.length > 0) {
      generateEffectivenessData();
    }
  }, [solutions]);

  const getSuccessRate = (data: EffectivenessData) => {
    return data.totalAttempts > 0 ? (data.successfulAttempts / data.totalAttempts) * 100 : 0;
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 border-t-2 border-gray-600"></div>;
      default: return null;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceRating = (successRate: number) => {
    if (successRate >= 85) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (successRate >= 70) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (successRate >= 55) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span>Solution Effectiveness Tracker</span>
            <Badge variant="outline" className="bg-orange-100 text-orange-700">
              Real-time
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={updateEffectivenessData}
            disabled={isUpdating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            Update Data
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-4 h-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">
                {Math.round(overallMetrics.averageSuccessRate * 100)}%
              </span>
            </div>
            <p className="text-xs text-orange-600">Avg Success Rate</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {overallMetrics.totalResolutions.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-green-600">Total Resolutions</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {overallMetrics.averageSatisfaction.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-blue-600">Satisfaction Score</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                +{Math.round(overallMetrics.improvementTrend * 100)}%
              </span>
            </div>
            <p className="text-xs text-purple-600">Monthly Improvement</p>
          </div>
        </div>

        <Separator />

        {/* Solution Effectiveness List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Individual Solution Performance</h4>
          
          {effectivenessData.map((data) => {
            const successRate = getSuccessRate(data);
            const performance = getPerformanceRating(successRate);
            
            return (
              <div key={data.solutionId} className="p-4 bg-white border border-orange-200 rounded-lg space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-slate-900">{data.title}</h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{data.category}</Badge>
                      <Badge className={performance.color}>{performance.label}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(data.trendDirection)}
                    <span className={`text-sm font-medium ${getTrendColor(data.trendDirection)}`}>
                      {data.trendDirection}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Success Rate</span>
                      <span className="font-medium">{Math.round(successRate)}%</span>
                    </div>
                    <Progress value={successRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">User Satisfaction</span>
                      <span className="font-medium">{data.userSatisfactionScore.toFixed(1)}/5</span>
                    </div>
                    <Progress value={(data.userSatisfactionScore / 5) * 100} className="h-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span className="text-sm font-medium">{data.averageTimeToResolve}min</span>
                    </div>
                    <p className="text-xs text-slate-500">Avg Time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-3 h-3 text-slate-600" />
                      <span className="text-sm font-medium">{data.totalAttempts}</span>
                    </div>
                    <p className="text-xs text-slate-500">Total Attempts</p>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center space-x-4">
                    <span>Successful: {data.successfulAttempts}</span>
                    <span>Feedback: {data.feedbackCount} reviews</span>
                    <span>Difficulty: {data.difficultyRating.toFixed(1)}/4</span>
                  </div>
                  <span>Updated {data.lastUpdated}</span>
                </div>

                {/* Recommendations */}
                {successRate < 60 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Improvement Needed</span>
                    </div>
                    <p className="text-yellow-700 mt-1">
                      This solution has a low success rate. Consider reviewing and updating the steps.
                    </p>
                  </div>
                )}

                {successRate >= 85 && data.trendDirection === 'up' && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Top Performer</span>
                    </div>
                    <p className="text-green-700 mt-1">
                      Excellent performance with improving trend. Consider featuring this solution.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
