import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ContextForm } from '@/components/ContextForm';
import { SolutionDisplay } from '@/components/SolutionDisplay';
import { SavedSolutions } from '@/components/SavedSolutions';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AnalysisProgress } from '@/components/AnalysisProgress';
import { FAQSection } from '@/components/FAQSection';
import { StatsDisplay } from '@/components/StatsDashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, HelpCircle, Home, Bookmark } from 'lucide-react';

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [contextData, setContextData] = useState<any>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'faq' | 'stats' | 'saved'>('main');

  const handleImagesUploaded = (images: File[]) => {
    console.log('Images uploaded:', images);
    setUploadedImages(images);
    
    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedText('Error: Cannot connect to server. Connection timed out after 30 seconds. Check your network settings and try again.');
    }, 1500);
  };

  const handleContextSubmitted = async (context: any) => {
    console.log('Context submitted:', context);
    setContextData(context);
    setIsAnalyzing(true);
    
    // Simulate AI analysis with more realistic timing
    setTimeout(() => {
      setSolutions([
        {
          id: 1,
          title: 'Network Connectivity Issue',
          confidence: 0.92,
          category: 'Network',
          steps: [
            'Check your internet connection status',
            'Restart your router and modem (unplug for 30 seconds)',
            'Clear your browser cache and cookies',
            'Disable firewall temporarily to test connectivity',
            'Try using a different DNS server (8.8.8.8)',
            'Contact your ISP if issue persists'
          ],
          estimatedTime: '5-10 minutes',
          difficulty: 'Easy',
          successRate: 0.87
        },
        {
          id: 2,
          title: 'DNS Configuration Problem',
          confidence: 0.78,
          category: 'Network',
          steps: [
            'Open your network settings',
            'Navigate to TCP/IP settings',
            'Change DNS servers to 8.8.8.8 and 8.8.4.4',
            'Flush DNS cache using command line',
            'Restart your network adapter',
            'Test connectivity to verify the fix'
          ],
          estimatedTime: '3-5 minutes',
          difficulty: 'Medium',
          successRate: 0.79
        },
        {
          id: 3,
          title: 'Browser-Specific Issue',
          confidence: 0.65,
          category: 'Browser',
          steps: [
            'Clear browser cache and cookies',
            'Disable browser extensions temporarily',
            'Try opening the site in incognito mode',
            'Reset browser settings to default',
            'Update your browser to the latest version'
          ],
          estimatedTime: '2-3 minutes',
          difficulty: 'Easy',
          successRate: 0.71
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetToHome = () => {
    setUploadedImages([]);
    setExtractedText('');
    setContextData(null);
    setSolutions([]);
    setIsAnalyzing(false);
    setCurrentView('main');
  };

  const hasResults = solutions.length > 0;

  if (currentView === 'saved') {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <SavedSolutions onBackToHome={() => setCurrentView('main')} />
        </div>
      </ErrorBoundary>
    );
  }

  if (currentView === 'faq') {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('main')}
                className="mb-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <FAQSection />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (currentView === 'stats') {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('main')}
                className="mb-4"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <StatsDisplay />
          </div>
        </div>
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
            
            {/* Navigation Tabs */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
              <Tabs defaultValue="troubleshoot" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="troubleshoot">Troubleshoot Issue</TabsTrigger>
                  <TabsTrigger value="saved" onClick={() => setCurrentView('saved')}>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Saved
                  </TabsTrigger>
                  <TabsTrigger value="faq" onClick={() => setCurrentView('faq')}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="stats" onClick={() => setCurrentView('stats')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Statistics
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="troubleshoot" className="space-y-8 mt-8">
                  <ImageUpload 
                    onImagesUploaded={handleImagesUploaded}
                    extractedText={extractedText}
                  />
                  
                  {extractedText && (
                    <ContextForm 
                      extractedText={extractedText}
                      onSubmit={handleContextSubmitted}
                      isAnalyzing={isAnalyzing}
                    />
                  )}
                  
                  {isAnalyzing && (
                    <AnalysisProgress isAnalyzing={isAnalyzing} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
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
