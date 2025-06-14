
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Clock,
  BellOff
} from 'lucide-react';

interface WorkflowNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  actionable: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
  autoHide?: boolean;
  duration?: number;
}

interface WorkflowNotificationsProps {
  notifications: WorkflowNotification[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
  maxVisible?: number;
}

export const WorkflowNotifications = ({ 
  notifications, 
  onDismiss, 
  onDismissAll,
  maxVisible = 3 
}: WorkflowNotificationsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Auto-hide notifications with autoHide: true
    notifications.forEach(notification => {
      if (notification.autoHide) {
        const duration = notification.duration || 5000;
        const timer = setTimeout(() => {
          onDismiss(notification.id);
        }, duration);
        
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onDismiss]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      case 'reminder': return <Clock className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'reminder': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const visibleNotifications = isExpanded 
    ? notifications 
    : notifications.slice(0, maxVisible);
  
  const hiddenCount = notifications.length - maxVisible;

  if (notifications.length === 0) {
    return (
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-4 text-center">
          <BellOff className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">No notifications</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-800">Notifications</h3>
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              {notifications.length}
            </Badge>
          </div>
          
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDismissAll}
              className="text-blue-600 text-xs h-6"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {visibleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-l-4 rounded-r-lg ${getNotificationColor(notification.type)} 
                         transition-all duration-300 hover:shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium truncate">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {notification.message}
                    </p>
                    
                    {notification.actionable && notification.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={notification.action.handler}
                        className="mt-2 text-xs h-6"
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(notification.id)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {notifications.length > maxVisible && (
          <div className="text-center pt-2 border-t border-blue-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 text-xs"
            >
              {isExpanded 
                ? 'Show Less' 
                : `Show ${hiddenCount} More`
              }
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
