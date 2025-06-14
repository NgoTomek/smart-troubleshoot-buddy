
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Download, 
  Upload, 
  FileText, 
  Share2,
  Copy,
  Check,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkflowExportImportProps {
  currentWorkflow: any;
  currentProgress: any;
  onImportWorkflow: (workflow: any) => void;
  onImportProgress: (progress: any) => void;
}

export const WorkflowExportImport = ({ 
  currentWorkflow, 
  currentProgress, 
  onImportWorkflow, 
  onImportProgress 
}: WorkflowExportImportProps) => {
  const { toast } = useToast();
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [importError, setImportError] = useState('');

  const generateExportData = (includeProgress: boolean = false) => {
    const exportObject = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      workflow: currentWorkflow,
      ...(includeProgress && { progress: currentProgress }),
      metadata: {
        exportedBy: 'User',
        description: 'Exported workflow from troubleshooting session'
      }
    };
    
    return JSON.stringify(exportObject, null, 2);
  };

  const handleExport = (includeProgress: boolean = false) => {
    const data = generateExportData(includeProgress);
    setExportData(data);
    
    // Download as file
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Workflow Exported",
      description: "Workflow has been downloaded as JSON file",
      duration: 3000,
    });
  };

  const handleCopyToClipboard = async () => {
    if (!exportData) {
      const data = generateExportData(true);
      setExportData(data);
    }
    
    try {
      await navigator.clipboard.writeText(exportData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to Clipboard",
        description: "Workflow data copied to clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleImport = () => {
    if (!importData.trim()) {
      setImportError('Please paste workflow data to import');
      return;
    }

    try {
      const parsed = JSON.parse(importData);
      
      if (!parsed.workflow) {
        setImportError('Invalid workflow format: missing workflow data');
        return;
      }

      if (parsed.version !== '1.0') {
        setImportError('Unsupported workflow version');
        return;
      }

      onImportWorkflow(parsed.workflow);
      
      if (parsed.progress) {
        onImportProgress(parsed.progress);
      }

      setImportData('');
      setImportError('');
      
      toast({
        title: "Workflow Imported",
        description: "Workflow has been successfully imported",
        duration: 3000,
      });
    } catch (error) {
      setImportError('Invalid JSON format');
    }
  };

  const handleGenerateShareUrl = () => {
    const data = generateExportData(false);
    const encoded = btoa(data);
    const url = `${window.location.origin}${window.location.pathname}?workflow=${encoded}`;
    setShareUrl(url);
    
    navigator.clipboard.writeText(url);
    toast({
      title: "Share URL Generated",
      description: "Share URL copied to clipboard",
      duration: 3000,
    });
  };

  const getDataSize = (data: string) => {
    const bytes = new Blob([data]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="w-5 h-5 text-purple-600" />
          <span>Export & Import</span>
          <Badge variant="outline" className="bg-purple-100 text-purple-700">
            Workflow Sharing
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-900 flex items-center space-x-2">
            <Download className="w-4 h-4 text-purple-600" />
            <span>Export Workflow</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport(false)}
              className="text-purple-600 border-purple-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export Workflow Only
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleExport(true)}
              className="text-purple-600 border-purple-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export with Progress
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="text-purple-600 border-purple-300"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy to Clipboard
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGenerateShareUrl}
              className="text-purple-600 border-purple-300"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate Share URL
            </Button>
          </div>

          {exportData && (
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Export Preview</span>
                <Badge variant="outline" className="text-xs">
                  {getDataSize(exportData)}
                </Badge>
              </div>
              <Textarea
                value={exportData.substring(0, 200) + '...'}
                readOnly
                className="text-xs font-mono"
                rows={4}
              />
            </div>
          )}

          {shareUrl && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-800 mb-1">
                <QrCode className="w-4 h-4" />
                <span className="text-sm font-medium">Share URL Generated</span>
              </div>
              <p className="text-xs text-blue-700 break-all font-mono bg-white p-2 rounded border">
                {shareUrl}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-purple-200" />

        {/* Import Section */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-900 flex items-center space-x-2">
            <Upload className="w-4 h-4 text-purple-600" />
            <span>Import Workflow</span>
          </h4>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Paste exported workflow JSON data here..."
              value={importData}
              onChange={(e) => {
                setImportData(e.target.value);
                setImportError('');
              }}
              className="font-mono text-sm"
              rows={6}
            />
            
            {importError && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>{importError}</span>
              </div>
            )}
            
            <Button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Workflow
            </Button>
          </div>
        </div>

        {/* Format Info */}
        <div className="p-3 bg-purple-100 rounded-lg">
          <h5 className="text-sm font-medium text-purple-800 mb-1">Export Format</h5>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• JSON format with version information</li>
            <li>• Includes workflow steps and metadata</li>
            <li>• Optional progress and completion status</li>
            <li>• Compatible with future versions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
