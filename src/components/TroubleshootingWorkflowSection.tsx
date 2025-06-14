
import React from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ContextForm } from '@/components/ContextForm';
import { AnalysisProgress } from '@/components/AnalysisProgress';
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
    <div className="space-y-8 mt-8">
      <ImageUpload 
        onImagesUploaded={handleImagesUploaded}
        extractedText={extractedText}
      />
      
      {extractedText && (
        <ContextForm 
          extractedText={extractedText}
          onSubmit={handleContextFormSubmit}
          isAnalyzing={isAnalyzing}
        />
      )}
      
      {isAnalyzing && (
        <AnalysisProgress isAnalyzing={isAnalyzing} />
      )}
    </div>
  );
};
