import { useRef, useState, useTransition } from 'react';
import type { BeAlgorithmLanguageOption } from '../../../types';

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
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPendingTransition, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId) ?? languages[0];
  const languageId = selectedLanguage?.id ?? '';
  const isBusy = isSubmitting || isPendingTransition;

  const resetFileInput = () => {
    setFile(null);
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
    <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Submit Solution</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
        {isLocked && (
          <div className="rounded-xs border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            {lockReason ?? 'Submissions are closed for this contest.'}
          </div>
        )}

        {languages.length === 0 && !isLocked && (
          <span className="text-xs text-amber-600">No languages configured for this problem yet.</span>
        )}

        <select
          value={languageId}
          onChange={(e) => handleLanguageChange(e.target.value)}
          disabled={isLocked || isBusy}
          aria-label="Submission language"
          className="cursor-pointer rounded-xs border border-gray-300 px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isLocked || isBusy) return;
            handleFileChange(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`flex flex-col items-center justify-center gap-1 rounded-xs border border-dashed border-gray-300 px-4 py-6 text-center text-xs text-gray-500 ${
            isLocked || isBusy ? 'cursor-not-allowed bg-gray-50 text-gray-400' : 'cursor-pointer hover:border-gray-400'
          }`}
        >
          <span>{file ? file.name : `Drop file or Browse (${displayExtensions})`}</span>
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

        {error && <span className="text-xs text-red-600">{error}</span>}

        <button
          type="submit"
          disabled={!file || !selectedLanguage || isBusy || isLocked}
          className="cursor-pointer rounded-sm bg-green-700 px-6.5 py-2.5 text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-[#256532] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isBusy ? 'Submitting...' : isLocked ? (lockReason ?? 'Submissions closed') : 'Submit'}
        </button>
      </form>
    </div>
  );
}
