
import React from 'react';

interface ProgressMetricProps {
  value: number;
  label: string;
  color?: 'green' | 'blue' | 'purple';
}

export const ProgressMetric = ({ value, label, color = 'green' }: ProgressMetricProps) => {
  const colorClasses = {
    green: 'text-green-700',
    blue: 'text-blue-700',
    purple: 'text-purple-700'
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-sm text-green-600">{label}</div>
    </div>
  );
};
