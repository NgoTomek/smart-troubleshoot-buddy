
import React from 'react';
import { useAdvancedWorkflowState } from '@/hooks/useAdvancedWorkflowState';
import { TroubleshootingWorkflow } from '@/components/TroubleshootingWorkflow';

export const WorkflowManager = () => {
  const {
    workflowSteps,
    currentStep,
    validationErrors,
    stepDurations,
    advanceToStep,
    skipStep,
    validateStep,
    getAnalytics,
  } = useAdvancedWorkflowState('solutions');

  const handleWorkflowStepChange = (stepId: string) => {
    advanceToStep(stepId);
  };

  return (
    <TroubleshootingWorkflow
      workflowSteps={workflowSteps}
      currentStep={currentStep}
      onStepChange={handleWorkflowStepChange}
      validationErrors={validationErrors}
      advanceToStep={advanceToStep}
      skipStep={skipStep}
      validateStep={validateStep}
      getAnalytics={getAnalytics}
      stepDurations={stepDurations}
    />
  );
};
