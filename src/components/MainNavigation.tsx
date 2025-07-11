
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart3, HelpCircle, Bookmark, Wrench } from 'lucide-react';
import { TroubleshootingWorkflowSection } from '@/components/TroubleshootingWorkflowSection';

interface MainNavigationProps {
  onViewChange: (view: 'main' | 'faq' | 'stats' | 'saved' | 'tools') => void;
  onAnalysisComplete: (context: any, extractedText: string) => void;
}

export const MainNavigation = ({ onViewChange, onAnalysisComplete }: MainNavigationProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <Tabs defaultValue="troubleshoot" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="troubleshoot">Troubleshoot Issue</TabsTrigger>
          <TabsTrigger value="tools" onClick={() => onViewChange('tools')}>
            <Wrench className="w-4 h-4 mr-2" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="saved" onClick={() => onViewChange('saved')}>
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="faq" onClick={() => onViewChange('faq')}>
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="stats" onClick={() => onViewChange('stats')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Statistics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="troubleshoot" className="space-y-8 mt-8">
          <TroubleshootingWorkflowSection onAnalysisComplete={onAnalysisComplete} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
