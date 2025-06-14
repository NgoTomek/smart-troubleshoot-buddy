
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProgressSummaryProps {
  completedSteps: {[key: string]: boolean};
  solutionsCount: number;
  submittedFeedback: {[key: number]: boolean};
}

export const ProgressSummary = ({ completedSteps, solutionsCount, submittedFeedback }: ProgressSummaryProps) => {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-green-800">Your Progress</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {Object.values(completedSteps).filter(Boolean).length}
              </div>
              <div className="text-sm text-green-600">Steps Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {solutionsCount}
              </div>
              <div className="text-sm text-green-600">Solutions Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {Object.values(submittedFeedback).filter(Boolean).length}
              </div>
              <div className="text-sm text-green-600">Feedback Provided</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
