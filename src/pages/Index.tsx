
import React from 'react';
import { SolutionDisplay } from '@/components/SolutionDisplay';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SimplifiedMainNavigation } from '@/components/SimplifiedMainNavigation';
import { ViewLayout } from '@/components/ViewLayout';
import { useAppState } from '@/hooks/useAppState';

const Index = () => {
  const {
    extractedText,
    contextData,
    solutions,
    currentView,
    setCurrentView,
    handleAnalysisComplete,
    resetToHome,
    hasResults
  } = useAppState();

  // Handle special views
  if (['saved', 'tools', 'faq', 'stats'].includes(currentView)) {
    return (
      <ErrorBoundary>
        <ViewLayout 
          currentView={currentView as 'saved' | 'tools' | 'faq' | 'stats'} 
          onBackToHome={() => setCurrentView('main')} 
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        {!hasResults ? (
          <>
            <HeroSection />
            <SimplifiedMainNavigation onAnalysisComplete={handleAnalysisComplete} />
          </>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <SolutionDisplay 
              solutions={solutions}
              extractedText={extractedText}
              contextData={contextData}
              onStartOver={resetToHome}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
