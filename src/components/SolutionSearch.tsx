
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Star,
  Clock,
  CheckCircle,
  Tag
} from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  category: string;
  confidence: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  successRate: number;
  tags: string[];
}

export const SolutionSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['All', 'Network', 'Browser', 'System', 'Security', 'Performance'];

  const mockSearchResults: SearchResult[] = [
    {
      id: 1,
      title: 'Fix Network Connection Timeout',
      category: 'Network',
      confidence: 0.92,
      difficulty: 'Easy',
      estimatedTime: '5-10 minutes',
      successRate: 0.87,
      tags: ['timeout', 'connection', 'dns']
    },
    {
      id: 2,
      title: 'Resolve Browser Cache Issues',
      category: 'Browser',
      confidence: 0.78,
      difficulty: 'Easy',
      estimatedTime: '2-3 minutes',
      successRate: 0.91,
      tags: ['cache', 'cookies', 'refresh']
    },
    {
      id: 3,
      title: 'Configure Firewall Settings',
      category: 'Security',
      confidence: 0.65,
      difficulty: 'Medium',
      estimatedTime: '10-15 minutes',
      successRate: 0.73,
      tags: ['firewall', 'ports', 'security']
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      let results = mockSearchResults;
      
      if (searchQuery) {
        results = results.filter(result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      if (selectedCategory !== 'All') {
        results = results.filter(result => result.category === selectedCategory);
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-600" />
          <span>Solution Search</span>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Find solutions from our knowledge base
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search for solutions, errors, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              <Filter className="w-3 h-3 mr-1" />
              {category}
            </Button>
          ))}
        </div>
        
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">
              Search Results ({searchResults.length})
            </h4>
            
            {searchResults.map(result => (
              <Card key={result.id} className="border-slate-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="font-medium text-slate-900">{result.title}</h5>
                      <Badge variant="outline" className={getDifficultyColor(result.difficulty)}>
                        {result.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className={`w-4 h-4 ${getConfidenceColor(result.confidence)}`} />
                        <span className={`font-semibold ${getConfidenceColor(result.confidence)}`}>
                          {Math.round(result.confidence * 100)}% confidence
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{result.estimatedTime}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-slate-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{Math.round(result.successRate * 100)}% success rate</span>
                      </div>
                      
                      <Badge variant="outline">{result.category}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {searchResults.length === 0 && searchQuery && !isSearching && (
          <div className="text-center py-6">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500">No solutions found for "{searchQuery}"</p>
            <p className="text-sm text-slate-400">Try different keywords or check the spelling</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
