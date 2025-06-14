
import { useState } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useTextExtraction = () => {
  const { showSuccess, showInfo } = useNotificationManager();
  const [extractedText, setExtractedText] = useState<string>('');

  const extractTextFromImages = (images: File[]) => {
    if (images.length === 0) return;

    showInfo("Processing Images", "Extracting text from your images...");
    
    // Simulate OCR extraction
    setTimeout(() => {
      const mockText = 'Error: Cannot connect to server. Connection timed out after 30 seconds. Check your network settings and try again.';
      setExtractedText(mockText);
      
      showSuccess(
        "Text Extracted",
        "Text has been extracted from your images. Please provide additional context."
      );
    }, 1500);
  };

  const clearExtractedText = () => {
    setExtractedText('');
  };

  return {
    extractedText,
    extractTextFromImages,
    clearExtractedText
  };
};
