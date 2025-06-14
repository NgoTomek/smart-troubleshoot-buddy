
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImagesUploaded: (images: File[]) => void;
  extractedText: string;
}

export const ImageUpload = ({ onImagesUploaded, extractedText }: ImageUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles);
    setUploadedFiles(acceptedFiles);
    setIsExtracting(true);
    onImagesUploaded(acceptedFiles);
    
    // Simulate extraction delay
    setTimeout(() => {
      setIsExtracting(false);
    }, 2000);
  }, [onImagesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: true,
    maxFiles: 5
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    if (newFiles.length === 0) {
      onImagesUploaded([]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <input {...getInputProps()} />
            <FileUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop your screenshots here...</p>
            ) : (
              <div>
                <p className="text-slate-600 font-medium mb-2">
                  Drag & drop screenshots here, or click to browse
                </p>
                <p className="text-sm text-slate-500">
                  Supports PNG, JPG, GIF • Max 5 files • 10MB each
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Uploaded Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(URL.createObjectURL(file), '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isExtracting && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-slate-600">Extracting text from images...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {extractedText && !isExtracting && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Extracted Text</h3>
            <div className="bg-slate-50 rounded-lg p-4 border">
              <p className="text-slate-700 font-mono text-sm leading-relaxed">
                {extractedText}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
