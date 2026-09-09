import { useParams } from '@tanstack/react-router';
import ContestDetail from '.';
import { useProblem } from './hooks/useProblem';
import { ALGORITHM_LANGUAGE_OPTIONS } from './templates/Algorithm/config/languages';
import type { BackendLanguage, ContestDetailData, Problem } from './types';
import { detectContestType, parseColorCodes } from './utils';

function toContestDetailData(problemId: string, problem: Problem): ContestDetailData {
  const type = detectContestType(problem.languages);

  if (type === 'FE_CSS_BATTLE') {
    return {
      id: problemId,
      title: problem.name,
      type,
      target: { imageUrl: problem.content, colorCodes: parseColorCodes(problem.color_code) },
    };
  }

  return {
    id: problemId,
    title: problem.name,
    type,
    statementMarkdown: problem.content,
    algorithm: {
      timeLimitMs: problem.time_limit,
      memoryLimitMb: problem.memory_limit,
      allowedLanguages: problem.languages
        .filter((language): language is Exclude<BackendLanguage, 'html'> => language !== 'html')
        .map((language) => ALGORITHM_LANGUAGE_OPTIONS[language]),
    },
  };
}

export default function ContestProblemPage() {
  const { contestId, problemId } = useParams({
    from: '/_authenticated/contest/$contestId/problem/$problemId',
  });
  const { data: problem, isLoading, isError, error } = useProblem(problemId);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading...</div>;
  }

  if (isError || !problem) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        {error instanceof Error ? error.message : 'Problem not found.'}
      </div>
    );
  }

  const data = toContestDetailData(problemId, problem);
  return <ContestDetail contestId={contestId} problemId={problemId} data={data} />;
}
