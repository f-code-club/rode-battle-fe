import 'katex/dist/katex.min.css';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { toast } from 'sonner';

interface StatementPanelProps {
  title: string;
  statementMarkdown?: string;
}

function CopyableCodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Failed to copy code.');
    }
  };

  return (
    <div className="relative my-3 overflow-hidden rounded-xs border border-gray-200 bg-gray-50">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 cursor-pointer rounded-xs border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-xs text-gray-800">
        <code>{children}</code>
      </pre>
    </div>
  );
}

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-800">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-gray-800">{children}</ol>,
  h2: ({ children }) => <h2 className="mt-8 mb-3 text-base font-semibold">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 mb-2 text-sm font-semibold">{children}</h3>,
  code({ className, children }) {
    const text = String(children).replace(/\n$/, '');
    if (!className) {
      return <code className="rounded-xs bg-gray-100 px-1 py-0.5 font-mono text-[0.9em]">{text}</code>;
    }
    return <CopyableCodeBlock>{text}</CopyableCodeBlock>;
  },
};

export default function StatementPanel({ title, statementMarkdown }: StatementPanelProps) {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-8 py-8">
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">{title}</h1>
        {statementMarkdown ? (
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
            {statementMarkdown}
          </ReactMarkdown>
        ) : (
          <p className="text-sm text-gray-400">No statement available.</p>
        )}
      </div>
    </div>
  );
}
