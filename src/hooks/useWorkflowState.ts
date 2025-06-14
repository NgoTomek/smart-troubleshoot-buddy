
import { useState, useEffect } from 'react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  estimatedTime: string;
  optional: boolean;
}

export const useWorkflowState = (currentStep: string) => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'analyze',
      title: 'Problem Analysis',
      description: 'AI analyzes your issue and generates tailored solutions',
      status: currentStep === 'analyze' ? 'active' : 'completed',
      estimatedTime: '30s',
      optional: false
    },
    {
      id: 'solutions',
      title: 'Review Solutions',
      description: 'Examine AI-generated solutions and community recommendations',
      status: currentStep === 'solutions' ? 'active' : currentStep === 'analyze' ? 'pending' : 'completed',
      estimatedTime: '2-5 min',
      optional: false
    },
    {
      id: 'execute',
      title: 'Execute Steps',
      description: 'Follow step-by-step instructions to resolve your issue',
      status: currentStep === 'execute' ? 'active' : ['analyze', 'solutions'].includes(currentStep) ? 'pending' : 'completed',
      estimatedTime: '5-15 min',
      optional: false
    },
    {
      id: 'collaborate',
      title: 'Team Collaboration',
      description: 'Share with team members and get additional input',
      status: currentStep === 'collaborate' ? 'active' : 'pending',
      estimatedTime: '2-10 min',
      optional: true
    },
    {
      id: 'feedback',
      title: 'Provide Feedback',
      description: 'Rate solutions and help improve the AI recommendations',
      status: currentStep === 'feedback' ? 'active' : 'pending',
      estimatedTime: '1-2 min',
      optional: false
    }
  ]);

  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
    const totalSteps = workflowSteps.filter(step => !step.optional).length;
    setOverallProgress((completedSteps / totalSteps) * 100);
  }, [workflowSteps, currentStep]);

  return {
    workflowSteps,
    overallProgress
  };
};
