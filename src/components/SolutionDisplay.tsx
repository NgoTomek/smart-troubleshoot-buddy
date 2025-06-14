
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  AlertCircle,
  Target,
  Lightbulb
} from 'lucide-react';

interface Solution {
  id: number;
  title: string;
  confidence: number;
  category: string;
  steps: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  successRate: number;
}

interface SolutionDisplayProps {
  solutions: Solution[];
  extractedText: string;
  contextData: any;
  onStartOver: () => void;
}

export const SolutionDisplay = ({ solutions, extractedText, contextData, onStartOver }: SolutionDisplayProps) => {
  const [feedback, setFeedback] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});

  const handleFeedback = (solutionId: number, type: 'helpful' | 'not-helpful') => {
    setFeedback(prev => ({ ...prev, [solutionId]: type }));
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-slate-900">AI Solutions Found</h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on your error and context, here are the most likely solutions ranked by confidence and success rate.
        </p>
        <Button 
          variant="outline" 
          onClick={onStartOver}
          className="mt-4"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      {/* Problem Summary */}
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

      {/* Solutions */}
      <div className="space-y-4">
        {solutions.map((solution, index) => (
          <Card key={solution.id} className={`${index === 0 ? 'border-blue-200 bg-blue-50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                    {index === 0 && <Badge className="bg-blue-600">Recommended</Badge>}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className={`w-4 h-4 ${getConfidenceColor(solution.confidence)}`} />
                      <span className={`font-semibold ${getConfidenceColor(solution.confidence)}`}>
                        {Math.round(solution.confidence * 100)}% confidence
                      </span>
                    </div>
                    
                    <Badge variant="outline" className={getDifficultyColor(solution.difficulty)}>
                      {solution.difficulty}
                    </Badge>
                    
                    <div className="flex items-center space-x-1 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{solution.estimatedTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-slate-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{Math.round(solution.successRate * 100)}% success rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Step-by-step solution:</h4>
                  <div className="space-y-2">
                    {solution.steps.map((step, stepIndex) => {
                      const stepKey = `${solution.id}-${stepIndex}`;
                      const isCompleted = completedSteps[stepKey];
                      
                      return (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleStep(stepKey)}
                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isCompleted 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {isCompleted && <CheckCircle className="w-3 h-3" />}
                          </button>
                          <div className="flex-1">
                            <span className={`text-sm ${isCompleted ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                              <strong>{stepIndex + 1}.</strong> {step}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Was this solution helpful?</span>
                  <div className="flex space-x-2">
                    <Button
                      variant={feedback[solution.id] === 'helpful' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(solution.id, 'helpful')}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      variant={feedback[solution.id] === 'not-helpful' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(solution.id, 'not-helpful')}
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Summary */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-green-800">Your Progress</h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  {Object.values(completedSteps).filter(Boolean).length}
                </div>
                <div className="text-sm text-green-600">Steps Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  {solutions.length}
                </div>
                <div className="text-sm text-green-600">Solutions Available</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
