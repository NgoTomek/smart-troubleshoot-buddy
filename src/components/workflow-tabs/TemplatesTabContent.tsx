
import React from 'react';
import { WorkflowTemplateManager } from '@/components/WorkflowTemplateManager';
import { WorkflowExportImport } from '@/components/WorkflowExportImport';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';

interface TemplatesTabContentProps {
  workflowSteps: WorkflowStep[];
  analytics: WorkflowAnalytics;
  onLoadTemplate: (template: any) => void;
  onSaveAsTemplate: (name: string, description: string) => void;
  onImportWorkflow: (workflow: any) => void;
  onImportProgress: (progress: any) => void;
}

export const TemplatesTabContent = ({
  workflowSteps,
  analytics,
  onLoadTemplate,
  onSaveAsTemplate,
  onImportWorkflow,
  onImportProgress
}: TemplatesTabContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WorkflowTemplateManager
        currentWorkflow={workflowSteps}
        onLoadTemplate={onLoadTemplate}
        onSaveAsTemplate={onSaveAsTemplate}
      />
      
      <WorkflowExportImport
        currentWorkflow={workflowSteps}
        currentProgress={analytics}
        onImportWorkflow={onImportWorkflow}
        onImportProgress={onImportProgress}
      />
    </div>
  );
};
