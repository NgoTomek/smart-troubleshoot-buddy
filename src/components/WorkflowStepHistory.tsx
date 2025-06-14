
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, CheckCircle, XCircle, SkipForward, RotateCcw, Eye } from 'lucide-react';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';

interface WorkflowStepHistoryProps {
  history: HistoryEntry[];
  onRevisitStep: (stepId: string) => void;
  onClearHistory: () => void;
}

export const WorkflowStepHistory = ({
  history,
  onRevisitStep,
  onClearHistory,
}: WorkflowStepHistoryProps) => {
  const getStatusIcon = (status: HistoryEntry['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: HistoryEntry['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'skipped':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No workflow history yet</p>
          <p className="text-sm text-gray-500">Complete some steps to see your progress here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Workflow History</CardTitle>
          <Button variant="outline" size="sm" onClick={onClearHistory}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((entry, index) => (
            <div key={index}>
              <div className={`p-3 rounded-lg border ${getStatusColor(entry.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(entry.status)}
                    <span className="font-medium">{entry.stepTitle}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {formatDuration(entry.duration)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevisitStep(entry.stepId)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Revisit
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Status: {entry.status}</span>
                  <span>{entry.timestamp.toLocaleString()}</span>
                </div>
                
                {entry.notes && (
                  <div className="mt-2 text-sm text-gray-700">
                    <strong>Notes:</strong> {entry.notes}
                  </div>
                )}
              </div>
              
              {index < history.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
