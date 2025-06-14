
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Save, 
  Download, 
  Upload, 
  Trash2, 
  Copy,
  FileText,
  Star,
  Clock
} from 'lucide-react';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: any[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  isStarred: boolean;
  lastUsed: Date;
  usageCount: number;
}

interface WorkflowTemplateManagerProps {
  currentWorkflow: any[];
  onLoadTemplate: (template: WorkflowTemplate) => void;
  onSaveAsTemplate: (name: string, description: string) => void;
}

export const WorkflowTemplateManager = ({ 
  currentWorkflow, 
  onLoadTemplate, 
  onSaveAsTemplate 
}: WorkflowTemplateManagerProps) => {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([
    {
      id: '1',
      name: 'Network Connectivity Issues',
      description: 'Standard workflow for diagnosing network problems',
      category: 'Network',
      steps: [],
      estimatedTime: '15-20 min',
      difficulty: 'Medium',
      tags: ['network', 'connectivity', 'troubleshooting'],
      isStarred: true,
      lastUsed: new Date(),
      usageCount: 45
    },
    {
      id: '2',
      name: 'Performance Optimization',
      description: 'Workflow for improving system performance',
      category: 'Performance',
      steps: [],
      estimatedTime: '30-45 min',
      difficulty: 'Hard',
      tags: ['performance', 'optimization', 'system'],
      isStarred: false,
      lastUsed: new Date(Date.now() - 86400000),
      usageCount: 23
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSaveTemplate = () => {
    if (newTemplateName.trim()) {
      onSaveAsTemplate(newTemplateName, newTemplateDescription);
      setNewTemplateName('');
      setNewTemplateDescription('');
      setIsCreating(false);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleStarTemplate = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isStarred: !t.isStarred } : t
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => 
    filterCategory === 'all' || template.category.toLowerCase() === filterCategory
  );

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Workflow Templates</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              {templates.length} templates
            </Badge>
          </div>
          
          <Button
            size="sm"
            onClick={() => setIsCreating(true)}
            disabled={currentWorkflow.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Current
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Create New Template Form */}
        {isCreating && (
          <div className="p-4 bg-white rounded-lg border space-y-3">
            <h4 className="font-medium">Save Current Workflow as Template</h4>
            <Input
              placeholder="Template name"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={newTemplateDescription}
              onChange={(e) => setNewTemplateDescription(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveTemplate}>
                Save Template
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-700">Filter:</span>
          {['all', 'network', 'performance', 'security'].map(category => (
            <Button
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className="text-xs"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Templates List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-slate-900">{template.name}</h4>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    {template.isStarred && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{template.estimatedTime}</span>
                    </div>
                    <span>Used {template.usageCount} times</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStarTemplate(template.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Star className={`w-3 h-3 ${template.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLoadTemplate(template)}
                    className="h-6 w-6 p-0"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="h-6 w-6 p-0 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-6 text-blue-600">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No templates found</p>
            <p className="text-xs">Create your first template by saving the current workflow</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
