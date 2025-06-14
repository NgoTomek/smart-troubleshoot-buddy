
import React from 'react';
import { ArrowDown } from 'lucide-react';

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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="flex items-center space-x-2 text-slate-500">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>92% success rate</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>1M+ problems solved</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Average fix time: 3 min</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
