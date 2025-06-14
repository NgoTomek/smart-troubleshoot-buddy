
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Upload, 
  FileText, 
  Share2,
  Copy,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { WorkflowStep, WorkflowAnalytics } from '@/types/workflow';

interface WorkflowExportImportProps {
  currentWorkflow: WorkflowStep[];
  currentProgress: WorkflowAnalytics;
  onImportWorkflow: (workflow: WorkflowStep[]) => void;
  onImportProgress: (progress: any) => void;
}

export const WorkflowExportImport = ({
  currentWorkflow,
  currentProgress,
  onImportWorkflow,
  onImportProgress,
}: WorkflowExportImportProps) => {
  const [importData, setImportData] = useState('');
  const [exportData, setExportData] = useState('');
  const [importError, setImportError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showExportData, setShowExportData] = useState(false);

  const generateExportData = () => {
    const exportObject = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      workflow: {
        steps: currentWorkflow,
        analytics: currentProgress,
        metadata: {
          totalSteps: currentWorkflow.length,
          completedSteps: currentWorkflow.filter(s => s.status === 'completed').length,
          exportedBy: 'workflow-system'
        }
      }
    };
    
    return JSON.stringify(exportObject, null, 2);
  };

  const handleExport = () => {
    const data = generateExportData();
    setExportData(data);
    setShowExportData(true);
  };

  const handleDownload = () => {
    const data = generateExportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleImport = () => {
    setImportError('');
    
    if (!importData.trim()) {
      setImportError('Please enter workflow data to import');
      return;
    }

    try {
      const parsed = JSON.parse(importData);
      
      if (!parsed.workflow || !parsed.workflow.steps) {
        setImportError('Invalid workflow format: missing steps data');
        return;
      }

      // Validate steps structure
      const steps = parsed.workflow.steps;
      if (!Array.isArray(steps)) {
        setImportError('Invalid workflow format: steps must be an array');
        return;
      }

      // Basic validation of step structure
      const isValidSteps = steps.every(step => 
        step.id && step.title && step.status
      );

      if (!isValidSteps) {
        setImportError('Invalid step format: each step must have id, title, and status');
        return;
      }

      onImportWorkflow(steps);
      
      if (parsed.workflow.analytics) {
        onImportProgress(parsed.workflow.analytics);
      }

      setImportData('');
      setImportError('');
      
      // Show success message
      setTimeout(() => {
        alert('Workflow imported successfully!');
      }, 100);
      
    } catch (err) {
      setImportError('Invalid JSON format. Please check your data.');
    }
  };

  const handleShare = () => {
    const data = generateExportData();
    const encodedData = encodeURIComponent(data);
    const shareUrl = `${window.location.origin}?import=${encodedData}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Workflow Export',
        text: 'Check out this workflow configuration',
        url: shareUrl
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Share URL copied to clipboard!');
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Export your current workflow configuration and progress to share or backup.
          </p>
          
          <div className="flex space-x-2">
            <Button onClick={handleExport} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Export
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {showExportData && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Export Data</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={exportData}
                readOnly
                rows={8}
                className="font-mono text-xs"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Import Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Import a previously exported workflow configuration to restore your progress.
          </p>

          {importError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{importError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="import-data">Workflow Data (JSON)</Label>
            <Textarea
              id="import-data"
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste your exported workflow JSON data here..."
              rows={8}
              className="font-mono text-xs"
            />
          </div>

          <Button 
            onClick={handleImport}
            disabled={!importData.trim()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Workflow
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-800 mb-1">Import Guidelines</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Only import data from trusted sources</li>
              <li>• Importing will replace your current workflow</li>
              <li>• Make sure to export your current workflow first if needed</li>
              <li>• The data must be in valid JSON format</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
