import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SolutionList } from '@/components/SolutionList';
import { SolutionComparison } from '@/components/SolutionComparison';
import { SolutionFilters } from '@/components/SolutionFilters';
import { Solution } from '@/types/solution';
import { 
  GitCompare, 
  List, 
  Filter,
  BarChart3
} from 'lucide-react';

interface FilterOptions {
  difficulty: string[];
  category: string[];
  confidenceRange: [number, number];
  successRateRange: [number, number];
}

interface SolutionManagerProps {
  solutions: Solution[];
  completedSteps: {[key: string]: boolean};
  quickFeedback: {[key: number]: 'helpful' | 'not-helpful' | null};
  showDetailedFeedback: {[key: number]: boolean};
  submittedFeedback: {[key: number]: boolean};
  onToggleStep: (stepKey: string) => void;
  onQuickFeedback: (solutionId: number, type: 'helpful' | 'not-helpful') => void;
  onToggleDetailedFeedback: (solutionId: number) => void;
  onFeedbackSubmitted: (solutionId: number, feedback: any) => void;
  problemContext?: string;
}

export const SolutionManager = ({
  solutions,
  completedSteps,
  quickFeedback,
  showDetailedFeedback,
  submittedFeedback,
  onToggleStep,
  onQuickFeedback,
  onToggleDetailedFeedback,
  onFeedbackSubmitted,
  problemContext
}: SolutionManagerProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: [],
    category: [],
    confidenceRange: [0, 1],
    successRateRange: [0, 1]
  });
  const [sort, setSort] = useState<{ by: string; order: 'asc' | 'desc' }>({
    by: 'confidence',
    order: 'desc'
  });

  const filteredAndSortedSolutions = useMemo(() => {
    let filtered = solutions.filter(solution => {
      const matchesDifficulty = filters.difficulty.length === 0 || 
        filters.difficulty.includes(solution.difficulty);
      
      const matchesCategory = filters.category.length === 0 || 
        filters.category.includes(solution.category);
      
      const matchesConfidence = solution.confidence >= filters.confidenceRange[0] && 
        solution.confidence <= filters.confidenceRange[1];
      
      const matchesSuccessRate = solution.successRate >= filters.successRateRange[0] && 
        solution.successRate <= filters.successRateRange[1];
      
      return matchesDifficulty && matchesCategory && matchesConfidence && matchesSuccessRate;
    });

    // Sort solutions
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sort.by) {
        case 'confidence':
          comparison = a.confidence - b.confidence;
          break;
        case 'successRate':
          comparison = a.successRate - b.successRate;
          break;
        case 'stepsCount':
          comparison = a.steps.length - b.steps.length;
          break;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        default:
          comparison = 0;
      }
      
      return sort.order === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [solutions, filters, sort]);

  if (showComparison) {
    return (
      <SolutionComparison
        availableSolutions={solutions}
        onClose={() => setShowComparison(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Solution Manager</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(true)}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Solutions
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="solutions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solutions" className="flex items-center space-x-2">
            <List className="w-4 h-4" />
            <span>Solutions ({filteredAndSortedSolutions.length})</span>
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters & Sort</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="solutions">
          <SolutionList
            solutions={filteredAndSortedSolutions}
            completedSteps={completedSteps}
            quickFeedback={quickFeedback}
            showDetailedFeedback={showDetailedFeedback}
            submittedFeedback={submittedFeedback}
            onToggleStep={onToggleStep}
            onQuickFeedback={onQuickFeedback}
            onToggleDetailedFeedback={onToggleDetailedFeedback}
            onFeedbackSubmitted={onFeedbackSubmitted}
            problemContext={problemContext}
          />
        </TabsContent>
        
        <TabsContent value="filters">
          <SolutionFilters
            solutions={solutions}
            onFilterChange={setFilters}
            onSortChange={(by, order) => setSort({ by, order })}
            currentFilters={filters}
            currentSort={sort}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
