
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Upload, MessageSquare, Brain, Target, CheckCircle, Users, Zap, Camera, FileText } from 'lucide-react';

interface HowItWorksPageProps {
  onBackToHome: () => void;
}

export const HowItWorksPage = ({ onBackToHome }: HowItWorksPageProps) => {
  const steps = [
    {
      icon: Camera,
      title: "Upload Error Screenshots",
      description: "Drag and drop or click to upload screenshots of your error messages, system dialogs, or problematic interfaces.",
      details: [
        "Support for PNG, JPG, GIF formats",
        "Multiple images at once",
        "Secure image processing"
      ]
    },
    {
      icon: FileText,
      title: "AI Text Extraction",
      description: "Our AI automatically extracts and analyzes text from your screenshots using advanced OCR technology.",
      details: [
        "Automatic text detection",
        "Error code recognition",
        "Context-aware extraction"
      ]
    },
    {
      icon: MessageSquare,
      title: "Provide Additional Context",
      description: "Add details about when the error occurred, what you were doing, and your system environment to help our AI better understand the problem.",
      details: [
        "Operating system details",
        "Application context",
        "Steps that led to the error"
      ]
    },
    {
      icon: Brain,
      title: "Smart AI Diagnosis",
      description: "Our AI analyzes the extracted text and context to identify the root cause and generate targeted solutions.",
      details: [
        "Pattern recognition",
        "Knowledge base matching",
        "Confidence scoring"
      ]
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get solutions in seconds with our optimized AI processing"
    },
    {
      icon: Brain,
      title: "AI-Powered OCR",
      description: "Advanced text extraction from any screenshot"
    },
    {
      icon: Target,
      title: "Accurate Diagnosis",
      description: "Precise problem identification and solution matching"
    },
    {
      icon: CheckCircle,
      title: "Proven Solutions",
      description: "Curated fixes that actually work"
    }
  ];

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

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          How TechFix AI Works
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Our AI-powered platform simplifies technical troubleshooting by analyzing your error screenshots and providing instant solutions.
        </p>
      </div>

      {/* Main Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <Card key={index} className="relative">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">
                {index + 1}. {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">{step.description}</p>
              <ul className="space-y-1">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm text-slate-500 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose TechFix AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Fix Your Tech Issues?</h2>
        <p className="text-slate-600 mb-6">
          Upload your error screenshots and get instant AI-powered solutions
        </p>
        <Button 
          size="lg" 
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Try TechFix AI Now
        </Button>
      </div>
    </div>
  );
};
