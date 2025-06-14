
import { useState } from 'react';

export const useSolutionState = () => {
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

  return {
    quickFeedback,
    completedSteps,
    showDetailedFeedback,
    submittedFeedback,
    handleQuickFeedback,
    toggleDetailedFeedback,
    handleFeedbackSubmitted,
    toggleStep
  };
};
