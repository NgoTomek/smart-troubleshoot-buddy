
import { useState } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useImageUpload = () => {
  const { showSuccess, showInfo } = useNotificationManager();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImagesUploaded = (images: File[]) => {
    console.log('Images uploaded:', images);
    setUploadedImages(images);
    
    showInfo("Images Uploaded", "Processing your uploaded images...");
    
    return images;
  };

  const clearImages = () => {
    setUploadedImages([]);
  };

  return {
    uploadedImages,
    handleImagesUploaded,
    clearImages
  };
};
