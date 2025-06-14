
import { useState, useCallback } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useImageProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const { showSuccess, showInfo } = useNotificationManager();

  const processImages = useCallback(async (images: File[]) => {
    setIsProcessing(true);
    setProcessedImages(images);
    
    showInfo("Processing Images", "Extracting text from your uploaded images...");
    
    // Simulate OCR processing
    setTimeout(() => {
      const mockText = 'Error: Cannot connect to server. Connection timed out after 30 seconds. Check your network settings and try again.';
      setExtractedText(mockText);
      setIsProcessing(false);
      
      showSuccess(
        "Text Extracted", 
        "Text has been successfully extracted from your images."
      );
    }, 1500);
  }, [showInfo, showSuccess]);

  const clearImages = useCallback(() => {
    setProcessedImages([]);
    setExtractedText('');
    setIsProcessing(false);
  }, []);

  return {
    isProcessing,
    processedImages,
    extractedText,
    processImages,
    clearImages,
  };
};
