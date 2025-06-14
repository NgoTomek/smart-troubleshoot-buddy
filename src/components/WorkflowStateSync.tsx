import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wifi, 
  WifiOff, 
  Users, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface CollaboratorStatus {
  id: string;
  name: string;
  avatar: string;
  currentStep: string;
  isActive: boolean;
  lastSeen: Date;
  role: 'owner' | 'collaborator' | 'viewer';
}

interface SyncStatus {
  isConnected: boolean;
  lastSync: Date;
  pendingChanges: number;
  conflicts: number;
}

interface WorkflowStateSyncProps {
  isCollaborationEnabled: boolean;
  currentStepId: string;
  onSyncStateChange: (isConnected: boolean) => void;
  onConflictResolution: (conflicts: any[]) => void;
}

export const WorkflowStateSync = ({ 
  isCollaborationEnabled, 
  currentStepId,
  onSyncStateChange,
  onConflictResolution 
}: WorkflowStateSyncProps) => {
  const [collaborators, setCollaborators] = useState<CollaboratorStatus[]>([
    {
      id: '1',
      name: 'Alex Chen',
      avatar: '/placeholder.svg',
      currentStep: 'analyze',
      isActive: true,
      lastSeen: new Date(),
      role: 'collaborator'
    },
    {
      id: '2',
      name: 'Sarah Miller',
      avatar: '/placeholder.svg',
      currentStep: 'execute',
      isActive: false,
      lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
      role: 'viewer'
    }
  ]);

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isConnected: isCollaborationEnabled,
    lastSync: new Date(),
    pendingChanges: 0,
    conflicts: 0
  });

  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    if (!isCollaborationEnabled) return;

    // Simulate real-time sync
    const interval = setInterval(() => {
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date(),
        pendingChanges: Math.max(0, prev.pendingChanges + Math.floor(Math.random() * 3) - 1),
        conflicts: Math.random() > 0.9 ? prev.conflicts + 1 : prev.conflicts
      }));

      // Simulate collaborator activity
      setCollaborators(prev => prev.map(collaborator => {
        if (Math.random() > 0.8) {
          const steps = ['analyze', 'solutions', 'execute', 'feedback'];
          return {
            ...collaborator,
            currentStep: steps[Math.floor(Math.random() * steps.length)],
            isActive: Math.random() > 0.3,
            lastSeen: collaborator.isActive ? new Date() : collaborator.lastSeen
          };
        }
        return collaborator;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isCollaborationEnabled]);

  const handleForceSync = async () => {
    setIsResolving(true);
    // Simulate sync operation
    setTimeout(() => {
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date(),
        pendingChanges: 0,
        conflicts: 0
      }));
      setIsResolving(false);
      onSyncStateChange(true);
    }, 2000);
  };

  const handleResolveConflicts = () => {
    setIsResolving(true);
    // Simulate conflict resolution
    setTimeout(() => {
      setSyncStatus(prev => ({
        ...prev,
        conflicts: 0
      }));
      setIsResolving(false);
      onConflictResolution([]);
    }, 1500);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'collaborator': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeSince = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (!isCollaborationEnabled) {
    return (
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-4 text-center">
          <WifiOff className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Collaboration disabled</p>
          <p className="text-xs text-gray-400">Enable collaboration to sync with team members</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {syncStatus.isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            <span>Workflow Sync</span>
            <Badge 
              variant="outline" 
              className={syncStatus.isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
            >
              {syncStatus.isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          {syncStatus.conflicts > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleResolveConflicts}
              disabled={isResolving}
              className="text-red-600 border-red-300"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Resolve Conflicts
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sync Status */}
        <div className="p-3 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-slate-900">Sync Status</h4>
            <Button
              size="sm"
              variant="outline"
              onClick={handleForceSync}
              disabled={isResolving}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isResolving ? 'animate-spin' : ''}`} />
              {isResolving ? 'Syncing...' : 'Force Sync'}
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-bold text-blue-600">
                {getTimeSince(syncStatus.lastSync)}
              </div>
              <div className="text-xs text-slate-600">Last Sync</div>
            </div>
            <div>
              <div className="text-sm font-bold text-yellow-600">
                {syncStatus.pendingChanges}
              </div>
              <div className="text-xs text-slate-600">Pending</div>
            </div>
            <div>
              <div className="text-sm font-bold text-red-600">
                {syncStatus.conflicts}
              </div>
              <div className="text-xs text-slate-600">Conflicts</div>
            </div>
          </div>
        </div>

        {/* Active Collaborators */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-600" />
            <h4 className="font-medium text-slate-900">Active Collaborators</h4>
            <Badge variant="outline" className="bg-green-100 text-green-700">
              {collaborators.filter(c => c.isActive).length} online
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                  collaborator.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback className="text-xs">
                      {collaborator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium truncate">
                        {collaborator.name}
                      </span>
                      <Badge className={`text-xs ${getRoleColor(collaborator.role)}`}>
                        {collaborator.role}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      {collaborator.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Working on: {collaborator.currentStep}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Last seen: {getTimeSince(collaborator.lastSeen)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`w-2 h-2 rounded-full ${
                  collaborator.isActive ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Connection Issues */}
        {!syncStatus.isConnected && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Connection Issues</span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              Unable to sync with team members. Check your internet connection.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
