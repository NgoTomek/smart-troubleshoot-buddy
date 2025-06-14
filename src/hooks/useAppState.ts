
import { useState } from 'react';
import { Solution } from '@/types/solution';

export const useAppState = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [contextData, setContextData] = useState<any>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'faq' | 'stats' | 'saved' | 'tools'>('main');

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

  return {
    uploadedImages,
    extractedText,
    contextData,
    solutions,
    isAnalyzing,
    currentView,
    setCurrentView,
    handleImagesUploaded,
    handleContextSubmitted,
    resetToHome,
    hasResults: solutions.length > 0
  };
};
