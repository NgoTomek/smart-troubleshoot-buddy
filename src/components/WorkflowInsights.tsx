import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  AlertCircle,
  Star,
  Clock,
  Zap
} from 'lucide-react';
import { Insight } from '@/components/workflow-tabs/InsightsTabContent';

interface WorkflowInsightsProps {
  insights: Insight[];
  currentStepId: string;
  progressPercent: number;
  averageStepTime: number;
  onApplyInsight?: (insightId: string) => void;
}

export const WorkflowInsights = ({ 
  insights, 
  currentStepId, 
  progressPercent, 
  averageStepTime,
  onApplyInsight 
}: WorkflowInsightsProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="w-4 h-4 text-blue-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'optimization': return <Zap className="w-4 h-4 text-purple-600" />;
      case 'achievement': return <Star className="w-4 h-4 text-green-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-blue-50 border-blue-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'optimization': return 'bg-purple-50 border-purple-200';
      case 'achievement': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const highPriorityInsights = insights.filter(i => i.priority === 'high');
  const otherInsights = insights.filter(i => i.priority !== 'high');

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span>Workflow Insights</span>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
            {insights.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Overview */}
        <div className="p-4 bg-white rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Progress</span>
            <span className="text-sm text-gray-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 mb-3" />
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-indigo-600">
                {Math.round(averageStepTime)}s
              </div>
              <div className="text-xs text-gray-600">Avg Step Time</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-600">
                {currentStepId}
              </div>
              <div className="text-xs text-gray-600">Current Step</div>
            </div>
          </div>
        </div>

        {/* High Priority Insights */}
        {highPriorityInsights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-700 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Action Required
            </h4>
            {highPriorityInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="text-sm font-medium">{insight.title}</h5>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityBadge(insight.priority)}`}
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-700">{insight.description}</p>
                    </div>
                  </div>
                  
                  {insight.actionable && onApplyInsight && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApplyInsight(insight.id)}
                      className="ml-2 text-xs h-6"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Insights */}
        {otherInsights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Recommendations
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {otherInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 flex-1">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="text-sm font-medium">{insight.title}</h5>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityBadge(insight.priority)}`}
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-700">{insight.description}</p>
                      </div>
                    </div>
                    
                    {insight.actionable && onApplyInsight && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onApplyInsight(insight.id)}
                        className="ml-2 text-xs h-6"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {insights.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No insights available yet</p>
            <p className="text-xs">Complete more steps to get personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
