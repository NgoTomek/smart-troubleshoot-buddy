
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Monitor, Smartphone, Globe, Database, Code, Wifi, AlertCircle, CheckCircle } from 'lucide-react';

interface ExamplesPageProps {
  onBackToHome: () => void;
}

export const ExamplesPage = ({ onBackToHome }: ExamplesPageProps) => {
  const examples = [
    {
      category: "Windows System Errors",
      icon: Monitor,
      color: "bg-blue-100 text-blue-600",
      cases: [
        {
          title: "Blue Screen of Death (BSOD)",
          errorText: "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",
          description: "Critical system error causing computer restart",
          solution: "Update graphics drivers and check for hardware conflicts",
          successRate: 92,
          timeToFix: "5-15 min"
        },
        {
          title: "DLL Missing Error",
          errorText: "msvcr120.dll is missing from your computer",
          description: "Application fails to start due to missing system libraries",
          solution: "Install Microsoft Visual C++ Redistributable packages",
          successRate: 95,
          timeToFix: "2-5 min"
        },
        {
          title: "Windows Update Error",
          errorText: "Error 0x80070057: The parameter is incorrect",
          description: "Windows update installation fails repeatedly",
          solution: "Reset Windows Update components and clear cache",
          successRate: 88,
          timeToFix: "10-20 min"
        }
      ]
    },
    {
      category: "Web Browser Issues",
      icon: Globe,
      color: "bg-green-100 text-green-600",
      cases: [
        {
          title: "SSL Certificate Error",
          errorText: "Your connection is not private - NET::ERR_CERT_AUTHORITY_INVALID",
          description: "Website security certificate validation failed",
          solution: "Clear browser cache, check system date, or disable antivirus SSL scanning",
          successRate: 91,
          timeToFix: "2-7 min"
        },
        {
          title: "Chrome Extension Conflict",
          errorText: "Aw, Snap! Something went wrong while displaying this webpage",
          description: "Browser crashes or pages fail to load properly",
          solution: "Disable extensions one by one to identify the problematic one",
          successRate: 87,
          timeToFix: "5-15 min"
        },
        {
          title: "JavaScript Error",
          errorText: "Uncaught TypeError: Cannot read property 'length' of undefined",
          description: "Website functionality broken due to JavaScript errors",
          solution: "Clear browser cache and cookies, disable ad blockers temporarily",
          successRate: 93,
          timeToFix: "1-3 min"
        }
      ]
    },
    {
      category: "Mobile App Crashes",
      icon: Smartphone,
      color: "bg-purple-100 text-purple-600",
      cases: [
        {
          title: "App Won't Open",
          errorText: "Unfortunately, [App Name] has stopped",
          description: "Mobile application crashes immediately on startup",
          solution: "Clear app cache and data, restart device, or reinstall app",
          successRate: 89,
          timeToFix: "3-8 min"
        },
        {
          title: "Permission Denied",
          errorText: "This app needs permission to access your camera",
          description: "App cannot access device features like camera or storage",
          solution: "Enable app permissions in device settings",
          successRate: 97,
          timeToFix: "1-2 min"
        },
        {
          title: "In-App Purchase Failed",
          errorText: "Purchase could not be completed. Please try again later",
          description: "Payment processing fails during app purchases",
          solution: "Verify payment method, clear Play Store cache, or contact support",
          successRate: 78,
          timeToFix: "5-20 min"
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
          errorText: "Limited connectivity - No internet access",
          description: "Frequent disconnections and slow internet speeds",
          solution: "Reset network adapter, update WiFi drivers, or change DNS servers",
          successRate: 85,
          timeToFix: "10-25 min"
        },
        {
          title: "DNS Resolution Failed",
          errorText: "This site can't be reached - DNS_PROBE_FINISHED_NXDOMAIN",
          description: "Unable to reach websites due to DNS lookup failures",
          solution: "Flush DNS cache, change to public DNS servers (8.8.8.8, 1.1.1.1)",
          successRate: 92,
          timeToFix: "3-10 min"
        },
        {
          title: "VPN Connection Error",
          errorText: "The L2TP connection attempt failed because the security layer encountered a processing error",
          description: "VPN fails to establish secure connection",
          solution: "Check firewall settings, try different VPN protocols, or restart network services",
          successRate: 76,
          timeToFix: "10-30 min"
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
          Real Success Examples
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          See how TechFix AI has helped users solve actual technical problems by analyzing error screenshots and providing step-by-step solutions.
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
                  
                  <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Error Message:</span>
                    </div>
                    <code className="text-xs text-red-600 font-mono">{case_.errorText}</code>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{case_.description}</p>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">AI Solution:</span>
                    </div>
                    <p className="text-sm text-green-600">{case_.solution}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Avg. fix time: {case_.timeToFix}</span>
                    <span className="text-blue-600 font-medium">✓ AI Analyzed</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Got a Different Error?</h2>
        <p className="text-slate-600 mb-6">
          TechFix AI can analyze any error screenshot and provide personalized solutions. Simply upload your error image and let our AI do the rest!
        </p>
        <Button 
          size="lg" 
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Upload Your Error Screenshot
        </Button>
      </div>
    </div>
  );
};
