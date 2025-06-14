
import { useState, useCallback } from 'react';

export const useWorkflowTimers = () => {
    const [stepStartTime, setStepStartTime] = useState<{ [key: string]: number }>({});
    const [stepDurations, setStepDurations] = useState<{ [key: string]: number }>({});

    const startStepTimer = useCallback((stepId: string) => {
        setStepStartTime(prev => ({ ...prev, [stepId]: Date.now() }));
    }, []);

    const endStepTimer = useCallback((stepId: string) => {
        if (stepStartTime[stepId]) {
            const duration = Date.now() - stepStartTime[stepId];
            setStepDurations(prev => ({ ...prev, [stepId]: duration }));
        }
    }, [stepStartTime]);
    
    return { stepDurations, startStepTimer, endStepTimer };
};
