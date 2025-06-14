
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  X, 
  MessageCircle, 
  UserPlus, 
  CheckCircle,
  AlertCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'message' | 'join' | 'progress' | 'suggestion' | 'status';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

interface CollaborationNotificationsProps {
  isCollaborationActive: boolean;
}

export const CollaborationNotifications = ({ 
  isCollaborationActive 
}: CollaborationNotificationsProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    if (!isCollaborationActive) return;

    const interval = setInterval(() => {
      const sampleNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
        {
          type: 'message',
          user: { name: 'Alex Chen', avatar: '/placeholder.svg' },
          content: 'I think we should try the network reset first',
          priority: 'medium'
        },
        {
          type: 'progress',
          user: { name: 'Sarah Miller', avatar: '/placeholder.svg' },
          content: 'Completed Step 3 successfully',
          priority: 'low'
        },
        {
          type: 'suggestion',
          user: { name: 'Mike Johnson', avatar: '/placeholder.svg' },
          content: 'Found a similar issue in our knowledge base',
          priority: 'high'
        },
        {
          type: 'join',
          user: { name: 'Emma Wilson', avatar: '/placeholder.svg' },
          content: 'Joined the troubleshooting session',
          priority: 'low'
        },
        {
          type: 'status',
          user: { name: 'Alex Chen', avatar: '/placeholder.svg' },
          content: 'Started working on the firewall configuration',
          priority: 'medium'
        }
      ];

      if (Math.random() > 0.7) { // 30% chance of new notification
        const randomNotification = sampleNotifications[
          Math.floor(Math.random() * sampleNotifications.length)
        ];
        
        const newNotification: Notification = {
          ...randomNotification,
          id: `notif-${Date.now()}-${Math.random()}`,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
        setIsVisible(true);

        // Show toast for high priority notifications
        if (newNotification.priority === 'high') {
          toast({
            title: `${newNotification.user.name} sent a ${newNotification.type}`,
            description: newNotification.content,
            duration: 4000,
          });
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isCollaborationActive, toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case 'join': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'progress': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'suggestion': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'status': return <Eye className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isCollaborationActive || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {/* Notification Toggle */}
      <div className="mb-2 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          className="bg-white shadow-lg"
        >
          <Bell className="w-4 h-4 mr-2" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      {isVisible && (
        <Card className="shadow-xl border-gray-200 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
              <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Team Activity</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>
                            {notification.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getNotificationIcon(notification.type)}
                            <span className="text-sm font-medium text-slate-900">
                              {notification.user.name}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-slate-700 mb-1">
                            {notification.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                {notification.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notification.id);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
