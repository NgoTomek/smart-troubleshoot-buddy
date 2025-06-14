
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ProblemSummaryProps {
  extractedText: string;
  contextData: any;
}

export const ProblemSummary = ({ extractedText, contextData }: ProblemSummaryProps) => {
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          <span>Problem Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-slate-700 mb-1">Extracted Error:</h4>
            <p className="text-sm text-slate-600 font-mono bg-white p-3 rounded border">
              {extractedText}
            </p>
          </div>
          {contextData?.additionalContext && (
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-1">Additional Context:</h4>
              <p className="text-sm text-slate-600">
                {contextData.additionalContext}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
