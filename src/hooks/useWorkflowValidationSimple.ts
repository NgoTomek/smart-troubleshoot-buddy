
import { useState, useCallback } from 'react';
import { WorkflowStep } from '@/types/workflow';

export const useWorkflowValidationSimple = () => {
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const validateStep = useCallback(async (stepId: string): Promise<boolean> => {
    // Simulate validation logic
    const hasErrors = Math.random() < 0.1; // 10% chance of validation errors
    
    if (hasErrors) {
      setValidationErrors(prev => ({
        ...prev,
        [stepId]: ['This step requires additional information']
      }));
      return false;
    }

    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[stepId];
      return newErrors;
    });
    
    return true;
  }, []);

  const clearValidationErrors = useCallback((stepId?: string) => {
    if (stepId) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[stepId];
        return newErrors;
      });
    } else {
      setValidationErrors({});
    }
  }, []);

  return {
    validationErrors,
    validateStep,
    clearValidationErrors,
  };
};
