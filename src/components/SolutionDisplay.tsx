
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ThumbsUp, ThumbsDown, Clock, TrendingUp, ArrowUp, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Solution {
  id: number;
  title: string;
  confidence: number;
  category: string;
  steps: string[];
  estimatedTime: string;
  difficulty: string;
  successRate: number;
}

interface SolutionDisplayProps {
  solutions: Solution[];
  extractedText: string;
  contextData: any;
  onStartOver: () => void;
}

export const SolutionDisplay = ({ solutions, extractedText, contextData, onStartOver }: SolutionDisplayProps) => {
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: 'up' | 'down' | null }>({});
  const { toast } = useToast();

  const toggleStep = (solutionId: number, stepIndex: number) => {
    const key = `${solutionId}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFeedback = (solutionId: number, type: 'up' | 'down') => {
    setFeedback(prev => ({
      ...prev,
      [solutionId]: prev[solutionId] === type ? null : type
    }));
    
    toast({
      title: "Feedback received",
      description: type === 'up' ? "Thanks! This helps us improve." : "Sorry this didn't work. We'll show better solutions.",
    });
  };

  const getStepCompletion = (solutionId: number) => {
    const solution = solutions.find(s => s.id === solutionId);
    if (!solution) return 0;
    
    const completedCount = solution.steps.filter((_, index) => 
      completedSteps[`${solutionId}-${index}`]
    ).length;
    
    return Math.round((completedCount / solution.steps.length) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Problem Analysis</h1>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-slate-700 font-mono text-sm">{extractedText}</p>
            </div>
            <p className="text-slate-600">
              Found <span className="font-semibold">{solutions.length}</span> potential solutions
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onStartOver}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Start Over</span>
          </Button>
        </div>
      </div>

      {/* Solutions */}
      <div className="space-y-6">
        {solutions.map((solution, index) => {
          const completion = getStepCompletion(solution.id);
          const userFeedback = feedback[solution.id];
          
          return (
            <Card key={solution.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0 ? "Best Match" : `Option ${index + 1}`}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {Math.round(solution.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{solution.title}</CardTitle>
                    <div className="flex items-center space-x-6 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{solution.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{Math.round(solution.successRate * 100)}% success rate</span>
                      </div>
                      <Badge variant={solution.difficulty === 'Easy' ? 'default' : 'secondary'}>
                        {solution.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  {completion > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{completion}%</div>
                      <div className="text-xs text-slate-500">Complete</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {solution.steps.map((step, stepIndex) => {
                    const stepKey = `${solution.id}-${stepIndex}`;
                    const isCompleted = completedSteps[stepKey];
                    
                    return (
                      <div 
                        key={stepIndex}
                        className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                          isCompleted 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => toggleStep(solution.id, stepIndex)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-slate-900 mr-2">
                            Step {stepIndex + 1}:
                          </span>
                          <span className={`text-sm ${isCompleted ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                            {step}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-slate-600">
                    Was this solution helpful?
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant={userFeedback === 'up' ? 'default' : 'outline'}
                      onClick={() => handleFeedback(solution.id, 'up')}
                      className="flex items-center space-x-1"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Yes</span>
                    </Button>
                    <Button
                      size="sm"
                      variant={userFeedback === 'down' ? 'destructive' : 'outline'}
                      onClick={() => handleFeedback(solution.id, 'down')}
                      className="flex items-center space-x-1"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>No</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Additional Help */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Still need help?</h3>
              <p className="text-slate-600 text-sm mb-3">
                Our solutions didn't work? Get personalized help from our experts.
              </p>
              <div className="flex space-x-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Chat with Expert
                </Button>
                <Button size="sm" variant="outline">
                  Browse Similar Problems
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
