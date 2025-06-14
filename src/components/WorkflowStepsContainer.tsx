
import React from 'react';
import { SimplifiedWorkflowContainer } from '@/components/SimplifiedWorkflowContainer';

interface WorkflowStepsContainerProps {
  extractedText: string;
  isAnalyzing: boolean;
  onImagesUploaded: (images: File[]) => void;
  onContextSubmit: (context: any) => Promise<void>;
}

export const WorkflowStepsContainer = ({
  extractedText,
  isAnalyzing,
  onImagesUploaded,
  onContextSubmit,
}: WorkflowStepsContainerProps) => {
  return (
    <SimplifiedWorkflowContainer
      extractedText={extractedText}
      isAnalyzing={isAnalyzing}
      onImagesUploaded={onImagesUploaded}
      onContextSubmit={onContextSubmit}
    />
  );
};
