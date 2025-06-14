
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Target, Brain } from 'lucide-react';
import { useWorkflowState } from '@/hooks/useWorkflowState';
import { WorkflowStepItem } from '@/components/WorkflowStepItem';

interface TroubleshootingWorkflowProps {
  currentStep: string;
  onStepChange: (stepId: string) => void;
  problemContext: string;
}

export const TroubleshootingWorkflow = ({ 
  currentStep, 
  onStepChange, 
  problemContext 
}: TroubleshootingWorkflowProps) => {
  const { workflowSteps, overallProgress } = useWorkflowState(currentStep);

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Troubleshooting Workflow</span>
          </div>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
            {Math.round(overallProgress)}% Complete
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <Progress value={overallProgress} className="h-2" />
          <p className="text-sm text-indigo-700">
            Follow this guided workflow to systematically resolve your issue
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.id}>
            <WorkflowStepItem 
              step={step} 
              onStepClick={onStepChange}
            />
            
            {index < workflowSteps.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-px h-4 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
        
        <Separator />
        
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-3">
            Need help with any step? Our AI assistant is here to guide you.
          </p>
          <Button variant="outline" size="sm">
            <Brain className="w-4 h-4 mr-2" />
            Ask AI Assistant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
