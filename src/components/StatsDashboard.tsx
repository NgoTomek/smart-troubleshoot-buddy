
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  Star,
  Target,
  Activity,
  Award
} from 'lucide-react';

const statsData = {
  totalIssuesResolved: 15847,
  averageSuccessRate: 87,
  averageResolutionTime: '3.2 minutes',
  activeUsers: 2834,
  topCategories: [
    { name: 'Network Issues', count: 4521, successRate: 91 },
    { name: 'Software Problems', count: 3892, successRate: 85 },
    { name: 'Browser Issues', count: 2743, successRate: 89 },
    { name: 'System Errors', count: 2156, successRate: 82 },
    { name: 'Security Issues', count: 1834, successRate: 78 }
  ],
  recentMetrics: {
    issuesThisWeek: 1249,
    successRateThisWeek: 89,
    averageRatingThisWeek: 4.3,
    improvementFromLastWeek: 5.2
  }
};

export const StatsDisplay = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Platform Statistics</h2>
        <p className="text-slate-600">Real-time insights into TechFix AI performance and user success</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Issues Resolved</p>
                <p className="text-2xl font-bold text-blue-900">
                  {statsData.totalIssuesResolved.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-green-900">
                  {statsData.averageSuccessRate}%
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-purple-900">
                  {statsData.averageResolutionTime}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-orange-900">
                  {statsData.activeUsers.toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Week Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>This Week's Performance</span>
            <Badge className="bg-green-100 text-green-800">
              +{statsData.recentMetrics.improvementFromLastWeek}% improvement
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Issues Resolved</span>
                <span className="text-lg font-bold text-slate-900">
                  {statsData.recentMetrics.issuesThisWeek}
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-slate-500">Target: 1,500 this week</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Success Rate</span>
                <span className="text-lg font-bold text-slate-900">
                  {statsData.recentMetrics.successRateThisWeek}%
                </span>
              </div>
              <Progress value={statsData.recentMetrics.successRateThisWeek} className="h-2" />
              <p className="text-xs text-slate-500">Above target of 85%</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">User Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-lg font-bold text-slate-900">
                    {statsData.recentMetrics.averageRatingThisWeek}
                  </span>
                </div>
              </div>
              <Progress value={statsData.recentMetrics.averageRatingThisWeek * 20} className="h-2" />
              <p className="text-xs text-slate-500">Based on user feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>Top Issue Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statsData.topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">
                        {category.count.toLocaleString()} issues
                      </span>
                      <Badge 
                        className={`${
                          category.successRate >= 85 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {category.successRate}% success
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.successRate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badge */}
      <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
        <CardContent className="p-6 text-center">
          <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h3 className="font-bold text-yellow-900 mb-2">High Performance Achievement</h3>
          <p className="text-yellow-800">
            TechFix AI has maintained above 85% success rate for 12 consecutive weeks!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
