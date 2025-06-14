
import { WorkflowStep } from '@/types/workflow';

export const getInitialWorkflowSteps = (initialStep: string): WorkflowStep[] => [
  {
    id: 'analyze',
    title: 'Problem Analysis',
    description: 'AI analyzes your issue and generates tailored solutions',
    status: initialStep === 'analyze' ? 'active' : 'completed',
    estimatedTime: '30s',
    optional: false,
    category: 'analysis',
    validationRules: [
      {
        id: 'problem-description',
        description: 'Problem description must be provided',
        validator: () => true, // This would check if problem description exists
        errorMessage: 'Please provide a detailed problem description'
      }
    ]
  },
  {
    id: 'solutions',
    title: 'Review Solutions',
    description: 'Examine AI-generated solutions and community recommendations',
    status: initialStep === 'solutions' ? 'active' : initialStep === 'analyze' ? 'pending' : 'completed',
    estimatedTime: '2-5 min',
    optional: false,
    category: 'solution',
    requirements: ['analyze'],
    validationRules: [
      {
        id: 'solutions-available',
        description: 'At least one solution must be available',
        validator: () => true, // This would check if solutions exist
        errorMessage: 'No solutions available. Please run analysis first.'
      }
    ]
  },
  {
    id: 'execute',
    title: 'Execute Steps',
    description: 'Follow step-by-step instructions to resolve your issue',
    status: initialStep === 'execute' ? 'active' : ['analyze', 'solutions'].includes(initialStep) ? 'pending' : 'completed',
    estimatedTime: '5-15 min',
    optional: false,
    category: 'execution',
    requirements: ['analyze', 'solutions'],
    validationRules: [
      {
        id: 'solution-selected',
        description: 'A solution must be selected for execution',
        validator: () => true, // This would check if a solution is selected
        errorMessage: 'Please select a solution to execute'
      }
    ]
  },
  {
    id: 'collaborate',
    title: 'Team Collaboration',
    description: 'Share with team members and get additional input',
    status: initialStep === 'collaborate' ? 'active' : 'pending',
    estimatedTime: '2-10 min',
    optional: true,
    category: 'collaboration'
  },
  {
    id: 'feedback',
    title: 'Provide Feedback',
    description: 'Rate solutions and help improve the AI recommendations',
    status: initialStep === 'feedback' ? 'active' : 'pending',
    estimatedTime: '1-2 min',
    optional: false,
    category: 'feedback',
    requirements: ['execute']
  }
];
