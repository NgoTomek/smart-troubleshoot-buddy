
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  GitCompare, 
  Star, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle,
  X,
  Plus
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

interface SolutionComparisonProps {
  availableSolutions: Solution[];
  onClose: () => void;
}

export const SolutionComparison = ({ availableSolutions, onClose }: SolutionComparisonProps) => {
  const [selectedSolutions, setSelectedSolutions] = useState<Solution[]>([]);

  const addSolution = (solution: Solution) => {
    if (selectedSolutions.length < 3 && !selectedSolutions.find(s => s.id === solution.id)) {
      setSelectedSolutions([...selectedSolutions, solution]);
    }
  };

  const removeSolution = (solutionId: number) => {
    setSelectedSolutions(selectedSolutions.filter(s => s.id !== solutionId));
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-blue-600" />
              <span>Solution Comparison</span>
              <Badge variant="outline">{selectedSolutions.length}/3 selected</Badge>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {selectedSolutions.length === 0 && (
            <div className="text-center py-8">
              <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Select solutions to compare</p>
              <p className="text-sm text-slate-400">Choose up to 3 solutions to see a detailed comparison</p>
            </div>
          )}

          {selectedSolutions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSolutions.map((solution) => (
                <div key={solution.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-slate-900 text-sm">{solution.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSolution(solution.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Confidence</span>
                      <span className={`font-medium ${getConfidenceColor(solution.confidence)}`}>
                        {Math.round(solution.confidence * 100)}%
                      </span>
                    </div>
                    <Progress value={solution.confidence * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Success Rate</span>
                      <span className="font-medium text-green-600">
                        {Math.round(solution.successRate * 100)}%
                      </span>
                    </div>
                    <Progress value={solution.successRate * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(solution.difficulty)}>
                      {solution.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-slate-600">
                      <Clock className="w-3 h-3" />
                      <span>{solution.estimatedTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-1">Steps ({solution.steps.length})</p>
                    <div className="text-xs text-slate-500">
                      {solution.steps.slice(0, 2).map((step, index) => (
                        <div key={index}>• {step}</div>
                      ))}
                      {solution.steps.length > 2 && (
                        <div>... and {solution.steps.length - 2} more</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedSolutions.length < 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableSolutions
                .filter(solution => !selectedSolutions.find(s => s.id === solution.id))
                .map((solution) => (
                  <div key={solution.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-900 text-sm">{solution.title}</h5>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs font-medium ${getConfidenceColor(solution.confidence)}`}>
                          {Math.round(solution.confidence * 100)}%
                        </span>
                        <Badge variant="outline" className={getDifficultyColor(solution.difficulty)}>
                          {solution.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSolution(solution)}
                      className="ml-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
