
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  FileText, 
  Share2, 
  Copy,
  Check,
  Mail,
  ExternalLink
} from 'lucide-react';

interface SessionExportProps {
  solutions: any[];
  extractedText: string;
  contextData: any;
  completedSteps: {[key: string]: boolean};
  quickFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
}

export const SessionExport = ({ 
  solutions, 
  extractedText, 
  contextData,
  completedSteps,
  quickFeedback
}: SessionExportProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const generateSessionReport = () => {
    const totalSteps = solutions.reduce((acc, solution) => acc + solution.steps.length, 0);
    const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
    const helpfulSolutions = Object.entries(quickFeedback)
      .filter(([_, feedback]) => feedback === 'helpful')
      .map(([id, _]) => solutions.find(sol => sol.id.toString() === id))
      .filter(Boolean);

    return {
      timestamp: new Date().toISOString(),
      problem: {
        description: extractedText,
        context: contextData?.additionalContext || 'None provided',
        category: solutions[0]?.category || 'General'
      },
      solutions: solutions.map(solution => ({
        ...solution,
        wasHelpful: quickFeedback[solution.id] === 'helpful',
        stepsCompleted: solution.steps.filter((_, index) => 
          completedSteps[`${solution.id}-${index}`]
        ).length
      })),
      progress: {
        totalSteps,
        completedSteps: completedStepsCount,
        completionRate: totalSteps > 0 ? (completedStepsCount / totalSteps) * 100 : 0
      },
      feedback: {
        helpfulSolutions: helpfulSolutions.length,
        totalFeedback: Object.values(quickFeedback).filter(f => f !== null).length
      }
    };
  };

  const exportAsJSON = () => {
    const report = generateSessionReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `troubleshoot-session-${new Date().getTime()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Session Exported",
      description: "Your troubleshooting session has been downloaded as JSON.",
      duration: 3000,
    });
  };

  const exportAsText = () => {
    const report = generateSessionReport();
    let textReport = `# Troubleshooting Session Report
Generated: ${new Date(report.timestamp).toLocaleString()}

## Problem Description
${report.problem.description}

## Additional Context
${report.problem.context}

## Category
${report.problem.category}

## Solutions Found (${report.solutions.length})
`;

    report.solutions.forEach((solution, index) => {
      textReport += `
### ${index + 1}. ${solution.title}
- Confidence: ${Math.round(solution.confidence * 100)}%
- Difficulty: ${solution.difficulty}
- Success Rate: ${Math.round(solution.successRate * 100)}%
- Steps Completed: ${solution.stepsCompleted}/${solution.steps.length}
- Marked as Helpful: ${solution.wasHelpful ? 'Yes' : 'No'}

Steps:
${solution.steps.map((step, stepIndex) => `${stepIndex + 1}. ${step}`).join('\n')}
`;
    });

    textReport += `
## Progress Summary
- Total Steps: ${report.progress.totalSteps}
- Completed Steps: ${report.progress.completedSteps}
- Completion Rate: ${Math.round(report.progress.completionRate)}%
- Helpful Solutions: ${report.feedback.helpfulSolutions}/${report.solutions.length}
`;

    const dataBlob = new Blob([textReport], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `troubleshoot-session-${new Date().getTime()}.txt`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Session Exported",
      description: "Your troubleshooting session has been downloaded as text.",
      duration: 3000,
    });
  };

  const copyToClipboard = async () => {
    const report = generateSessionReport();
    const summary = `Troubleshooting Session Summary:
Problem: ${report.problem.description}
Solutions Found: ${report.solutions.length}
Completion Rate: ${Math.round(report.progress.completionRate)}%
Helpful Solutions: ${report.feedback.helpfulSolutions}/${report.solutions.length}

Generated on ${new Date().toLocaleString()}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to Clipboard",
        description: "Session summary has been copied to your clipboard.",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        duration: 3000,
        variant: "destructive"
      });
    }
  };

  const shareViaEmail = () => {
    const report = generateSessionReport();
    const subject = `Troubleshooting Session Report - ${report.problem.category}`;
    const body = `Hi,

I've completed a troubleshooting session and wanted to share the results:

Problem: ${report.problem.description}
Category: ${report.problem.category}
Solutions Found: ${report.solutions.length}
Completion Rate: ${Math.round(report.progress.completionRate)}%

Best regards`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-green-600" />
          <span>Export Session</span>
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={exportAsJSON}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>JSON</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={exportAsText}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Text</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center space-x-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={shareViaEmail}
            className="flex items-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Button>
        </div>
        
        <Separator />
        
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">
            Export your complete troubleshooting session for future reference
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
            <span>• Solutions & Steps</span>
            <span>• Progress Tracking</span>
            <span>• Feedback Data</span>
            <span>• Performance Metrics</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
