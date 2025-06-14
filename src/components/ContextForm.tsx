
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageSquare, Zap, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContextFormProps {
  extractedText: string;
  onSubmit: (context: any) => void;
  isAnalyzing: boolean;
}

export const ContextForm = ({ extractedText, onSubmit, isAnalyzing }: ContextFormProps) => {
  const { toast } = useToast();
  const [context, setContext] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [environment, setEnvironment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Analysis Started",
      description: "Our AI is analyzing your issue and generating solutions...",
      duration: 3000,
    });
    
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
          <div className="space-y-2">
            <Label htmlFor="context">What were you trying to do when this error occurred?</Label>
            <Textarea
              id="context"
              placeholder="e.g., I was trying to connect to my work VPN when this error appeared..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Problem Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">Network & Connectivity</SelectItem>
                <SelectItem value="software">Software & Applications</SelectItem>
                <SelectItem value="system">System & Hardware</SelectItem>
                <SelectItem value="browser">Browser Issues</SelectItem>
                <SelectItem value="email">Email & Communication</SelectItem>
                <SelectItem value="security">Security & Authentication</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>How urgent is this issue?</Label>
            <RadioGroup value={urgency} onValueChange={setUrgency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Low - Can wait</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span>Medium - Need to fix today</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>High - Blocking my work</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Environment/System</Label>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger>
                <SelectValue placeholder="Select your system (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows">Windows</SelectItem>
                <SelectItem value="macos">macOS</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
                <SelectItem value="chrome">Chrome Browser</SelectItem>
                <SelectItem value="firefox">Firefox Browser</SelectItem>
                <SelectItem value="safari">Safari Browser</SelectItem>
                <SelectItem value="mobile">Mobile Device</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
