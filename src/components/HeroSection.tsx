
import React from 'react';
import { ArrowDown, Shield, Zap, Users } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Fix Tech Problems
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
            Instantly
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Upload a screenshot of your error, get AI-powered solutions in seconds. 
          No more endless forum searches or confusing tutorials.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center space-y-2 text-slate-600">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-semibold">92% Success Rate</span>
            <span className="text-sm">Proven solutions</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2 text-slate-600">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-semibold">3 Min Average</span>
            <span className="text-sm">Time to fix</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2 text-slate-600">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-semibold">1M+ Problems</span>
            <span className="text-sm">Successfully solved</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
