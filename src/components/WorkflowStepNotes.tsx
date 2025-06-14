import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Plus, 
  Save, 
  Edit3, 
  Trash2,
  Clock
} from 'lucide-react';

interface StepNote {
  id: string;
  content: string;
  timestamp: number;
  stepId: string;
}

interface WorkflowStepNotesProps {
  stepId: string;
  stepTitle: string;
  notes: StepNote[];
  onAddNote: (stepId: string, content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

export const WorkflowStepNotes = ({
  stepId,
  stepTitle,
  notes = [],
  onAddNote,
  onUpdateNote,
  onDeleteNote
}: WorkflowStepNotesProps) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const stepNotes = notes.filter(note => note.stepId === stepId);

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      onAddNote(stepId, newNoteContent.trim());
      setNewNoteContent('');
      setIsAddingNote(false);
    }
  };

  const handleEditNote = (note: StepNote) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingNoteId && editContent.trim()) {
      onUpdateNote(editingNoteId, editContent.trim());
      setEditingNoteId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditContent('');
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span>Step Notes</span>
            <Badge variant="outline" className="bg-orange-100 text-orange-700">
              {stepNotes.length}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNote(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </Button>
        </CardTitle>
        <p className="text-sm text-orange-700">
          Keep track of important observations and insights for: {stepTitle}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add New Note */}
        {isAddingNote && (
          <div className="p-3 bg-white rounded-lg border border-orange-200">
            <Textarea
              placeholder="Add your note about this step..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleAddNote}>
                <Save className="w-4 h-4 mr-2" />
                Save Note
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNoteContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Existing Notes */}
        {stepNotes.length > 0 ? (
          <div className="space-y-3">
            {stepNotes.map((note) => (
              <div key={note.id} className="p-3 bg-white rounded-lg border border-orange-200">
                {editingNoteId === note.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{formatTimestamp(note.timestamp)}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditNote(note)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteNote(note.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notes for this step yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Add notes to track your progress and insights
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
