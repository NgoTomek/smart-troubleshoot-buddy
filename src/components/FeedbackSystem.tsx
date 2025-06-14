
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface FeedbackSystemProps {
  solutionId: number;
  solutionTitle: string;
  onFeedbackSubmitted?: (feedback: any) => void;
}

export const FeedbackSystem = ({ solutionId, solutionTitle, onFeedbackSubmitted }: FeedbackSystemProps) => {
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'partial' | ''>('');
  const [rating, setRating] = useState<number>(0);
  const [outcome, setOutcome] = useState<'solved' | 'partially-solved' | 'not-solved' | ''>('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const feedbackData = {
        solutionId,
        solutionTitle,
        feedbackType,
        rating,
        outcome,
        additionalComments,
        timestamp: new Date().toISOString()
      };

      console.log('Feedback submitted:', feedbackData);
      onFeedbackSubmitted?.(feedbackData);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const getOutcomeIcon = (outcomeType: string) => {
    switch (outcomeType) {
      case 'solved': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'partially-solved': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'not-solved': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getOutcomeColor = (outcomeType: string) => {
    switch (outcomeType) {
      case 'solved': return 'bg-green-100 text-green-800 border-green-200';
      case 'partially-solved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not-solved': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">Thank you for your feedback!</h3>
          <p className="text-green-700">
            Your input helps us improve our AI recommendations and assist other users with similar issues.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>How did this solution work for you?</span>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Solution: <span className="font-medium">{solutionTitle}</span>
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Did this solution solve your problem?</Label>
            <RadioGroup value={outcome} onValueChange={setOutcome}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solved" id="solved" />
                <Label htmlFor="solved" className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Yes, completely solved</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partially-solved" id="partially-solved" />
                <Label htmlFor="partially-solved" className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span>Partially solved</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-solved" id="not-solved" />
                <Label htmlFor="not-solved" className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Did not solve the problem</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Rate this solution (1-5 stars)</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-slate-600">
                You rated this solution {rating} out of 5 stars
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Overall feedback</Label>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant={feedbackType === 'positive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedbackType('positive')}
                className="flex items-center space-x-2"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful</span>
              </Button>
              <Button
                type="button"
                variant={feedbackType === 'negative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedbackType('negative')}
                className="flex items-center space-x-2"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>Not Helpful</span>
              </Button>
              <Button
                type="button"
                variant={feedbackType === 'partial' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedbackType('partial')}
                className="flex items-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Partially Helpful</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Additional comments (optional)</Label>
            <Textarea
              id="comments"
              placeholder="Tell us more about your experience with this solution..."
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {outcome && (
            <div className={`p-3 rounded-lg border ${getOutcomeColor(outcome)}`}>
              <div className="flex items-center space-x-2">
                {getOutcomeIcon(outcome)}
                <span className="font-medium">
                  {outcome === 'solved' && 'Great! This solution worked perfectly.'}
                  {outcome === 'partially-solved' && 'This solution helped but didn\'t completely solve the issue.'}
                  {outcome === 'not-solved' && 'We\'ll use this feedback to improve our recommendations.'}
                </span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={!outcome || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
