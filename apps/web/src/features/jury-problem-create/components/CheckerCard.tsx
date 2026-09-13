import { LANGUAGE_LABELS } from '@/features/jury-dashboard/utils/problem';
import { StreamLanguage, type StreamParser } from '@codemirror/language';
import { cpp, java } from '@codemirror/legacy-modes/mode/clike';
import { python } from '@codemirror/legacy-modes/mode/python';
import { rust } from '@codemirror/legacy-modes/mode/rust';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { Upload } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { ALGO_LANGUAGES, type AlgoLanguage } from '../constants';
import type { ProblemFormData } from '../schemas/problem.schema';
import SectionCard, { FieldError } from './SectionCard';

interface CheckerCardProps {
  form: UseFormReturn<ProblemFormData>;
  disabled?: boolean;
}

const MODES: Record<AlgoLanguage, StreamParser<unknown>> = { cpp, java, python, rust };

const EXT_TO_LANGUAGE: Record<string, AlgoLanguage> = {
  cpp: 'cpp',
  cc: 'cpp',
  cxx: 'cpp',
  c: 'cpp',
  h: 'cpp',
  hpp: 'cpp',
  py: 'python',
  java: 'java',
  rs: 'rust',
};

const ACCEPT = Object.keys(EXT_TO_LANGUAGE)
  .map((ext) => `.${ext}`)
  .join(',');

const MAX_FILE_BYTES = 512 * 1024;

export default function CheckerCard({ form, disabled }: CheckerCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setValue,
    formState: { errors },
  } = form;

  const checkerLanguage = (useWatch({ control: form.control, name: 'checkerLanguage' }) ?? 'cpp') as AlgoLanguage;
  const checkerCode = useWatch({ control: form.control, name: 'checkerCode' }) ?? '';

  const extensions = useMemo(() => [StreamLanguage.define(MODES[checkerLanguage])], [checkerLanguage]);
  const lang = ALGO_LANGUAGES.find((l) => l.id === checkerLanguage) ?? ALGO_LANGUAGES[0]!;
  const lineCount = checkerCode ? checkerCode.split('\n').length : 0;

  const handleFile = async (file: File) => {
    if (file.size > MAX_FILE_BYTES) {
      toast.error('Checker file must be under 512 KB');
      return;
    }
    if (checkerCode.trim() && !window.confirm(`Replace the current checker with ${file.name}?`)) return;

    try {
      const text = await file.text();
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const detected = EXT_TO_LANGUAGE[ext];
      if (detected) setValue('checkerLanguage', detected, { shouldValidate: true, shouldDirty: true });
      setValue('checkerCode', text, { shouldValidate: true, shouldDirty: true });
    } catch {
      toast.error('Could not read this file');
    }
  };

  const actions = (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        <Upload size={13} /> Upload file
      </button>
      <label className="flex items-center gap-2 text-xs text-gray-500">
        Language
        <select
          value={checkerLanguage}
          disabled={disabled}
          onChange={(e) =>
            setValue('checkerLanguage', e.target.value as AlgoLanguage, { shouldValidate: true, shouldDirty: true })
          }
          className="h-8 cursor-pointer rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-900 focus:border-emerald-600 focus:outline-none"
        >
          {ALGO_LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {LANGUAGE_LABELS[l.id]}
            </option>
          ))}
        </select>
      </label>
    </>
  );

  return (
    <SectionCard
      title="Checker"
      required
      hint="Program that judges a contestant's output for each test"
      actions={actions}
      flush
    >
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-1.5 font-mono text-[11px] text-gray-400">
        <span>checker.{lang.ext}</span>
        <span>{lineCount} lines</span>
      </div>
      <CodeMirror
        value={checkerCode}
        onChange={(val) => setValue('checkerCode', val, { shouldValidate: true, shouldDirty: true })}
        theme={vscodeDark}
        extensions={extensions}
        height="320px"
        placeholder={`${LANGUAGE_LABELS[lang.id]} checker source`}
        editable={!disabled}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
        }}
        className="text-[13px]"
      />
      {errors.checkerCode && (
        <div className="border-t border-gray-200 px-5 py-2">
          <FieldError message={errors.checkerCode.message} />
        </div>
      )}
    </SectionCard>
  );
}
