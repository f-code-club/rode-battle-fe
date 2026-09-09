import ContestFooter from '@/features/contest/components/ContestFooter';
import ContestHeader from '@/features/contest/components/ContestHeader';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSubmitProblem } from '../../hooks/useSubmitProblem';
import type { ContestDetailData } from '../../types';
import CssEditorPanel from './components/CssEditorPanel';
import CssLiveOutputPanel from './components/CssLiveOutputPanel';
import CssTargetPanel from './components/CssTargetPanel';
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
  const navigate = useNavigate();
  const [draft, setDraft] = useCssDraft(contestId, problemId, { code: DEFAULT_STARTER_CODE });
  const [themeId, setThemeId] = useEditorThemeId();
  const [compare, setCompare] = useState(false);
  const [diff, setDiff] = useState(false);
  const theme = getEditorTheme(themeId);
  const colors = getPageColors(theme);
  const submitMutation = useSubmitProblem(problemId);

  const handleCodeChange = (code: string) => {
    setDraft({ code });
  };

  const handleSubmit = async () => {
    try {
      await submitMutation.mutateAsync({ language: 'html', code: draft.code });
      toast.success('Solution submitted.');
      navigate({ to: '/contest/$contestId', params: { contestId } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit solution.');
    }
  };

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.foreground }}
      className="flex h-screen flex-col font-sans"
    >
      <ContestHeader
        title="R.ODE Battle"
        subtitle="International CSS Championship"
        timeRemaining="18:42"
        colors={colors}
      />

      <PanelToolbar
        themeId={themeId}
        onThemeIdChange={setThemeId}
        compare={compare}
        onCompareChange={setCompare}
        diff={diff}
        onDiffChange={setDiff}
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
          isSubmitting={submitMutation.isPending}
          theme={theme}
          colors={colors}
        />
        <CssLiveOutputPanel
          code={draft.code}
          target={contestData?.target}
          compare={compare}
          diff={diff}
          colors={colors}
        />
        <CssTargetPanel target={contestData?.target} colors={colors} />
      </div>

      <ContestFooter backTo={`/contest/${contestId}/`} backLabel="Back to problems" colors={colors} />
    </div>
  );
}
