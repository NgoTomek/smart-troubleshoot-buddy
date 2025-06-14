import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  History, 
  CheckCircle, 
  XCircle, 
  SkipForward, 
  Clock,
  RotateCcw,
  Eye
} from 'lucide-react';
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';

interface WorkflowStepHistoryProps {
  history: HistoryEntry[];
  onRevisitStep?: (stepId: string) => void;
  onClearHistory?: () => void;
}

export const WorkflowStepHistory = ({ 
  history, 
  onRevisitStep, 
  onClearHistory 
}: WorkflowStepHistoryProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'skipped': return <SkipForward className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200 text-green-800';
      case 'failed': return 'bg-red-50 border-red-200 text-red-800';
      case 'skipped': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const sortedHistory = [...history].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-slate-600" />
            <span>Step History</span>
            <Badge variant="outline" className="bg-slate-100 text-slate-700">
              {history.length} entries
            </Badge>
          </div>
          {history.length > 0 && onClearHistory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearHistory}
              className="text-slate-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {sortedHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No step history yet</p>
            <p className="text-xs">Complete steps to see your progress</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sortedHistory.map((entry, index) => (
              <div
                key={`${entry.stepId}-${entry.timestamp.getTime()}`}
                className={`p-3 rounded-lg border transition-colors ${getStatusColor(entry.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    {getStatusIcon(entry.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {entry.stepTitle}
                      </p>
                      <div className="flex items-center space-x-2 text-xs opacity-75">
                        <span>{formatTimestamp(entry.timestamp)}</span>
                        <span>•</span>
                        <span>{formatDuration(entry.duration)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {onRevisitStep && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevisitStep(entry.stepId)}
                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                {entry.notes && (
                  <p className="text-xs mt-2 opacity-80 italic">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-bold text-green-600">
                  {history.filter(h => h.status === 'completed').length}
                </div>
                <div className="text-xs text-slate-600">Completed</div>
              </div>
              <div>
                <div className="text-sm font-bold text-yellow-600">
                  {history.filter(h => h.status === 'skipped').length}
                </div>
                <div className="text-xs text-slate-600">Skipped</div>
              </div>
              <div>
                <div className="text-sm font-bold text-red-600">
                  {history.filter(h => h.status === 'failed').length}
                </div>
                <div className="text-xs text-slate-600">Failed</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
