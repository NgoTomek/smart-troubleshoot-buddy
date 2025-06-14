
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Header } from '@/components/Header';
import { SavedSolutions } from '@/components/SavedSolutions';
import { ToolsDashboard } from '@/components/ToolsDashboard';
import { FAQSection } from '@/components/FAQSection';
import { StatsDisplay } from '@/components/StatsDashboard';

interface ViewLayoutProps {
  currentView: 'saved' | 'tools' | 'faq' | 'stats';
  onBackToHome: () => void;
}

export const ViewLayout = ({ currentView, onBackToHome }: ViewLayoutProps) => {
  const renderContent = () => {
    switch (currentView) {
      case 'saved':
        return <SavedSolutions onBackToHome={onBackToHome} />;
      case 'tools':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={onBackToHome}
                className="mb-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <ToolsDashboard />
          </div>
        );
      case 'faq':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={onBackToHome}
                className="mb-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <FAQSection />
          </div>
        );
      case 'stats':
        return (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={onBackToHome}
                className="mb-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <StatsDisplay />
          </div>
        );
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
