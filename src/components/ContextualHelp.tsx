
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  MessageCircle, 
  ExternalLink,
  X,
  ChevronRight
} from 'lucide-react';

interface ContextualHelpProps {
  stepId: string;
  stepTitle: string;
  onClose: () => void;
}

export const ContextualHelp = ({ stepId, stepTitle, onClose }: ContextualHelpProps) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'docs' | 'support'>('tips');

  const getHelpContent = () => {
    const helpData = {
      analyze: {
        tips: [
          "Take your time to read through the extracted text carefully",
          "Look for specific error messages or codes",
          "Note any patterns or recurring issues",
          "Consider the context when the problem occurred"
        ],
        docs: [
          { title: "Analysis Best Practices", url: "#" },
          { title: "Common Error Patterns", url: "#" },
          { title: "Reading System Logs", url: "#" }
        ],
        quickActions: ["Auto-detect errors", "Highlight keywords", "Pattern analysis"]
      },
      solutions: {
        tips: [
          "Review all suggested solutions before starting",
          "Start with the highest-rated solutions first",
          "Read through the complete steps before beginning",
          "Keep track of what you've tried"
        ],
        docs: [
          { title: "Solution Selection Guide", url: "#" },
          { title: "Implementation Tips", url: "#" },
          { title: "Troubleshooting Steps", url: "#" }
        ],
        quickActions: ["Sort by success rate", "Filter by difficulty", "Bookmark favorites"]
      },
      execute: {
        tips: [
          "Follow the steps in the exact order provided",
          "Take screenshots before making changes",
          "Test after each major step",
          "Don't skip validation steps"
        ],
        docs: [
          { title: "Safe Execution Practices", url: "#" },
          { title: "Rollback Procedures", url: "#" },
          { title: "Testing Guidelines", url: "#" }
        ],
        quickActions: ["Create checkpoint", "Run validation", "Schedule rollback"]
      },
      collaborate: {
        tips: [
          "Share detailed information about your progress",
          "Include screenshots and error messages",
          "Be specific about what you've already tried",
          "Ask specific questions rather than general ones"
        ],
        docs: [
          { title: "Effective Collaboration", url: "#" },
          { title: "Sharing Guidelines", url: "#" },
          { title: "Team Communication", url: "#" }
        ],
        quickActions: ["Invite team member", "Share progress", "Request assistance"]
      },
      feedback: {
        tips: [
          "Rate the effectiveness of each solution you tried",
          "Provide specific details about what worked or didn't",
          "Suggest improvements for future users",
          "Document any additional steps you discovered"
        ],
        docs: [
          { title: "Feedback Guidelines", url: "#" },
          { title: "Rating System", url: "#" },
          { title: "Knowledge Sharing", url: "#" }
        ],
        quickActions: ["Quick rating", "Detailed feedback", "Save for later"]
      }
    };

    return helpData[stepId as keyof typeof helpData] || helpData.analyze;
  };

  const content = getHelpContent();

  return (
    <Card className="w-80 shadow-lg border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Help: {stepTitle}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="w-3 h-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
          {[
            { id: 'tips', label: 'Tips', icon: Lightbulb },
            { id: 'docs', label: 'Docs', icon: BookOpen },
            { id: 'support', label: 'Support', icon: MessageCircle }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 text-xs"
            >
              <tab.icon className="w-3 h-3 mr-1" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800 text-sm">Pro Tips</h4>
            <ul className="space-y-2">
              {content.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                  <Lightbulb className="w-3 h-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            
            <div className="space-y-2">
              <h5 className="font-medium text-slate-800 text-sm">Quick Actions</h5>
              {content.quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs"
                >
                  {action}
                  <ChevronRight className="w-3 h-3" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800 text-sm">Documentation</h4>
            <div className="space-y-2">
              {content.docs.map((doc, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-3 h-3" />
                    <span>{doc.title}</span>
                  </div>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800 text-sm">Get Support</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <MessageCircle className="w-3 h-3 mr-2" />
                Ask the Community
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <HelpCircle className="w-3 h-3 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <BookOpen className="w-3 h-3 mr-2" />
                Video Tutorials
              </Button>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-700">
                <strong>Stuck?</strong> Our AI assistant can provide personalized help based on your specific situation.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
