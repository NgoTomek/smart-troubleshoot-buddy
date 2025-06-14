
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface StatusDistributionChartProps {
  data: StatusData[];
}

export const StatusDistributionChart = ({ data }: StatusDistributionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {data.map((entry, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: entry.color, color: entry.color }}
            >
              {entry.name}: {entry.value}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
