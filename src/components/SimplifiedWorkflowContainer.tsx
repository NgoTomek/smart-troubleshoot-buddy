
import React from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { SimplifiedContextForm } from '@/components/SimplifiedContextForm';
import { AnalysisProgress } from '@/components/AnalysisProgress';

interface SimplifiedWorkflowContainerProps {
  extractedText: string;
  isAnalyzing: boolean;
  onImagesUploaded: (images: File[]) => void;
  onContextSubmit: (context: any) => Promise<void>;
}

export const SimplifiedWorkflowContainer = ({
  extractedText,
  isAnalyzing,
  onImagesUploaded,
  onContextSubmit,
}: SimplifiedWorkflowContainerProps) => {
  return (
    <div className="space-y-6">
      <ImageUpload 
        onImagesUploaded={onImagesUploaded}
        extractedText={extractedText}
      />
      
      {extractedText && (
        <SimplifiedContextForm 
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
