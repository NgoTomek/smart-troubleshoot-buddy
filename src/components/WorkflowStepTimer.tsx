
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface WorkflowStepTimerProps {
  stepId: string;
  stepTitle: string;
  isActive: boolean;
  onTimeUpdate: (stepId: string, time: number) => void;
}

export const WorkflowStepTimer = ({
  stepId,
  stepTitle,
  isActive,
  onTimeUpdate,
}: WorkflowStepTimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      onTimeUpdate(stepId, elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, stepId, onTimeUpdate]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  if (!isActive) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="py-2">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-blue-800">
            Working on "{stepTitle}" for {formatTime(elapsedTime)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
