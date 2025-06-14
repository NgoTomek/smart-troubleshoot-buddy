
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Clock,
  Target,
  Brain,
  Users,
  BookOpen,
  Lightbulb
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  estimatedTime: string;
  optional: boolean;
}

interface TroubleshootingWorkflowProps {
  currentStep: string;
  onStepChange: (stepId: string) => void;
  problemContext: string;
}

export const TroubleshootingWorkflow = ({ 
  currentStep, 
  onStepChange, 
  problemContext 
}: TroubleshootingWorkflowProps) => {
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

  const getStepIcon = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active': return <Circle className="w-5 h-5 text-blue-600 animate-pulse" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getWorkflowIcon = (stepId: string) => {
    switch (stepId) {
      case 'analyze': return <Brain className="w-4 h-4" />;
      case 'solutions': return <Lightbulb className="w-4 h-4" />;
      case 'execute': return <Target className="w-4 h-4" />;
      case 'collaborate': return <Users className="w-4 h-4" />;
      case 'feedback': return <BookOpen className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const handleStepClick = (stepId: string) => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (step && (step.status === 'active' || step.status === 'completed')) {
      onStepChange(stepId);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Troubleshooting Workflow</span>
          </div>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
            {Math.round(overallProgress)}% Complete
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <Progress value={overallProgress} className="h-2" />
          <p className="text-sm text-indigo-700">
            Follow this guided workflow to systematically resolve your issue
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.id}>
            <div 
              className={`flex items-center space-x-4 p-3 rounded-lg transition-colors cursor-pointer ${
                step.status === 'active' 
                  ? 'bg-blue-50 border border-blue-200' 
                  : step.status === 'completed'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="flex-shrink-0">
                {getStepIcon(step)}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  {getWorkflowIcon(step.id)}
                  <h4 className="font-medium text-slate-900">{step.title}</h4>
                  {step.optional && (
                    <Badge variant="outline" className="text-xs">Optional</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{step.description}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Est. {step.estimatedTime}</span>
                </div>
              </div>
              
              {step.status === 'active' && (
                <ArrowRight className="w-4 h-4 text-blue-600" />
              )}
            </div>
            
            {index < workflowSteps.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-px h-4 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
        
        <Separator />
        
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-3">
            Need help with any step? Our AI assistant is here to guide you.
          </p>
          <Button variant="outline" size="sm">
            <Brain className="w-4 h-4 mr-2" />
            Ask AI Assistant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
