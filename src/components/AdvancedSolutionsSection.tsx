
import React from 'react';
import { SolutionRecommendationEngine } from '@/components/SolutionRecommendationEngine';
import { CommunitySolutions } from '@/components/CommunitySolutions';
import { SolutionEffectivenessTracker } from '@/components/SolutionEffectivenessTracker';
import { Solution } from '@/types/solution';

interface AdvancedSolutionsSectionProps {
  problemContext: string;
  solutions: Solution[];
  onRecommendationUpdate: (recommendations: any[]) => void;
  onCommunitySolutionSelect: (solution: any) => void;
  onEffectivenessUpdate: (data: any[]) => void;
}

export const AdvancedSolutionsSection = ({
  problemContext,
  solutions,
  onRecommendationUpdate,
  onCommunitySolutionSelect,
  onEffectivenessUpdate,
}: AdvancedSolutionsSectionProps) => {
  return (
    <>
      <SolutionRecommendationEngine
        currentProblem={problemContext}
        onRecommendationUpdate={onRecommendationUpdate}
      />

      <CommunitySolutions
        problemCategory={solutions[0]?.category || 'General'}
        onSolutionSelect={onCommunitySolutionSelect}
      />
      
      <SolutionEffectivenessTracker
        solutions={solutions}
        onEffectivenessUpdate={onEffectivenessUpdate}
      />
    </>
  );
};
