
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Play,
  SkipForward
} from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';

interface WorkflowStepValidatorProps {
  step: WorkflowStep;
  validationErrors?: string[];
  onValidate: (stepId: string) => Promise<boolean>;
  onAdvance: (stepId: string) => Promise<boolean>;
  onSkip?: (stepId: string) => boolean;
}

export const WorkflowStepValidator = ({
  step,
  validationErrors,
  onValidate,
  onAdvance,
  onSkip,
}: WorkflowStepValidatorProps) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      await onValidate(step.id);
    } finally {
      setIsValidating(false);
    }
  };

  const handleAdvance = async () => {
    setIsAdvancing(true);
    try {
      await onAdvance(step.id);
    } finally {
      setIsAdvancing(false);
    }
  };

  const getStatusIcon = () => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 border-green-200';
      case 'active':
        return 'bg-blue-100 border-blue-200';
      case 'failed':
        return 'bg-red-100 border-red-200';
      case 'skipped':
        return 'bg-gray-100 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className={getStatusColor()}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>{step.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {step.status}
            </Badge>
            {step.optional && (
              <Badge variant="secondary" className="text-xs">
                Optional
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        {step.description && (
          <p className="text-sm text-slate-600 mb-3">{step.description}</p>
        )}
        
        {validationErrors && validationErrors.length > 0 && (
          <Alert className="mb-3">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <ul className="list-disc list-inside text-sm">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        {step.status === 'active' && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleValidate}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Validate'}
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleAdvance}
              disabled={isAdvancing}
            >
              <Play className="w-3 h-3 mr-1" />
              {isAdvancing ? 'Advancing...' : 'Complete'}
            </Button>
            
            {step.optional && onSkip && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSkip(step.id)}
              >
                <SkipForward className="w-3 h-3 mr-1" />
                Skip
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
