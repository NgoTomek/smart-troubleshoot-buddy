
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTroubleshootingHistory } from '@/hooks/useTroubleshootingHistory';
import { Solution } from '@/types/solution';

export const useSolutionState = (solutions?: Solution[], problemDescription?: string) => {
  const { toast } = useToast();
  const { addSession } = useTroubleshootingHistory();
  const [quickFeedback, setQuickFeedback] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});
  const [showDetailedFeedback, setShowDetailedFeedback] = useState<{[key: number]: boolean}>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<{[key: number]: boolean}>({});
  const [sessionStartTime] = useState<number>(Date.now());

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

      // Check if all steps are completed and save session
      if (solutions && problemDescription) {
        const totalSteps = solutions.reduce((acc, solution) => acc + solution.steps.length, 0);
        const newCompletedSteps = { ...completedSteps, [stepKey]: true };
        const completedCount = Object.values(newCompletedSteps).filter(Boolean).length;
        
        if (completedCount === totalSteps) {
          const timeSpent = Math.round((Date.now() - sessionStartTime) / 60000);
          const primaryCategory = solutions[0]?.category || 'General';
          const avgConfidence = solutions.reduce((acc, sol) => acc + sol.confidence, 0) / solutions.length;
          
          addSession({
            problemDescription,
            solutionsFound: solutions.length,
            stepsCompleted: completedCount,
            totalSteps,
            status: 'completed',
            category: primaryCategory,
            confidence: avgConfidence,
            timeSpent: `${timeSpent} minutes`
          });
          
          toast({
            title: "🎉 Session Complete!",
            description: "All steps completed! Your session has been saved to history.",
            duration: 5000,
          });
        }
      }
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
