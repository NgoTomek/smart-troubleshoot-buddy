
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface TroubleshootingSession {
  id: string;
  timestamp: string;
  problemDescription: string;
  solutionsFound: number;
  stepsCompleted: number;
  totalSteps: number;
  status: 'completed' | 'in-progress' | 'abandoned';
  category: string;
  confidence: number;
  timeSpent: string;
}

const SAMPLE_HISTORY: TroubleshootingSession[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    problemDescription: 'Cannot connect to server - Connection timeout error',
    solutionsFound: 3,
    stepsCompleted: 6,
    totalSteps: 6,
    status: 'completed',
    category: 'Network',
    confidence: 0.92,
    timeSpent: '12 minutes'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    problemDescription: 'Application crashes on startup with memory error',
    solutionsFound: 2,
    stepsCompleted: 3,
    totalSteps: 5,
    status: 'in-progress',
    category: 'Application',
    confidence: 0.78,
    timeSpent: '8 minutes'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    problemDescription: 'Database connection refused error 2002',
    solutionsFound: 4,
    stepsCompleted: 8,
    totalSteps: 8,
    status: 'completed',
    category: 'Database',
    confidence: 0.85,
    timeSpent: '15 minutes'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    problemDescription: 'SSL certificate verification failed',
    solutionsFound: 2,
    stepsCompleted: 1,
    totalSteps: 4,
    status: 'abandoned',
    category: 'Security',
    confidence: 0.65,
    timeSpent: '3 minutes'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    problemDescription: 'Browser rendering issue with CSS grid layout',
    solutionsFound: 3,
    stepsCompleted: 4,
    totalSteps: 4,
    status: 'completed',
    category: 'Browser',
    confidence: 0.88,
    timeSpent: '6 minutes'
  }
];

export const useTroubleshootingHistory = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<TroubleshootingSession[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('troubleshoot-history');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved history:', error);
        setSessions(SAMPLE_HISTORY);
        localStorage.setItem('troubleshoot-history', JSON.stringify(SAMPLE_HISTORY));
      }
    } else {
      setSessions(SAMPLE_HISTORY);
      localStorage.setItem('troubleshoot-history', JSON.stringify(SAMPLE_HISTORY));
    }
  }, []);

  const addSession = (session: Omit<TroubleshootingSession, 'id' | 'timestamp'>) => {
    const newSession: TroubleshootingSession = {
      ...session,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('troubleshoot-history', JSON.stringify(updatedSessions));
    
    toast({
      title: "Session Saved",
      description: "Your troubleshooting session has been saved to history.",
      duration: 3000,
    });
  };

  const deleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter(session => session.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem('troubleshoot-history', JSON.stringify(updatedSessions));
    
    toast({
      title: "Session Deleted",
      description: "The troubleshooting session has been removed from history.",
      duration: 3000,
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('troubleshoot-history');
    setSessions([]);
    
    toast({
      title: "History Cleared",
      description: "All troubleshooting history has been removed.",
      duration: 3000,
    });
  };

  const updateSessionStatus = (sessionId: string, status: TroubleshootingSession['status']) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId ? { ...session, status } : session
    );
    setSessions(updatedSessions);
    localStorage.setItem('troubleshoot-history', JSON.stringify(updatedSessions));
  };

  return {
    sessions,
    addSession,
    deleteSession,
    clearHistory,
    updateSessionStatus
  };
};
