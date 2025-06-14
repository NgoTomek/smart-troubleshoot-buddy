
import React from 'react';
import { CollaborationPanel } from '@/components/CollaborationPanel';
import { SmartDiagnostics } from '@/components/SmartDiagnostics';

interface DiagnosticAndCollaborationSectionProps {
  problemContext: string;
  problemText: string;
  contextData: any;
  onInviteTeam: () => void;
  onDiagnosticComplete: (results: any) => void;
}

export const DiagnosticAndCollaborationSection = ({
  problemContext,
  problemText,
  contextData,
  onInviteTeam,
  onDiagnosticComplete,
}: DiagnosticAndCollaborationSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CollaborationPanel
        problemContext={problemContext}
        onInviteTeam={onInviteTeam}
      />
      
      <SmartDiagnostics
        problemText={problemText}
        contextData={contextData}
        onDiagnosticComplete={onDiagnosticComplete}
      />
    </div>
  );
};
