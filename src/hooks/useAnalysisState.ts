
import { useState } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useAnalysisState = () => {
  const { showSuccess } = useNotificationManager();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAnalysis = async (context: any) => {
    console.log('Context submitted:', context);
    setIsAnalyzing(true);
    
    showSuccess(
      "Analysis Started",
      "Our AI is analyzing your issue and generating solutions..."
    );
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAnalyzing(false);
        resolve(context);
      }, 2000);
    });
  };

  const resetAnalysis = () => {
    setIsAnalyzing(false);
  };

  return {
    isAnalyzing,
    startAnalysis,
    resetAnalysis
  };
};
