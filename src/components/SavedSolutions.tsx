
import React from 'react';
import { BookmarkSystem } from '@/components/BookmarkSystem';
import { Button } from '@/components/ui/button';
import { Home, Bookmark } from 'lucide-react';

interface SavedSolutionsProps {
  onBackToHome: () => void;
}

export const SavedSolutions = ({ onBackToHome }: SavedSolutionsProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBackToHome}
          className="mb-4"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center space-x-3 mb-2">
          <Bookmark className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Saved Solutions</h1>
        </div>
        <p className="text-slate-600">
          Access your bookmarked solutions and troubleshooting guides
        </p>
      </div>
      
      <BookmarkSystem />
    </div>
  );
};
