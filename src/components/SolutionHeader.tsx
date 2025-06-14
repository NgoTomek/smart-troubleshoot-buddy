
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Lightbulb } from 'lucide-react';

interface SolutionHeaderProps {
  onStartOver: () => void;
}

export const SolutionHeader = ({ onStartOver }: SolutionHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Lightbulb className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-slate-900">AI Solutions Found</h1>
      </div>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Based on your error and context, here are the most likely solutions ranked by confidence and success rate.
      </p>
      <Button 
        variant="outline" 
        onClick={onStartOver}
        className="mt-4"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Start Over
      </Button>
    </div>
  );
};
