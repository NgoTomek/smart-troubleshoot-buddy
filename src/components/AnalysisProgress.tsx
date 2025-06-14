
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from './LoadingSpinner';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
}

export const AnalysisProgress = ({ isAnalyzing }: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const steps = [
    'Analyzing extracted text...',
    'Identifying error patterns...',
    'Searching solution database...',
    'Ranking solutions by relevance...',
    'Preparing recommendations...'
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep('');
      return;
    }

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        setProgress((stepIndex + 1) * 20);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <LoadingSpinner size="sm" />
            <h3 className="font-semibold text-slate-900">Analyzing your problem...</h3>
          </div>
          
          <Progress value={progress} className="w-full" />
          
          <div className="text-sm text-slate-600">
            {currentStep}
          </div>
          
          <div className="text-xs text-slate-500">
            This usually takes 2-5 seconds
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
