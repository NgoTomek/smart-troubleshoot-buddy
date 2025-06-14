
import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ContextForm } from '@/components/ContextForm';
import { SolutionDisplay } from '@/components/SolutionDisplay';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [contextData, setContextData] = useState<any>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    
    // Simulate AI analysis
    setTimeout(() => {
      setSolutions([
        {
          id: 1,
          title: 'Network Connectivity Issue',
          confidence: 0.92,
          category: 'Network',
          steps: [
            'Check your internet connection',
            'Restart your router and modem',
            'Clear your browser cache and cookies',
            'Disable firewall temporarily to test',
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
            'Open network settings',
            'Change DNS servers to 8.8.8.8 and 8.8.4.4',
            'Flush DNS cache',
            'Restart network adapter',
            'Test connectivity'
          ],
          estimatedTime: '3-5 minutes',
          difficulty: 'Medium',
          successRate: 0.79
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const hasResults = solutions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {!hasResults ? (
        <>
          <HeroSection />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <ImageUpload 
              onImagesUploaded={handleImagesUploaded}
              extractedText={extractedText}
            />
            
            {extractedText && (
              <div className="mt-8">
                <ContextForm 
                  extractedText={extractedText}
                  onSubmit={handleContextSubmitted}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <SolutionDisplay 
            solutions={solutions}
            extractedText={extractedText}
            contextData={contextData}
            onStartOver={() => {
              setUploadedImages([]);
              setExtractedText('');
              setContextData(null);
              setSolutions([]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
