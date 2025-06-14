import React from 'react';
import { WorkflowProgressTracker } from '@/components/WorkflowProgressTracker';
import { WorkflowQuickActions } from '@/components/WorkflowQuickActions';
import { WorkflowStepValidator } from '@/components/WorkflowStepValidator';
import { WorkflowStepTimer } from '@/components/WorkflowStepTimer';
import { WorkflowAnalytics, WorkflowStep } from '@/types/workflow';

interface WorkflowTabContentProps {
  analytics: WorkflowAnalytics;
  currentStep: string;
  workflowSteps: WorkflowStep[];
  validationErrors: { [key: string]: string[] };
  handleStepSkip: (stepId: string) => boolean;
  handleStepAdvance: (stepId: string) => Promise<boolean>;
  onNavigate: (stepId: string) => void;
  handleQuickAction: (action: string) => void;
  validateStep: (stepId: string) => Promise<boolean>;
}

export const WorkflowTabContent = ({
  analytics,
  currentStep,
  workflowSteps,
  validationErrors,
  handleStepSkip,
  handleStepAdvance,
  onNavigate,
  handleQuickAction,
  validateStep,
}: WorkflowTabContentProps) => {
  return (
    <div className="space-y-4">
      <WorkflowProgressTracker 
        analytics={analytics}
        currentStep={currentStep}
      />
      
      <WorkflowQuickActions
        currentStepId={currentStep}
        canSkipCurrentStep={workflowSteps.find(s => s.id === currentStep)?.optional || false}
        canMarkComplete={true}
        onSkipStep={() => handleStepSkip(currentStep)}
        onMarkComplete={() => handleStepAdvance(currentStep)}
        onRestart={() => onNavigate('analyze')}
        onGetHelp={() => handleQuickAction('get-help')}
        onShareWorkflow={() => handleQuickAction('share')}
        onExportProgress={() => handleQuickAction('export')}
        onViewDocumentation={() => handleQuickAction('docs')}
      />
      
      <div className="space-y-4">
        <h3 className="font-medium text-slate-800">Workflow Steps</h3>
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="space-y-2">
            <WorkflowStepValidator
              step={step}
              validationErrors={validationErrors[step.id]}
              onValidate={validateStep}
              onAdvance={handleStepAdvance}
              onSkip={step.optional ? handleStepSkip : undefined}
            />
            
            {step.status === 'active' && (
              <WorkflowStepTimer
                stepId={step.id}
                stepTitle={step.title}
                isActive={true}
                onTimeUpdate={(stepId, time) => console.log('Time update:', stepId, time)}
              />
            )}
            
            {index < workflowSteps.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-px h-4 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
