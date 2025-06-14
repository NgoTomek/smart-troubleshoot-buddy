
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Github, HelpCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TechFix AI</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              How it works
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Examples
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
