
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface AIAssistantProps {
  onQuickAction: (action: string) => void;
}

export const AIAssistant = ({ onQuickAction }: AIAssistantProps) => {
  return (
    <div className="text-center">
      <p className="text-sm text-slate-600 mb-3">
        Need help with any step? Our AI assistant provides contextual guidance.
      </p>
      <Button variant="outline" size="sm" onClick={() => onQuickAction('ai-assistance')}>
        <Brain className="w-4 h-4 mr-2" />
        Get AI Assistance
      </Button>
    </div>
  );
};
