
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

interface CompletionTimeData {
  step: string;
  avgTime: number;
}

interface CompletionTimeChartProps {
  data: CompletionTimeData[];
}

const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes('Time') ? formatTime(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

export const CompletionTimeChart = ({ data }: CompletionTimeChartProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-4 h-4 text-indigo-600" />
        <h4 className="font-medium">Average Step Completion Times</h4>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis tickFormatter={formatTime} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgTime" fill="#3B82F6" name="Avg Time" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-indigo-600">
            {data.length > 0 ? formatTime(data.reduce((acc, item) => acc + item.avgTime, 0) / data.length) : 'N/A'}
          </div>
          <div className="text-xs text-slate-600">Avg Step Time</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-green-600">
            {data.length > 0 ? formatTime(Math.min(...data.map(item => item.avgTime))) : 'N/A'}
          </div>
          <div className="text-xs text-slate-600">Fastest Step</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-lg font-bold text-red-600">
            {data.length > 0 ? formatTime(Math.max(...data.map(item => item.avgTime))) : 'N/A'}
          </div>
          <div className="text-xs text-slate-600">Slowest Step</div>
        </div>
      </div>
    </div>
  );
};
