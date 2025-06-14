
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  SkipForward, 
  CheckCircle, 
  RotateCcw, 
  HelpCircle, 
  Share, 
  Download,
  BookOpen
} from 'lucide-react';

interface WorkflowQuickActionsProps {
  currentStepId: string;
  canSkipCurrentStep: boolean;
  canMarkComplete: boolean;
  onSkipStep: () => void;
  onMarkComplete: () => void;
  onRestart: () => void;
  onGetHelp: () => void;
  onShareWorkflow: () => void;
  onExportProgress: () => void;
  onViewDocumentation: () => void;
}

export const WorkflowQuickActions = ({
  canSkipCurrentStep,
  canMarkComplete,
  onSkipStep,
  onMarkComplete,
  onRestart,
  onGetHelp,
  onShareWorkflow,
  onExportProgress,
  onViewDocumentation,
}: WorkflowQuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {canSkipCurrentStep && (
            <Button variant="outline" size="sm" onClick={onSkipStep}>
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Step
            </Button>
          )}
          
          {canMarkComplete && (
            <Button variant="default" size="sm" onClick={onMarkComplete}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
          
          <Button variant="outline" size="sm" onClick={onRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          
          <Button variant="outline" size="sm" onClick={onGetHelp}>
            <HelpCircle className="w-4 h-4 mr-2" />
            Get Help
          </Button>
          
          <Button variant="outline" size="sm" onClick={onShareWorkflow}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" size="sm" onClick={onExportProgress}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm" onClick={onViewDocumentation} className="col-span-2">
            <BookOpen className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
