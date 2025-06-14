
import { useState, useCallback } from 'react';
import { WorkflowStep } from '@/types/workflow';

export const useWorkflowValidation = (workflowSteps: WorkflowStep[]) => {
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const validateStep = useCallback(async (stepId: string): Promise<boolean> => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step?.validationRules) return true;

    const errors: string[] = [];
    
    for (const rule of step.validationRules) {
      try {
        const isValid = await rule.validator();
        if (!isValid) {
          errors.push(rule.errorMessage);
        }
      } catch (error) {
        errors.push(`Validation error: ${error}`);
      }
    }

    setValidationErrors(prev => ({ ...prev, [stepId]: errors }));
    return errors.length === 0;
  }, [workflowSteps]);

  return { validationErrors, validateStep };
};
