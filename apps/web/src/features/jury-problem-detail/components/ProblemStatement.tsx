import type { ProblemDetailResponse } from '@/features/jury-dashboard/types';
import { getProblemType } from '@/features/jury-dashboard/utils/problem';
import 'katex/dist/katex.min.css';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface ProblemStatementProps {
  problem: ProblemDetailResponse;
}

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-800">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-gray-800">{children}</ol>,
  h2: ({ children }) => <h2 className="mt-8 mb-3 text-lg font-semibold">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 mb-2 text-base font-semibold">{children}</h3>,
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b-2 border-gray-300">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-800">{children}</th>
  ),
  td: ({ children }) => <td className="border border-gray-200 px-3 py-2 align-top text-gray-800">{children}</td>,
  code({ className, children }) {
    const text = String(children).replace(/\n$/, '');
    if (!className) {
      return <code className="rounded-xs bg-gray-100 px-1 py-0.5 font-mono text-[0.9em]">{text}</code>;
    }
    return (
      <pre className="my-3 overflow-x-auto rounded-xs border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
        <code>{text}</code>
      </pre>
    );
  },
};

export default function ProblemStatement({ problem }: ProblemStatementProps) {
  if (getProblemType(problem.languages) === 'CSS_BATTLE') {
    return (
      <div className="mt-8 flex justify-center">
        <img src={problem.content} alt={problem.name} className="max-w-full rounded-lg border border-gray-200" />
      </div>
    );
  }

  return (
    <div className="mt-8 text-base leading-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={markdownComponents}
      >
        {problem.content}
      </ReactMarkdown>
    </div>
  );
}
