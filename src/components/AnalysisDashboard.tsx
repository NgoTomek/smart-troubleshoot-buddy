
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain } from 'lucide-react';
import { AnalysisMetrics } from '@/components/analysis-dashboard/AnalysisMetrics';
import { ProblemAnalysisSection } from '@/components/analysis-dashboard/ProblemAnalysisSection';
import { SmartRecommendations } from '@/components/analysis-dashboard/SmartRecommendations';

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
        <AnalysisMetrics
          processingTime={analysisMetrics.processingTime}
          confidenceScore={analysisMetrics.confidenceScore}
          similarIssuesFound={analysisMetrics.similarIssuesFound}
          categoryAccuracy={analysisMetrics.categoryAccuracy}
        />

        <Separator />

        <ProblemAnalysisSection
          complexityLevel={analysisMetrics.complexityLevel}
          averageSuccessRate={averageSuccessRate}
          confidenceScore={analysisMetrics.confidenceScore}
          solutionsCount={solutions.length}
        />

        <Separator />

        <SmartRecommendations
          complexityLevel={analysisMetrics.complexityLevel}
          solutionsCount={solutions.length}
          similarIssuesFound={analysisMetrics.similarIssuesFound}
        />
      </CardContent>
    </Card>
  );
};
