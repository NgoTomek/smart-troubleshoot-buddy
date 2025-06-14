
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  Timer
} from 'lucide-react';

interface WorkflowStepTimerProps {
  stepId: string;
  stepTitle: string;
  isActive: boolean;
  onTimeUpdate?: (stepId: string, timeSpent: number) => void;
}

export const WorkflowStepTimer = ({ 
  stepId, 
  stepTitle, 
  isActive,
  onTimeUpdate 
}: WorkflowStepTimerProps) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(isActive);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isActive && !isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
    } else if (!isActive && isRunning) {
      setIsRunning(false);
      if (startTime) {
        const additionalTime = Date.now() - startTime;
        const newTimeSpent = timeSpent + additionalTime;
        setTimeSpent(newTimeSpent);
        onTimeUpdate?.(stepId, Math.round(newTimeSpent / 1000));
      }
    }
  }, [isActive, isRunning, startTime, timeSpent, stepId, onTimeUpdate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const currentTime = Date.now() - startTime + timeSpent;
        const seconds = Math.floor(currentTime / 1000);
        if (seconds !== Math.floor(timeSpent / 1000)) {
          onTimeUpdate?.(stepId, seconds);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime, timeSpent, stepId, onTimeUpdate]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (startTime) {
        const additionalTime = Date.now() - startTime;
        setTimeSpent(prev => prev + additionalTime);
        setStartTime(null);
      }
    } else {
      setIsRunning(true);
      setStartTime(Date.now());
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeSpent(0);
    setStartTime(null);
    onTimeUpdate?.(stepId, 0);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    if (isRunning && startTime) {
      return timeSpent + (Date.now() - startTime);
    }
    return timeSpent;
  };

  return (
    <Card className={`transition-colors ${isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Timer className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              {stepTitle}
            </span>
            {isActive && (
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-lg font-mono font-bold text-gray-800">
              {formatTime(getCurrentTime())}
            </div>
            
            {isActive && (
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTimer}
                  className="h-8 w-8 p-0"
                >
                  {isRunning ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetTimer}
                  className="h-8 w-8 p-0"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {getCurrentTime() > 0 && (
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>
              Time tracking: {getCurrentTime() > 60000 ? 'Good focus time!' : 'Just getting started'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
