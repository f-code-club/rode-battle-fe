import { useRef, useState } from 'react';
import type { BeAlgorithmLanguageOption } from '../../../types';

interface SubmitPanelProps {
  languages: BeAlgorithmLanguageOption[];
  onSubmit: (language: BeAlgorithmLanguageOption['id'], code: string) => Promise<boolean>;
  isSubmitting: boolean;
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export default function SubmitPanel({ languages, onSubmit, isSubmitting }: SubmitPanelProps) {
  const [languageId, setLanguageId] = useState(languages[0]?.id ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLanguage = languages.find((lang) => lang.id === languageId);

  const resetFileInput = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleLanguageChange = (nextLanguageId: string) => {
    setLanguageId(nextLanguageId);
    setError(null);
    resetFileInput();
  };

  const handleFileChange = (nextFile: File | null) => {
    setError(null);
    if (!nextFile) {
      setFile(null);
      return;
    }
    if (selectedLanguage && !nextFile.name.toLowerCase().endsWith(selectedLanguage.fileExt)) {
      setError(`Expected a ${selectedLanguage.fileExt} file for ${selectedLanguage.label}`);
      setFile(null);
      return;
    }
    setFile(nextFile);
  };

  const handleSubmit = async () => {
    if (!file || !selectedLanguage) return;
    try {
      const code = await readFileAsText(file);
      const succeeded = await onSubmit(selectedLanguage.id, code);
      if (succeeded) resetFileInput();
    } catch {
      setError('Failed to read the selected file.');
    }
  };

  return (
    <div className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Submit Solution</span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <select
          value={languageId}
          onChange={(e) => handleLanguageChange(e.target.value)}
          aria-label="Submission language"
          className="cursor-pointer rounded-xs border border-gray-300 px-3 py-2 text-sm outline-none"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xs border border-dashed border-gray-300 px-4 py-6 text-center text-xs text-gray-500 hover:border-gray-400">
          <span>{file ? file.name : `Drop file or Browse (${selectedLanguage?.fileExt ?? ''})`}</span>
          <input
            ref={inputRef}
            type="file"
            accept={selectedLanguage?.fileExt}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          />
        </label>

        {error && <span className="text-xs text-red-600">{error}</span>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!file || isSubmitting}
          className="cursor-pointer rounded-sm bg-green-700 px-6.5 py-2.5 text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-[#256532] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
