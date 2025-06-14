
import React from 'react';
import { SolutionInsights } from '@/components/SolutionInsights';
import { SolutionCategories } from '@/components/SolutionCategories';
import { Solution } from '@/types/solution';

interface SolutionOverviewSectionProps {
  solutions: Solution[];
  completedSteps: { [key: string]: boolean };
  quickFeedback: { [key: number]: 'helpful' | 'not-helpful' | null };
}

export const SolutionOverviewSection = ({
  solutions,
  completedSteps,
  quickFeedback,
}: SolutionOverviewSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SolutionInsights 
        solutions={solutions}
        completedSteps={completedSteps}
        quickFeedback={quickFeedback}
      />
      
      <SolutionCategories solutions={solutions} />
    </div>
  );
};
