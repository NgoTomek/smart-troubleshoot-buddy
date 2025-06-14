
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PlayCircle, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Target,
  Users,
  BookOpen,
  X
} from 'lucide-react';

interface WorkflowOnboardingProps {
  onStart: () => void;
  onDismiss: () => void;
}

export const WorkflowOnboarding = ({ onStart, onDismiss }: WorkflowOnboardingProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      icon: Target,
      title: "Smart Problem Analysis",
      description: "Our AI analyzes your problem and creates a customized step-by-step workflow.",
      color: "text-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Validation & Verification",
      description: "Each step includes validation to ensure you're on the right track before moving forward.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Collaborative Features",
      description: "Share your progress with team members and get help when you need it.",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Learning & Insights",
      description: "Track your progress and learn from each troubleshooting session.",
      color: "text-orange-600"
    }
  ];

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length);
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 mb-6">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDismiss}
          className="absolute top-2 right-2 h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <span>Welcome to Smart Troubleshooting</span>
          <Badge variant="secondary" className="bg-blue-200 text-blue-800">
            New Experience
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {React.createElement(tips[currentTip].icon, { 
              className: `w-16 h-16 ${tips[currentTip].color}` 
            })}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {tips[currentTip].title}
            </h3>
            <p className="text-slate-600">
              {tips[currentTip].description}
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTip ? 'bg-blue-600' : 'bg-blue-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevTip} disabled={currentTip === 0}>
            Previous
          </Button>
          
          <Progress value={(currentTip + 1) / tips.length * 100} className="w-32" />
          
          {currentTip < tips.length - 1 ? (
            <Button onClick={nextTip}>
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={onStart} className="bg-blue-600 hover:bg-blue-700">
              Start Workflow
              <PlayCircle className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
