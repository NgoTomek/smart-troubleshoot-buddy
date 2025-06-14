
import React from 'react';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { AIInsightsEngine } from '@/components/AIInsightsEngine';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { Solution } from '@/types/solution';

interface AnalyticsSectionProps {
  solutions: Solution[];
  extractedText: string;
  problemContext: string;
}

export const AnalyticsSection = ({ solutions, extractedText, problemContext }: AnalyticsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <AnalysisDashboard 
        solutions={solutions}
        extractedText={extractedText}
      />
      
      <AIInsightsEngine
        problemContext={problemContext}
        solutions={solutions}
      />

      <PerformanceMonitor />
    </div>
  );
};
