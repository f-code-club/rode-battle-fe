import StatementPanel from '@/features/contest-detail/templates/Algorithm/components/StatementPanel';
import { cn } from '@/lib/utils';
import { Bold, Code, Heading2, Italic, Sigma, SquareCode } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import type { ProblemFormData } from '../schemas/problem.schema';
import SectionCard, { FieldError } from './SectionCard';

interface StatementCardProps {
  form: UseFormReturn<ProblemFormData>;
  disabled?: boolean;
}

type Tab = 'write' | 'preview';

function ToolbarButton({
  title,
  onClick,
  disabled,
  children,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="cursor-pointer rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function StatementCard({ form, disabled }: StatementCardProps) {
  const [tab, setTab] = useState<Tab>('write');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    setValue,
    formState: { errors },
  } = form;
  const statement = useWatch({ control: form.control, name: 'statement' }) ?? '';
  const name = useWatch({ control: form.control, name: 'name' }) ?? '';

  const { ref: hookRef, ...statementField } = register('statement');

  const wrapSelection = (prefix: string, suffix = prefix, placeholder = 'text') => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + prefix + selected + suffix + value.slice(end);
    setValue('statement', next, { shouldValidate: true, shouldDirty: true });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  };

  const tabs = (
    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-semibold">
      {(['write', 'preview'] as Tab[]).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={cn(
            'cursor-pointer rounded-md px-3 py-1 capitalize transition-colors',
            tab === t ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900',
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );

  return (
    <SectionCard title="Statement" required actions={tabs} flush>
      {tab === 'write' ? (
        <div className="focus-within:ring-1 focus-within:ring-emerald-600 focus-within:ring-inset">
          <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1">
            <ToolbarButton
              title="Section heading"
              disabled={disabled}
              onClick={() => wrapSelection('## ', '', 'Heading')}
            >
              <Heading2 size={15} />
            </ToolbarButton>
            <ToolbarButton title="Bold" disabled={disabled} onClick={() => wrapSelection('**')}>
              <Bold size={15} />
            </ToolbarButton>
            <ToolbarButton title="Italic" disabled={disabled} onClick={() => wrapSelection('_')}>
              <Italic size={15} />
            </ToolbarButton>
            <span className="mx-1 h-4 w-px bg-gray-300" />
            <ToolbarButton title="Inline code" disabled={disabled} onClick={() => wrapSelection('`', '`', 'code')}>
              <Code size={15} />
            </ToolbarButton>
            <ToolbarButton
              title="Code block (use for sample input/output)"
              disabled={disabled}
              onClick={() => wrapSelection('```\n', '\n```', 'sample')}
            >
              <SquareCode size={15} />
            </ToolbarButton>
            <ToolbarButton
              title="Math ($…$)"
              disabled={disabled}
              onClick={() => wrapSelection('$', '$', 'n \\le 10^5')}
            >
              <Sigma size={15} />
            </ToolbarButton>
          </div>

          <textarea
            id="statement"
            rows={18}
            disabled={disabled}
            spellCheck={false}
            {...statementField}
            ref={(node) => {
              hookRef(node);
              textareaRef.current = node;
            }}
            className="block w-full resize-y bg-white p-4 font-mono text-[13px] leading-relaxed text-gray-900 focus:outline-none disabled:bg-gray-50"
          />
        </div>
      ) : (
        <div className="min-h-80 bg-white">
          {statement.trim() ? (
            <StatementPanel title={name.trim() || 'Untitled problem'} statementMarkdown={statement} />
          ) : (
            <div className="flex h-80 items-center justify-center text-sm text-gray-400">Nothing to preview yet.</div>
          )}
        </div>
      )}
      {errors.statement && (
        <div className="border-t border-gray-200 px-5 py-2">
          <FieldError message={errors.statement.message} />
        </div>
      )}
    </SectionCard>
  );
}
