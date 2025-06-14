
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Zap,
  Brain,
  Target,
  Activity
} from 'lucide-react';

interface DiagnosticPattern {
  id: string;
  pattern: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high';
  category: string;
  suggestedAction: string;
  confidence: number;
}

interface SmartDiagnosticsProps {
  problemText: string;
  contextData?: any;
  onDiagnosticComplete: (results: any) => void;
}

export const SmartDiagnostics = ({ 
  problemText, 
  contextData, 
  onDiagnosticComplete 
}: SmartDiagnosticsProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [detectedPatterns, setDetectedPatterns] = useState<DiagnosticPattern[]>([]);
  const [analysisMetrics, setAnalysisMetrics] = useState({
    patternsFound: 0,
    confidenceScore: 0,
    processingTime: 0,
    similarCases: 0
  });

  const runSmartDiagnostics = async () => {
    setIsAnalyzing(true);
    const startTime = Date.now();
    
    // Simulate advanced AI diagnostics
    setTimeout(() => {
      const patterns: DiagnosticPattern[] = [
        {
          id: 'pattern-1',
          pattern: 'Connection timeout error',
          frequency: 0.89,
          severity: 'high',
          category: 'Network Connectivity',
          suggestedAction: 'Check network configuration and DNS settings',
          confidence: 0.94
        },
        {
          id: 'pattern-2',
          pattern: 'Server response delay',
          frequency: 0.67,
          severity: 'medium',
          category: 'Performance',
          suggestedAction: 'Optimize network settings or try alternative servers',
          confidence: 0.78
        },
        {
          id: 'pattern-3',
          pattern: 'Browser-specific behavior',
          frequency: 0.45,
          severity: 'low',
          category: 'Browser Compatibility',
          suggestedAction: 'Clear browser cache or try different browser',
          confidence: 0.62
        }
      ];

      const results = {
        problemCategory: 'Network Connectivity',
        severity: 'High',
        urgency: 'Immediate Action Required',
        rootCauseAnalysis: {
          primaryCause: 'Network configuration issue',
          contributingFactors: ['DNS misconfiguration', 'Firewall blocking', 'ISP routing issue'],
          likelihood: 0.87
        },
        recommendedApproach: 'Start with network diagnostics, then proceed to system-level checks',
        estimatedResolutionTime: '5-15 minutes',
        successProbability: 0.85
      };

      const processingTime = (Date.now() - startTime) / 1000;
      
      setDetectedPatterns(patterns);
      setDiagnosticResults(results);
      setAnalysisMetrics({
        patternsFound: patterns.length,
        confidenceScore: 0.87,
        processingTime: processingTime,
        similarCases: 23
      });
      
      onDiagnosticComplete(results);
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    if (problemText) {
      runSmartDiagnostics();
    }
  }, [problemText]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-cyan-600" />
          <span>Smart Diagnostics</span>
          <Badge variant="outline" className="bg-cyan-100 text-cyan-700">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
              <Search className="w-6 h-6 text-cyan-600 absolute top-5 left-1/2 transform -translate-x-1/2" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Analyzing Problem Patterns</h4>
            <p className="text-slate-600">Running advanced diagnostics and pattern recognition...</p>
            <div className="mt-4 space-y-2">
              <div className="text-sm text-slate-500">🔍 Scanning error patterns</div>
              <div className="text-sm text-slate-500">🧠 Analyzing historical data</div>
              <div className="text-sm text-slate-500">⚡ Generating smart recommendations</div>
            </div>
          </div>
        ) : diagnosticResults ? (
          <div className="space-y-6">
            {/* Analysis Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-cyan-600" />
                  <span className="text-2xl font-bold text-cyan-700">
                    {analysisMetrics.patternsFound}
                  </span>
                </div>
                <p className="text-xs text-cyan-600">Patterns Found</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">
                    {Math.round(analysisMetrics.confidenceScore * 100)}%
                  </span>
                </div>
                <p className="text-xs text-blue-600">Confidence</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">
                    {analysisMetrics.processingTime.toFixed(1)}s
                  </span>
                </div>
                <p className="text-xs text-green-600">Analysis Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-700">
                    {analysisMetrics.similarCases}
                  </span>
                </div>
                <p className="text-xs text-purple-600">Similar Cases</p>
              </div>
            </div>

            <Separator />

            {/* Diagnostic Summary */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Diagnostic Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Problem Category</span>
                    <Badge variant="outline">{diagnosticResults.problemCategory}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Severity Level</span>
                    <Badge className={getSeverityColor('high')}>
                      {diagnosticResults.severity}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Urgency</span>
                    <span className="text-sm font-medium text-red-600">{diagnosticResults.urgency}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Success Probability</span>
                      <span className="font-medium">{Math.round(diagnosticResults.successProbability * 100)}%</span>
                    </div>
                    <Progress value={diagnosticResults.successProbability * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Est. Resolution Time</span>
                    <span className="text-sm font-medium text-slate-900">{diagnosticResults.estimatedResolutionTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Recommended Approach</span>
                    <span className="text-sm font-medium text-slate-900">Network First</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Root Cause Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Root Cause Analysis</h4>
              
              <div className="p-4 bg-white border border-cyan-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h5 className="font-medium text-slate-900">Primary Cause</h5>
                  <Badge variant="outline">{Math.round(diagnosticResults.rootCauseAnalysis.likelihood * 100)}% likely</Badge>
                </div>
                
                <p className="text-slate-700 mb-3">{diagnosticResults.rootCauseAnalysis.primaryCause}</p>
                
                <div>
                  <p className="font-medium text-sm text-slate-900 mb-2">Contributing Factors:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {diagnosticResults.rootCauseAnalysis.contributingFactors.map((factor: string, index: number) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Detected Patterns */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Detected Patterns</h4>
              
              <div className="space-y-3">
                {detectedPatterns.map((pattern) => (
                  <div key={pattern.id} className="p-3 bg-white border border-cyan-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(pattern.severity)}
                        <h5 className="font-medium text-slate-900">{pattern.pattern}</h5>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(pattern.severity)}>
                          {pattern.severity}
                        </Badge>
                        <span className="text-sm text-slate-600">{Math.round(pattern.confidence * 100)}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Frequency in similar cases</span>
                        <span className="font-medium">{Math.round(pattern.frequency * 100)}%</span>
                      </div>
                      <Progress value={pattern.frequency * 100} className="h-1" />
                    </div>
                    
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Action:</strong> {pattern.suggestedAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
