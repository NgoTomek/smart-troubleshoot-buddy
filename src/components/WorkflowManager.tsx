
import React from 'react';
import { useAdvancedWorkflowState } from '@/hooks/useAdvancedWorkflowState';
import { TroubleshootingWorkflow } from '@/components/TroubleshootingWorkflow';

export const WorkflowManager = () => {
  const {
    workflowSteps,
    viewedStepId,
    validationErrors,
    stepDurations,
    advanceToStep,
    skipStep,
    validateStep,
    getAnalytics,
    navigateToStep,
  } = useAdvancedWorkflowState('solutions');

  return (
    <TroubleshootingWorkflow
      workflowSteps={workflowSteps}
      currentStep={viewedStepId}
      onNavigate={navigateToStep}
      validationErrors={validationErrors}
      advanceToStep={advanceToStep}
      skipStep={skipStep}
      validateStep={validateStep}
      getAnalytics={getAnalytics}
      stepDurations={stepDurations}
    />
  );
};
