
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface BottlenecksProps {
  steps: string[];
}

export const Bottlenecks = ({ steps }: BottlenecksProps) => {
  if (steps.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span>Identified Bottlenecks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-yellow-800 mb-3">
            These steps took significantly longer than average and may need optimization:
          </p>
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-yellow-100 text-yellow-800 border-yellow-300"
              >
                {step}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
