
import { useApplicationState } from '@/hooks/useApplicationState';
import { useSolutionResults } from '@/hooks/useSolutionResults';

export const useAppState = () => {
  const { currentView, navigateToView, resetToMainView } = useApplicationState();
  const { 
    extractedText, 
    contextData, 
    solutions, 
    handleAnalysisComplete, 
    resetResults, 
    hasResults 
  } = useSolutionResults();

  const resetToHome = () => {
    resetResults();
    resetToMainView();
  };

  return {
    extractedText,
    contextData,
    solutions,
    currentView,
    setCurrentView: navigateToView,
    handleAnalysisComplete,
    resetToHome,
    hasResults
  };
};
