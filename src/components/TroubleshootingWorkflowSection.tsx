
import React from 'react';
import { SimplifiedWorkflowContainer } from '@/components/SimplifiedWorkflowContainer';
import { useTroubleshootingWorkflow } from '@/hooks/useTroubleshootingWorkflow';

interface TroubleshootingWorkflowSectionProps {
  onAnalysisComplete: (context: any, extractedText: string) => void;
}

export const TroubleshootingWorkflowSection = ({
  onAnalysisComplete,
}: TroubleshootingWorkflowSectionProps) => {
  const {
    extractedText,
    isAnalyzing,
    handleImagesUploaded,
    handleContextSubmitted
  } = useTroubleshootingWorkflow();

  const handleContextFormSubmit = async (context: any) => {
    await handleContextSubmitted(context);
    onAnalysisComplete(context, extractedText);
  };

  return (
    <SimplifiedWorkflowContainer
      extractedText={extractedText}
      isAnalyzing={isAnalyzing}
      onImagesUploaded={handleImagesUploaded}
      onContextSubmit={handleContextFormSubmit}
    />
  );
};
