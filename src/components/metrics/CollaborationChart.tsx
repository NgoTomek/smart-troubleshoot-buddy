
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

interface CollaborationData {
  day: string;
  collaborators: number;
  sessions: number;
}

interface CollaborationChartProps {
  data: CollaborationData[];
}

export const CollaborationChart = ({ data }: CollaborationChartProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-4 h-4 text-indigo-600" />
        <h4 className="font-medium">Collaboration Activity</h4>
      </div>
      
      <div className="h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="collaborators" name="Collaborators" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No collaboration data available for the selected time range.
          </div>
        )}
      </div>
      
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-purple-600">
              {Math.round(data.reduce((acc, item) => acc + item.collaborators, 0) / data.length)}
            </div>
            <div className="text-xs text-slate-600">Avg Daily Collaborators</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-green-600">
              {data.reduce((acc, item) => acc + item.sessions, 0)}
            </div>
            <div className="text-xs text-slate-600">Total Sessions</div>
          </div>
        </div>
      )}
    </div>
  );
};
