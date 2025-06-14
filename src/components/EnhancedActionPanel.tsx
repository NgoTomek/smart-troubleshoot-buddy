
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  SkipForward, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Zap,
  HelpCircle
} from 'lucide-react';

interface EnhancedActionPanelProps {
  currentStepId: string;
  currentStepTitle: string;
  canAdvance: boolean;
  canSkip: boolean;
  isValidating: boolean;
  validationProgress: number;
  onAdvance: () => Promise<void>;
  onSkip: () => void;
  onRestart: () => void;
  onHelp: () => void;
  onValidate: () => Promise<void>;
  estimatedTime?: string;
  lastActionResult?: 'success' | 'error' | 'warning' | null;
}

export const EnhancedActionPanel = ({
  currentStepId,
  currentStepTitle,
  canAdvance,
  canSkip,
  isValidating,
  validationProgress,
  onAdvance,
  onSkip,
  onRestart,
  onHelp,
  onValidate,
  estimatedTime,
  lastActionResult
}: EnhancedActionPanelProps) => {
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAdvance = async () => {
    setIsAdvancing(true);
    try {
      await onAdvance();
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } finally {
      setIsAdvancing(false);
    }
  };

  const getResultIcon = () => {
    switch (lastActionResult) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getResultMessage = () => {
    switch (lastActionResult) {
      case 'success':
        return 'Action completed successfully!';
      case 'error':
        return 'There was an error. Please try again.';
      case 'warning':
        return 'Action completed with warnings.';
      default:
        return null;
    }
  };

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-lg">Action Center</span>
          </div>
          {estimatedTime && (
            <Badge variant="outline" className="bg-orange-100 text-orange-700">
              <Clock className="w-3 h-3 mr-1" />
              {estimatedTime}
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-orange-700">
          Current Step: <span className="font-medium">{currentStepTitle}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Validation Progress */}
        {isValidating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Validating step...</span>
              <span className="text-slate-600">{validationProgress}%</span>
            </div>
            <Progress value={validationProgress} className="h-2" />
          </div>
        )}

        {/* Last Action Result */}
        {lastActionResult && (
          <div className={`p-3 rounded-md flex items-center space-x-2 ${
            lastActionResult === 'success' ? 'bg-green-100 border border-green-200' :
            lastActionResult === 'error' ? 'bg-red-100 border border-red-200' :
            'bg-yellow-100 border border-yellow-200'
          }`}>
            {getResultIcon()}
            <span className="text-sm font-medium">{getResultMessage()}</span>
          </div>
        )}

        {/* Success Confirmation */}
        {showConfirmation && (
          <div className="p-3 bg-green-100 border border-green-200 rounded-md flex items-center space-x-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Step advanced successfully!
            </span>
          </div>
        )}

        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onValidate}
            variant="outline"
            disabled={isValidating || isAdvancing}
            className="flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Validate</span>
          </Button>

          <Button
            onClick={handleAdvance}
            disabled={!canAdvance || isValidating || isAdvancing}
            className="bg-orange-600 hover:bg-orange-700 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{isAdvancing ? 'Advancing...' : 'Complete Step'}</span>
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-2">
          {canSkip && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSkip}
              disabled={isValidating || isAdvancing}
              className="flex items-center space-x-1"
            >
              <SkipForward className="w-3 h-3" />
              <span>Skip</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            disabled={isValidating || isAdvancing}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onHelp}
            className="flex items-center space-x-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Help</span>
          </Button>
        </div>

        {/* Step Navigation Hint */}
        <div className="text-xs text-slate-500 text-center p-2 bg-white rounded border">
          💡 Use the breadcrumb navigation above to jump between completed steps
        </div>
      </CardContent>
    </Card>
  );
};
