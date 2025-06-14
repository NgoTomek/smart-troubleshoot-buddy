
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  FolderOpen, 
  Star, 
  Clock,
  FileText,
  Trash2
} from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: Date;
  isStarred: boolean;
  usageCount: number;
}

interface WorkflowTemplateManagerProps {
  currentWorkflow: WorkflowStep[];
  onLoadTemplate: (template: WorkflowTemplate) => void;
  onSaveAsTemplate: (name: string, description: string) => void;
}

export const WorkflowTemplateManager = ({
  currentWorkflow,
  onLoadTemplate,
  onSaveAsTemplate,
}: WorkflowTemplateManagerProps) => {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Mock templates - in a real app, these would come from a database
  const [templates] = useState<WorkflowTemplate[]>([
    {
      id: '1',
      name: 'Basic Troubleshooting',
      description: 'Standard workflow for common technical issues',
      steps: currentWorkflow,
      createdAt: new Date('2024-01-15'),
      isStarred: true,
      usageCount: 45
    },
    {
      id: '2',
      name: 'Advanced Diagnostics',
      description: 'Comprehensive workflow for complex system issues',
      steps: currentWorkflow,
      createdAt: new Date('2024-02-01'),
      isStarred: false,
      usageCount: 23
    },
    {
      id: '3',
      name: 'Network Issues',
      description: 'Specialized workflow for network connectivity problems',
      steps: currentWorkflow,
      createdAt: new Date('2024-02-10'),
      isStarred: true,
      usageCount: 67
    }
  ]);

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) return;
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save
      onSaveAsTemplate(templateName, templateDescription);
      setTemplateName('');
      setTemplateDescription('');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Save Current Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span>Save Current Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Describe when to use this template..."
              rows={3}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-600">
              Current workflow has {currentWorkflow.length} steps
            </div>
            <Button 
              onClick={handleSaveTemplate}
              disabled={!templateName.trim() || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Load Existing Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="w-5 h-5" />
            <span>Load Template</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-6">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No templates saved yet</p>
              <p className="text-sm text-gray-500">Save your first workflow as a template above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{template.name}</h4>
                      {template.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onLoadTemplate(template)}
                      >
                        Load
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {template.description && (
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>{template.steps.length} steps</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(template.createdAt)}</span>
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Used {template.usageCount} times
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
