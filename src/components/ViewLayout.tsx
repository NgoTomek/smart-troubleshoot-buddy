
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Header } from '@/components/Header';
import { SavedSolutions } from '@/components/SavedSolutions';
import { ToolsDashboard } from '@/components/ToolsDashboard';
import { FAQSection } from '@/components/FAQSection';
import { StatsDisplay } from '@/components/StatsDashboard';
import { HowItWorksPage } from '@/components/HowItWorksPage';
import { ExamplesPage } from '@/components/ExamplesPage';
import { PricingPage } from '@/components/PricingPage';

interface ViewLayoutProps {
  currentView: 'saved' | 'tools' | 'faq' | 'stats' | 'how-it-works' | 'examples' | 'pricing';
  onBackToHome: () => void;
}

export const ViewLayout = ({ currentView, onBackToHome }: ViewLayoutProps) => {
  const renderContent = () => {
    switch (currentView) {
      case 'saved':
        return <SavedSolutions onBackToHome={onBackToHome} />;
      case 'tools':
        return <ExamplesPage onBackToHome={onBackToHome} />;
      case 'faq':
        return <HowItWorksPage onBackToHome={onBackToHome} />;
      case 'stats':
        return <PricingPage onBackToHome={onBackToHome} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      {renderContent()}
    </div>
  );
};
