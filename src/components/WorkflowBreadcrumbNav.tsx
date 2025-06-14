
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  XCircle, 
  SkipForward,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'skipped' | 'failed';
  optional?: boolean;
}

interface WorkflowBreadcrumbNavProps {
  steps: WorkflowStep[];
  currentStepId: string;
  onStepClick: (stepId: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canNavigateBack?: boolean;
  canNavigateForward?: boolean;
}

export const WorkflowBreadcrumbNav = ({
  steps,
  currentStepId,
  onStepClick,
  onPrevious,
  onNext,
  canNavigateBack = true,
  canNavigateForward = true
}: WorkflowBreadcrumbNavProps) => {
  const currentIndex = steps.findIndex(step => step.id === currentStepId);
  
  const getStepIcon = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-yellow-600" />;
      case 'active':
        return <Circle className="w-4 h-4 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepColor = (step: WorkflowStep, isClickable: boolean) => {
    if (!isClickable) return 'text-gray-400 cursor-not-allowed';
    
    switch (step.status) {
      case 'completed':
        return 'text-green-700 hover:text-green-800 cursor-pointer';
      case 'failed':
        return 'text-red-700 hover:text-red-800 cursor-pointer';
      case 'skipped':
        return 'text-yellow-700 hover:text-yellow-800 cursor-pointer';
      case 'active':
        return 'text-blue-700 font-medium cursor-pointer';
      default:
        return 'text-gray-600 hover:text-gray-700 cursor-pointer';
    }
  };

  const isStepClickable = (step: WorkflowStep, index: number) => {
    // Can click on completed, failed, skipped steps, or current step
    return ['completed', 'failed', 'skipped', 'active'].includes(step.status) ||
           // Can click on next step if current is completed
           (index === currentIndex + 1 && steps[currentIndex]?.status === 'completed');
  };

  const handleStepClick = (step: WorkflowStep, index: number) => {
    if (isStepClickable(step, index)) {
      onStepClick(step.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!canNavigateBack || currentIndex <= 0}
          className="flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>
        
        <div className="text-sm text-gray-600">
          Step {currentIndex + 1} of {steps.length}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!canNavigateForward || currentIndex >= steps.length - 1}
          className="flex items-center space-x-1"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Breadcrumb Steps */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const isClickable = isStepClickable(step, index);
          const isActive = step.id === currentStepId;
          
          return (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                  isActive 
                    ? 'bg-blue-100 border border-blue-200' 
                    : isClickable
                    ? 'hover:bg-gray-100'
                    : ''
                }`}
                onClick={() => handleStepClick(step, index)}
              >
                {getStepIcon(step)}
                <span 
                  className={`text-sm whitespace-nowrap ${getStepColor(step, isClickable)}`}
                >
                  {step.title}
                </span>
                {step.optional && (
                  <Badge variant="outline" className="text-xs">
                    Optional
                  </Badge>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Workflow Progress</span>
          <span>
            {steps.filter(s => s.status === 'completed').length} / {steps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};
