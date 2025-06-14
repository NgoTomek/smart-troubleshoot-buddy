
import React, { useState } from 'react';
import { SolutionHeader } from '@/components/SolutionHeader';
import { ProblemSummary } from '@/components/ProblemSummary';
import { SolutionCard } from '@/components/SolutionCard';
import { ProgressSummary } from '@/components/ProgressSummary';

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

interface SolutionDisplayProps {
  solutions: Solution[];
  extractedText: string;
  contextData: any;
  onStartOver: () => void;
}

export const SolutionDisplay = ({ solutions, extractedText, contextData, onStartOver }: SolutionDisplayProps) => {
  const [quickFeedback, setQuickFeedback] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});
  const [showDetailedFeedback, setShowDetailedFeedback] = useState<{[key: number]: boolean}>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<{[key: number]: boolean}>({});

  const handleQuickFeedback = (solutionId: number, type: 'helpful' | 'not-helpful') => {
    setQuickFeedback(prev => ({ ...prev, [solutionId]: type }));
  };

  const toggleDetailedFeedback = (solutionId: number) => {
    setShowDetailedFeedback(prev => ({ ...prev, [solutionId]: !prev[solutionId] }));
  };

  const handleFeedbackSubmitted = (solutionId: number, feedback: any) => {
    console.log('Detailed feedback submitted for solution', solutionId, feedback);
    setSubmittedFeedback(prev => ({ ...prev, [solutionId]: true }));
    setShowDetailedFeedback(prev => ({ ...prev, [solutionId]: false }));
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  return (
    <div className="space-y-6">
      <SolutionHeader onStartOver={onStartOver} />
      
      <ProblemSummary 
        extractedText={extractedText} 
        contextData={contextData} 
      />

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
            onToggleStep={toggleStep}
            onQuickFeedback={handleQuickFeedback}
            onToggleDetailedFeedback={toggleDetailedFeedback}
            onFeedbackSubmitted={handleFeedbackSubmitted}
          />
        ))}
      </div>

      <ProgressSummary
        completedSteps={completedSteps}
        solutionsCount={solutions.length}
        submittedFeedback={submittedFeedback}
      />
    </div>
  );
};
