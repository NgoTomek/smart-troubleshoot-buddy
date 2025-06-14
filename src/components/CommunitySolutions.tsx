
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';

interface CommunitySolution {
  id: string;
  title: string;
  author: {
    name: string;
    reputation: number;
    badge: 'Expert' | 'Helper' | 'Contributor';
  };
  description: string;
  steps: string[];
  votes: { up: number; down: number };
  verifiedSuccess: number;
  timePosted: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  comments: number;
}

interface CommunitySolutionsProps {
  problemCategory: string;
  onSolutionSelect: (solution: CommunitySolution) => void;
}

export const CommunitySolutions = ({ 
  problemCategory, 
  onSolutionSelect 
}: CommunitySolutionsProps) => {
  const [activeTab, setActiveTab] = useState('trending');
  const [communitySolutions] = useState<CommunitySolution[]>([
    {
      id: 'cs-1',
      title: 'Complete Network Reset Protocol for Timeout Errors',
      author: {
        name: 'NetworkGuru2024',
        reputation: 1847,
        badge: 'Expert'
      },
      description: 'A comprehensive step-by-step approach that has resolved network timeout issues for 94% of users who tried it.',
      steps: [
        'Open Command Prompt as Administrator',
        'Run: ipconfig /release && ipconfig /flushdns',
        'Reset Winsock: netsh winsock reset',
        'Reset TCP/IP: netsh int ip reset',
        'Restart computer to apply changes'
      ],
      votes: { up: 342, down: 18 },
      verifiedSuccess: 0.94,
      timePosted: '2 hours ago',
      category: 'Network',
      difficulty: 'Medium',
      tags: ['timeout', 'network', 'dns', 'windows'],
      comments: 47
    },
    {
      id: 'cs-2',
      title: 'Quick Browser Fix for Connection Issues',
      author: {
        name: 'TechHelper99',
        reputation: 523,
        badge: 'Helper'
      },
      description: 'Simple browser-based solution that works for most connection problems without system changes.',
      steps: [
        'Clear all browser data (cache, cookies, history)',
        'Disable all extensions temporarily',
        'Reset browser to default settings',
        'Try accessing the site in incognito mode'
      ],
      votes: { up: 156, down: 12 },
      verifiedSuccess: 0.78,
      timePosted: '5 hours ago',
      category: 'Browser',
      difficulty: 'Easy',
      tags: ['browser', 'cache', 'quick-fix'],
      comments: 23
    },
    {
      id: 'cs-3',
      title: 'Advanced Router Configuration for Persistent Issues',
      author: {
        name: 'RouterMaster',
        reputation: 2156,
        badge: 'Expert'
      },
      description: 'For users comfortable with router settings, this method addresses deeper network configuration issues.',
      steps: [
        'Access router admin panel (usually 192.168.1.1)',
        'Update router firmware to latest version',
        'Change DNS servers to 1.1.1.1 and 8.8.8.8',
        'Adjust MTU settings to 1472',
        'Enable UPnP and QoS if available'
      ],
      votes: { up: 89, down: 7 },
      verifiedSuccess: 0.86,
      timePosted: '1 day ago',
      category: 'Network',
      difficulty: 'Hard',
      tags: ['router', 'advanced', 'configuration', 'firmware'],
      comments: 31
    }
  ]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Helper': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contributor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedSolutions = {
    trending: [...communitySolutions].sort((a, b) => (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down)),
    newest: [...communitySolutions].sort((a, b) => new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime()),
    verified: [...communitySolutions].sort((a, b) => b.verifiedSuccess - a.verifiedSuccess)
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-600" />
          <span>Community Solutions</span>
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Crowd-Sourced
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="newest" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Newest</span>
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Most Verified</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(sortedSolutions).map(([tab, solutions]) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {solutions.map((solution) => (
                <div key={solution.id} className="p-4 bg-white border border-green-200 rounded-lg space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{solution.title}</h4>
                      <div className="flex items-center space-x-3 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{solution.author.name}</span>
                          <Badge className={getBadgeColor(solution.author.badge)} variant="outline">
                            {solution.author.badge}
                          </Badge>
                        </div>
                        <span>•</span>
                        <span>{solution.timePosted}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(solution.difficulty)}>
                        {solution.difficulty}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {Math.round(solution.verifiedSuccess * 100)}% success
                        </div>
                        <div className="text-xs text-slate-500">verified</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-700">{solution.description}</p>

                  {/* Steps Preview */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">Solution Steps:</p>
                    <div className="text-sm text-slate-600">
                      {solution.steps.slice(0, 2).map((step, index) => (
                        <div key={index}>• {step}</div>
                      ))}
                      {solution.steps.length > 2 && (
                        <div className="text-slate-500">... and {solution.steps.length - 2} more steps</div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {solution.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {solution.votes.up}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          {solution.votes.down}
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-slate-500">
                        <MessageCircle className="w-3 h-3" />
                        <span>{solution.comments}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-slate-500">
                        <Star className="w-3 h-3" />
                        <span>{solution.author.reputation}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-3 h-3 mr-1" />
                        View Full
                      </Button>
                      <Button size="sm" onClick={() => onSolutionSelect(solution)}>
                        Try This Solution
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
