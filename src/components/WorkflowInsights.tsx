
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, Zap, Trophy, TrendingUp, Clock } from 'lucide-react';
import { Insight } from '@/components/workflow-tabs/InsightsTabContent';

interface WorkflowInsightsProps {
  insights: Insight[];
  currentStepId: string;
  progressPercent: number;
  averageStepTime: number;
  onApplyInsight: (id: string) => void;
}

export const WorkflowInsights = ({
  insights,
  currentStepId,
  progressPercent,
  averageStepTime,
  onApplyInsight,
}: WorkflowInsightsProps) => {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'optimization':
        return <Zap className="w-5 h-5 text-purple-600" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-green-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'tip':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'optimization':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'achievement':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityBadgeVariant = (priority: Insight['priority']) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Generate automatic insights based on workflow state
  const automaticInsights: Insight[] = [
    {
      id: 'progress-insight',
      type: progressPercent > 75 ? 'achievement' : progressPercent > 50 ? 'tip' : 'optimization',
      title: progressPercent > 75 ? 'Great Progress!' : progressPercent > 50 ? 'Halfway There' : 'Getting Started',
      description: progressPercent > 75 
        ? 'You\'re almost done! Keep up the excellent work.'
        : progressPercent > 50 
        ? 'You\'re making good progress through the workflow.'
        : 'Take your time and follow each step carefully for best results.',
      actionable: false,
      priority: progressPercent > 75 ? 'low' : 'medium'
    },
    {
      id: 'time-insight',
      type: averageStepTime > 300000 ? 'warning' : 'tip',
      title: averageStepTime > 300000 ? 'Consider Time Management' : 'Good Pace',
      description: averageStepTime > 300000 
        ? 'You\'re spending quite a bit of time on each step. Consider breaking down complex steps.'
        : 'You\'re maintaining a good pace through the workflow.',
      actionable: averageStepTime > 300000,
      priority: averageStepTime > 300000 ? 'medium' : 'low'
    }
  ];

  const allInsights = [...insights, ...automaticInsights];

  return (
    <div className="space-y-4">
      {/* Workflow Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Workflow Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progressPercent}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(averageStepTime / 1000)}s
              </div>
              <div className="text-sm text-gray-600">Avg Step Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {allInsights.length === 0 ? (
            <div className="text-center py-6">
              <Lightbulb className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No insights available yet</p>
              <p className="text-sm text-gray-500">Continue working to receive personalized tips</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allInsights.map((insight) => (
                <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <h4 className="font-medium">{insight.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityBadgeVariant(insight.priority)}>
                        {insight.priority}
                      </Badge>
                      {insight.actionable && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onApplyInsight(insight.id)}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm">{insight.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
