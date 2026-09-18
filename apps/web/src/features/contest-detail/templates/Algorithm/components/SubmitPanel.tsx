import { cn } from '@/lib/utils';
import { AlertCircle, Check, ChevronDown, Code2, FileCode, Loader2, UploadCloud, X } from 'lucide-react';
import { useMemo, useRef, useState, useTransition } from 'react';
import type { BeAlgorithmLanguageOption } from '../../../types';
import { ALGORITHM_LANGUAGE_OPTIONS, DEFAULT_ALGORITHM_LANGUAGES } from '../config/languages';

interface SubmitPanelProps {
  languages: BeAlgorithmLanguageOption[];
  onSubmit: (language: BeAlgorithmLanguageOption['id'], code: string) => Promise<boolean>;
  isSubmitting: boolean;
  isLocked?: boolean;
  lockReason?: string;
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export default function SubmitPanel({ languages, onSubmit, isSubmitting, isLocked, lockReason }: SubmitPanelProps) {
  const availableLanguages = useMemo(() => {
    const base = languages.length > 0 ? languages : DEFAULT_ALGORITHM_LANGUAGES;
    if (!base.some((lang) => lang.id === 'rust') && ALGORITHM_LANGUAGE_OPTIONS.rust) {
      return [...base, ALGORITHM_LANGUAGE_OPTIONS.rust];
    }
    return base;
  }, [languages]);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPendingTransition, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLanguage = availableLanguages.find((lang) => lang.id === selectedLanguageId) ?? availableLanguages[0];
  const languageId = selectedLanguage?.id ?? '';
  const isBusy = isSubmitting || isPendingTransition;

  const resetFileInput = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleLanguageChange = (nextLanguageId: string) => {
    setSelectedLanguageId(nextLanguageId);
    setError(null);
    resetFileInput();
  };

  const handleFileChange = (nextFile: File | null) => {
    setError(null);
    if (!nextFile) {
      setFile(null);
      return;
    }
    if (selectedLanguage) {
      const allowedExts = selectedLanguage.fileExt.split(',').map((ext) => ext.trim().toLowerCase());
      const hasValidExt = allowedExts.some((ext) => nextFile.name.toLowerCase().endsWith(ext));
      if (!hasValidExt) {
        setError(`Expected a ${allowedExts.join(' or ')} file for ${selectedLanguage.label}`);
        setFile(null);
        return;
      }
    }
    setFile(nextFile);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isBusy || isLocked || !file || !selectedLanguage) return;
    startTransition(async () => {
      try {
        const code = await readFileAsText(file);
        const succeeded = await onSubmit(selectedLanguage.id, code);
        if (succeeded) resetFileInput();
      } catch {
        setError('Failed to read the selected file.');
      }
    });
  };

  const displayExtensions = selectedLanguage ? selectedLanguage.fileExt.split(',').join(', ') : '';

  return (
    <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <UploadCloud size={16} className="text-emerald-600" />
          <span className="text-xs font-bold tracking-wider text-gray-800 uppercase">Submit Solution</span>
        </div>
        {availableLanguages.length > 0 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
            {availableLanguages.length} {availableLanguages.length === 1 ? 'lang' : 'langs'}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 p-5">
        {isLocked && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200/80 bg-amber-50/70 p-3 text-xs font-medium text-amber-800">
            <AlertCircle size={15} className="shrink-0 text-amber-600" />
            <span>{lockReason ?? 'Submissions are closed for this contest.'}</span>
          </div>
        )}

        {availableLanguages.length === 0 && !isLocked && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200/70 bg-amber-50/60 p-2.5 text-xs text-amber-700">
            <AlertCircle size={14} className="shrink-0" />
            <span>No languages configured for this problem yet.</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Language</label>
          <div className="relative flex items-center">
            <Code2 size={14} className="pointer-events-none absolute left-3 text-gray-400" />
            <select
              value={languageId}
              onChange={(e) => handleLanguageChange(e.target.value)}
              disabled={isLocked || isBusy || availableLanguages.length === 0}
              aria-label="Submission language"
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50/60 py-2 pr-8 pl-9 text-xs font-medium text-gray-800 transition-all outline-none hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {availableLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label} ({lang.fileExt})
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Source Code File</label>
          {!file ? (
            <label
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isLocked && !isBusy) setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                if (isLocked || isBusy) return;
                handleFileChange(e.dataTransfer.files?.[0] ?? null);
              }}
              className={cn(
                'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all duration-150',
                isDragging
                  ? 'scale-[1.01] border-emerald-500 bg-emerald-50/60'
                  : 'border-gray-200 bg-gray-50/40 hover:border-emerald-500/60 hover:bg-emerald-50/15',
                isLocked || isBusy ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )}
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-xs">
                <UploadCloud size={18} className={isDragging ? 'text-emerald-600' : 'text-gray-400'} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-gray-700">Click to browse or drag & drop file</span>
                <span className="text-[11px] text-gray-400">
                  Allowed:{' '}
                  <span className="font-mono font-medium text-gray-600">{displayExtensions || 'code files'}</span>
                </span>
              </div>
              <input
                ref={inputRef}
                type="file"
                disabled={isLocked || isBusy}
                accept={selectedLanguage?.fileExt}
                className="hidden"
                onClick={(e) => {
                  (e.currentTarget as HTMLInputElement).value = '';
                }}
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 shadow-2xs">
              <div className="flex min-w-0 items-center gap-3 overflow-hidden">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <FileCode size={18} />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs font-semibold text-gray-800">{file.name}</span>
                  <span className="font-mono text-[11px] text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB • {selectedLanguage?.label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={resetFileInput}
                disabled={isBusy}
                title="Remove file"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-rose-100 hover:text-rose-600"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600">
            <AlertCircle size={13} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || !selectedLanguage || isBusy || isLocked}
          className={cn(
            'mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold tracking-wide text-white shadow-xs transition-all',
            !file || !selectedLanguage || isBusy || isLocked
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99]',
          )}
        >
          {isBusy ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Submitting solution...</span>
            </>
          ) : isLocked ? (
            <span>{lockReason ?? 'Submissions closed'}</span>
          ) : (
            <>
              <Check size={14} />
              <span>Submit Solution</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
