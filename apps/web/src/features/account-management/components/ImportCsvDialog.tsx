import * as Dialog from '@radix-ui/react-dialog';
import { Upload, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ImportCsvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileSelected: (file: File) => void;
}

export default function ImportCsvDialog({ open, onOpenChange, onFileSelected }: ImportCsvDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.csv')) {
        toast.error('Only .csv files are supported');
        return;
      }
      onFileSelected(file);
      onOpenChange(false);
    },
    [onFileSelected, onOpenChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = '';
    },
    [handleFile],
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="animate-modal-content fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl focus:outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
            <Dialog.Title className="text-lg font-bold tracking-tight text-gray-900">Import from CSV</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="shrink-0 cursor-pointer rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="px-5 py-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all ${
                isDragging
                  ? 'scale-[1.01] border-black bg-gray-50'
                  : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  isDragging ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Upload className="h-5 w-5" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">
                  {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  or <span className="font-medium text-black underline underline-offset-2">browse files</span>
                </p>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleInputChange} className="hidden" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
