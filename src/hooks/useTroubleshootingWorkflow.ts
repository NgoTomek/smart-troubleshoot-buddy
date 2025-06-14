
import { useImageUpload } from '@/hooks/useImageUpload';
import { useTextExtraction } from '@/hooks/useTextExtraction';
import { useAnalysisState } from '@/hooks/useAnalysisState';

export const useTroubleshootingWorkflow = () => {
  const { uploadedImages, handleImagesUploaded, clearImages } = useImageUpload();
  const { extractedText, extractTextFromImages, clearExtractedText } = useTextExtraction();
  const { isAnalyzing, startAnalysis, resetAnalysis } = useAnalysisState();

  const handleImagesUploadedWithExtraction = (images: File[]) => {
    const processedImages = handleImagesUploaded(images);
    extractTextFromImages(processedImages);
  };

  const handleContextSubmitted = async (context: any) => {
    return await startAnalysis(context);
  };

  const resetWorkflow = () => {
    clearImages();
    clearExtractedText();
    resetAnalysis();
  };

  return {
    uploadedImages,
    extractedText,
    isAnalyzing,
    handleImagesUploaded: handleImagesUploadedWithExtraction,
    handleContextSubmitted,
    resetWorkflow
  };
};
