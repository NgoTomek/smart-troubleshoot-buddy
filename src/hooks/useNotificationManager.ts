
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNotificationManager = () => {
  const { toast } = useToast();

  const showSuccess = useCallback((title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 3000,
    });
  }, [toast]);

  const showError = useCallback((title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 4000,
    });
  }, [toast]);

  const showWarning = useCallback((title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 4000,
    });
  }, [toast]);

  const showInfo = useCallback((title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 2000,
    });
  }, [toast]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
