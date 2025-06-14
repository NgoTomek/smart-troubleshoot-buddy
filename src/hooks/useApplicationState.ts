
import { useState } from 'react';

export type ViewType = 'main' | 'faq' | 'stats' | 'saved' | 'tools';

export const useApplicationState = () => {
  const [currentView, setCurrentView] = useState<ViewType>('main');

  const navigateToView = (view: ViewType) => {
    setCurrentView(view);
  };

  const resetToMainView = () => {
    setCurrentView('main');
  };

  return {
    currentView,
    navigateToView,
    resetToMainView
  };
};
