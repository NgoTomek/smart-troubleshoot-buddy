
import { useState } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useTroubleshootingWorkflow = () => {
  const { showSuccess, showInfo } = useNotificationManager();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImagesUploaded = (images: File[]) => {
    console.log('Images uploaded:', images);
    setUploadedImages(images);
    
    showInfo("Images Uploaded", "Extracting text from your images...");
    
    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedText('Error: Cannot connect to server. Connection timed out after 30 seconds. Check your network settings and try again.');
      showSuccess(
        "Text Extracted",
        "Text has been extracted from your images. Please provide additional context."
      );
    }, 1500);
  };

  const handleContextSubmitted = async (context: any) => {
    console.log('Context submitted:', context);
    setIsAnalyzing(true);
    
    showSuccess(
      "Analysis Started",
      "Our AI is analyzing your issue and generating solutions..."
    );
    
    // Return the analysis promise to be handled by the parent component
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAnalyzing(false);
        resolve(context);
      }, 2000);
    });
  };

  const resetWorkflow = () => {
    setUploadedImages([]);
    setExtractedText('');
    setIsAnalyzing(false);
  };

  return {
    uploadedImages,
    extractedText,
    isAnalyzing,
    handleImagesUploaded,
    handleContextSubmitted,
    resetWorkflow
  };
};
