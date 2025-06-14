import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bookmark, 
  BookmarkPlus, 
  Trash2, 
  Calendar,
  Tag,
  ExternalLink,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookmarkedSolution {
  id: string;
  solutionId: number;
  title: string;
  category: string;
  confidence: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bookmarkedAt: string;
  notes?: string;
  problemContext: string;
}

interface BookmarkSystemProps {
  solutionId?: number;
  solutionTitle?: string;
  solutionCategory?: string;
  solutionConfidence?: number;
  solutionDifficulty?: 'Easy' | 'Medium' | 'Hard';
  problemContext?: string;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
}

export const BookmarkSystem = ({
  solutionId,
  solutionTitle,
  solutionCategory,
  solutionConfidence,
  solutionDifficulty,
  problemContext,
  onBookmarkToggle
}: BookmarkSystemProps) => {
  const { toast } = useToast();
  const [bookmarkedSolutions, setBookmarkedSolutions] = useState<BookmarkedSolution[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('troubleshoot-bookmarks');
    if (saved) {
      const bookmarks = JSON.parse(saved);
      setBookmarkedSolutions(bookmarks);
      
      if (solutionId) {
        setIsBookmarked(bookmarks.some((b: BookmarkedSolution) => b.solutionId === solutionId));
      }
    }
  }, [solutionId]);

  const saveBookmarks = (bookmarks: BookmarkedSolution[]) => {
    localStorage.setItem('troubleshoot-bookmarks', JSON.stringify(bookmarks));
    setBookmarkedSolutions(bookmarks);
  };

  const toggleBookmark = () => {
    if (!solutionId || !solutionTitle) return;

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarkedSolutions.filter(b => b.solutionId !== solutionId);
      saveBookmarks(updated);
      setIsBookmarked(false);
      onBookmarkToggle?.(false);
      
      toast({
        title: "Bookmark Removed",
        description: "Solution removed from your saved bookmarks.",
        duration: 2000,
      });
    } else {
      // Add bookmark
      const newBookmark: BookmarkedSolution = {
        id: `${solutionId}-${Date.now()}`,
        solutionId,
        title: solutionTitle,
        category: solutionCategory || 'General',
        confidence: solutionConfidence || 0,
        difficulty: solutionDifficulty || 'Medium',
        bookmarkedAt: new Date().toISOString(),
        problemContext: problemContext || 'No context provided'
      };

      const updated = [...bookmarkedSolutions, newBookmark];
      saveBookmarks(updated);
      setIsBookmarked(true);
      onBookmarkToggle?.(true);
      
      toast({
        title: "Solution Bookmarked! 🔖",
        description: "Added to your saved solutions for future reference.",
        duration: 3000,
      });
    }
  };

  const removeBookmark = (bookmarkId: string) => {
    const updated = bookmarkedSolutions.filter(b => b.id !== bookmarkId);
    saveBookmarks(updated);
    
    toast({
      title: "Bookmark Removed",
      description: "Solution removed from your bookmarks.",
      duration: 2000,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // If we have solution details, show the bookmark toggle button
  if (solutionId && solutionTitle) {
    return (
      <Button
        variant={isBookmarked ? 'default' : 'outline'}
        size="sm"
        onClick={toggleBookmark}
        className={isBookmarked ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        {isBookmarked ? (
          <Bookmark className="w-4 h-4 mr-2 fill-current" />
        ) : (
          <BookmarkPlus className="w-4 h-4 mr-2" />
        )}
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </Button>
    );
  }

  // Otherwise, show the bookmarks list
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bookmark className="w-5 h-5 text-blue-600" />
          <span>Your Saved Solutions</span>
          <Badge variant="secondary">{bookmarkedSolutions.length}</Badge>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Solutions you've bookmarked for future reference
        </p>
      </CardHeader>
      
      <CardContent>
        {bookmarkedSolutions.length === 0 ? (
          <div className="text-center py-8">
            <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-2">No bookmarked solutions yet</p>
            <p className="text-sm text-slate-400">
              Bookmark helpful solutions to access them quickly later
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedSolutions.map((bookmark, index) => (
              <div key={bookmark.id}>
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-slate-900">{bookmark.title}</h4>
                      <Badge variant="outline" className={getDifficultyColor(bookmark.difficulty)}>
                        {bookmark.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>{bookmark.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{Math.round(bookmark.confidence * 100)}% confidence</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(bookmark.bookmarkedAt)}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500">
                      Problem: {bookmark.problemContext}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {index < bookmarkedSolutions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
