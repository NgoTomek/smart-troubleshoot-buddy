
import { HistoryEntry } from '@/components/workflow-tabs/HistoryTabContent';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';

interface StepCompletionTime {
  name: string;
  time: number; // in seconds
}

interface StepSuccessRate {
  name: string;
  completed: number;
  failed: number;
  skipped: number;
}

export interface WorkflowMetrics {
  stepCompletionTimes: StepCompletionTime[];
  successRates: StepSuccessRate[];
  performanceTrends: any[];
  collaborationData: any[];
}

export const generateWorkflowMetrics = (
  history: HistoryEntry[],
  workflowSteps: WorkflowStep[],
  timeRange: '7d' | '30d' | '90d'
): WorkflowMetrics => {
  const daysToSubtract = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  }[timeRange];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToSubtract);

  const filteredHistory = history.filter(entry => new Date(entry.timestamp) >= cutoffDate);

  const stepMetrics: { [key: string]: { times: number[]; statuses: { [key: string]: number } } } = {};

  for (const step of workflowSteps) {
    stepMetrics[step.id] = {
      times: [],
      statuses: { completed: 0, failed: 0, skipped: 0 },
    };
  }

  for (const entry of filteredHistory) {
    if (stepMetrics[entry.stepId]) {
      stepMetrics[entry.stepId].times.push(entry.duration / 1000); // ms to s
      stepMetrics[entry.stepId].statuses[entry.status] = (stepMetrics[entry.stepId].statuses[entry.status] || 0) + 1;
    }
  }

  const stepCompletionTimes: StepCompletionTime[] = workflowSteps.map(step => {
    const metrics = stepMetrics[step.id];
    const avgTime = metrics.times.length > 0 ? metrics.times.reduce((a, b) => a + b, 0) / metrics.times.length : 0;
    return {
      name: step.title,
      time: parseFloat(avgTime.toFixed(1)),
    };
  });

  const successRates: StepSuccessRate[] = workflowSteps.map(step => {
    const metrics = stepMetrics[step.id];
    return {
      name: step.title,
      completed: metrics.statuses.completed,
      failed: metrics.statuses.failed,
      skipped: metrics.statuses.skipped,
    };
  });
  
  const trendsMap: { [key: string]: { times: number[]; count: number } } = {};
  for(const entry of filteredHistory) {
      if(entry.status === 'completed') {
          const dateStr = entry.timestamp.toISOString().split('T')[0];
          if(!trendsMap[dateStr]) {
              trendsMap[dateStr] = { times: [], count: 0 };
          }
          trendsMap[dateStr].times.push(entry.duration / 1000);
          trendsMap[dateStr].count++;
      }
  }

  const performanceTrends = Object.entries(trendsMap).map(([date, data]) => ({
      date,
      avgTime: data.times.length > 0 ? parseFloat((data.times.reduce((a, b) => a + b, 0) / data.times.length).toFixed(1)) : 0,
      completions: data.count
  })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const collaborationTrendsMap: { [key: string]: { count: number } } = {};
  for(const entry of filteredHistory) {
      const dateStr = new Date(entry.timestamp).toISOString().split('T')[0];
      if(!collaborationTrendsMap[dateStr]) {
          collaborationTrendsMap[dateStr] = { count: 0 };
      }
      collaborationTrendsMap[dateStr].count++;
  }

  const collaborationData = Object.entries(collaborationTrendsMap).map(([date, data]) => ({
      day: date,
      // For now, let's simulate collaborators and sessions based on activity count.
      // A real implementation would need user/session tracking.
      collaborators: Math.ceil(data.count / 3) + Math.floor(Math.random() * 2),
      sessions: data.count + Math.floor(Math.random() * 4),
  })).sort((a,b) => new Date(a.day).getTime() - new Date(b.day).getTime());


  return {
    stepCompletionTimes,
    successRates,
    performanceTrends,
    collaborationData,
  };
};

export const generateWorkflowAnalytics = (
  workflowSteps: WorkflowStep[],
  stepDurations: { [key: string]: number }
): WorkflowAnalytics => {
  const totalSteps = workflowSteps.filter(s => !s.optional).length;
  const completedSteps = workflowSteps.filter(s => s.status === 'completed').length;
  const skippedSteps = workflowSteps.filter(s => s.status === 'skipped').length;
  const failedSteps = workflowSteps.filter(s => s.status === 'failed').length;
  
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  
  const completedDurations = Object.values(stepDurations);
  const averageStepTime = completedDurations.length > 0 
    ? completedDurations.reduce((a, b) => a + b, 0) / completedDurations.length 
    : 0;
  
  const remainingSteps = workflowSteps.filter(s => 
    s.status === 'pending' || s.status === 'active'
  ).length;
  
  const estimatedTimeRemaining = remainingSteps > 0 
    ? `${Math.round((remainingSteps * averageStepTime) / 60000)} min`
    : '0 min';

  // Identify bottleneck steps (steps that took longer than average)
  const bottleneckSteps = Object.entries(stepDurations)
    .filter(([_, duration]) => duration > averageStepTime * 1.5)
    .map(([stepId]) => {
      const step = workflowSteps.find(s => s.id === stepId);
      return step?.title || stepId;
    });

  return {
    totalSteps,
    completedSteps,
    skippedSteps,
    failedSteps,
    progressPercent,
    estimatedTimeRemaining,
    averageStepTime: Math.round(averageStepTime / 1000), // Convert to seconds
    bottleneckSteps
  };
};
