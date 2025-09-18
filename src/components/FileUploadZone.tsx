import { useState, useCallback } from "react";
import { Upload, X, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadZoneProps {
  onFilesUploaded: (files: string[]) => void;
  maxFiles?: number;
}

const FileUploadZone = ({ onFilesUploaded, maxFiles = 10 }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  }, []);

  const processFiles = (files: File[]) => {
    if (files.length + uploadedFiles.length > maxFiles) {
      toast.error(`Առավելագույնը ${maxFiles} ֆայլ`);
      return;
    }

    const validFiles = files.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB max
      if (!isValid) {
        toast.error(`${file.name} ֆայլը չափազանց մեծ է (առավելագույնը 10MB)`);
      }
      return isValid;
    });

    const fileNames = validFiles.map(file => file.name);
    const newFiles = [...uploadedFiles, ...fileNames];
    
    setUploadedFiles(newFiles);
    onFilesUploaded(fileNames);
    
    toast.success(`Բեռնվել է ${validFiles.length} ֆայլ`);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 mb-2">
          Քաշեք ֆայլերը այստեղ կամ{" "}
          <label className="text-primary cursor-pointer hover:underline">
            ընտրեք ֆայլեր
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Աջակցվում են: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (առավելագույնը 10MB)
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Բեռնված ֆայլեր:</h4>
          <div className="grid grid-cols-1 gap-2">
            {uploadedFiles.map((fileName, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border"
              >
                <div className="flex items-center space-x-2">
                  {getFileIcon(fileName)}
                  <span className="text-sm font-medium truncate">{fileName}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;