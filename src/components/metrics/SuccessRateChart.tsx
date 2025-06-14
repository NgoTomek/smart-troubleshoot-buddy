
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

interface SuccessRateData {
  step: string;
  success: number;
  failure: number;
  skipped: number;
}

interface SuccessRateChartProps {
  data: SuccessRateData[];
}

export const SuccessRateChart = ({ data }: SuccessRateChartProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-4 h-4 text-indigo-600" />
        <h4 className="font-medium">Step Success Rates</h4>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="success" stackId="a" fill="#10B981" name="Completed" />
            <Bar dataKey="skipped" stackId="a" fill="#F59E0B" name="Skipped" />
            <Bar dataKey="failure" stackId="a" fill="#EF4444" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
