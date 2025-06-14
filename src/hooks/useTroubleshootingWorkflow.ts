
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useTroubleshootingWorkflow = () => {
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImagesUploaded = (images: File[]) => {
    console.log('Images uploaded:', images);
    setUploadedImages(images);
    
    toast({
      title: "Images Uploaded",
      description: "Extracting text from your images...",
      duration: 2000,
    });
    
    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedText('Error: Cannot connect to server. Connection timed out after 30 seconds. Check your network settings and try again.');
      toast({
        title: "Text Extracted",
        description: "Text has been extracted from your images. Please provide additional context.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleContextSubmitted = async (context: any) => {
    console.log('Context submitted:', context);
    setIsAnalyzing(true);
    
    toast({
      title: "Analysis Started",
      description: "Our AI is analyzing your issue and generating solutions...",
      duration: 3000,
    });
    
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
