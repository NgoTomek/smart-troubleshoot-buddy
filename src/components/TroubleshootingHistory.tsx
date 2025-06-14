
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  History, 
  Calendar, 
  Clock, 
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Trash2,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TroubleshootingSession {
  id: string;
  timestamp: string;
  problemDescription: string;
  solutionsFound: number;
  stepsCompleted: number;
  totalSteps: number;
  status: 'completed' | 'in-progress' | 'abandoned';
  category: string;
}

export const TroubleshootingHistory = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<TroubleshootingSession[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('troubleshoot-history');
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('troubleshoot-history');
    setSessions([]);
    toast({
      title: "History Cleared",
      description: "All troubleshooting history has been removed.",
      duration: 3000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5 text-blue-600" />
            <span>Troubleshooting History</span>
            <Badge variant="secondary">{sessions.length}</Badge>
          </CardTitle>
          {sessions.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          )}
        </div>
        <p className="text-sm text-slate-600">
          Your previous troubleshooting sessions and their outcomes
        </p>
      </CardHeader>
      
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-2">No troubleshooting history yet</p>
            <p className="text-sm text-slate-400">
              Your completed sessions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div key={session.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(session.status)}>
                          {session.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {session.status === 'in-progress' && <Clock className="w-3 h-3 mr-1" />}
                          {session.status === 'abandoned' && <XCircle className="w-3 h-3 mr-1" />}
                          {session.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline">{session.category}</Badge>
                      </div>
                      
                      <p className="text-sm font-medium text-slate-900">
                        {session.problemDescription}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(session.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{session.solutionsFound} solutions found</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{session.stepsCompleted}/{session.totalSteps} steps completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {index < sessions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
