
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap } from 'lucide-react';
import { useNotificationManager } from '@/hooks/useNotificationManager';
import { ContextFormFields } from '@/components/ContextFormFields';

interface ContextFormProps {
  extractedText: string;
  onSubmit: (context: any) => void;
  isAnalyzing: boolean;
}

export const ContextForm = ({ extractedText, onSubmit, isAnalyzing }: ContextFormProps) => {
  const { showSuccess } = useNotificationManager();
  const [context, setContext] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [environment, setEnvironment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    showSuccess(
      "Analysis Started",
      "Our AI is analyzing your issue and generating solutions..."
    );
    
    onSubmit({
      extractedText,
      additionalContext: context,
      category,
      urgency,
      environment
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Provide Additional Context</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ContextFormFields
            context={context}
            setContext={setContext}
            category={category}
            setCategory={setCategory}
            urgency={urgency}
            setUrgency={setUrgency}
            environment={environment}
            setEnvironment={setEnvironment}
          />

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Get AI Solutions
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
