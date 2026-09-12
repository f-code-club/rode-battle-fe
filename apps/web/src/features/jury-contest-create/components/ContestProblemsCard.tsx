import { BookOpen, Info, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import type { CreateContestFormData } from '../schemas/contest.schema';

interface ContestProblemsCardProps {
  form: UseFormReturn<CreateContestFormData>;
}

export default function ContestProblemsCard({ form }: ContestProblemsCardProps) {
  const [inputVal, setInputVal] = useState('');
  const problems = useWatch({ control: form.control, name: 'problems' }) || [];

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    if (!z.string().uuid().safeParse(trimmed).success) {
      toast.error('Invalid problem UUID');
      return;
    }

    if (problems.includes(trimmed)) {
      toast.warning('This problem UUID is already added');
      return;
    }

    form.setValue('problems', [...problems, trimmed], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setInputVal('');
  };

  const handleRemove = (index: number) => {
    form.setValue(
      'problems',
      problems.filter((_, i) => i !== index),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <BookOpen size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900">Problem Set</h3>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          {problems.length} {problems.length === 1 ? 'problem' : 'problems'}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-900">
        <Info size={16} className="shrink-0 text-blue-500" />
        <div>
          <span className="font-semibold">Optional:</span> You can create the contest now and assign problems later.
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste Problem UUID"
          className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-3 font-mono text-xs text-gray-900 transition-all placeholder:font-sans placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gray-900 px-4 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      {problems.length > 0 ? (
        <div className="mt-4 space-y-2">
          {problems.map((uuid, idx) => (
            <div
              key={uuid}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-mono text-[10px] font-bold text-gray-600 shadow-2xs">
                  {idx + 1}
                </span>
                <span className="font-mono text-gray-800">{uuid}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                aria-label={`Remove problem ${idx + 1}`}
                className="cursor-pointer rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-gray-200 py-6 text-center text-xs text-gray-400">
          No problems assigned yet. Contest will be created without problems.
        </div>
      )}
    </div>
  );
}
