
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Target, Brain } from 'lucide-react';
import { useAdvancedWorkflowState } from '@/hooks/useAdvancedWorkflowState';
import { WorkflowProgressTracker } from '@/components/WorkflowProgressTracker';
import { WorkflowStepValidator } from '@/components/WorkflowStepValidator';

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
  const {
    workflowSteps,
    validationErrors,
    advanceToStep,
    skipStep,
    validateStep,
    getAnalytics
  } = useAdvancedWorkflowState(currentStep);

  const analytics = getAnalytics();

  const handleStepAdvance = async (stepId: string) => {
    const success = await advanceToStep(stepId);
    if (success) {
      onStepChange(stepId);
    }
    return success;
  };

  const handleStepSkip = (stepId: string) => {
    const success = skipStep(stepId);
    if (success) {
      // Find the next available step
      const currentIndex = workflowSteps.findIndex(s => s.id === stepId);
      const nextStep = workflowSteps.find((step, index) => 
        index > currentIndex && step.status === 'pending'
      );
      if (nextStep) {
        onStepChange(nextStep.id);
      }
    }
    return success;
  };

  return (
    <div className="space-y-6">
      {/* Main Workflow Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Advanced Troubleshooting Workflow</span>
            </div>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
              {analytics.progressPercent}% Complete
            </Badge>
          </CardTitle>
          <p className="text-sm text-indigo-700">
            Follow this intelligent workflow to systematically resolve your issue with validation and insights.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Tracker */}
          <WorkflowProgressTracker 
            analytics={analytics}
            currentStep={currentStep}
          />
          
          <Separator />
          
          {/* Workflow Steps */}
          <div className="space-y-4">
            <h3 className="font-medium text-slate-800">Workflow Steps</h3>
            {workflowSteps.map((step, index) => (
              <div key={step.id}>
                <WorkflowStepValidator
                  step={step}
                  validationErrors={validationErrors[step.id]}
                  onValidate={validateStep}
                  onAdvance={handleStepAdvance}
                  onSkip={step.optional ? handleStepSkip : undefined}
                />
                
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-px h-4 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Separator />
          
          {/* AI Assistant */}
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-3">
              Need help with any step? Our AI assistant provides contextual guidance.
            </p>
            <Button variant="outline" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              Get AI Assistance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
