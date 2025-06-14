
import React from 'react';
import { Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface AnalysisMetricsProps {
  processingTime: number;
  confidenceScore: number;
  similarIssuesFound: number;
  categoryAccuracy: number;
}

export const AnalysisMetrics = ({
  processingTime,
  confidenceScore,
  similarIssuesFound,
  categoryAccuracy,
}: AnalysisMetricsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-1">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-2xl font-bold text-blue-700">
            {processingTime}s
          </span>
        </div>
        <p className="text-xs text-blue-600">Processing Time</p>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-1">
          <Target className="w-4 h-4 text-green-600" />
          <span className="text-2xl font-bold text-green-700">
            {Math.round(confidenceScore * 100)}%
          </span>
        </div>
        <p className="text-xs text-green-600">AI Confidence</p>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-1">
          <TrendingUp className="w-4 h-4 text-orange-600" />
          <span className="text-2xl font-bold text-orange-700">
            {similarIssuesFound}
          </span>
        </div>
        <p className="text-xs text-orange-600">Similar Issues</p>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-1">
          <CheckCircle className="w-4 h-4 text-purple-600" />
          <span className="text-2xl font-bold text-purple-700">
            {Math.round(categoryAccuracy * 100)}%
          </span>
        </div>
        <p className="text-xs text-purple-600">Category Match</p>
      </div>
    </div>
  );
};
