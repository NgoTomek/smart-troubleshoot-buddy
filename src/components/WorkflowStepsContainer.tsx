
import React from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ContextForm } from '@/components/ContextForm';
import { AnalysisProgress } from '@/components/AnalysisProgress';

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
    <div className="space-y-8">
      <ImageUpload 
        onImagesUploaded={onImagesUploaded}
        extractedText={extractedText}
      />
      
      {extractedText && (
        <ContextForm 
          extractedText={extractedText}
          onSubmit={onContextSubmit}
          isAnalyzing={isAnalyzing}
        />
      )}
      
      {isAnalyzing && (
        <AnalysisProgress isAnalyzing={isAnalyzing} />
      )}
    </div>
  );
};
