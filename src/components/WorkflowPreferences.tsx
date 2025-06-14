
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Bell,
  Clock,
  Eye,
  Zap,
  Volume2
} from 'lucide-react';

interface WorkflowPreference {
  id: string;
  category: 'notifications' | 'timing' | 'display' | 'automation';
  label: string;
  description: string;
  type: 'boolean' | 'select' | 'number';
  value: any;
  options?: { value: string; label: string; }[];
  min?: number;
  max?: number;
}

interface WorkflowPreferencesProps {
  preferences: WorkflowPreference[];
  onPreferenceChange: (id: string, value: any) => void;
  onSavePreferences: () => void;
  onResetToDefaults: () => void;
  hasUnsavedChanges?: boolean;
}

export const WorkflowPreferences = ({ 
  preferences, 
  onPreferenceChange, 
  onSavePreferences, 
  onResetToDefaults,
  hasUnsavedChanges = false 
}: WorkflowPreferencesProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'notifications', 'timing', 'display', 'automation'
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'notifications': return <Bell className="w-4 h-4 text-blue-600" />;
      case 'timing': return <Clock className="w-4 h-4 text-green-600" />;
      case 'display': return <Eye className="w-4 h-4 text-purple-600" />;
      case 'automation': return <Zap className="w-4 h-4 text-orange-600" />;
      default: return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const groupedPreferences = preferences.reduce((acc, pref) => {
    if (!acc[pref.category]) {
      acc[pref.category] = [];
    }
    acc[pref.category].push(pref);
    return acc;
  }, {} as Record<string, WorkflowPreference[]>);

  const renderPreferenceControl = (preference: WorkflowPreference) => {
    switch (preference.type) {
      case 'boolean':
        return (
          <Switch
            checked={preference.value}
            onCheckedChange={(checked) => 
              onPreferenceChange(preference.id, checked)
            }
          />
        );
      
      case 'select':
        return (
          <Select
            value={preference.value}
            onValueChange={(value) => 
              onPreferenceChange(preference.id, value)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {preference.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={preference.value}
            onChange={(e) => 
              onPreferenceChange(preference.id, parseInt(e.target.value))
            }
            min={preference.min}
            max={preference.max}
            className="w-20 px-2 py-1 text-sm border rounded"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-slate-600" />
            <span>Workflow Preferences</span>
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                Unsaved Changes
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetToDefaults}
              className="text-slate-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              size="sm"
              onClick={onSavePreferences}
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {Object.entries(groupedPreferences).map(([category, categoryPrefs]) => (
          <div key={category} className="space-y-3">
            <Button
              variant="ghost"
              onClick={() => toggleCategory(category)}
              className="w-full justify-between p-0 h-auto font-medium text-left"
            >
              <div className="flex items-center space-x-2">
                {getCategoryIcon(category)}
                <span className="capitalize">{category}</span>
                <Badge variant="outline" className="text-xs">
                  {categoryPrefs.length}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">
                {expandedCategories.includes(category) ? '−' : '+'}
              </span>
            </Button>
            
            {expandedCategories.includes(category) && (
              <div className="space-y-3 ml-6 border-l border-slate-200 pl-4">
                {categoryPrefs.map((preference) => (
                  <div
                    key={preference.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">
                        {preference.label}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {preference.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      {renderPreferenceControl(preference)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(groupedPreferences).length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No preferences available</p>
            <p className="text-xs">Preferences will appear as you use the workflow</p>
          </div>
        )}

        {hasUnsavedChanges && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-800">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                You have unsaved changes
              </span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Click "Save" to apply your preferences to future workflow sessions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
