
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Upload, MessageSquare, Brain, Target, CheckCircle, Users, Zap } from 'lucide-react';

interface HowItWorksPageProps {
  onBackToHome: () => void;
}

export const HowItWorksPage = ({ onBackToHome }: HowItWorksPageProps) => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Screenshots",
      description: "Take screenshots of your error messages, system dialogs, or problematic interfaces. Our AI automatically extracts and analyzes the text.",
      details: [
        "Support for multiple image formats",
        "Automatic text extraction using OCR",
        "Privacy-focused processing"
      ]
    },
    {
      icon: MessageSquare,
      title: "Add Context",
      description: "Provide additional information about when the error occurred, what you were doing, and your system environment.",
      details: [
        "Smart categorization of context",
        "Guided questions to gather relevant info",
        "Optional but highly recommended"
      ]
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your error patterns, cross-references with our knowledge base, and identifies the most likely causes.",
      details: [
        "Pattern recognition algorithms",
        "Knowledge base of 10M+ solutions",
        "Real-time diagnostic analysis"
      ]
    },
    {
      icon: Target,
      title: "Get Solutions",
      description: "Receive ranked solutions based on confidence scores, success rates, and relevance to your specific situation.",
      details: [
        "Solutions ranked by success rate",
        "Step-by-step instructions",
        "Community feedback integration"
      ]
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get solutions in seconds, not hours"
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced machine learning for accurate diagnostics"
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Solutions validated by thousands of users"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "95% success rate for common technical issues"
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
          Our AI-powered platform makes technical troubleshooting simple and effective. 
          Here's how we turn your error screenshots into actionable solutions.
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
          Join thousands of users who've solved their problems with TechFix AI
        </p>
        <Button 
          size="lg" 
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};
