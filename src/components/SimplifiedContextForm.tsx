
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap, Clock, AlertTriangle } from 'lucide-react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

interface SimplifiedContextFormProps {
  extractedText: string;
  onSubmit: (context: any) => void;
  isAnalyzing: boolean;
}

export const SimplifiedContextForm = ({ extractedText, onSubmit, isAnalyzing }: SimplifiedContextFormProps) => {
  const { showSuccess } = useNotificationManager();
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    showSuccess(
      "Analysis Started",
      "Our AI is analyzing your issue and generating solutions..."
    );
    
    onSubmit({
      extractedText,
      additionalContext: additionalInfo,
      category,
      urgency
    });
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-green-600" />;
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Tell us more about the issue</span>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Help our AI understand your problem better for more accurate solutions
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Extracted Text Preview */}
          {extractedText && (
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                <span>📸 Extracted from your image:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">AI Detected</Badge>
              </h4>
              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded border">
                {extractedText}
              </p>
            </div>
          )}

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additional-info" className="text-base font-medium">
              Additional Information
            </Label>
            <Textarea
              id="additional-info"
              placeholder="Describe what you were trying to do when this error occurred, any steps you've already tried, or any other relevant details..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-[120px] text-base"
              required
            />
            <p className="text-xs text-slate-500">
              💡 The more context you provide, the better our AI can help you
            </p>
          </div>

          {/* Quick Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-medium">Problem Type</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="What type of problem is this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">🌐 Network & Internet Issues</SelectItem>
                <SelectItem value="software">💻 Software & Application Problems</SelectItem>
                <SelectItem value="system">⚙️ System & Hardware Issues</SelectItem>
                <SelectItem value="browser">🌍 Browser & Website Problems</SelectItem>
                <SelectItem value="email">📧 Email & Communication Issues</SelectItem>
                <SelectItem value="security">🔒 Security & Login Problems</SelectItem>
                <SelectItem value="other">❓ Other Technical Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Urgency Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">How urgent is this?</Label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgency(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    urgency === level 
                      ? `${getUrgencyColor(level)} border-opacity-100` 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getUrgencyIcon(level)}
                    <span className="font-medium capitalize">{level}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {level === 'low' && 'Can wait a bit'}
                    {level === 'medium' && 'Need to fix today'}
                    {level === 'high' && 'Blocking my work'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing your issue...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-3" />
                Get Smart Solutions
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
