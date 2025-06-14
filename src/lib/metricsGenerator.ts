
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';
import { WorkflowStep } from '@/types/workflow';

export const generateWorkflowMetrics = (
  history: HistoryEntry[],
  workflowSteps: WorkflowStep[],
  timeRange: '7d' | '30d' | '90d'
) => {
  const completedSteps = history.filter(entry => entry.status === 'completed');
  const totalSteps = workflowSteps.length;
  
  const completionRate = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;
  const averageTime = completedSteps.length > 0 
    ? completedSteps.reduce((acc, entry) => acc + entry.duration, 0) / completedSteps.length 
    : 0;

  const stepDistribution = [
    { name: 'Completed', value: completedSteps.length, color: '#10B981' },
    { name: 'Pending', value: workflowSteps.filter(s => s.status === 'pending').length, color: '#6B7280' },
    { name: 'Active', value: workflowSteps.filter(s => s.status === 'active').length, color: '#3B82F6' },
    { name: 'Skipped', value: history.filter(h => h.status === 'skipped').length, color: '#F59E0B' },
  ].filter(item => item.value > 0);

  const timelineData = history.map(entry => ({
    step: entry.stepTitle,
    duration: entry.duration,
    status: entry.status,
  }));

  // Generate sample trend data based on time range
  const getDaysCount = (range: string) => {
    switch (range) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 7;
    }
  };

  const days = getDaysCount(timeRange);
  const trends = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString(),
      completions: Math.floor(Math.random() * 5) + 1,
      avgTime: Math.floor(Math.random() * 120000) + 60000, // 1-3 minutes
    };
  });

  return {
    completionRate,
    averageTime,
    stepDistribution,
    timelineData,
    trends,
  };
};
