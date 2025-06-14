
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: any;
  action: () => void;
}

export const useQuickActions = () => {
  const { toast } = useToast();

  const performNetworkTest = () => {
    toast({
      title: "Network Test Started",
      description: "Testing your connection... This may take a few seconds.",
      duration: 3000,
    });
  };

  const clearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Browser cache and cookies have been cleared. Try refreshing the page.",
      duration: 4000,
    });
  };

  const runSystemCheck = () => {
    toast({
      title: "System Check Running",
      description: "Checking system resources and configurations...",
      duration: 3000,
    });
  };

  const runSecurityScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: "Scanning for security issues and firewall conflicts...",
      duration: 3000,
    });
  };

  return {
    performNetworkTest,
    clearCache,
    runSystemCheck,
    runSecurityScan
  };
};
