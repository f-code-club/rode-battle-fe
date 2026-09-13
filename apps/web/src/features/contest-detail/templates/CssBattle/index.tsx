import ContestFooter from '@/features/contest/components/ContestFooter';
import ContestHeader from '@/features/contest/components/ContestHeader';
import { useContestTimer } from '@/features/contest/hooks/useContestTimer';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useProblemHistory } from '../../hooks/useProblemHistory';
import { useSubmitProblem } from '../../hooks/useSubmitProblem';
import type { ContestDetailData } from '../../types';
import CssEditorPanel from './components/CssEditorPanel';
import CssLiveOutputPanel from './components/CssLiveOutputPanel';
import CssTargetPanel from './components/CssTargetPanel';
import HistoryDrawer from './components/HistoryDrawer';
import PanelToolbar from './components/PanelToolbar';
import { getEditorTheme, getPageColors } from './config/editorThemes';
import { DEFAULT_STARTER_CODE } from './config/starterCode';
import { useCssDraft } from './hooks/useCssDraft';
import { useEditorThemeId } from './hooks/useEditorThemeId';

interface CssBattleTemplateProps {
  contestId: string;
  problemId: string;
  contestData?: ContestDetailData;
}

export default function CssBattleTemplate({ contestId, problemId, contestData }: CssBattleTemplateProps) {
  const [draft, setDraft] = useCssDraft(contestId, problemId, { code: DEFAULT_STARTER_CODE });
  const [themeId, setThemeId] = useEditorThemeId();
  const [compare, setCompare] = useState(false);
  const [diff, setDiff] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const theme = getEditorTheme(themeId);
  const colors = useMemo(() => getPageColors(theme), [theme]);

  const timer = useContestTimer(contestData?.contestStart, contestData?.contestEnd);
  const { data: history = [], isError: isHistoryError } = useProblemHistory(problemId);
  const { mutateAsync: submit, isPending: isSubmitting } = useSubmitProblem(problemId);
  const [isPendingTransition, startTransition] = useTransition();

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [history]);

  const latestSubmission = sortedHistory[0];
  const isJudging = latestSubmission != null && latestSubmission.verdict == null && latestSubmission.score == null;
  const lastScore = latestSubmission?.score ?? null;
  const validScores = sortedHistory.map((h) => h.score).filter((s): s is number => s != null && !Number.isNaN(s));
  const highScore = validScores.length > 0 ? Math.max(...validScores) : null;

  const isLocked = timer.status === 'ended' || timer.status === 'upcoming';
  const lockReason =
    timer.status === 'ended'
      ? 'Contest has ended'
      : timer.status === 'upcoming'
        ? 'Contest has not started yet'
        : undefined;

  const isBusy = isSubmitting || isPendingTransition;

  const handleCodeChange = useCallback(
    (code: string) => {
      setDraft({ code });
    },
    [setDraft],
  );

  const handleSubmit = () => {
    if (isBusy) return;
    if (isLocked) {
      toast.error(lockReason ?? 'Submissions are closed.');
      return;
    }
    startTransition(async () => {
      try {
        await submit({ language: 'html', code: draft.code });
        toast.success('Solution submitted.');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to submit solution.');
      }
    });
  };

  const formattedTimeRemaining =
    timer.status === 'running'
      ? timer.formattedRemaining
      : timer.status === 'ended'
        ? 'Ended'
        : timer.status === 'upcoming'
          ? `Starts in ${timer.formattedRemaining}`
          : undefined;

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.foreground }}
      className="flex h-screen flex-col font-sans"
    >
      <ContestHeader
        title={contestData?.contestTitle ?? 'R.ODE Battle'}
        subtitle={contestData?.title}
        timeRemaining={formattedTimeRemaining}
        colors={colors}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <HistoryDrawer
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        isError={isHistoryError}
        colors={colors}
      />

      <PanelToolbar
        themeId={themeId}
        onThemeIdChange={setThemeId}
        compare={compare}
        onCompareChange={(v) => {
          setCompare(v);
          if (v) setDiff(false);
        }}
        diff={diff}
        onDiffChange={(v) => {
          setDiff(v);
          if (v) setCompare(false);
        }}
        colors={colors}
      />

      <div
        style={{ borderBottom: `1px solid ${colors.border}` }}
        className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr]"
      >
        <CssEditorPanel
          code={draft.code}
          onCodeChange={handleCodeChange}
          onSubmit={handleSubmit}
          isSubmitting={isBusy}
          isLocked={isLocked}
          lockReason={lockReason}
          theme={theme}
          colors={colors}
        />
        <CssLiveOutputPanel
          code={draft.code}
          target={contestData?.target}
          compare={compare}
          diff={diff}
          lastScore={lastScore}
          highScore={highScore}
          isJudging={isJudging}
          isHistoryError={isHistoryError}
          colors={colors}
        />
        <CssTargetPanel target={contestData?.target} colors={colors} />
      </div>

      <ContestFooter
        backTo={`/contest/${contestId}`}
        backLabel="Back to problems"
        contestId={contestId}
        colors={colors}
      />
    </div>
  );
}
