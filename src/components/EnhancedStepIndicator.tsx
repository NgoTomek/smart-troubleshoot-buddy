
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  SkipForward, 
  XCircle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';

interface EnhancedStepIndicatorProps {
  step: WorkflowStep;
  isActive: boolean;
  isCompleted: boolean;
  stepNumber: number;
  totalSteps: number;
  onStepClick: () => void;
  onHelp: () => void;
  estimatedTime?: string;
}

export const EnhancedStepIndicator = ({
  step,
  isActive,
  isCompleted,
  stepNumber,
  totalSteps,
  onStepClick,
  onHelp,
  estimatedTime
}: EnhancedStepIndicatorProps) => {
  const getStepIcon = () => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'skipped':
        return <SkipForward className="w-6 h-6 text-yellow-600" />;
      case 'active':
        return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStepColor = () => {
    switch (step.status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      case 'skipped':
        return 'border-yellow-200 bg-yellow-50';
      case 'active':
        return 'border-blue-200 bg-blue-50 shadow-md';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getPriorityColor = () => {
    if (step.priority === 'high') return 'bg-red-100 text-red-800';
    if (step.priority === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div 
      className={`relative p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-lg ${getStepColor()}`}
      onClick={onStepClick}
    >
      {/* Step Number Badge */}
      <div className="absolute -top-2 -left-2">
        <Badge variant="outline" className="bg-white border-2 font-semibold">
          {stepNumber}/{totalSteps}
        </Badge>
      </div>

      {/* Help Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onHelp();
        }}
        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-60 hover:opacity-100"
      >
        <HelpCircle className="w-4 h-4" />
      </Button>

      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getStepIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-slate-900 truncate">
                {step.title}
              </h3>
              {step.priority && (
                <Badge className={`text-xs ${getPriorityColor()}`}>
                  {step.priority}
                </Badge>
              )}
              {step.optional && (
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-slate-600 line-clamp-2">
              {step.description}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            {estimatedTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{estimatedTime}</span>
              </div>
            )}
            
            {step.difficulty && (
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{step.difficulty}</span>
              </div>
            )}
          </div>
          
          {isActive && (
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="font-medium">Current</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Progress Bar for Active Step */}
        {isActive && (
          <div className="w-full bg-blue-200 rounded-full h-1">
            <div className="bg-blue-600 h-1 rounded-full w-1/3 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
