
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const QuickActionButton = ({ 
  name, 
  description, 
  icon: Icon, 
  onClick 
}: QuickActionButtonProps) => {
  return (
    <Button
      variant="outline"
      className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-orange-100 border-orange-200"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 w-full">
        <Icon className="w-4 h-4 text-orange-600" />
        <span className="font-medium text-left">{name}</span>
      </div>
      <p className="text-xs text-slate-600 text-left">
        {description}
      </p>
    </Button>
  );
};
