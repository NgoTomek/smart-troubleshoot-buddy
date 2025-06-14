
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeedbackSystem } from '@/components/FeedbackSystem';
import { 
  CheckCircle, 
  Clock, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Target,
  MessageSquare
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

interface SolutionCardProps {
  solution: Solution;
  isRecommended: boolean;
  completedSteps: {[key: string]: boolean};
  quickFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
  showDetailedFeedback: {[key: number]: boolean};
  submittedFeedback: {[key: number]: boolean};
  onToggleStep: (stepKey: string) => void;
  onQuickFeedback: (solutionId: number, type: 'helpful' | 'not-helpful') => void;
  onToggleDetailedFeedback: (solutionId: number) => void;
  onFeedbackSubmitted: (solutionId: number, feedback: any) => void;
}

export const SolutionCard = ({
  solution,
  isRecommended,
  completedSteps,
  quickFeedback,
  showDetailedFeedback,
  submittedFeedback,
  onToggleStep,
  onQuickFeedback,
  onToggleDetailedFeedback,
  onFeedbackSubmitted
}: SolutionCardProps) => {
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
    <Card className={`${isRecommended ? 'border-blue-200 bg-blue-50' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">{solution.title}</CardTitle>
              {isRecommended && <Badge className="bg-blue-600">Recommended</Badge>}
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
                      onClick={() => onToggleStep(stepKey)}
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Was this solution helpful?</span>
              <div className="flex space-x-2">
                <Button
                  variant={quickFeedback[solution.id] === 'helpful' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onQuickFeedback(solution.id, 'helpful')}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful
                </Button>
                <Button
                  variant={quickFeedback[solution.id] === 'not-helpful' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onQuickFeedback(solution.id, 'not-helpful')}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Not Helpful
                </Button>
              </div>
            </div>

            {!submittedFeedback[solution.id] && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleDetailedFeedback(solution.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {showDetailedFeedback[solution.id] ? 'Hide' : 'Provide'} Detailed Feedback
                </Button>
              </div>
            )}

            {showDetailedFeedback[solution.id] && !submittedFeedback[solution.id] && (
              <FeedbackSystem
                solutionId={solution.id}
                solutionTitle={solution.title}
                onFeedbackSubmitted={(feedback) => onFeedbackSubmitted(solution.id, feedback)}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
