
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Clock,
  Brain,
  Users,
  BookOpen,
  Lightbulb,
  Target
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  estimatedTime: string;
  optional: boolean;
}

interface WorkflowStepItemProps {
  step: WorkflowStep;
  onStepClick: (stepId: string) => void;
}

export const WorkflowStepItem = ({ step, onStepClick }: WorkflowStepItemProps) => {
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

  const handleClick = () => {
    if (step.status === 'active' || step.status === 'completed') {
      onStepClick(step.id);
    }
  };

  return (
    <div 
      className={`flex items-center space-x-4 p-3 rounded-lg transition-colors cursor-pointer ${
        step.status === 'active' 
          ? 'bg-blue-50 border border-blue-200' 
          : step.status === 'completed'
          ? 'bg-green-50 border border-green-200'
          : 'bg-white border border-gray-200 hover:bg-gray-50'
      }`}
      onClick={handleClick}
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
  );
};
