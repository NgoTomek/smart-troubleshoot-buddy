
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CategoryChartData {
  name: string;
  completed: number;
  total: number;
  completion: number;
}

interface CategoryCompletionProps {
  data: CategoryChartData[];
}

export const CategoryCompletion = ({ data }: CategoryCompletionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium capitalize">{category.name}</span>
                <Badge variant="outline">
                  {category.completed}/{category.total} ({category.completion}%)
                </Badge>
              </div>
              <Progress value={category.completion} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
