
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSolutionState = () => {
  const { toast } = useToast();
  const [quickFeedback, setQuickFeedback] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});
  const [showDetailedFeedback, setShowDetailedFeedback] = useState<{[key: number]: boolean}>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<{[key: number]: boolean}>({});

  const handleQuickFeedback = (solutionId: number, type: 'helpful' | 'not-helpful') => {
    setQuickFeedback(prev => ({ ...prev, [solutionId]: type }));
    
    toast({
      title: "Feedback Recorded",
      description: `Thank you for marking this solution as ${type === 'helpful' ? 'helpful' : 'not helpful'}!`,
      duration: 3000,
    });
  };

  const toggleDetailedFeedback = (solutionId: number) => {
    setShowDetailedFeedback(prev => ({ ...prev, [solutionId]: !prev[solutionId] }));
  };

  const handleFeedbackSubmitted = (solutionId: number, feedback: any) => {
    console.log('Detailed feedback submitted for solution', solutionId, feedback);
    setSubmittedFeedback(prev => ({ ...prev, [solutionId]: true }));
    setShowDetailedFeedback(prev => ({ ...prev, [solutionId]: false }));
    
    toast({
      title: "Detailed Feedback Submitted",
      description: "Your feedback will help improve our AI recommendations. Thank you!",
      duration: 4000,
    });
  };

  const toggleStep = (stepKey: string) => {
    const wasCompleted = completedSteps[stepKey];
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
    
    if (!wasCompleted) {
      toast({
        title: "Step Completed! 🎉",
        description: "Great progress! Keep going to solve your issue.",
        duration: 2000,
      });
    }
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
