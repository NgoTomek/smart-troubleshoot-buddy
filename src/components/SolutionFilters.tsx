
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Filter, 
  ArrowUpDown, 
  Star, 
  Clock, 
  Target,
  RotateCcw
} from 'lucide-react';

interface SolutionFiltersProps {
  solutions: any[];
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  currentFilters: FilterOptions;
  currentSort: { by: string; order: 'asc' | 'desc' };
}

interface FilterOptions {
  difficulty: string[];
  category: string[];
  confidenceRange: [number, number];
  successRateRange: [number, number];
}

export const SolutionFilters = ({ 
  solutions, 
  onFilterChange, 
  onSortChange, 
  currentFilters,
  currentSort 
}: SolutionFiltersProps) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [...new Set(solutions.map(s => s.category))];

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = currentFilters.difficulty.includes(difficulty)
      ? currentFilters.difficulty.filter(d => d !== difficulty)
      : [...currentFilters.difficulty, difficulty];
    
    onFilterChange({ ...currentFilters, difficulty: newDifficulties });
  };

  const toggleCategory = (category: string) => {
    const newCategories = currentFilters.category.includes(category)
      ? currentFilters.category.filter(c => c !== category)
      : [...currentFilters.category, category];
    
    onFilterChange({ ...currentFilters, category: newCategories });
  };

  const resetFilters = () => {
    onFilterChange({
      difficulty: [],
      category: [],
      confidenceRange: [0, 1],
      successRateRange: [0, 1]
    });
  };

  const sortOptions = [
    { value: 'confidence', label: 'Confidence', icon: Star },
    { value: 'successRate', label: 'Success Rate', icon: Target },
    { value: 'difficulty', label: 'Difficulty', icon: Clock },
    { value: 'stepsCount', label: 'Steps Count', icon: ArrowUpDown }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const activeFiltersCount = currentFilters.difficulty.length + currentFilters.category.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <span>Filters & Sort</span>
            {activeFiltersCount > 0 && (
              <Badge variant="outline">{activeFiltersCount} active</Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sort Options */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Sort by</h4>
          <div className="grid grid-cols-2 gap-2">
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              const isActive = currentSort.by === option.value;
              
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSortChange(
                    option.value, 
                    isActive && currentSort.order === 'desc' ? 'asc' : 'desc'
                  )}
                  className="justify-start"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {option.label}
                  {isActive && (
                    <span className="ml-auto text-xs">
                      {currentSort.order === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Difficulty Filter */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Difficulty</h4>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={currentFilters.difficulty.includes(difficulty) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDifficulty(difficulty)}
                className={currentFilters.difficulty.includes(difficulty) ? "" : getDifficultyColor(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={currentFilters.category.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Separator />
        <div className="text-sm text-slate-600">
          <p>Showing solutions with applied filters</p>
          <div className="flex items-center justify-between mt-1">
            <span>Total available: {solutions.length}</span>
            <span>Avg confidence: {Math.round((solutions.reduce((acc, s) => acc + s.confidence, 0) / solutions.length) * 100)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
