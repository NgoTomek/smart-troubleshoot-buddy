
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, HelpCircle, User, LogOut } from 'lucide-react';
import { useAppState } from '@/hooks/useAppState';
import { AuthDialog } from '@/components/AuthDialog';
import { HelpDialog } from '@/components/HelpDialog';

export const Header = () => {
  const { setCurrentView } = useAppState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSignIn = (email: string, password: string) => {
    // Simple mock authentication - in real app would integrate with Supabase
    setIsSignedIn(true);
    setUserEmail(email);
    setShowAuthDialog(false);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserEmail('');
  };

  const handleNavigation = (page: string) => {
    if (page === 'how-it-works') {
      setCurrentView('faq');
    } else if (page === 'examples') {
      setCurrentView('tools');
    } else if (page === 'pricing') {
      setCurrentView('stats');
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('main')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">TechFix AI</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('how-it-works')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={() => handleNavigation('examples')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Examples
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Pricing
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowHelpDialog(true)}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              
              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">{userEmail}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowAuthDialog(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSignIn={handleSignIn}
      />

      <HelpDialog
        isOpen={showHelpDialog}
        onClose={() => setShowHelpDialog(false)}
      />
    </>
  );
};
