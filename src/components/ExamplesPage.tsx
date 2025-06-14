
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Monitor, Smartphone, Globe, Database, Code, Wifi } from 'lucide-react';

interface ExamplesPageProps {
  onBackToHome: () => void;
}

export const ExamplesPage = ({ onBackToHome }: ExamplesPageProps) => {
  const examples = [
    {
      category: "Windows Errors",
      icon: Monitor,
      color: "bg-blue-100 text-blue-600",
      cases: [
        {
          title: "Blue Screen of Death (BSOD)",
          description: "System crashes with error codes like SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",
          successRate: 92,
          timeToFix: "5-15 min"
        },
        {
          title: "DLL Missing Errors",
          description: "Application won't start due to missing system files",
          successRate: 89,
          timeToFix: "2-10 min"
        },
        {
          title: "Windows Update Failed",
          description: "Update installation stuck or failed with error codes",
          successRate: 85,
          timeToFix: "10-30 min"
        }
      ]
    },
    {
      category: "Mobile App Issues",
      icon: Smartphone,
      color: "bg-green-100 text-green-600",
      cases: [
        {
          title: "App Crashes on Startup",
          description: "Mobile applications crashing immediately when opened",
          successRate: 88,
          timeToFix: "3-8 min"
        },
        {
          title: "Permission Denied Errors",
          description: "Apps unable to access camera, storage, or location",
          successRate: 95,
          timeToFix: "1-5 min"
        },
        {
          title: "In-App Purchase Problems",
          description: "Payment processing or subscription issues",
          successRate: 78,
          timeToFix: "5-20 min"
        }
      ]
    },
    {
      category: "Web Browser Problems",
      icon: Globe,
      color: "bg-purple-100 text-purple-600",
      cases: [
        {
          title: "SSL Certificate Errors",
          description: "Website security warnings and connection failures",
          successRate: 91,
          timeToFix: "2-7 min"
        },
        {
          title: "Extension Conflicts",
          description: "Browser running slowly or crashing due to extensions",
          successRate: 87,
          timeToFix: "5-15 min"
        },
        {
          title: "Cookie/Cache Issues",
          description: "Websites not loading properly or login problems",
          successRate: 96,
          timeToFix: "1-3 min"
        }
      ]
    },
    {
      category: "Network Connectivity",
      icon: Wifi,
      color: "bg-orange-100 text-orange-600",
      cases: [
        {
          title: "WiFi Connection Drops",
          description: "Intermittent internet disconnections and slow speeds",
          successRate: 83,
          timeToFix: "10-25 min"
        },
        {
          title: "DNS Resolution Errors",
          description: "Unable to reach websites with DNS lookup failures",
          successRate: 90,
          timeToFix: "3-10 min"
        },
        {
          title: "VPN Connection Issues",
          description: "Virtual private network setup and connection problems",
          successRate: 76,
          timeToFix: "5-20 min"
        }
      ]
    },
    {
      category: "Database Errors",
      icon: Database,
      color: "bg-red-100 text-red-600",
      cases: [
        {
          title: "Connection Timeout",
          description: "Database server unreachable or slow response times",
          successRate: 82,
          timeToFix: "8-20 min"
        },
        {
          title: "SQL Syntax Errors",
          description: "Query execution failures and malformed statements",
          successRate: 94,
          timeToFix: "2-10 min"
        },
        {
          title: "Permission Denied",
          description: "Access restrictions and authentication failures",
          successRate: 88,
          timeToFix: "5-15 min"
        }
      ]
    },
    {
      category: "Programming Errors",
      icon: Code,
      color: "bg-indigo-100 text-indigo-600",
      cases: [
        {
          title: "Compilation Errors",
          description: "Code build failures and dependency issues",
          successRate: 87,
          timeToFix: "10-30 min"
        },
        {
          title: "Runtime Exceptions",
          description: "Application crashes during execution with stack traces",
          successRate: 85,
          timeToFix: "15-45 min"
        },
        {
          title: "Package Installation Issues",
          description: "Dependency conflicts and version mismatches",
          successRate: 80,
          timeToFix: "5-25 min"
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBackToHome}
          className="mb-4"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Success Examples
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          See how TechFix AI has helped users solve real technical problems across different platforms and technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {examples.map((category, index) => (
          <Card key={index} className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <span>{category.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.cases.map((case_, caseIndex) => (
                <div key={caseIndex} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{case_.title}</h4>
                    <Badge variant="secondary" className="ml-2">
                      {case_.successRate}% success
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{case_.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Average fix time: {case_.timeToFix}</span>
                    <span className="text-green-600 font-medium">✓ AI Solvable</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't See Your Problem?</h2>
        <p className="text-slate-600 mb-6">
          TechFix AI handles thousands of different error types. Upload your screenshot and let our AI analyze it!
        </p>
        <Button 
          size="lg" 
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Try TechFix AI Now
        </Button>
      </div>
    </div>
  );
};
