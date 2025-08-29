
import { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="analytics-card">
      <div className="text-center">
        <div className="mb-8">
          <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Upload Your Log File</h2>
          <p className="text-muted-foreground text-lg">
            Drag and drop your log file or click to browse
          </p>
        </div>

        {!selectedFile ? (
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 transition-all duration-300
              ${dragActive 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".log,.txt"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2">
                  Drop your log file here
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports .log, .txt files up to 100MB
                </p>
              </div>
              <Button variant="outline" size="lg" className="mt-4">
                Choose File
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              size="lg" 
              className="w-full glow-primary"
            >
              Analyze Log File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FileUpload;
