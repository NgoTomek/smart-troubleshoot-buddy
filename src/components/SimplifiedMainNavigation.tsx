
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, MessageSquare, Brain, Target } from 'lucide-react';
import { TroubleshootingWorkflowSection } from '@/components/TroubleshootingWorkflowSection';

interface SimplifiedMainNavigationProps {
  onAnalysisComplete: (context: any, extractedText: string) => void;
}

export const SimplifiedMainNavigation = ({ onAnalysisComplete }: SimplifiedMainNavigationProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Brain className="w-8 h-8 text-blue-600" />
            <span>Smart Troubleshooting Assistant</span>
          </CardTitle>
          <p className="text-blue-700 mt-2">
            Upload screenshots of your error, add context, and get AI-powered solutions
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-900">1. Upload</h3>
              <p className="text-sm text-slate-600">Share screenshots of your error</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-900">2. Describe</h3>
              <p className="text-sm text-slate-600">Add context about the issue</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-900">3. Solve</h3>
              <p className="text-sm text-slate-600">Get smart diagnostics & solutions</p>
            </div>
          </div>

          {/* Main Workflow */}
          <TroubleshootingWorkflowSection onAnalysisComplete={onAnalysisComplete} />
        </CardContent>
      </Card>
    </div>
  );
};
