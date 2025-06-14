
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ImageUpload';
import { ContextForm } from '@/components/ContextForm';
import { AnalysisProgress } from '@/components/AnalysisProgress';

interface TroubleshootingTabContentProps {
  extractedText: string;
  isAnalyzing: boolean;
  onImagesUploaded: (images: File[]) => void;
  onContextSubmitted: (context: any) => Promise<void>;
}

export const TroubleshootingTabContent = ({
  extractedText,
  isAnalyzing,
  onImagesUploaded,
  onContextSubmitted,
}: TroubleshootingTabContentProps) => {
  return (
    <TabsContent value="troubleshoot" className="space-y-8 mt-8">
      <ImageUpload 
        onImagesUploaded={onImagesUploaded}
        extractedText={extractedText}
      />
      
      {extractedText && (
        <ContextForm 
          extractedText={extractedText}
          onSubmit={onContextSubmitted}
          isAnalyzing={isAnalyzing}
        />
      )}
      
      {isAnalyzing && (
        <AnalysisProgress isAnalyzing={isAnalyzing} />
      )}
    </TabsContent>
  );
};
