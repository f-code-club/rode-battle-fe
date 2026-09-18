import QueryState from '@/components/ui/QueryState';
import { useContest } from '@/features/contest/hooks/useContest';
import type { ContestDetail as ContestDetailType } from '@/features/contest/types';
import { toQueryMessage } from '@/lib/http-errors';
import { useParams } from '@tanstack/react-router';
import ContestDetail from '.';
import { useProblem } from './hooks/useProblem';
import {
  ALGORITHM_LANGUAGE_OPTIONS,
  DEFAULT_ALGORITHM_LANGUAGES,
  getAlgorithmLanguageOption,
} from './templates/Algorithm/config/languages';
import type { BeAlgorithmLanguageOption, ContestDetailData, Problem } from './types';
import { detectContestType, parseColorCodes } from './utils';

function toContestDetailData(problemId: string, problem: Problem, contest?: ContestDetailType): ContestDetailData {
  const type = detectContestType(problem.languages);

  if (type === 'FE_CSS_BATTLE') {
    return {
      id: problemId,
      title: problem.name,
      type,
      contestTitle: contest?.name,
      contestStart: contest?.start,
      contestEnd: contest?.end,
      problems: contest?.problems,
      target: { imageUrl: problem.content, colorCodes: parseColorCodes(problem.color_code) },
    };
  }

  const configuredLanguages =
    problem.languages && problem.languages.length > 0
      ? problem.languages
          .map((language) => getAlgorithmLanguageOption(language))
          .filter((option): option is BeAlgorithmLanguageOption => option != null)
      : DEFAULT_ALGORITHM_LANGUAGES;

  const allowedLanguages = configuredLanguages.some((l) => l.id === 'rust')
    ? configuredLanguages
    : [...configuredLanguages, ALGORITHM_LANGUAGE_OPTIONS.rust];

  return {
    id: problemId,
    title: problem.name,
    type,
    contestTitle: contest?.name,
    contestStart: contest?.start,
    contestEnd: contest?.end,
    problems: contest?.problems,
    statementMarkdown: problem.content,
    algorithm: {
      timeLimitMs: problem.time_limit,
      memoryLimitMb: problem.memory_limit,
      allowedLanguages,
    },
  };
}

export default function ContestProblemPage() {
  const { contestId, problemId } = useParams({
    from: '/_authenticated/contest/$contestId/problem/$problemId',
  });

  const {
    data: contest,
    isLoading: isContestLoading,
    isError: isContestError,
    error: contestError,
  } = useContest(contestId);
  const {
    data: problem,
    isLoading: isProblemLoading,
    isError: isProblemError,
    error: problemError,
  } = useProblem(problemId);

  if (isContestLoading || isProblemLoading) {
    return <QueryState message="Loading..." size="screen" />;
  }

  if (isContestError || !contest) {
    return <QueryState message={toQueryMessage(contestError, 'Contest not found.')} size="screen" tone="error" />;
  }

  if (isProblemError || !problem) {
    return <QueryState message={toQueryMessage(problemError, 'Problem not found.')} size="screen" tone="error" />;
  }

  const isProblemInContest = contest.problems.some((p) => p.id === problemId);
  if (!isProblemInContest) {
    return <QueryState message="Problem does not belong to this contest." size="screen" tone="error" />;
  }

  const data = toContestDetailData(problemId, problem, contest);
  return (
    <>
      <title>{`${problem.name} — ${contest.name}`}</title>
      <meta name="description" content={`Participate in ${contest.name}: ${problem.name}`} />
      <ContestDetail contestId={contestId} problemId={problemId} data={data} />
    </>
  );
}
