
import React from 'react';
import { SolutionCard } from '@/components/SolutionCard';

interface Solution {
  id: number;
  title: string;
  confidence: number;
  category: string;
  steps: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  successRate: number;
}

interface SolutionListProps {
  solutions: Solution[];
  completedSteps: {[key: string]: boolean};
  quickFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
  showDetailedFeedback: {[key: number]: boolean};
  submittedFeedback: {[key: number]: boolean};
  onToggleStep: (stepKey: string) => void;
  onQuickFeedback: (solutionId: number, type: 'helpful' | 'not-helpful') => void;
  onToggleDetailedFeedback: (solutionId: number) => void;
  onFeedbackSubmitted: (solutionId: number, feedback: any) => void;
  problemContext?: string;
}

export const SolutionList = ({
  solutions,
  completedSteps,
  quickFeedback,
  showDetailedFeedback,
  submittedFeedback,
  onToggleStep,
  onQuickFeedback,
  onToggleDetailedFeedback,
  onFeedbackSubmitted,
  problemContext
}: SolutionListProps) => {
  return (
    <div className="space-y-6">
      {solutions.map((solution, index) => (
        <SolutionCard
          key={solution.id}
          solution={solution}
          isRecommended={index === 0}
          completedSteps={completedSteps}
          quickFeedback={quickFeedback}
          showDetailedFeedback={showDetailedFeedback}
          submittedFeedback={submittedFeedback}
          onToggleStep={onToggleStep}
          onQuickFeedback={onQuickFeedback}
          onToggleDetailedFeedback={onToggleDetailedFeedback}
          onFeedbackSubmitted={onFeedbackSubmitted}
          problemContext={problemContext}
        />
      ))}
    </div>
  );
};
