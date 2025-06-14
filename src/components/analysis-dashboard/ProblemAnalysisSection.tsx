
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface ProblemAnalysisSectionProps {
  complexityLevel: 'Low' | 'Medium' | 'High';
  averageSuccessRate: number;
  confidenceScore: number;
  solutionsCount: number;
}

export const ProblemAnalysisSection = ({
  complexityLevel,
  averageSuccessRate,
  confidenceScore,
  solutionsCount,
}: ProblemAnalysisSectionProps) => {
  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <span>Problem Analysis</span>
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Complexity Level</span>
            <Badge className={getComplexityColor(complexityLevel)}>
              {complexityLevel}
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
            <span className="font-semibold text-slate-900">{solutionsCount}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">AI Confidence</span>
              <span className="font-medium">{Math.round(confidenceScore * 100)}%</span>
            </div>
            <Progress value={confidenceScore * 100} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
