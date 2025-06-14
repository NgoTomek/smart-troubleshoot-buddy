
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  SkipForward,
  XCircle
} from 'lucide-react';
import { WorkflowStep } from '@/types/workflow';

interface WorkflowSearchFilterProps {
  steps: WorkflowStep[];
  onFilteredSteps: (steps: WorkflowStep[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const WorkflowSearchFilter = ({
  steps,
  onFilteredSteps,
  searchTerm,
  onSearchChange
}: WorkflowSearchFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    { id: 'pending', label: 'Pending', icon: Clock, color: 'bg-gray-100 text-gray-800' },
    { id: 'active', label: 'Active', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { id: 'failed', label: 'Failed', icon: XCircle, color: 'bg-red-100 text-red-800' },
    { id: 'skipped', label: 'Skipped', icon: SkipForward, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'optional', label: 'Optional', icon: AlertTriangle, color: 'bg-purple-100 text-purple-800' },
    { id: 'high', label: 'High Priority', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { id: 'medium', label: 'Medium Priority', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'low', label: 'Low Priority', icon: AlertTriangle, color: 'bg-green-100 text-green-800' },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onSearchChange('');
    onFilteredSteps(steps);
  };

  const applyFilters = (term: string, filters: string[]) => {
    let filtered = steps;

    // Apply search term
    if (term) {
      filtered = filtered.filter(step =>
        step.title.toLowerCase().includes(term.toLowerCase()) ||
        step.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply status and property filters
    if (filters.length > 0) {
      filtered = filtered.filter(step => {
        return filters.some(filter => {
          if (['pending', 'active', 'completed', 'failed', 'skipped'].includes(filter)) {
            return step.status === filter;
          }
          if (filter === 'optional') {
            return step.optional;
          }
          if (['high', 'medium', 'low'].includes(filter)) {
            return step.priority === filter;
          }
          return false;
        });
      });
    }

    onFilteredSteps(filtered);
  };

  const handleSearchChange = (term: string) => {
    onSearchChange(term);
    applyFilters(term, activeFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search workflow steps..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? 'bg-blue-50 border-blue-200' : ''}
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
              {activeFilters.length}
            </Badge>
          )}
        </Button>

        {(searchTerm || activeFilters.length > 0) && (
          <Button variant="ghost" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filterId => {
            const filter = filterOptions.find(f => f.id === filterId);
            if (!filter) return null;
            
            return (
              <Badge
                key={filterId}
                className={`${filter.color} cursor-pointer hover:opacity-80`}
                onClick={() => toggleFilter(filterId)}
              >
                <filter.icon className="w-3 h-3 mr-1" />
                {filter.label}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            );
          })}
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-slate-800">Filter by:</h4>
          
          <div className="space-y-2">
            <div>
              <h5 className="text-sm font-medium text-slate-600 mb-2">Status</h5>
              <div className="flex flex-wrap gap-2">
                {filterOptions.slice(0, 5).map(filter => (
                  <Badge
                    key={filter.id}
                    variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                    className={`cursor-pointer hover:opacity-80 ${
                      activeFilters.includes(filter.id) ? filter.color : ''
                    }`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-slate-600 mb-2">Properties</h5>
              <div className="flex flex-wrap gap-2">
                {filterOptions.slice(5).map(filter => (
                  <Badge
                    key={filter.id}
                    variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                    className={`cursor-pointer hover:opacity-80 ${
                      activeFilters.includes(filter.id) ? filter.color : ''
                    }`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
