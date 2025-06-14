
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Target,
  Cpu,
  BarChart3,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'pattern' | 'prediction' | 'optimization' | 'risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  category: string;
}

interface AIInsightsEngineProps {
  problemContext: string;
  solutions: any[];
  userBehavior?: {
    completionRate: number;
    averageTime: number;
    preferredApproach: string;
  };
}

export const AIInsightsEngine = ({ 
  problemContext, 
  solutions,
  userBehavior = {
    completionRate: 0.78,
    averageTime: 8.5,
    preferredApproach: 'step-by-step'
  }
}: AIInsightsEngineProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [processingMetrics] = useState({
    dataPoints: 1247,
    patterns: 23,
    accuracy: 0.94,
    learningRate: 0.12
  });

  const generateInsights = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newInsights: AIInsight[] = [
        {
          id: 'insight-1',
          type: 'pattern',
          title: 'Similar Issues Cluster Detected',
          description: 'This problem type has a 94% correlation with network configuration issues in enterprise environments.',
          confidence: 0.94,
          impact: 'high',
          actionable: true,
          category: 'Pattern Recognition'
        },
        {
          id: 'insight-2',
          type: 'prediction',
          title: 'Success Probability Forecast',
          description: 'Based on your profile, the recommended solution has an 87% predicted success rate for your specific scenario.',
          confidence: 0.87,
          impact: 'high',
          actionable: true,
          category: 'Predictive Analysis'
        },
        {
          id: 'insight-3',
          type: 'optimization',
          title: 'Efficiency Optimization Available',
          description: 'By combining steps 2 and 3, you could reduce resolution time by approximately 40%.',
          confidence: 0.82,
          impact: 'medium',
          actionable: true,
          category: 'Process Optimization'
        },
        {
          id: 'insight-4',
          type: 'risk',
          title: 'Potential Risk Assessment',
          description: 'Low probability (15%) of system reboot requirement detected. Prepare backup procedures.',
          confidence: 0.73,
          impact: 'low',
          actionable: true,
          category: 'Risk Analysis'
        }
      ];
      
      setInsights(newInsights);
      setIsAnalyzing(false);
    }, 2500);
  };

  useEffect(() => {
    if (problemContext && solutions.length > 0) {
      generateInsights();
    }
  }, [problemContext, solutions]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <BarChart3 className="w-4 h-4" />;
      case 'prediction': return <Target className="w-4 h-4" />;
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'pattern': return 'text-blue-600';
      case 'prediction': return 'text-green-600';
      case 'optimization': return 'text-purple-600';
      case 'risk': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-violet-600" />
            <span>AI Insights Engine</span>
            <Badge variant="outline" className="bg-violet-100 text-violet-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Advanced AI
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateInsights}
            disabled={isAnalyzing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            Analyze
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Processing Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Cpu className="w-4 h-4 text-violet-600" />
              <span className="text-2xl font-bold text-violet-700">
                {processingMetrics.dataPoints}
              </span>
            </div>
            <p className="text-xs text-violet-600">Data Points</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {processingMetrics.patterns}
              </span>
            </div>
            <p className="text-xs text-blue-600">Patterns</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {Math.round(processingMetrics.accuracy * 100)}%
              </span>
            </div>
            <p className="text-xs text-green-600">Accuracy</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {Math.round(processingMetrics.learningRate * 100)}%
              </span>
            </div>
            <p className="text-xs text-purple-600">Learning</p>
          </div>
        </div>

        <Separator />

        {/* AI Insights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <span>Generated Insights</span>
          </h4>
          
          {isAnalyzing ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-violet-600 animate-pulse mx-auto mb-4" />
              <p className="text-slate-600 mb-2">AI is analyzing patterns and generating insights...</p>
              <div className="max-w-md mx-auto">
                <Progress value={75} className="h-2" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight.id} className="p-4 bg-white border border-violet-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={getInsightColor(insight.type)}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <h5 className="font-medium text-slate-900">{insight.title}</h5>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(insight.impact)} variant="outline">
                        {insight.impact} impact
                      </Badge>
                      <span className="text-sm font-medium text-slate-600">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {insight.category}
                    </Badge>
                    {insight.actionable && (
                      <Button variant="outline" size="sm">
                        Apply Insight
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
