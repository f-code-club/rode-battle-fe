import { cn } from '@/lib/utils';
import { AlertTriangle, ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { CSS_TARGET_ASPECT, CSS_TARGET_MAX_BYTES, CSS_TARGET_RECOMMENDED } from '../constants';
import type { ProblemFormData } from '../schemas/problem.schema';
import { formatFileSize, processImageFile, type ImageMeta } from '../utils/fileToBase64';
import SectionCard, { FieldError } from './SectionCard';

interface TargetImageCardProps {
  form: UseFormReturn<ProblemFormData>;
  disabled?: boolean;
}

const ACCEPT = 'image/png,image/jpeg,image/webp,image/svg+xml';

const CHECKERBOARD: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)',
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
};

export default function TargetImageCard({ form, disabled }: TargetImageCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [meta, setMeta] = useState<ImageMeta | null>(null);
  const [dragging, setDragging] = useState(false);

  const {
    setValue,
    formState: { errors },
  } = form;
  const base64 = useWatch({ control: form.control, name: 'base64Content' });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only PNG, JPG, WebP or SVG images are accepted');
      return;
    }
    if (file.size > CSS_TARGET_MAX_BYTES) {
      toast.error(`Image must be under ${formatFileSize(CSS_TARGET_MAX_BYTES)}`);
      return;
    }
    try {
      const next = await processImageFile(file);
      setMeta(next);
      setValue('base64Content', next.base64, { shouldValidate: true, shouldDirty: true });
    } catch {
      toast.error('Could not read this image');
    }
  };

  const clear = () => {
    setMeta(null);
    setValue('base64Content', '', { shouldValidate: true, shouldDirty: true });
    if (inputRef.current) inputRef.current.value = '';
  };

  const aspectMismatch = meta ? Math.abs(meta.width / meta.height - CSS_TARGET_ASPECT) > 0.01 : false;

  const actions = base64 ? (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        <ImagePlus size={13} /> Replace
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={clear}
        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        <Trash2 size={13} /> Remove
      </button>
    </>
  ) : null;

  return (
    <SectionCard
      title="Target image"
      required
      hint={`${CSS_TARGET_RECOMMENDED.width} × ${CSS_TARGET_RECOMMENDED.height} px recommended`}
      actions={actions}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {base64 ? (
        <div className="space-y-3">
          <div
            className="flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 p-4"
            style={CHECKERBOARD}
          >
            <img src={base64} alt="Target" className="max-h-80 max-w-full object-contain shadow-sm" />
          </div>

          {meta && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
              <span className="truncate font-medium text-gray-800">{meta.name}</span>
              <span className="font-mono text-gray-500">
                {meta.width} × {meta.height} px · {meta.formattedSize}
              </span>
            </div>
          )}

          {aspectMismatch && meta && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>
                This image is not 4:3 ({meta.width} × {meta.height}). The contestant view shows the target at 4:3 and
                crops the overflow, so part of it will be hidden.
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (disabled) return;
            const file = e.dataTransfer.files?.[0];
            if (file) void handleFile(file);
          }}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors',
            dragging ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50',
          )}
        >
          <UploadCloud size={28} className="text-gray-400" />
          <p className="mt-3 text-sm font-medium text-gray-800">Drop an image here, or click to browse</p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, WebP or SVG · up to {formatFileSize(CSS_TARGET_MAX_BYTES)}
          </p>
        </div>
      )}
      <FieldError message={errors.base64Content?.message} />
    </SectionCard>
  );
}
