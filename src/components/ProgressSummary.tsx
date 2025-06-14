
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressMetric } from '@/components/ProgressMetric';

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
            <ProgressMetric
              value={Object.values(completedSteps).filter(Boolean).length}
              label="Steps Completed"
            />
            <ProgressMetric
              value={solutionsCount}
              label="Solutions Available"
            />
            <ProgressMetric
              value={Object.values(submittedFeedback).filter(Boolean).length}
              label="Feedback Provided"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
