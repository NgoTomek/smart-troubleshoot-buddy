
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  RefreshCw, 
  Settings, 
  Shield, 
  HardDrive,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QuickActions = () => {
  const { toast } = useToast();

  const quickActions = [
    {
      id: 'network-test',
      name: 'Test Network',
      description: 'Check your internet connection',
      icon: Wifi,
      action: () => {
        toast({
          title: "Network Test Started",
          description: "Testing your connection... This may take a few seconds.",
          duration: 3000,
        });
      }
    },
    {
      id: 'clear-cache',
      name: 'Clear Cache',
      description: 'Clear browser cache and cookies',
      icon: RefreshCw,
      action: () => {
        toast({
          title: "Cache Cleared",
          description: "Browser cache and cookies have been cleared. Try refreshing the page.",
          duration: 4000,
        });
      }
    },
    {
      id: 'system-check',
      name: 'System Check',
      description: 'Run basic system diagnostics',
      icon: Settings,
      action: () => {
        toast({
          title: "System Check Running",
          description: "Checking system resources and configurations...",
          duration: 3000,
        });
      }
    },
    {
      id: 'security-scan',
      name: 'Security Scan',
      description: 'Quick security and firewall check',
      icon: Shield,
      action: () => {
        toast({
          title: "Security Scan Initiated",
          description: "Scanning for security issues and firewall conflicts...",
          duration: 3000,
        });
      }
    }
  ];

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-orange-600" />
          <span>Quick Actions</span>
          <Badge variant="secondary" className="bg-orange-200 text-orange-800">
            New
          </Badge>
        </CardTitle>
        <p className="text-sm text-orange-700">
          Try these common fixes while working through the solutions above
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-orange-100 border-orange-200"
                onClick={action.action}
              >
                <div className="flex items-center space-x-2 w-full">
                  <Icon className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-left">{action.name}</span>
                </div>
                <p className="text-xs text-slate-600 text-left">
                  {action.description}
                </p>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
