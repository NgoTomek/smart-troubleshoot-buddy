
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, RefreshCw, Settings, Shield, Zap } from 'lucide-react';
import { useQuickActions } from '@/hooks/useQuickActions';
import { QuickActionButton } from '@/components/QuickActionButton';

export const QuickActions = () => {
  const { 
    performNetworkTest, 
    clearCache, 
    runSystemCheck, 
    runSecurityScan 
  } = useQuickActions();

  const quickActions = [
    {
      id: 'network-test',
      name: 'Test Network',
      description: 'Check your internet connection',
      icon: Wifi,
      action: performNetworkTest
    },
    {
      id: 'clear-cache',
      name: 'Clear Cache',
      description: 'Clear browser cache and cookies',
      icon: RefreshCw,
      action: clearCache
    },
    {
      id: 'system-check',
      name: 'System Check',
      description: 'Run basic system diagnostics',
      icon: Settings,
      action: runSystemCheck
    },
    {
      id: 'security-scan',
      name: 'Security Scan',
      description: 'Quick security and firewall check',
      icon: Shield,
      action: runSecurityScan
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
          {quickActions.map((action) => (
            <QuickActionButton
              key={action.id}
              id={action.id}
              name={action.name}
              description={action.description}
              icon={action.icon}
              onClick={action.action}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
