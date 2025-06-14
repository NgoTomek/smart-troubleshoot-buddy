
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Target,
  Lightbulb,
  RefreshCw
} from 'lucide-react';

interface RecommendationEngineProps {
  userProfile?: {
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    preferredSolutionTypes: string[];
    successHistory: { category: string; successRate: number }[];
    timePreference: 'quick' | 'thorough';
  };
  currentProblem: string;
  onRecommendationUpdate: (recommendations: any[]) => void;
}

export const SolutionRecommendationEngine = ({ 
  userProfile = {
    experienceLevel: 'intermediate',
    preferredSolutionTypes: ['Network', 'Browser'],
    successHistory: [
      { category: 'Network', successRate: 0.85 },
      { category: 'Browser', successRate: 0.72 },
      { category: 'System', successRate: 0.91 }
    ],
    timePreference: 'quick'
  },
  currentProblem,
  onRecommendationUpdate
}: RecommendationEngineProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<any[]>([]);
  const [learningMetrics, setLearningMetrics] = useState({
    adaptationScore: 0.78,
    predictionAccuracy: 0.83,
    userSatisfaction: 0.89,
    totalInteractions: 247
  });

  const generatePersonalizedRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const recommendations = [
        {
          id: 'rec-1',
          title: 'Network Reset Sequence',
          reason: 'Based on your 85% success rate with network solutions',
          confidence: 0.92,
          timeEstimate: '3-5 minutes',
          difficultyMatch: userProfile.experienceLevel,
          personalizedSteps: [
            'Check network adapter status (tailored for your system)',
            'Reset TCP/IP stack using elevated command prompt',
            'Flush DNS cache and renew IP configuration',
            'Test connectivity with preferred diagnostic tools'
          ]
        },
        {
          id: 'rec-2',
          title: 'Browser Configuration Optimization',
          reason: 'Matches your preference for quick solutions',
          confidence: 0.87,
          timeEstimate: '2-3 minutes',
          difficultyMatch: userProfile.experienceLevel,
          personalizedSteps: [
            'Clear browser data (excluding saved passwords)',
            'Reset browser settings with backup restore point',
            'Update browser extensions you frequently use',
            'Test with your most-used websites'
          ]
        },
        {
          id: 'rec-3',
          title: 'System Diagnostic Approach',
          reason: 'Your highest success category (91% success rate)',
          confidence: 0.94,
          timeEstimate: '5-7 minutes',
          difficultyMatch: userProfile.experienceLevel,
          personalizedSteps: [
            'Run Windows Network Diagnostics',
            'Check system event logs for related errors',
            'Verify system file integrity',
            'Review recent system changes'
          ]
        }
      ];
      
      setPersonalizedRecommendations(recommendations);
      onRecommendationUpdate(recommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    if (currentProblem) {
      generatePersonalizedRecommendations();
    }
  }, [currentProblem]);

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>AI Recommendation Engine</span>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
              Personalized
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generatePersonalizedRecommendations}
            disabled={isAnalyzing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* User Profile Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Your Profile</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <Badge className={getExperienceColor(userProfile.experienceLevel)}>
                {userProfile.experienceLevel}
              </Badge>
              <p className="text-xs text-slate-600 mt-1">Experience</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-indigo-700">
                {userProfile.preferredSolutionTypes.length}
              </div>
              <p className="text-xs text-slate-600">Preferred Types</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-green-700">
                {Math.round(userProfile.successHistory.reduce((acc, h) => acc + h.successRate, 0) / userProfile.successHistory.length * 100)}%
              </div>
              <p className="text-xs text-slate-600">Avg Success</p>
            </div>
            
            <div className="text-center">
              <Badge variant={userProfile.timePreference === 'quick' ? 'default' : 'outline'}>
                {userProfile.timePreference}
              </Badge>
              <p className="text-xs text-slate-600 mt-1">Preference</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Learning Metrics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>AI Learning Metrics</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Adaptation Score</span>
                <span className="font-medium">{Math.round(learningMetrics.adaptationScore * 100)}%</span>
              </div>
              <Progress value={learningMetrics.adaptationScore * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Prediction Accuracy</span>
                <span className="font-medium">{Math.round(learningMetrics.predictionAccuracy * 100)}%</span>
              </div>
              <Progress value={learningMetrics.predictionAccuracy * 100} className="h-2" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Total Interactions: {learningMetrics.totalInteractions}</span>
            <span>Satisfaction: {Math.round(learningMetrics.userSatisfaction * 100)}%</span>
          </div>
        </div>

        <Separator />

        {/* Personalized Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <span>Personalized Recommendations</span>
          </h4>
          
          {isAnalyzing ? (
            <div className="text-center py-6">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-2" />
              <p className="text-slate-600">Analyzing your profile and generating personalized recommendations...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {personalizedRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-white border border-indigo-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-slate-900">{rec.title}</h5>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{Math.round(rec.confidence * 100)}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{rec.reason}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.timeEstimate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>Matches your {rec.difficultyMatch} level</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-medium text-slate-700 mb-1">Tailored Steps:</p>
                    <ul className="text-slate-600 space-y-1">
                      {rec.personalizedSteps.slice(0, 2).map((step, index) => (
                        <li key={index}>• {step}</li>
                      ))}
                      {rec.personalizedSteps.length > 2 && (
                        <li className="text-slate-500">... and {rec.personalizedSteps.length - 2} more personalized steps</li>
                      )}
                    </ul>
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
