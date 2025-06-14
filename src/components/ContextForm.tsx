
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ContextFormProps {
  extractedText: string;
  onSubmit: (context: any) => void;
  isAnalyzing: boolean;
}

export const ContextForm = ({ extractedText, onSubmit, isAnalyzing }: ContextFormProps) => {
  const [context, setContext] = useState('');
  const [frequency, setFrequency] = useState('');
  const [whenStarted, setWhenStarted] = useState('');
  const [deviceType, setDeviceType] = useState('');
  
  const suggestedTags = ['network error', 'connection timeout', 'server issue', 'browser problem'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      context,
      frequency,
      whenStarted,
      deviceType,
      extractedText
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Tell us more about the problem</CardTitle>
        <p className="text-slate-600">The more context you provide, the better our AI can help you.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What were you trying to do when this happened?
            </label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="I was trying to access my company's website when this error appeared..."
              className="min-h-[100px]"
              required
            />
            <div className="mt-3">
              <p className="text-xs text-slate-500 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setContext(prev => prev + (prev ? ' ' : '') + tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How often does this happen?
              </label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First time</SelectItem>
                  <SelectItem value="occasionally">Occasionally</SelectItem>
                  <SelectItem value="frequently">Frequently</SelectItem>
                  <SelectItem value="always">Always</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                When did it start?
              </label>
              <Select value={whenStarted} onValueChange={setWhenStarted}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="just-now">Just now</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This week</SelectItem>
                  <SelectItem value="longer">Longer ago</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Device type
              </label>
              <Select value={deviceType} onValueChange={setDeviceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="windows-pc">Windows PC</SelectItem>
                  <SelectItem value="mac">Mac</SelectItem>
                  <SelectItem value="chromebook">Chromebook</SelectItem>
                  <SelectItem value="mobile">Mobile device</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isAnalyzing || !context}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing problem...</span>
              </div>
            ) : (
              'Get Solutions'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
