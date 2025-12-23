import React, { useCallback, useState } from 'react';
import { cn } from '../../utils/cn';

interface UploadProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
  showPreview?: boolean;
}

export function Upload({
  onFileSelect,
  accept = '*',
  multiple = false,
  maxSize,
  disabled = false,
  className,
  variant = 'default',
  showPreview = true,
}: UploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const selectedFiles = Array.from(fileList);

      if (maxSize) {
        const validFiles = selectedFiles.filter((file) => file.size <= maxSize);
        if (validFiles.length !== selectedFiles.length) {
          console.warn('Some files exceed size limit');
        }
        setFiles(validFiles);
        onFileSelect?.(validFiles);
      } else {
        setFiles(selectedFiles);
        onFileSelect?.(selectedFiles);
      }
    },
    [maxSize, onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled && e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [disabled, handleFiles],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles],
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFileSelect?.(newFiles);
    },
    [files, onFileSelect],
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const baseClasses =
    'border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer';
  const variantClasses = {
    default: 'p-8 text-center',
    compact: 'p-4 text-center',
    minimal: 'p-2',
  };

  const uploadClasses = cn(
    baseClasses,
    variantClasses[variant],
    {
      'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50': disabled,
      'border-blue-500 bg-blue-50': !disabled && dragOver,
      'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50': !disabled && !dragOver,
    },
    className,
  );

  return (
    <div className="w-full">
      <div
        className={uploadClasses}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        {variant === 'minimal' ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm text-gray-600">Choose files</span>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <div>
              <p className="text-lg font-medium text-gray-900">
                {dragOver ? 'Drop files here' : 'Upload files'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop files here, or click to browse
              </p>
              {maxSize && (
                <p className="text-xs text-gray-400 mt-1">
                  Max file size: {formatFileSize(maxSize)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Selected Files:</h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
