
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Video, 
  Share2, 
  UserPlus,
  Clock,
  Eye,
  CheckCircle
} from 'lucide-react';

interface CollaborationPanelProps {
  problemContext: string;
  onInviteTeam: () => void;
}

export const CollaborationPanel = ({ 
  problemContext, 
  onInviteTeam 
}: CollaborationPanelProps) => {
  const [activeCollaborators] = useState([
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Senior Developer',
      status: 'online',
      lastSeen: 'now',
      avatar: '/placeholder.svg',
      contributions: 3
    },
    {
      id: '2',
      name: 'Sarah Miller',
      role: 'DevOps Engineer',
      status: 'typing',
      lastSeen: '2 minutes ago',
      avatar: '/placeholder.svg',
      contributions: 1
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Tech Lead',
      status: 'viewing',
      lastSeen: '5 minutes ago',
      avatar: '/placeholder.svg',
      contributions: 2
    }
  ]);

  const [sessionActivity] = useState([
    {
      id: '1',
      user: 'Alex Chen',
      action: 'suggested a solution',
      time: '2 minutes ago',
      type: 'suggestion'
    },
    {
      id: '2',
      user: 'Sarah Miller',
      action: 'completed Step 3',
      time: '5 minutes ago',
      type: 'progress'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'joined the session',
      time: '8 minutes ago',
      type: 'join'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'typing': return 'bg-blue-500';
      case 'viewing': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <MessageCircle className="w-3 h-3" />;
      case 'progress': return <CheckCircle className="w-3 h-3" />;
      case 'join': return <UserPlus className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>Team Collaboration</span>
            <Badge variant="outline" className="bg-teal-100 text-teal-700">
              Live Session
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4 mr-2" />
              Start Call
            </Button>
            <Button variant="outline" size="sm" onClick={onInviteTeam}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Active Collaborators */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Users className="w-4 h-4 text-teal-600" />
            <span>Active Team Members ({activeCollaborators.length})</span>
          </h4>
          
          <div className="space-y-2">
            {activeCollaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-3 bg-white border border-teal-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(collaborator.status)} border-2 border-white`} />
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900">{collaborator.name}</p>
                    <p className="text-xs text-slate-600">{collaborator.role}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className="text-xs mb-1">
                    {collaborator.contributions} contributions
                  </Badge>
                  <p className="text-xs text-slate-500">{collaborator.lastSeen}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Session Activity */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <span>Recent Activity</span>
          </h4>
          
          <div className="space-y-2">
            {sessionActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-2 text-sm">
                <div className="text-cyan-600">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-slate-900">{activity.user}</span>
                  <span className="text-slate-600 ml-1">{activity.action}</span>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share Session</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Team Chat</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
