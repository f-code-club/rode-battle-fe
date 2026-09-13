import ProblemTypeBadge from '@/features/jury-dashboard/components/ProblemTypeBadge';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { Check, ChevronDown, ChevronUp, ExternalLink, Eye, GripVertical, Loader2, Search, Trash2 } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';
import { useProblemSearch } from '../hooks/useProblemSearch';
import type { CreateContestFormData } from '../schemas/contest.schema';
import type { ProblemOption } from '../utils/problemSearch';

interface ContestProblemsCardProps {
  form: UseFormReturn<CreateContestFormData>;
}

export default function ContestProblemsCard({ form }: ContestProblemsCardProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeta, setSelectedMeta] = useState<Record<string, ProblemOption>>({});
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const problems = useWatch({ control: form.control, name: 'problems' }) || [];
  const { results, isSearching, error } = useProblemSearch(query);

  useOnClickOutside(containerRef, () => setOpen(false));

  const addProblem = (option: ProblemOption) => {
    if (problems.includes(option.id)) return;
    setSelectedMeta((prev) => ({ ...prev, [option.id]: option }));
    form.setValue('problems', [...problems, option.id], { shouldValidate: true, shouldDirty: true });
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const moveProblem = (from: number, to: number) => {
    if (from === to || to < 0 || to >= problems.length) return;
    const next = [...problems];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved!);
    form.setValue('problems', next, { shouldValidate: true, shouldDirty: true });
  };

  const endDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const removeProblem = (id: string) => {
    form.setValue(
      'problems',
      problems.filter((p) => p !== id),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = results[activeIndex];
      if (option) addProblem(option);
    }
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <>
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Problems
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {problems.length}
            </span>
          </h2>
          <a
            href="/jury/problems/create"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
          >
            Create problem <ExternalLink size={12} />
          </a>
        </div>

        <div className="p-5">
          <div ref={containerRef} className="relative">
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={showDropdown}
                aria-controls={listboxId}
                aria-autocomplete="list"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Paste problem UUID"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pr-9 pl-9 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
              {isSearching && (
                <Loader2 size={15} className="absolute top-1/2 right-3 -translate-y-1/2 animate-spin text-gray-400" />
              )}
            </div>

            {showDropdown && (
              <div
                id={listboxId}
                role="listbox"
                className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              >
                {results.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-gray-500">
                    {isSearching ? 'Searching…' : (error ?? 'Enter a valid problem UUID')}
                  </div>
                ) : (
                  results.map((option, index) => {
                    const added = problems.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        role="option"
                        aria-selected={index === activeIndex}
                        aria-disabled={added}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => !added && addProblem(option)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 text-sm',
                          added ? 'cursor-default opacity-60' : 'cursor-pointer',
                          index === activeIndex && !added && 'bg-emerald-50',
                        )}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: option.colorCode || '#9ca3af' }}
                        />
                        <span className="min-w-0 flex-1 truncate font-medium text-gray-900">{option.name}</span>
                        <ProblemTypeBadge type={option.type} />
                        <Link
                          to="/jury/problems/$problemId"
                          params={{ problemId: option.id }}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View problem"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Eye size={14} />
                        </Link>
                        {added && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <Check size={12} /> Added
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {problems.length > 0 ? (
            <ol className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
              {problems.map((id, idx) => {
                const meta = selectedMeta[id];
                const isDragging = dragIndex === idx;
                const isDropTarget = dragIndex !== null && dragIndex !== idx && overIndex === idx;
                return (
                  <li
                    key={id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move';
                      e.dataTransfer.setData('text/plain', id);
                      setDragIndex(idx);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (overIndex !== idx) setOverIndex(idx);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragIndex !== null) moveProblem(dragIndex, idx);
                      endDrag();
                    }}
                    onDragEnd={endDrag}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-sm transition-opacity',
                      isDragging && 'opacity-40',
                      isDropTarget &&
                        (dragIndex! < idx ? 'shadow-[inset_0_-2px_0_#059669]' : 'shadow-[inset_0_2px_0_#059669]'),
                    )}
                  >
                    <span
                      className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing"
                      title="Drag to reorder"
                    >
                      <GripVertical size={14} />
                    </span>
                    <span className="w-5 shrink-0 text-center font-mono text-xs font-semibold text-gray-500">
                      {idx + 1}
                    </span>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: meta?.colorCode || '#9ca3af' }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-gray-900">{meta?.name ?? id}</span>
                      {meta && <span className="block truncate font-mono text-[11px] text-gray-400">{id}</span>}
                    </span>
                    {meta && <ProblemTypeBadge type={meta.type} />}
                    <Link
                      to="/jury/problems/$problemId"
                      params={{ problemId: id }}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View problem"
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={idx === 0}
                      onClick={() => moveProblem(idx, idx - 1)}
                      className="cursor-pointer rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-default disabled:opacity-30"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={idx === problems.length - 1}
                      onClick={() => moveProblem(idx, idx + 1)}
                      className="cursor-pointer rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-default disabled:opacity-30"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${meta?.name ?? 'problem'}`}
                      onClick={() => removeProblem(id)}
                      className="cursor-pointer rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="mt-4 rounded-lg border border-dashed border-gray-200 py-6 text-center text-xs text-gray-400">
              No problems added yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
