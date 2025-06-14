
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  SkipForward, 
  RotateCcw, 
  CheckCircle, 
  BookOpen,
  Share2,
  Download,
  HelpCircle
} from 'lucide-react';

interface WorkflowQuickActionsProps {
  currentStepId: string;
  canSkipCurrentStep?: boolean;
  canMarkComplete?: boolean;
  canRestart?: boolean;
  onSkipStep: () => void;
  onMarkComplete: () => void;
  onRestart: () => void;
  onGetHelp: () => void;
  onShareWorkflow: () => void;
  onExportProgress: () => void;
  onViewDocumentation: () => void;
}

export const WorkflowQuickActions = ({
  currentStepId,
  canSkipCurrentStep = false,
  canMarkComplete = false,
  canRestart = true,
  onSkipStep,
  onMarkComplete,
  onRestart,
  onGetHelp,
  onShareWorkflow,
  onExportProgress,
  onViewDocumentation
}: WorkflowQuickActionsProps) => {
  const quickActions = [
    {
      id: 'complete',
      label: 'Mark Complete',
      description: 'Mark current step as completed',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50',
      borderColor: 'border-green-200',
      onClick: onMarkComplete,
      disabled: !canMarkComplete,
      primary: true
    },
    {
      id: 'skip',
      label: 'Skip Step',
      description: 'Skip current step if optional',
      icon: SkipForward,
      color: 'text-yellow-600',
      bgColor: 'hover:bg-yellow-50',
      borderColor: 'border-yellow-200',
      onClick: onSkipStep,
      disabled: !canSkipCurrentStep
    },
    {
      id: 'help',
      label: 'Get Help',
      description: 'AI assistance for current step',
      icon: HelpCircle,
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200',
      onClick: onGetHelp,
      disabled: false
    },
    {
      id: 'restart',
      label: 'Restart Workflow',
      description: 'Start over from the beginning',
      icon: RotateCcw,
      color: 'text-purple-600',
      bgColor: 'hover:bg-purple-50',
      borderColor: 'border-purple-200',
      onClick: onRestart,
      disabled: !canRestart
    }
  ];

  const utilityActions = [
    {
      id: 'share',
      label: 'Share',
      icon: Share2,
      onClick: onShareWorkflow
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      onClick: onExportProgress
    },
    {
      id: 'docs',
      label: 'Docs',
      icon: BookOpen,
      onClick: onViewDocumentation
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-indigo-600" />
          <span>Quick Actions</span>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
            {currentStepId}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-start space-y-2 transition-colors ${
                action.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : `${action.bgColor} ${action.borderColor}`
              } ${action.primary ? 'border-2' : ''}`}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              <div className="flex items-center space-x-2 w-full">
                <action.icon className={`w-4 h-4 ${action.color}`} />
                <span className="font-medium text-left">{action.label}</span>
              </div>
              <p className="text-xs text-slate-600 text-left">
                {action.description}
              </p>
            </Button>
          ))}
        </div>

        {/* Utility Actions */}
        <div className="pt-2 border-t border-indigo-200">
          <div className="flex justify-center space-x-2">
            {utilityActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="flex items-center space-x-1"
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Status Info */}
        <div className="text-center pt-2 border-t border-indigo-200">
          <p className="text-xs text-indigo-700">
            Use these actions to efficiently navigate and manage your workflow
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
