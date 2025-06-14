
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Lightbulb, 
  ChevronDown,
  ChevronUp,
  Star,
  BookOpen,
  Zap,
  Shield
} from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  category: 'Prevention' | 'Troubleshooting' | 'Performance' | 'Security';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
  isExpanded?: boolean;
}

export const TipsAndTricks = () => {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: '1',
      title: 'Regular System Maintenance',
      category: 'Prevention',
      difficulty: 'Beginner',
      content: 'Perform regular system updates, clear temporary files weekly, and restart your computer at least once a week to prevent many common issues.',
      isExpanded: false
    },
    {
      id: '2',
      title: 'Network Troubleshooting Basics',
      category: 'Troubleshooting',
      difficulty: 'Beginner',
      content: 'Always start with the basics: check cable connections, restart your router, and try connecting to a different network to isolate the problem.',
      isExpanded: false
    },
    {
      id: '3',
      title: 'Browser Performance Optimization',
      category: 'Performance',
      difficulty: 'Intermediate',
      content: 'Disable unnecessary extensions, clear cache regularly, and use incognito mode to test if issues are caused by browser data or extensions.',
      isExpanded: false
    },
    {
      id: '4',
      title: 'Safe Mode Troubleshooting',
      category: 'Troubleshooting',
      difficulty: 'Intermediate',
      content: 'Boot into safe mode to diagnose startup issues, driver conflicts, or malware problems. This loads only essential system files and drivers.',
      isExpanded: false
    },
    {
      id: '5',
      title: 'Security Best Practices',
      category: 'Security',
      difficulty: 'Beginner',
      content: 'Keep your antivirus updated, avoid suspicious downloads, use strong passwords, and enable two-factor authentication where possible.',
      isExpanded: false
    },
    {
      id: '6',
      title: 'Advanced Log Analysis',
      category: 'Troubleshooting',
      difficulty: 'Advanced',
      content: 'Use Event Viewer (Windows) or Console (Mac) to identify error patterns. Look for recurring error codes and timestamps to pinpoint issues.',
      isExpanded: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', 'Prevention', 'Troubleshooting', 'Performance', 'Security'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const toggleTip = (tipId: string) => {
    setTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, isExpanded: !tip.isExpanded } : tip
    ));
  };

  const filteredTips = tips.filter(tip => {
    const categoryMatch = selectedCategory === 'All' || tip.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || tip.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Prevention': return Shield;
      case 'Troubleshooting': return Lightbulb;
      case 'Performance': return Zap;
      case 'Security': return Shield;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prevention': return 'bg-blue-100 text-blue-800';
      case 'Troubleshooting': return 'bg-purple-100 text-purple-800';
      case 'Performance': return 'bg-orange-100 text-orange-800';
      case 'Security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <span>Tips & Tricks</span>
          <Badge variant="secondary">{filteredTips.length}</Badge>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Expert advice to prevent issues and improve troubleshooting skills
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Category</p>
            <div className="flex flex-wrap gap-1">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Difficulty</p>
            <div className="flex flex-wrap gap-1">
              {difficulties.map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredTips.map((tip, index) => {
            const CategoryIcon = getCategoryIcon(tip.category);
            
            return (
              <Card key={tip.id} className="border-slate-200">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full p-4 h-auto justify-between hover:bg-slate-50"
                    onClick={() => toggleTip(tip.id)}
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <CategoryIcon className="w-4 h-4 text-slate-600" />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{tip.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getCategoryColor(tip.category)}>
                            {tip.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(tip.difficulty)}>
                            {tip.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {tip.isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                  
                  {tip.isExpanded && (
                    <div className="px-4 pb-4">
                      <Separator className="mb-3" />
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredTips.length === 0 && (
          <div className="text-center py-6">
            <Lightbulb className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500">No tips found for the selected filters</p>
            <p className="text-sm text-slate-400">Try adjusting your category or difficulty filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
