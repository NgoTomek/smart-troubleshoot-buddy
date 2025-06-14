import React from 'react';
import { SimplifiedWorkflowContainer } from '@/components/SimplifiedWorkflowContainer';
import { useTroubleshootingWorkflow } from '@/hooks/useTroubleshootingWorkflow';

interface SimplifiedTroubleshootingSectionProps {
  onAnalysisComplete: (context: any, extractedText: string) => void;
}

export const SimplifiedTroubleshootingSection = ({
  onAnalysisComplete,
}: SimplifiedTroubleshootingSectionProps) => {
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
