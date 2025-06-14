
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { TroubleshootingWorkflowSection } from '@/components/TroubleshootingWorkflowSection';

interface TroubleshootingTabContentProps {
  onAnalysisComplete: (context: any, extractedText: string) => void;
}

export const TroubleshootingTabContent = ({
  onAnalysisComplete,
}: TroubleshootingTabContentProps) => {
  return (
    <TabsContent value="troubleshoot" className="space-y-8 mt-8">
      <TroubleshootingWorkflowSection onAnalysisComplete={onAnalysisComplete} />
    </TabsContent>
  );
};
