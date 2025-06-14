
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SmartRecommendationsProps {
  complexityLevel: 'Low' | 'Medium' | 'High';
  solutionsCount: number;
  similarIssuesFound: number;
}

export const SmartRecommendations = ({
  complexityLevel,
  solutionsCount,
  similarIssuesFound,
}: SmartRecommendationsProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
        <Lightbulb className="w-4 h-4 text-yellow-600" />
        <span>Smart Recommendations</span>
      </h4>
      
      <div className="grid grid-cols-1 gap-2">
        {complexityLevel === 'High' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ This appears to be a complex issue. Consider starting with the highest confidence solution first.
            </p>
          </div>
        )}
        
        {solutionsCount > 3 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Multiple solutions found. Focus on the top 2-3 solutions for best results.
            </p>
          </div>
        )}
        
        {similarIssuesFound > 10 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ This is a common issue with proven solutions. High success probability expected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
