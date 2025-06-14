
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PerformanceData {
  date: string;
  completions: number;
  avgTime: number;
}

interface PerformanceTrendChartProps {
  data: PerformanceData[];
}

export const PerformanceTrendChart = ({ data }: PerformanceTrendChartProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-4 h-4 text-indigo-600" />
        <h4 className="font-medium">Performance Trends</h4>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="completions" name="Completions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-blue-600">
            {data.length > 0 ? `${Math.round(data.reduce((acc, item) => acc + item.completions, 0) / data.length)}` : 'N/A'}
          </div>
          <div className="text-xs text-slate-600">Avg Daily Completions</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-green-600">
            {data.length > 0 ? `${Math.max(...data.map(item => item.completions))}` : 'N/A'}
          </div>
          <div className="text-xs text-slate-600">Peak Completions</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-orange-600">
            {data.reduce((acc, item) => acc + item.completions, 0)}
          </div>
          <div className="text-xs text-slate-600">Total Completions</div>
        </div>
      </div>
    </div>
  );
};
