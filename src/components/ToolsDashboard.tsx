
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TroubleshootingHistory } from '@/components/TroubleshootingHistory';
import { SolutionSearch } from '@/components/SolutionSearch';
import { TipsAndTricks } from '@/components/TipsAndTricks';
import { BookmarkSystem } from '@/components/BookmarkSystem';
import { 
  History, 
  Search, 
  Lightbulb, 
  Bookmark 
} from 'lucide-react';

export const ToolsDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Troubleshooting Tools</h1>
        <p className="text-slate-600">
          Access your saved solutions, search our knowledge base, and discover helpful tips
        </p>
      </div>
      
      <Tabs defaultValue="bookmarks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookmarks" className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4" />
            <span>Bookmarks</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Tips</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="w-4 h-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookmarks" className="mt-6">
          <BookmarkSystem />
        </TabsContent>
        
        <TabsContent value="search" className="mt-6">
          <SolutionSearch />
        </TabsContent>
        
        <TabsContent value="tips" className="mt-6">
          <TipsAndTricks />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <TroubleshootingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
