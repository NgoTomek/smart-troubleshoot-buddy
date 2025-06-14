
import React from 'react';
import { WorkflowStateSync } from '@/components/WorkflowStateSync';
import { WorkflowPreferences } from '@/components/WorkflowPreferences';

export interface Preference {
    id: string;
    category: string;
    label: string;
    description: string;
    type: 'boolean' | 'string' | 'number';
    value: any;
}

interface CollaborationTabContentProps {
  isCollaborationEnabled: boolean;
  currentStep: string;
  onSyncStateChange: (isConnected: boolean) => void;
  onConflictResolution: (conflicts: any[]) => void;
  preferences: Preference[];
  onPreferenceChange: (id: string, value: any) => void;
}

export const CollaborationTabContent = ({
  isCollaborationEnabled,
  currentStep,
  onSyncStateChange,
  onConflictResolution,
  preferences,
  onPreferenceChange,
}: CollaborationTabContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WorkflowStateSync
        isCollaborationEnabled={isCollaborationEnabled}
        currentStepId={currentStep}
        onSyncStateChange={onSyncStateChange}
        onConflictResolution={onConflictResolution}
      />
      
      <WorkflowPreferences
        preferences={preferences}
        onPreferenceChange={onPreferenceChange}
        onSavePreferences={() => console.log('Save preferences')}
        onResetToDefaults={() => console.log('Reset preferences')}
        hasUnsavedChanges={false}
      />
    </div>
  );
};
