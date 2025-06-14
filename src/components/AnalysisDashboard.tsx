
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb
} from 'lucide-react';

interface AnalysisDashboardProps {
  solutions: any[];
  extractedText: string;
  analysisMetrics?: {
    processingTime: number;
    confidenceScore: number;
    complexityLevel: 'Low' | 'Medium' | 'High';
    similarIssuesFound: number;
    categoryAccuracy: number;
  };
}

export const AnalysisDashboard = ({ 
  solutions, 
  extractedText,
  analysisMetrics = {
    processingTime: 1.2,
    confidenceScore: 0.89,
    complexityLevel: 'Medium',
    similarIssuesFound: 15,
    categoryAccuracy: 0.94
  }
}: AnalysisDashboardProps) => {
  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const averageSuccessRate = solutions.length > 0 
    ? solutions.reduce((acc, sol) => acc + sol.successRate, 0) / solutions.length 
    : 0;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span>AI Analysis Dashboard</span>
          <Badge variant="outline" className="bg-purple-100 text-purple-700">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Analysis Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {analysisMetrics.processingTime}s
              </span>
            </div>
            <p className="text-xs text-blue-600">Processing Time</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {Math.round(analysisMetrics.confidenceScore * 100)}%
              </span>
            </div>
            <p className="text-xs text-green-600">AI Confidence</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">
                {analysisMetrics.similarIssuesFound}
              </span>
            </div>
            <p className="text-xs text-orange-600">Similar Issues</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {Math.round(analysisMetrics.categoryAccuracy * 100)}%
              </span>
            </div>
            <p className="text-xs text-purple-600">Category Match</p>
          </div>
        </div>

        <Separator />

        {/* Problem Analysis */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Problem Analysis</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Complexity Level</span>
                <Badge className={getComplexityColor(analysisMetrics.complexityLevel)}>
                  {analysisMetrics.complexityLevel}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Success Probability</span>
                  <span className="font-medium">{Math.round(averageSuccessRate * 100)}%</span>
                </div>
                <Progress value={averageSuccessRate * 100} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Solutions Generated</span>
                <span className="font-semibold text-slate-900">{solutions.length}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">AI Confidence</span>
                  <span className="font-medium">{Math.round(analysisMetrics.confidenceScore * 100)}%</span>
                </div>
                <Progress value={analysisMetrics.confidenceScore * 100} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Smart Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <span>Smart Recommendations</span>
          </h4>
          
          <div className="grid grid-cols-1 gap-2">
            {analysisMetrics.complexityLevel === 'High' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  ⚠️ This appears to be a complex issue. Consider starting with the highest confidence solution first.
                </p>
              </div>
            )}
            
            {solutions.length > 3 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Multiple solutions found. Focus on the top 2-3 solutions for best results.
                </p>
              </div>
            )}
            
            {analysisMetrics.similarIssuesFound > 10 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ This is a common issue with proven solutions. High success probability expected.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
