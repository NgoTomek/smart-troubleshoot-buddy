
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StepDurationData {
  name: string;
  duration: number;
}

interface CurrentStepDurationChartProps {
  data: StepDurationData[];
}

export const CurrentStepDurationChart = ({ data }: CurrentStepDurationChartProps) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Duration Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value}s`, 'Duration']}
              labelFormatter={(label) => `Step: ${label}`}
            />
            <Bar dataKey="duration" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
