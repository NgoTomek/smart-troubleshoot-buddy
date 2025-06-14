
import { useMemo } from 'react';
import { Solution } from '@/types/solution';

export const useSolutionAnalysis = (solutions: Solution[]) => {
  const analysis = useMemo(() => {
    if (solutions.length === 0) {
      return {
        averageConfidence: 0,
        averageSuccessRate: 0,
        totalSteps: 0,
        categories: [],
        difficultyDistribution: { Easy: 0, Medium: 0, Hard: 0 },
        estimatedTimeRange: '0 minutes',
      };
    }

    const averageConfidence = solutions.reduce((acc, sol) => acc + sol.confidence, 0) / solutions.length;
    const averageSuccessRate = solutions.reduce((acc, sol) => acc + sol.successRate, 0) / solutions.length;
    const totalSteps = solutions.reduce((acc, sol) => acc + sol.steps.length, 0);
    const categories = [...new Set(solutions.map(sol => sol.category))];
    
    const difficultyDistribution = solutions.reduce((acc, sol) => {
      acc[sol.difficulty as keyof typeof acc] = (acc[sol.difficulty as keyof typeof acc] || 0) + 1;
      return acc;
    }, { Easy: 0, Medium: 0, Hard: 0 });

    // Calculate estimated time range
    const timeEstimates = solutions.map(sol => {
      const timeStr = sol.estimatedTime;
      const match = timeStr.match(/(\d+)-(\d+)/);
      if (match) {
        return { min: parseInt(match[1]), max: parseInt(match[2]) };
      }
      const singleMatch = timeStr.match(/(\d+)/);
      const time = singleMatch ? parseInt(singleMatch[1]) : 5;
      return { min: time, max: time };
    });

    const minTime = Math.min(...timeEstimates.map(t => t.min));
    const maxTime = Math.max(...timeEstimates.map(t => t.max));
    const estimatedTimeRange = `${minTime}-${maxTime} minutes`;

    return {
      averageConfidence,
      averageSuccessRate,
      totalSteps,
      categories,
      difficultyDistribution,
      estimatedTimeRange,
    };
  }, [solutions]);

  return analysis;
};
