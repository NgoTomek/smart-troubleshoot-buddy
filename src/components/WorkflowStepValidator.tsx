
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  PlayCircle 
} from 'lucide-react';
import { WorkflowStep } from '@/hooks/useAdvancedWorkflowState';

interface WorkflowStepValidatorProps {
  step: WorkflowStep;
  validationErrors?: string[];
  onValidate: (stepId: string) => Promise<boolean>;
  onAdvance: (stepId: string) => Promise<boolean>;
  onSkip?: (stepId: string) => boolean;
  isValidating?: boolean;
}

export const WorkflowStepValidator = ({ 
  step, 
  validationErrors = [], 
  onValidate, 
  onAdvance, 
  onSkip,
  isValidating = false 
}: WorkflowStepValidatorProps) => {
  const [isRunningValidation, setIsRunningValidation] = useState(false);
  const [lastValidationResult, setLastValidationResult] = useState<boolean | null>(null);

  const handleValidate = async () => {
    setIsRunningValidation(true);
    try {
      const result = await onValidate(step.id);
      setLastValidationResult(result);
    } finally {
      setIsRunningValidation(false);
    }
  };

  const handleAdvance = async () => {
    const success = await onAdvance(step.id);
    if (success) {
      setLastValidationResult(null);
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed': return 'border-green-200 bg-green-50';
      case 'failed': return 'border-red-200 bg-red-50';
      case 'active': return 'border-blue-200 bg-blue-50';
      case 'skipped': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (step.status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'active': return <PlayCircle className="w-5 h-5 text-blue-600" />;
      case 'skipped': return <RefreshCw className="w-5 h-5 text-yellow-600" />;
      default: return <PlayCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const hasValidationRules = step.validationRules && step.validationRules.length > 0;
  const hasErrors = validationErrors.length > 0;
  const canProceed = step.status === 'active' && (!hasValidationRules || (lastValidationResult === true && !hasErrors));

  return (
    <Card className={`transition-colors ${getStatusColor()}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>{step.title}</span>
            {step.optional && (
              <Badge variant="outline" className="text-xs">
                Optional
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {step.estimatedTime}
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-600">{step.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Requirements */}
        {step.requirements && step.requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Requirements:</h4>
            <div className="flex flex-wrap gap-1">
              {step.requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Validation Rules */}
        {hasValidationRules && (
          <div>
            <h4 className="text-sm font-medium mb-2">Validation Rules:</h4>
            <div className="space-y-2">
              {step.validationRules!.map((rule, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{rule.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {hasErrors && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="space-y-1">
                {validationErrors.map((error, index) => (
                  <div key={index} className="text-sm">• {error}</div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Validation Success */}
        {lastValidationResult === true && !hasErrors && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              All validation checks passed! You can proceed to the next step.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        {step.status === 'active' && (
          <div className="flex space-x-2">
            {hasValidationRules && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleValidate}
                disabled={isRunningValidation || isValidating}
              >
                {isRunningValidation ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Validate
              </Button>
            )}
            
            <Button
              size="sm"
              onClick={handleAdvance}
              disabled={hasValidationRules && !canProceed}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              {hasValidationRules ? 'Proceed' : 'Start'}
            </Button>
            
            {step.optional && onSkip && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSkip(step.id)}
              >
                Skip
              </Button>
            )}
          </div>
        )}

        {/* Step Status Info */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Category: {step.category}</span>
            <span>Status: {step.status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
