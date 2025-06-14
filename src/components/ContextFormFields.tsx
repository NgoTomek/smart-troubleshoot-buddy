
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Clock } from 'lucide-react';

interface ContextFormFieldsProps {
  context: string;
  setContext: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  urgency: string;
  setUrgency: (value: string) => void;
  environment: string;
  setEnvironment: (value: string) => void;
}

export const ContextFormFields = ({
  context,
  setContext,
  category,
  setCategory,
  urgency,
  setUrgency,
  environment,
  setEnvironment,
}: ContextFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};
