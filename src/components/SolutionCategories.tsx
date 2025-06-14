
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Network, 
  Database, 
  Shield, 
  Monitor, 
  Code, 
  Settings,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface SolutionCategoriesProps {
  solutions: any[];
}

export const SolutionCategories = ({ solutions }: SolutionCategoriesProps) => {
  const categoryIcons = {
    'Network': Network,
    'Database': Database,
    'Security': Shield,
    'Browser': Monitor,
    'Application': Code,
    'System': Settings,
    'Performance': Zap,
    'General': AlertTriangle
  };

  const categoryStats = solutions.reduce((acc, solution) => {
    const category = solution.category;
    if (!acc[category]) {
      acc[category] = {
        count: 0,
        totalConfidence: 0,
        totalSuccessRate: 0,
        difficulties: { Easy: 0, Medium: 0, Hard: 0 }
      };
    }
    acc[category].count += 1;
    acc[category].totalConfidence += solution.confidence;
    acc[category].totalSuccessRate += solution.successRate;
    acc[category].difficulties[solution.difficulty] += 1;
    return acc;
  }, {} as any);

  const categories = Object.entries(categoryStats).map(([name, stats]: [string, any]) => ({
    name,
    count: stats.count,
    avgConfidence: stats.totalConfidence / stats.count,
    avgSuccessRate: stats.totalSuccessRate / stats.count,
    mostCommonDifficulty: Object.entries(stats.difficulties)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0][0],
    icon: categoryIcons[name as keyof typeof categoryIcons] || AlertTriangle
  }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>Solution Categories</span>
          <Badge variant="outline">{categories.length} categories</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.name} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-slate-900">{category.name}</h4>
                      <p className="text-sm text-slate-600">{category.count} solution{category.count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getDifficultyColor(category.mostCommonDifficulty)}>
                      {category.mostCommonDifficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Confidence</span>
                      <span className={`font-medium ${getConfidenceColor(category.avgConfidence)}`}>
                        {Math.round(category.avgConfidence * 100)}%
                      </span>
                    </div>
                    <Progress value={category.avgConfidence * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Success Rate</span>
                      <span className="font-medium text-green-600">
                        {Math.round(category.avgSuccessRate * 100)}%
                      </span>
                    </div>
                    <Progress value={category.avgSuccessRate * 100} className="h-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-2">No categories available</p>
            <p className="text-sm text-slate-400">
              Categories will appear when solutions are generated
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
